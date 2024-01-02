// ==UserScript==
// @name         Pixiv Tag Modifier
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Modify search tags on Pixiv
// @author       WuYilingwei
// @match        *://*.pixiv.net/*
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pixiv.net
// @supportURL   https://github.com/yige-yigeren/YigerenUserScript/issues
// @homepageURL  https://github.com/yige-yigeren/YigerenUserScript
// @downloadURL  https://github.com/yige-yigeren/YigerenUserScript/raw/main/userjs/pixiv/TagModifier.user.js
// @updateURL    https://github.com/yige-yigeren/YigerenUserScript/raw/main/userjs/pixiv/TagModifier.user.js
// @license      MIT & Anti-Labor Exploitation License
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Function to prompt for exclusion tags and save them
    function setExclusionTags() {
        var tags = prompt("Enter tags to exclude请输入要屏蔽的Tag(e.g., -ai, -tag2):", "");
        if (tags) {
            GM_setValue("exclusionTags", tags);
            alert("Exclusion tags updated! Tags: " + tags);
        }
    }

    // Register menu command
    GM_registerMenuCommand("Set Exclusion Tags 自定义Tag已设定", setExclusionTags, "e");

    // Modify the URL if it matches the Pixiv tags pattern
    function modifyURL(url) {
        const exclusionTags = new Set(GM_getValue("exclusionTags", "").split(',').map(tag => tag.trim()));
        const urlObj = new URL(url);
        const pathSegments = urlObj.pathname.split('/');
        let modified = false;

        if (pathSegments[1] === 'tags' && pathSegments[2]) {
            const currentTags = new Set(pathSegments[2].split(' '));

            exclusionTags.forEach(tag => {
                if (!currentTags.has(tag)) {
                    currentTags.add(tag);
                    modified = true;
                }
            });

            if (modified) {
                const newTags = Array.from(currentTags).join(' ');
                return `https://www.pixiv.net/tags/${newTags}/${pathSegments.slice(3).join('/')}`;
            }
        }

        return url;
    }

    // Function to handle dynamic page loads
    function attachClickListener() {
        document.addEventListener('click', function(e) {
            setTimeout(function() {
                const newURL = modifyURL(window.location.href);
                if (newURL !== window.location.href) {
                    window.history.replaceState(null, null, newURL);
                }
            }, 500); // Timeout to wait for dynamic page update
        });
    }

    // Initial URL modification
    const newURL = modifyURL(window.location.href);
    if (newURL !== window.location.href) {
        window.location.replace(newURL);
    }

    // Attach click listener for dynamic page loads
    attachClickListener();
})();
