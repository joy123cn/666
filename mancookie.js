// Quantumult X 自动抓取最新 Cookie 并保存
var cookie = $request.headers["Cookie"];
if (cookie) {
    $persistentStore.write(cookie, "mancookie");  // 把 Cookie 存储到本地
    $notify("Manwa Cookie 更新成功 ✅", "", "新 Cookie 已保存！");
} else {
    $notify("Manwa Cookie 更新失败 ❌", "", "请手动检查网站是否变更！");
}
$done();