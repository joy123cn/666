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

// 获取 Set-Cookie 头部
if ($response && $response.headers && $response.headers["Set-Cookie"]) {
  const cookies = $response.headers["Set-Cookie"];
  const match = cookies.match(/PHPSESSID=([^;]+)/);
  if (match) {
    const session = `PHPSESSID=${match[1]};`;
    $prefs.setValueForKey(session, "manwa_cookie");
    console.log("✅ 成功抓取并存储 Cookie：" + session);
    $notify("Manwa 登录成功", "", session);
  } else {
    $notify("Manwa 登录失败", "", "未找到 PHPSESSID");
  }
} else {
  $notify("Manwa 登录失败", "", "无响应或无 Cookie 头");
}
$done({});