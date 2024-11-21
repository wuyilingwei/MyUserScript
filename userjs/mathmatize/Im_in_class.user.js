// ==UserScript==
// @name         Im in class!
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Notice new Vote on Mathmatize
// @author       UTM CS Lanc
// @match        https://www.mathmatize.com/*
// @supportURL   https://github.com/wuyilingwei/MyUserScript/issues
// @homepageURL  https://github.com/wuyilingwei/MyUserScript
// @downloadURL  https://github.com/wuyilingwei/MyUserScript/raw/main/userjs/mathmatize/Im_in_class.user.js
// @updateURL    https://github.com/wuyilingwei/MyUserScript/raw/main/userjs/mathmatize/Im_in_class.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 检查浏览器是否支持通知
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification.");
        return;
    }

    // 请求通知权限
    Notification.requestPermission().then(permission => {
        if (permission !== "granted") {
            alert("Permission for notifications was denied.");
            return;
        }
    });

    // 目标按钮的选择器（根据页面调整选择器）
    const buttonSelector = ".MuiButtonBase-root.MuiButton-root";

    // 定时器每秒检测
    setInterval(() => {
        const buttons = document.querySelectorAll(buttonSelector); // 获取所有符合条件的按钮
        let assignmentNotified = localStorage.getItem("assignmentNotified") === "true"; // 读取本地存储

        buttons.forEach(button => {
            const buttonText = button.textContent.trim();
            console.log("Detected Button Text:", buttonText); // 调试用

            if (buttonText === "Submit" && !assignmentNotified) {
                // 当按钮文本为 "SUBMIT" 且未通知过
                new Notification("New Assignment!", {
                    body: "You have a new assignment waiting to submit!",
                    icon: "https://www.mathmatize.com/_next/image/?url=%2Flogo.png&w=48&q=75"
                });

                localStorage.setItem("assignmentNotified", "true"); // 保存通知状态
            }

            if (buttonText === "Update") {
                // 如果按钮文本为 "UPDATE"，重置通知状态
                localStorage.setItem("assignmentNotified", "false");
            }
        });
    }, 1000); // 每 1 秒检测一次
})();
