const url = "https://manwa.me/login";  // 登录地址

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
    "Cookie": "passwd=qwe1234%40com; PHPSESSID=f2a9b884c92e1d52fb26e5fdd56a11f6; show_img_host2=1; zone-cap-5401286=1%3B1743389375; uid=1680950; username=for123cn"
};

// **这里填写你的账号和密码**
const body = "username=forever123cn&password=zrh1234%40com";

// 发送 POST 请求
const request = {
    url: url,
    method: "POST",
    headers: headers,
    body: body
};

$task.fetch(request).then(response => {
    console.log("登录返回数据: " + response.body);
    $notify("manwa.me 登录成功 ✅", "", response.body);  // 在 Quantumult X 发送通知
    $done();
}, reason => {
    console.log("请求失败: " + reason.error);
    $notify("manwa.me 登录失败 ❌", "", reason.error);
    $done();
});

