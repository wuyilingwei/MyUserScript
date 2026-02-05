// ==UserScript==
// @name         Im in class!
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Notice new Vote on Mathmatize
// @author       UTM CS Lanc
// @match        https://www.mathmatize.com/*
// @supportURL   https://github.com/wuyilingwei/MyUserScript/issues
// @homepageURL  https://github.com/wuyilingwei/MyUserScript
// @downloadURL  https://github.com/wuyilingwei/MyUserScript/raw/main/userjs/mathmatize/Im_in_class.user.js
// @updateURL    https://github.com/wuyilingwei/MyUserScript/raw/main/userjs/mathmatize/Im_in_class.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.mathmatize.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let detectionInterval = null; // 用于存储定时器
    let isActive = false; // 标记脚本是否在活跃状态

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

    // 检查当前URL是否匹配polls页面
    function isPollsPage() {
        return window.location.href.includes('/polls/');
    }

    // 初始化脚本功能
    function initializeScript() {
        if (isActive) return; // 如果已经激活，直接返回

        console.log("Initializing script for polls page");
        isActive = true;

        // 重置通知状态
        localStorage.setItem("assignmentNotified", "false");

        // 目标按钮的选择器（根据页面调整选择器）
        const buttonSelector = ".MuiButtonBase-root.MuiButton-root";

        // 开始定时检测
        detectionInterval = setInterval(() => {
            const buttons = document.querySelectorAll(buttonSelector); // 获取所有符合条件的按钮
            let assignmentNotified = localStorage.getItem("assignmentNotified") === "true"; // 读取本地存储

            buttons.forEach(button => {
                const buttonText = button.textContent.trim();
                console.log("Detected Button Text:", buttonText); // 调试用

                if ((buttonText.includes("Submit") || buttonText.includes("提交")) && !assignmentNotified) {
                    // 当按钮文本为 "Submit" 且未通知过
                    new Notification("New Assignment!", {
                        body: "You have a new assignment waiting to submit!",
                        icon: "https://www.mathmatize.com/_next/image/?url=%2Flogo.png&w=48&q=75"
                    });

                    localStorage.setItem("assignmentNotified", "true"); // 保存通知状态
                }

                if (buttonText.includes("Update") || buttonText.includes("更新")) {
                    // 如果按钮文本为 "Update"，重置通知状态
                    localStorage.setItem("assignmentNotified", "false");
                }
            });
        }, 1000); // 每 1 秒检测一次
    }

    // 停止脚本功能
    function stopScript() {
        if (!isActive) return; // 如果未激活，直接返回

        console.log("Stopping script - not on polls page");
        isActive = false;

        if (detectionInterval) {
            clearInterval(detectionInterval);
            detectionInterval = null;
        }
    }

    // URL变化处理
    function handleURLChange() {
        if (isPollsPage()) {
            initializeScript();
        } else {
            stopScript();
        }
    }

    // 监听页面加载
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleURLChange);
    } else {
        handleURLChange();
    }

    // 监听URL变化（使用popstate和pushstate）
    window.addEventListener('popstate', handleURLChange);

    // 重写pushState和replaceState来监听程序化的URL变化
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function () {
        originalPushState.apply(history, arguments);
        setTimeout(handleURLChange, 100); // 延迟执行以确保页面已更新
    };

    history.replaceState = function () {
        originalReplaceState.apply(history, arguments);
        setTimeout(handleURLChange, 100); // 延迟执行以确保页面已更新
    };

    // 使用MutationObserver监听DOM变化（作为备用方案）
    const observer = new MutationObserver(() => {
        handleURLChange();
    });

    observer.observe(document, { childList: true, subtree: true });
})();
