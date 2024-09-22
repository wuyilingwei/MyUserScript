// ==UserScript==
// @name         No waiting the fk server
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Always hide the waiting modal
// @author       Lanc
// @match        https://pcrs.utm.utoronto.ca/*
// @supportURL   https://github.com/wuyilingwei/MyUserScript/issues
// @homepageURL  https://github.com/wuyilingwei/MyUserScript
// @downloadURL  https://github.com/wuyilingwei/MyUserScript/raw/main/userjs/UofT/No_waiting_fk_server.user.js
// @updateURL    https://github.com/wuyilingwei/MyUserScript/raw/main/userjs/UofT/No_waiting_fk_server.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pcrs.utm.utoronto.ca
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Function to hide the waiting modal
    function hideModal() {
        var modal = document.getElementById('waitingModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Function to remove the modal backdrop
    function removeBackdrop() {
        var backdrop = document.querySelector('.modal-backdrop.in');
        if (backdrop) {
            backdrop.parentNode.removeChild(backdrop);
        }
    }

    // Run the functions initially
    hideModal();
    removeBackdrop();

    // Run the functions every 500 milliseconds to ensure the modal stays hidden and the backdrop is removed
    setInterval(function() {
        hideModal();
        removeBackdrop();
    }, 250);
})();