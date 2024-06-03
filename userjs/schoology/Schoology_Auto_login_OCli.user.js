// ==UserScript==
// @name         Schoology Auto login (Only Click ver)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Auto login Schoology
// @author       YigeYigeren & ChatGPT
// @match        *://*.schoology.com/login*
// @match        *://schoology.com/login*
// @supportURL   https://github.com/wuyilingwei/YigerenUserScript/issues
// @homepageURL  https://github.com/wuyilingwei/YigerenUserScript
// @downloadURL  https://github.com/wuyilingwei/YigerenUserScript/raw/main/userjs/schoology/Schoology_Auto_login_OCli.user.js
// @updateURL    https://github.com/wuyilingwei/YigerenUserScript/raw/main/userjs/schoology/Schoology_Auto_login_OCli.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=schoology.com
// @license MIT & Anti-Labor Exploitation License
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

        // Auto-login part
        let attempts = 0;
        const maxAttempts = 5;

        const intervalID = setInterval(function() {
            var button = document.getElementById("edit-submit");
            if (button) {
                button.click();
            }
            attempts++;
            if (attempts >= maxAttempts) {
                clearInterval(intervalID);
            }
        }, 1000);
    
})();
