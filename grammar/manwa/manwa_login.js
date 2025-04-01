let oldCookie = $prefs.valueForKey("manwa_cookie");

const url = `https://manwa.me/login`;  // 访问需要登录的页面
const headers = {
    "Cookie": oldCookie || "",  // 使用存储的 Cookie
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1"
};

const myRequest = { url: url, headers: headers };

$task.fetch(myRequest).then(response => {
    const newCookie = response.headers['Set-Cookie'];
    let logMessage = `📃 **Manwa 自动登录日志**\n\n`;

    if (newCookie) {
        let match = newCookie.match(/PHPSESSID=.*?;/);
        if (match) {
            let session = match[0];
            if (session !== oldCookie) {  // 只有新 Cookie 变更时才更新
                $prefs.setValueForKey(session, "manwa_cookie");
                logMessage += `✅ **Cookie 已更新**: ${session}\n`;
                $notify("🎉 Manwa 自动登录成功", "已更新 Cookie", session);
            } else {
                logMessage += `ℹ️ **Cookie 未变化**，继续使用：${oldCookie}\n`;
            }
        } else {
            logMessage += `⚠️ **Cookie 更新失败**，未找到 PHPSESSID\n`;
            $notify("⚠️ Manwa 自动登录失败", "未找到新的 PHPSESSID", "");
        }
    } else {
        logMessage += `❌ **服务器未返回 Set-Cookie，可能需要重新手动登录**\n`;
        $notify("❌ Manwa 自动登录失败", "可能需要手动登录获取新的 Cookie", "");
    }

    // 记录完整的访问数据
    logMessage += `\n📝 **HTTP 状态码**: ${response.statusCode}\n`;
    logMessage += `📥 **响应头部**: ${JSON.stringify(response.headers, null, 2)}\n`;
    logMessage += `📄 **网页内容**: ${response.body.substring(0, 500)}...（仅显示前 500 字符）`;

    console.log(logMessage);
    $done();
}, reason => {
    console.log("❌ 网络请求失败：" + reason.error);
    $done();
});