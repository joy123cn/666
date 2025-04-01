const url = "https://manwa.me/login";
const username = "forever123cn"; // 你的用户名
const password = "zrh1234@com"; // 你的密码
const captcha = ""; // 如果验证码可绕过，则留空

const headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1",
    "Referer": "https://manwa.me/login.html",
    "Origin": "https://manwa.me",
    "X-Requested-With": "XMLHttpRequest"
};

const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&captcha=${encodeURIComponent(captcha)}`;

const request = {
    url: url,
    method: "POST",
    headers: headers,
    body: body
};

$task.fetch(request).then(response => {
    if (response.statusCode === 200) {
        const setCookie = response.headers['Set-Cookie'];
        if (setCookie) {
            let cookie = setCookie.match(/PHPSESSID=.*?;/)[0];
            $prefs.setValueForKey(cookie, "manwa_cookie");
            console.log("✅ 自动登录成功，Cookie 已更新：" + cookie);
            $notify("🎉 Manwa 自动登录成功", "已更新 Cookie", cookie);
        } else {
            console.log("⚠️ 自动登录失败，未获取到 Set-Cookie");
            $notify("⚠️ Manwa 自动登录失败", "未获取到 Cookie，请检查账号状态", "");
        }
    } else {
        console.log("❌ 登录失败，状态码：" + response.statusCode);
        $notify("❌ Manwa 登录失败", "服务器返回错误：" + response.statusCode, "");
    }
    $done();
}, reason => {
    console.log("❌ 请求失败：" + reason.error);
    $notify("❌ Manwa 登录请求失败", reason.error, "");
    $done();
});