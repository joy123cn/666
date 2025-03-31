// Quantumult X 自动获取并存储最新 Cookie（兼容单个 Set-Cookie 返回）
var cookies = $response.headers["Set-Cookie"];

if (cookies) {
    var cookieStr = Array.isArray(cookies) ? cookies.map(c => c.split(";")[0]).join("; ") : cookies.split(";")[0];
    $prefs.setValueForKey(cookieStr, "manwa_cookie");  // 存储完整 Cookie
    $notify("✅ Manwa.me Cookie 更新成功", "", "已保存完整 Cookie！");
} else {
    $notify("❌ Manwa.me Cookie 更新失败", "", "请检查登录状态");
}
$done();