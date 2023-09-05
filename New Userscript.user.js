// ==UserScript==
// @name         森空岛简易净化
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  移除非森空岛客户端请求给的app引导
// @author       WuYilingwei
// @match        https://www.skland.com/h/detail*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=skland.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function removeElements() {
        // 移除 header
        let headers = document.querySelectorAll('header');
        for (let header of headers) {
            if (header.className.includes('ZSPuvXb3')) {
                header.remove();
            }
        }

        // 移除 footer
        let footers = document.querySelectorAll('footer');
        for (let footer of footers) {
            if (footer.className.includes('mobileFixedFooter')) {
                footer.remove();
            }
        }
    }

    // 立即执行一次
    removeElements();

    // 处理动态加载的元素
    new MutationObserver(removeElements).observe(document.body, { childList: true, subtree: true });
})();