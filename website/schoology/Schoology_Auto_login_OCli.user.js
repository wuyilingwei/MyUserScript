// ==UserScript==
// @name         Schoology Auto login (Only Click ver)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Auto login Schoology
// @author       YigeYigeren & ChatGPT
// @match        *://*.schoology.com/login*
// @match        *://schoology.com/login*
// @supportURL   https://github.com/yige-yigeren/better_schoology.user.js/issues
// @homepageURL  https://github.com/yige-yigeren/better_schoology.user.js
// @downloadURL  https://github.com/yige-yigeren/better_schoology.user.js/raw/main/Schoology_Auto_login_OCli.user.js
// @updateURL    https://github.com/yige-yigeren/better_schoology.user.js/raw/main/Schoology_Auto_login_OCli.user.js
// @license MIT
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
