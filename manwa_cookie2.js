const setCookie = $response.headers['Set-Cookie'];
if (setCookie) {
    let cookie = setCookie.match(/PHPSESSID=.*?;/)[0]; // 提取 PHPSESSID
    $prefs.setValueForKey(cookie, "manwa_cookie"); // 存储 Cookie
    console.log("Manwa 登录成功，Cookie 已保存：" + cookie);
    $notify("🎉 Manwa 登录成功", "已获取并存储 Cookie", cookie);
} else {
    console.log("⚠️ Manwa 登录失败，未获取到 Set-Cookie");
    $notify("⚠️ Manwa 登录失败", "未获取到 Cookie，请检查登录状态", "");
}
$done({});