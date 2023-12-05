// ==UserScript==
// @name         替换发送快捷键
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  替换enter为换行，enter+shift为发送
// @author       YigeYigeren
// @match        https://chat.openai.com/*
// @supportURL   https://github.com/yige-yigeren/YigerenUserScript/issues
// @homepageURL  https://github.com/yige-yigeren/YigerenUserScript
// @downloadURL  https://github.com/yige-yigeren/YigerenUserScript/raw/main/userjs/chatgpt/replace_send_key.user.js
// @updateURL    https://github.com/yige-yigeren/YigerenUserScript/raw/main/userjs/chatgpt/replace_send_key.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @license MIT & Anti-Labor Exploitation License
// @grant        none
// ==UserScript==

(function() {
    'use strict';

    const PROMPT_TEXTAREA_ID = 'prompt-textarea';
    const SEND_BUTTON_SELECTOR = '[data-testid="send-button"]'; // 选择器用于找到发送按钮

    document.addEventListener('keydown', (e) => {
        if (e.target.id !== PROMPT_TEXTAREA_ID) {
            return;
        }
        if (e.keyCode === 13 && e.shiftKey) {
            // 当按下 Shift + Enter 时
            e.preventDefault(); // 阻止默认的换行行为
            const sendButton = document.querySelector(SEND_BUTTON_SELECTOR);
            if (sendButton && !sendButton.disabled) {
                sendButton.click(); // 点击发送按钮
            }
        } else if (e.keyCode === 13 && !e.ctrlKey) {
            // 仅当按下 Enter 且没有按下 Ctrl 时
            e.stopPropagation(); // 阻止事件冒泡
        }
    }, true);
})();

