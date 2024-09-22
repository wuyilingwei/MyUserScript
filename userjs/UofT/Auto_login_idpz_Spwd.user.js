// ==UserScript==
// @name         U of T Auto login (Save Password ver)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Auto login weblogin idpz
// @author       Lanc
// @match        *://idpz.utorauth.utoronto.ca/idp/profile/SAML2/Redirect/SSO*
// @supportURL   https://github.com/wuyilingwei/MyUserScript/issues
// @homepageURL  https://github.com/wuyilingwei/MyUserScript
// @downloadURL  https://github.com/wuyilingwei/MyUserScript/raw/main/userjs/UofT/Auto_login_idpz_Spwd.user.js
// @updateURL    https://github.com/wuyilingwei/MyUserScript/raw/main/userjs/UofT/Auto_login_idpz_Spwd.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=idpz.utorauth.utoronto.ca
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
        let showname = prompt("Please enter the name you want to display", "");
        password = encode(password); // Encode the password
        return { username, password, showname };
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

    // Function to show the overlay over the login form
    function showLoginOverlay(username) {
        const form = document.querySelector('form[action^="/idp/profile/SAML2/Redirect/SSO"]'); // Target the form

        if (!form) return; // If no form found, exit

        const overlay = document.createElement('div');
        overlay.id = 'login-overlay';
        overlay.style.position = 'absolute';
        overlay.style.width = `${form.offsetWidth}px`; // Match form width
        overlay.style.height = `${form.offsetHeight}px`; // Match form height
        overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        overlay.style.zIndex = '1000';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.fontSize = '16px';
        overlay.style.fontWeight = 'bold';
        overlay.style.color = 'rgb(6, 119, 186)';
        overlay.style.textAlign = 'center';
        overlay.style.padding = '20px';
        overlay.style.border = '1px solid #ccc';
        overlay.style.borderRadius = '10px';

        // Get the position of the form
        const rect = form.getBoundingClientRect();
        overlay.style.top = `${rect.top + window.scrollY}px`;
        overlay.style.left = `${rect.left + window.scrollX}px`;

        const textWrapper = document.createElement('div');
        textWrapper.innerText = `Auto Login Plugin Working\nWelcome Back\n ${username}`;
        textWrapper.style.whiteSpace = 'pre-line';  // To respect new lines in text

        overlay.appendChild(textWrapper);
        document.body.appendChild(overlay);
    }

    // Function to fill and submit the form
    function fillAndSubmitForm(credentials) {
        let usernameField = document.getElementById("username");
        let passwordField = document.getElementById("password");
        let submitButton = document.querySelector("button[type='submit']");

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
    if (!credentials || !credentials.username || !credentials.password || !credentials.showname) {
        credentials = promptForCredentials();
        saveCredentials(credentials);
    }

    showLoginOverlay(credentials.showname); // Show the overlay over the form
    // Auto-login part
    let attempts = 0;
    const maxAttempts = 5;

    const intervalID = setInterval(function() {
        if (credentials && credentials.username && credentials.password) {
            fillAndSubmitForm(credentials); // Fill and submit form if credentials are provided
        }

        var submitButton = document.querySelector("button[type='submit']");
        if (submitButton) {
            submitButton.click();
        }
        attempts++;
        if (attempts >= maxAttempts) {
            clearInterval(intervalID);
        }
    }, 1000);
})();
