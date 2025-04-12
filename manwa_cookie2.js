/**************************************
// ==UserScript==
// @Description   Manwa自动抓取Cookie （与manwa_login3.js配合使用）
***************************/

// ======quantumultx配置如下：=======

[rewrite_local]
^https:\/\/manwa\.me\/login$ url script-response-body https://raw.githubusercontent.com/joy123cn/666/refs/heads/main/manwa_cookie2.js

[mitm]
hostname = manwa.me


// =========================================

if ($request.method !== "POST") {
    console.log("⏳ 非 POST 登录请求，跳过 Cookie 存储");
    $done({});
}

// 获取 Set-Cookie 头部
const setCookie = $response.headers["Set-Cookie"];
if (setCookie) {
    let match = setCookie.match(/PHPSESSID=.*?;/);
    if (match) {
        let session = match[0];
        $prefs.setValueForKey(session, "manwa_cookie");  // 存储 Cookie
        console.log("✅ 登录成功，存储最新 Cookie：" + session);
        $notify("🎉 Manwa 登录成功", "已获取并存储最新 Cookie", session);
    } else {
        console.log("⚠️ 登录成功，但未找到 PHPSESSID");
        $notify("⚠️ Manwa 登录成功", "但未找到 PHPSESSID", "");
    }
} else {
    console.log("❌ 服务器未返回 Set-Cookie，可能登录失败");
    $notify("❌ Manwa 登录失败", "服务器未返回 Cookie", "");
}

$done({});