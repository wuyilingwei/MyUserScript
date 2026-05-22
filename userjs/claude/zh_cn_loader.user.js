// ==UserScript==
// @name         Claude.ai 鸠占鹊巢汉化器 (en-US 动态替换)
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  直接拦截 en-US 语言包并替换为中文 JSON，规避官方 API 的 locale 校验
// @author       Wuyilingwei
// @match        https://claude.ai/*
// @supportURL   https://github.com/wuyilingwei/MyUserScript/issues
// @homepageURL  https://github.com/wuyilingwei/MyUserScript
// @downloadURL  https://github.com/wuyilingwei/MyUserScript/raw/main/userjs/claude/zh_cn_loader.user.js
// @updateURL    https://github.com/wuyilingwei/MyUserScript/raw/main/userjs/claude/zh_cn_loader.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=claude.ai
// @license      MIT & Anti-Labor Exploitation License
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 远程中文语言包 CDN 加载源
    const ZH_CN_JSON_URL = 'https://cdn.jsdelivr.net/gh/Pectics/claude-web-i18n@main/zh-CN/zh-CN.json';

    let cachedZhCNJson = null;

    /**
     * 异步获取最新的中文 JSON 数据
     */
    async function fetchRemoteLocale() {
        if (cachedZhCNJson) return cachedZhCNJson;
        try {
            const response = await originalFetch(ZH_CN_JSON_URL);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            cachedZhCNJson = await response.json();
            return cachedZhCNJson;
        } catch (error) {
            console.error('[Claude-i18n] 动态加载中文语言包失败:', error);
            return null;
        }
    }

    // 备份原生的 fetch
    const originalFetch = window.fetch;

    // 覆写 window.fetch
    window.fetch = async function (...args) {
        const url = args[0]?.toString() || "";

        // 拦截点：只要请求中包含 en-US.json 或者是 Next.js i18n 路由下的 en-US 资源
        if (url.includes('en-US.json') || (url.includes('/i18n/') && url.includes('en-US'))) {
            console.log(`[Claude-i18n] 成功拦截英文语言包请求: ${url}，正在注入中文...`);

            // 获取最新的中文数据
            const zhCNData = await fetchRemoteLocale();

            if (zhCNData) {
                // 完美掉包：返回 200 OK 响应，让前端框架无感知消费中文数据
                return new Response(JSON.stringify(zhCNData), {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
            }
        }

        // 其他所有无关请求，正常放行
        return originalFetch.apply(this, args);
    };

    console.log('[Claude-i18n] en-US 拦截劫持器已就绪。');
})();