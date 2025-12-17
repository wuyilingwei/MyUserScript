import os
import re

def get_existing_entries(content, start_marker, end_marker):
    # Find the content block
    pattern = re.compile(f"{re.escape(start_marker)}(.*?){re.escape(end_marker)}", re.DOTALL)
    match = pattern.search(content)
    entries = {}
    if match:
        # Split by newlines to get individual lines
        block_content = match.group(1).strip()
        if not block_content:
            return entries
            
        lines = block_content.split('\n')
        for line in lines:
            line = line.strip()
            if not line: continue
            
            # Extract link path to use as key: [Name](Path)
            # We want to match the path inside (...)
            link_match = re.search(r'\]\((.*?)\)', line)
            if link_match:
                path = link_match.group(1)
                entries[path] = line
    return entries

def scan_directory(directory):
    found_scripts = []
    if not os.path.exists(directory):
        return found_scripts
    
    for item in os.listdir(directory):
        item_path = os.path.join(directory, item)
        if os.path.isdir(item_path):
            readme_path = os.path.join(item_path, 'README.md')
            if os.path.exists(readme_path):
                link = f"/{directory}/{item}/README.md"
            else:
                link = f"/{directory}/{item}"
            found_scripts.append({'name': item, 'link': link})
    return found_scripts

def update_file(file_path):
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Process User Scripts
    user_entries = get_existing_entries(content, "<!-- SCRIPT_LIST_START -->", "<!-- SCRIPT_LIST_END -->")
    found_user_scripts = scan_directory('userjs')
    
    new_user_lines = []
    for script in found_user_scripts:
        if script['link'] in user_entries:
            # Preserve existing line (including custom descriptions)
            new_user_lines.append(user_entries[script['link']])
        else:
            # New entry
            new_user_lines.append(f"[{script['name']}]({script['link']})")
    
    new_user_lines.sort()
    
    # Join with double newlines for spacing
    new_user_section = "\n\n".join(new_user_lines)
    content = re.sub(
        r"(<!-- SCRIPT_LIST_START -->).*?(<!-- SCRIPT_LIST_END -->)",
        f"\\1\n\n{new_user_section}\n\n\\2",
        content,
        flags=re.DOTALL
    )

    # Process Bookmark Scripts
    mark_entries = get_existing_entries(content, "<!-- BOOKMARK_LIST_START -->", "<!-- BOOKMARK_LIST_END -->")
    found_mark_scripts = scan_directory('markjs')
    
    new_mark_lines = []
    for script in found_mark_scripts:
        if script['link'] in mark_entries:
            new_mark_lines.append(mark_entries[script['link']])
        else:
            new_mark_lines.append(f"[{script['name']}]({script['link']})")
            
    new_mark_lines.sort()
    
    new_mark_section = "\n\n".join(new_mark_lines)
    content = re.sub(
        r"(<!-- BOOKMARK_LIST_START -->).*?(<!-- BOOKMARK_LIST_END -->)",
        f"\\1\n\n{new_mark_section}\n\n\\2",
        content,
        flags=re.DOTALL
    )
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {file_path}")

def main():
    update_file('README.md')
    update_file('README_CN.md')

if __name__ == "__main__":
    main()
