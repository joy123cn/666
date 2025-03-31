// 读取 Quantumult X 存储的 Cookie
var cookie = $prefs.valueForKey("manwa_cookie");

// 如果 Quantumult X 读取的 Cookie 为空，手动补全（仅用于调试）
if (!cookie) {
    cookie = "PHPSESSID=f2a9b884c92e1d52fb26e5fdd56a11f6; uid=1680950; username=forever123cn"; // ⚠️ 替换成你的实际 Cookie
    console.log("⚠️ 使用手动填充的测试 Cookie");
} else {
    console.log("✅ 读取的 Cookie: " + cookie);
}

// 请求 URL
const url = "https://manwa.me/login"; // 访问用户中心，验证是否已登录

// 请求头
const headers = {
    "Host": "manwa.me",
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "X-Requested-With": "XMLHttpRequest",
    "Sec-Fetch-Site": "same-origin",
    "Accept-Language": "zh-CN,zh-Hans;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Sec-Fetch-Mode": "cors",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://manwa.me",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1",
    "Referer": "https://manwa.me/login.html",
    "Connection": "keep-alive",
    "Sec-Fetch-Dest": "empty",
    "Cookie": cookie // 这里使用 Quantumult X 读取的 Cookie
};

// 发送 GET 请求，验证是否已登录
const request = {
    url: url,
    method: "GET",
    headers: headers
};

$task.fetch(request).then(response => {
    console.log("访问用户中心返回数据: " + response.body);

    // 判断是否已登录
    if (response.body.includes("退出登录")) {  
        $notify("✅ Manwa.me 免登录成功", "", "已使用 Cookie 访问用户中心！");
    } else {
        $notify("❌ Manwa.me 登录失败", "", "Cookie 可能已失效，需要更新！");
    }
    $done();
}, reason => {
    console.log("请求失败: " + reason.error);
    $notify("❌ Manwa.me 登录失败", "", reason.error);
    $done();
});