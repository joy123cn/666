// Quantumult X 自动获取并存储最新 Cookie
var cookie = $response.headers["Set-Cookie"];
if (cookie) {
    $prefs.setValueForKey(cookie, "manwa_cookie");  // 存储 Cookie
    $notify("✅ Manwa.me Cookie 更新成功", "", "新 Cookie 已保存！");
} else {
    $notify("❌ Manwa.me Cookie 更新失败", "", "请手动检查！");
}
$done();