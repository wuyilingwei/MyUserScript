// ==UserScript==
// @name         Pixiv Tag Modifier
// @namespace    http://tampermonkey.net/
// @version      1.2
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
        var tags = prompt("Enter tags to exclude, separated by commas (e.g., -ai):", "");
        if (tags) {
            GM_setValue("exclusionTags", tags);
            alert("Exclusion tags updated! Tags: " + tags);
        }
    }

    // Register menu command
    GM_registerMenuCommand("Set Exclusion Tags", setExclusionTags, "e");

    // Function to modify the URL
    function modifyURL() {
        const currentURL = window.location.href;
        const urlObj = new URL(currentURL);
        const pathSegments = urlObj.pathname.split('/');

        if (pathSegments[1] === 'tags' && pathSegments[2]) {
            const userTag = GM_getValue("exclusionTags", "").split(',')[0].trim(); // Assuming single exclusion tag for simplicity
            const decodedPathTags = decodeURIComponent(pathSegments[2]);

            // Check if the user tag is already in the URL
            if (!decodedPathTags.includes(userTag)) {
                const newTags = decodedPathTags + ' ' + userTag;
                const newURL = `${urlObj.origin}/tags/${encodeURIComponent(newTags)}/${pathSegments.slice(3).join('/')}`;
                window.location.replace(newURL);
            }
        }
    }

    // Continuous URL monitoring
    setInterval(modifyURL, 1000);
})();
