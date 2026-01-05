/*
 *
 * 喜马拉雅 Quantumult X 专用版
 * 去广告 / 解锁 / 不依赖 $argument

[rewrite]
# 喜马拉雅 - 直接拒绝各类广告请求
^https?:\/\/ad(se\.wsa|se|behavior|)\.ximalaya\.com reject
^https?:\/\/.+\.xima.*\.com\/collector\/xl\/v\d reject
^https?:\/\/.+\.xima.*\.com\/mobile\/discovery\/v\d\/location reject
^https?:\/\/mobile\.ximalaya\.com\/comment-mobile\/vote\/binding reject
^https?:\/\/xdcs-collector(hera)?\.ximalaya\.com\/(api|nyx)\/v1 reject
^https?:\/\/.+\.xima.*\.com\/mobile-playpage\/view\/ reject
^https?:\/\/.+\.xima.*\.com\/chaos-notice-web\/v1\/message\/preview\/list reject
^https?:\/\/.+\.xima.*\.com\/social-web\/bottomtabs\/dynamicentrance\/status reject
^https?:\/\/.+\.xima.*\.com\/(dog-portal\/checkold|(child-mobile\/child|aged-mobile\/aged)\/mode\/query) reject
^https?:\/\/.+\.xima.*\.com\/discovery-feed\/isshowusergiftpendant reject
^https?:\/\/.+\.xima.*\.com\/mobile-user\/unread reject
^https?:\/\/.+\.xima.*\.com\/mobile-user\/minorprotection\/pop reject
^https?:\/\/.+\.xima.*\.com\/butler-portal\/versioncheck reject
^https?:\/\/.+\.xima.*\.com\/api\/v\d\/adrealtime reject
^https?:\/\/.+\.xima.*\.com\/ting\/(loading|feed|home)? reject
^https?:\/\/.+\.xima.*\.com\/discovery-feed\/focus\/queryf reject
^https?:\/\/.*linkeye-cloud\/checkip reject
^https?:\/\/passport(ws)?\.ximalaya\.com\/user-http-app\/v1\/token\/refresh reject
^https?:\/\/.*\.xmcdn\.com\/\w{8}\/\w{4}-\w{16}\/.+gif$ reject-img

# 喜马拉雅 - 响应体修改（去广告 + VIP解锁 + 界面优化，使用专用脚本）
^https?:\/\/.+\.xima.*\.com\/discovery-category\/customCategories url script-response-body https://raw.githubusercontent.com/joy123cn/666/main/script/xmly.js
^https?:\/\/.+\.xima.*\.com\/mobile-playpage\/playpage\/recommendContentV2 url script-response-body https://raw.githubusercontent.com/joy123cn/666/main/script/xmly.js
^https?:\/\/.+\.xima.*\.com\/focus-mobile\/focusPic url script-response-body https://raw.githubusercontent.com/joy123cn/666/main/script/xmly.js
^https?:\/\/.+\.xima.*\.com\/mobile-category\/v1\/category\/page\/queryCategoryPageData url script-response-body https://raw.githubusercontent.com/joy123cn/666/main/script/xmly.js
^https?:\/\/.+\.xima.*\.com\/mobile-user\/v2\/homePage url script-response-body https://raw.githubusercontent.com/joy123cn/666/main/script/xmly.js
^https?:\/\/.+\.xima.*\.com\/(product\/detail\/v1|mobile\/v1\/album\/track) url script-response-body https://raw.githubusercontent.com/joy123cn/666/main/script/xmly.js
^https?:\/\/.+\.xima.*\.com\/mobile-playpage\/playpage\/track\/qualityAndEffect url script-response-body https://raw.githubusercontent.com/joy123cn/666/main/script/xmly.js
^https?:\/\/.+\.xima.*\.com\/mobile-playpage\/playpage\/tabs\/v2 url script-response-body https://raw.githubusercontent.com/joy123cn/666/main/script/xmly.js
^https?:\/\/.+\.xima.*\.com\/(mobile-playpage\/track|mobile\/quickplay) url script-response-body https://raw.githubusercontent.com/joy123cn/666/main/script/xmly.js
^https?:\/\/mobile\.ximalaya\.com\/discovery-feed\/v\d\/mix\/ts-\d+ url script-response-body https://raw.githubusercontent.com/joy123cn/666/main/script/xmly.js
^https?:\/\/mobile\.ximalaya\.com\/mobile-playpage\/playpage\/recommend\/resource\/allocation url script-response-body https://raw.githubusercontent.com/joy123cn/666/main/script/xmly.js

# 喜马拉雅 - 请求头注入 Cookie 和 User-Agent（关键的VIP验证）
^https?:\/\/mobile\.ximalaya\.com\/mobile-playpage\/(playpage\/tabs\/v2\/|track\/v4\/baseInfo\/) url script-request-header https://raw.githubusercontent.com/joy123cn/666/main/script/xmly.js

[mitm]
hostname = *.xmcdn.com, *.ximalaya.com, 61.172.194.*, 180.153.*.*, 180.153.255.*, 180.153.140.*, 180.153.250.*, 114.80.99.*, 114.80.139.2*, 61.162.174.*, 119.188.123.*, 59.83.227.*, 114.80.161.29, 1.62.62.64, 1.194.255.171, 23.236.99.89, 36.99.200.135, 42.81.4.198, 42.81.26.128, 42.81.120.58, 43.152.24.12, 43.152.24.18, 43.152.25.127, 43.152.29.38, 43.175.16.34, 43.175.22.25, 43.175.44.15, 49.7.69.197, 49.51.224.95, 101.33.11.32, 101.33.11.106, 101.33.20.34, 101.33.29.110, 103.105.60.99, 140.249.84.135, 140.249.85.189, 150.109.90.80, 150.109.91.35, 150.138.47.94, 150.138.136.145, 203.205.13*.*, 203.205.250.*, 211.152.137.*, 47.100.227.85, 61.164.145.12, 106.41.204.126, 118.25.119.177, 223.111.231.198, 120.22*.2*.*, 43.132.8*.*, 101.33.27.*, 43.141.11.*, 117.34.49.212, 36.103.197.65, 198.18.1*.*, 198.18.2*.*, 101.91.13*, 36.42.77.*, 118.180.43.252, 49.119.120.*, 58.144.235.61, 58.251.62*, 221.204.4*.*, 112.84.131.*, 112.80.180.72, 112.98.170.228, 112.99.146.108, 116.136.188.184, 116.162.203.111, 116.177.225.247, 123.138.8.*, 119.188.180.230, 112.240.59.159*
*
*
*/

// xmla-header.js
// 喜马拉雅 Quantumult X 专用请求头修改脚本（修复版，直接填写 Cookie）

// ==================== 请手动填写区域 ====================
const COOKIE = "在这里粘贴你的完整喜马拉雅 Cookie";     // ← 必填！整行替换
const USER_AGENT = "Ximalaya/9.3.60 (iPhone; iOS 17.1; Scale/3.00)";  // 选填，建议填写
// ========================================================

let headers = $request.headers || {};

// 注入 Cookie
if (COOKIE && COOKIE !== "在这里粘贴你的完整喜马拉雅 Cookie" && COOKIE.trim() !== "") {
    headers["Cookie"] = COOKIE.trim();
    console.log("✅ 喜马拉雅 Cookie 已成功注入");
} else {
    console.log("❌ 未检测到有效 Cookie！VIP 解锁将失效，请编辑 xmla-header.js 并填写会员 Cookie");
}

// 注入 User-Agent（可选）
if (USER_AGENT && USER_AGENT !== "Ximalaya/9.3.60 (iPhone; iOS 17.1; Scale/3.00)") {
    headers["User-Agent"] = USER_AGENT;
    console.log("✅ 喜马拉雅 User-Agent 已注入");
}

$done({ headers: headers });
