// Quantumult X Rewrite Script
// ==UserScript==
// @name        Manwa 去广告去弹窗
// @namespace   https://manwa.me/
// @version     1.0
// @description 去除红色X广告按钮 + 屏蔽广告拦截检测弹窗
// @author      You
// @match       ^https:\/\/manwa\.me\/chapter\/\d+$
// ==/UserScript==

// ↓ 下面正式开始你的脚本逻辑 ↓

let body = $response.body;


// 删除广告拦截提示弹窗HTML
body = body.replace(/<div[^>]+class="[^"]*(modal|adblock-modal)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');

// 屏蔽alert提示
body = body.replace(/alert\(['"][^'"]*?(请关闭阻挡广告插件|Chrome|Safari|Edge)[^'"]*?['"]\);?/gi, 'console.log("屏蔽反广告提示");');

$done({ body });