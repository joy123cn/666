// Quantumult X 自动获取并存储最新 Cookie（完整提取）
var cookies = $response.headers["Set-Cookie"];
if (cookies) {
    var cookieStr = cookies.map(cookie => cookie.split(";")[0]).join("; "); // 处理 Set-Cookie 格式
    $prefs.setValueForKey(cookieStr, "manwa_cookie");  // 存储完整的 Cookie
    $notify("✅ Manwa.me Cookie 更新成功", "", "已保存完整 Cookie！");
} else {
    $notify("❌ Manwa.me Cookie 更新失败", "", "请检查登录状态");
}
$done();