const check_url = "https://manwa.me/ucenter";  // 用户中心页面，检测是否已登录
const stored_cookie = $prefs.valueForKey("manwa_cookie") || "";  // 读取本地存储的 Cookie

const check_headers = {
    "Host": "manwa.me",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1",
    "Referer": "https://manwa.me/ucenter",
    "Connection": "keep-alive",
    "Cookie": stored_cookie
};

// 发送 GET 请求，检查用户是否已登录
const check_request = {
    url: check_url,
    method: "GET",
    headers: check_headers
};

$task.fetch(check_request).then(response => {
    console.log("访问用户中心返回数据: " + response.body);

    if (response.body.includes("forever123cn")) {  // 账号用户名在页面中，表示已登录
        $notify("🎉manwa 已登录 ✅", "", "无需重新登录！");
        $done();
    } else {
        console.log("⚠️Cookie 失效，执行自动登录...");
        login();  // 执行登录逻辑
    }
}).catch(error => {
    console.log("检测请求失败: " + error);
    $notify("⚠️manwa.me 登录检测失败 ❌", "", "请求错误: " + error);
    $done();
});

// 登录逻辑
function login() {
    const login_url = "https://manwa.me/login";
    const username = "forever123cn";  // 你的用户名
    const password = "zrh1234@com";  // 你的密码
    const captcha = "";  // 仅当需要验证码时填写

    const login_headers = {
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
        "Referer": "https://manwa.me/login",
        "Connection": "keep-alive",
        "Sec-Fetch-Dest": "empty"
    };

    const login_body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&captcha=${captcha}`;

    const login_request = {
        url: login_url,
        method: "POST",
        headers: login_headers,
        body: login_body
    };

    $task.fetch(login_request).then(response => {
        console.log("登录返回数据: " + response.body);

        let data = JSON.parse(response.body);

        if (data.err === 0) {
            // 提取 Set-Cookie 头中的 PHPSESSID
            let set_cookie = response.headers["Set-Cookie"];
            let new_cookie = set_cookie.match(/PHPSESSID=[^;]+/)[0];  // 提取 PHPSESSID

            // 保存新 Cookie
            $prefs.setValueForKey(new_cookie, "manwa_cookie");

            $notify("🎉manwa 登录成功 ✅", "", "新 Cookie 已保存！");
            console.log("新 Cookie: " + new_cookie);
        } else {
            $notify("⚠️manwa.me 登录失败 ❌", "", data.msg);
        }
        $done();
    }).catch(error => {
        console.log("登录请求失败: " + error);
        $notify("manwa.me 登录失败 ❌", "", "请求错误: " + error);
        $done();
    });
}