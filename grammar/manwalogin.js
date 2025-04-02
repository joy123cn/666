const url = "https://manwa.me/ucenter";  // 访问用户中心，验证登录状态

const headers = {
    "Host": "manwa.me",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1",
    "Referer": "https://manwa.me/ucenter",
    "Connection": "keep-alive",
    "Cookie": "PHPSESSID=373c00b70f1c88287ba7f3883599b879; uid=1680950; username=forever123cn"
};

// 发送 GET 请求，验证是否已登录
const request = {
    url: url,
    method: "GET",
    headers: headers
};

$task.fetch(request).then(response => {
    console.log("访问用户中心返回数据: " + response.body);
    
    if (response.body.includes("forever123cn")) {  // 检查返回的 HTML 是否包含用户名
        $notify("manwa.me 免登录成功 ✅", "", "已成功访问用户中心！");
    } else {
        $notify("manwa.me 登录状态失效 ❌", "", "Cookie 可能已失效，需要更新！");
    }
    $done();
}).catch(error => {
    console.log("请求失败: " + error);
    $notify("manwa.me 登录请求失败 ❌", "", error);
    $done();
});
