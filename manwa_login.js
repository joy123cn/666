const url = "https://manwa.me/ucenter";  // 访问用户中心，验证登录状态

// 读取 Quantumult X 存储的最新 Cookie
var cookie = $prefs.valueForKey("manwa_cookie");
if (!cookie) {
    $notify("❌ Manwa 登录失败", "", "没有找到 Cookie，请先访问 Manwa.me 更新！");
    $done();
}

// 构造请求头
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
    "Cookie": cookie
};

// 发送 GET 请求，验证是否已登录
const request = {
    url: url,
    method: "GET",
    headers: headers
};

$task.fetch(request).then(response => {
    console.log("访问用户中心返回数据: " + response.body);
    if (response.body.includes("退出登录")) {  // 检查返回内容，判断是否已登录
        $notify("✅ Manwa 免登录成功", "", "已使用最新 Cookie 直接访问用户中心！");
    } else {
        $notify("❌ Manwa 登录失败", "", "Cookie 可能已失效，需要更新！");
    }
    $done();
}, reason => {
    console.log("请求失败: " + reason.error);
    $notify("❌ Manwa 登录失败", "", reason.error);
    $done();
});