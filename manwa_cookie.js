if ($request.method !== "POST") {
    console.log("⏳ 非 POST 登录请求，跳过 Cookie 存储");
    $done({});
}

const setCookie = $response.headers['Set-Cookie'];

if (setCookie) {
    let match = setCookie.match(/PHPSESSID=.*?;/);
    if (match) {
        let cookie = match[0];
        $prefs.setValueForKey(cookie, "manwa_cookie");
        console.log("✅ 登录成功，Cookie 已保存：" + cookie);
        $notify("🎉 Manwa 登录成功", "已获取并存储 Cookie", cookie);
    } else {
        console.log("⚠️ Cookie 存储失败，未找到 PHPSESSID");
        $notify("⚠️ Manwa 登录失败", "未找到有效的 Cookie", "");
    }
} else {
    console.log("❌ 登录失败，未返回 Set-Cookie 头");
    $notify("❌ Manwa 登录失败", "服务器未返回 Cookie，可能是账号或验证码错误", "");
}

$done({});