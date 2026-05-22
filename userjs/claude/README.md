# 非常简单的Claude中文语言包加载器，直接拦截 en-US 语言包并替换为中文 JSON，规避官方 API 的 locale 校验。

[安装 install](https://github.com/wuyilingwei/MyUserScript/raw/main/userjs/claude/zh_cn_loader.user.js)

感谢 https://github.com/Pectics/claude-web-i18n 提供的中文语言包和修改思路，但是我认为Userjs是比浏览器扩展更轻量更优雅的解决方案，并且也更便于同步与代码审查。