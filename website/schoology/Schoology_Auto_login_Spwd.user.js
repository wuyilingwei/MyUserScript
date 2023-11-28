// ==UserScript==
// @name         Schoology Auto login (Save Password ver)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Auto login Schoology
// @author       YigeYigeren & ChatGPT
// @match        *://*.schoology.com/login*
// @match        *://schoology.com/login*
// @supportURL   https://github.com/yige-yigeren/YigerenUserScript/issues
// @homepageURL  https://github.com/yige-yigeren/YigerenUserScript
// @downloadURL  https://github.com/yige-yigeren/YigerenUserScript/raw/main/website/schoology/Schoology_Auto_login_Spwd.user.js
// @updateURL    https://github.com/yige-yigeren/YigerenUserScript/raw/main/website/schoology/Schoology_Auto_login_Spwd.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=schoology.com
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @license MIT & Anti-Labor Exploitation License
// ==/UserScript==


(function() {
    'use strict';

    // Function to encode and decode Base64
    function encode(str) {
        return btoa(str);
    }
    function decode(str) {
        return atob(str);
    }

    // Function to prompt for username and password
    function promptForCredentials() {
        let username = prompt("Please enter your username", "");
        let password = prompt("Please enter your password", "");
        password = encode(password); // Encode the password
        return { username, password };
    }

    // Function to save credentials
    function saveCredentials(credentials) {
        GM_setValue("encodedCredentials", JSON.stringify(credentials));
    }

    // Function to get saved credentials
    function getSavedCredentials() {
        let saved = GM_getValue("encodedCredentials", null);
        if (saved) {
            saved = JSON.parse(saved);
            saved.password = decode(saved.password); // Decode the password
        }
        return saved;
    }

    // Function to fill and submit the form
    function fillAndSubmitForm(credentials) {
        let usernameField = document.getElementById("edit-mail");
        let passwordField = document.getElementById("edit-pass");
        let submitButton = document.getElementById("edit-submit");

        if (usernameField && passwordField && submitButton) {
            usernameField.value = credentials.username;
            passwordField.value = credentials.password;
            submitButton.click();
        }
    }

    // Register menu commands
    GM_registerMenuCommand("Initialize Script", function() {
        let credentials = promptForCredentials();
        saveCredentials(credentials);
    });

    GM_registerMenuCommand("Change Credentials", function() {
        let credentials = promptForCredentials();
        saveCredentials(credentials);
    });

    // Check if credentials are already saved, if not prompt the user
    let credentials = getSavedCredentials();
    if (!credentials || !credentials.username || !credentials.password) {
        credentials = promptForCredentials();
        saveCredentials(credentials);
    }

    // Auto-login part
    let attempts = 0;
    const maxAttempts = 5;

    const intervalID = setInterval(function() {
        if (credentials && credentials.username && credentials.password) {
            fillAndSubmitForm(credentials); // Fill and submit form if credentials are provided
        }

        var submitButton = document.getElementById("edit-submit");
        if (submitButton) {
            submitButton.click();
        }
        attempts++;
        if (attempts >= maxAttempts) {
            clearInterval(intervalID);
        }
    }, 1000);
})();
