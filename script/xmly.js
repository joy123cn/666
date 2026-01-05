/*
 *
 * 喜马拉雅 Quantumult X 专用版
 * 去广告 / 解锁 / 不依赖 $argument

[rewrite]
^https?:\/\/ad(se\.wsa|se|behavior|)\.ximalaya\.com url reject
^https?:\/\/.+\.xima.*\.com\/collector\/xl\/v\d url reject
^https?:\/\/.+\.xima.*\.com\/mobile\/discovery\/v\d\/location url reject
^https?:\/\/mobile\.ximalaya\.com\/comment-mobile\/vote\/binding url reject
^https?:\/\/xdcs-collector(hera)?\.ximalaya\.com\/(api|nyx)\/v1 url reject
^https?:\/\/.+\.xima.*\.com\/mobile-playpage\/view\/ url reject
^https?:\/\/.+\.xima.*\.com\/chaos-notice-web\/v1\/message\/preview\/list url reject
^https?:\/\/.+\.xima.*\.com\/social-web\/bottomtabs\/dynamicentrance\/status url reject
^https?:\/\/.+\.xima.*\.com\/(dog-portal\/checkold|(child-mobile\/child|aged-mobile\/aged)\/mode\/query) url reject
^https?:\/\/.+\.xima.*\.com\/discovery-feed\/isshowusergiftpendant url reject
^https?:\/\/.+\.xima.*\.com\/mobile-user\/unread url reject
^https?:\/\/.+\.xima.*\.com\/mobile-user\/minorprotection\/pop url reject
^https?:\/\/.+\.xima.*\.com\/butler-portal\/versioncheck url reject
^https?:\/\/.+\.xima.*\.com\/api\/v\d\/adrealtime url reject
^https?:\/\/.+\.xima.*\.com\/ting\/(loading|feed|home)? url reject
^https?:\/\/.+\.xima.*\.com\/discovery-feed\/focus\/queryf url reject
^https?:\/\/.*linkeye-cloud\/checkip url reject
^https?:\/\/passport(ws)?\.ximalaya\.com\/user-http-app\/v1\/token\/refresh url reject
^https?:\/\/.*\.xmcdn\.com\/\w{8}\/\w{4}-\w{16}\/.+gif$ url reject

# === http-response ===
^https?:\/\/.+\.xima.*\.com\/discovery-category\/customCategories url script-response-body https://he2o.vercel.app/Resource/Plugin/xmla.js
^https?:\/\/.+\.xima.*\.com\/mobile-playpage\/playpage\/recommendContentV2 url script-response-body https://he2o.vercel.app/Resource/Plugin/xmla.js
^https?:\/\/.+\.xima.*\.com\/focus-mobile\/focusPic url script-response-body https://he2o.vercel.app/Resource/Plugin/xmla.js
^https?:\/\/.+\.xima.*\.com\/mobile-category\/v1\/category\/page\/queryCategoryPageData url script-response-body https://he2o.vercel.app/Resource/Plugin/xmla.js
^https?:\/\/.+\.xima.*\.com\/mobile-user\/v2\/homePage url script-response-body https://he2o.vercel.app/Resource/Plugin/xmla.js
^https?:\/\/.+\.xima.*\.com\/(product\/detail\/v1|mobile\/v1\/album\/track) url script-response-body https://he2o.vercel.app/Resource/Plugin/xmla.js
^https?:\/\/.+\.xima.*\.com\/mobile-playpage\/playpage\/track\/qualityAndEffect url script-response-body https://he2o.vercel.app/Resource/Plugin/xmla.js
^https?:\/\/.+\.xima.*\.com\/mobile-playpage\/playpage\/tabs\/v2 url script-response-body https://he2o.vercel.app/Resource/Plugin/xmla.js
^https?:\/\/.+\.xima.*\.com\/(mobile-playpage\/track|mobile\/quickplay) url script-response-body https://he2o.vercel.app/Resource/Plugin/xmla.js
^https?:\/\/mobile\.ximalaya\.com\/discovery-feed\/v\d\/mix\/ts-\d+ url script-response-body https://he2o.vercel.app/Resource/Plugin/xmla.js
^https?:\/\/mobile\.ximalaya\.com\/mobile-playpage\/playpage\/recommend\/resource\/allocation url script-response-body https://he2o.vercel.app/Resource/Plugin/xmla.js

# === http-request（调试）===
^https?:\/\/mobile\.ximalaya\.com\/mobile-playpage\/(playpage\/tabs\/v2\/|track\/v4\/baseInfo\/) url script-request-header https://he2o.vercel.app/Resource/Plugin/xmla.js

[mitm]
hostname = *.xmcdn.com, *.ximalaya.com, 61.172.194.*, 180.153.*.*, 180.153.255.*, 180.153.140.*, 180.153.250.*, 114.80.99.*, 114.80.139.2*, 61.162.174.*, 119.188.123.*, 59.83.227.*, 114.80.161.29, 1.62.62.64, 1.194.255.171, 23.236.99.89, 36.99.200.135, 42.81.4.198, 42.81.26.128, 42.81.120.58, 43.152.24.12, 43.152.24.18, 43.152.25.127, 43.152.29.38, 43.175.16.34, 43.175.22.25, 43.175.44.15, 49.7.69.197, 49.51.224.95, 101.33.11.32, 101.33.11.106, 101.33.20.34, 101.33.29.110, 103.105.60.99, 140.249.84.135, 140.249.85.189, 150.109.90.80, 150.109.91.35, 150.138.47.94, 150.138.136.145, 203.205.13*.*, 203.205.250.*, 211.152.137.*, 47.100.227.85, 61.164.145.12, 106.41.204.126, 118.25.119.177, 223.111.231.198, 120.22*.2*.*, 43.132.8*.*, 101.33.27.*, 43.141.11.*, 117.34.49.212, 36.103.197.65, 198.18.1*.*, 198.18.2*.*, 101.91.13*, 36.42.77.*, 118.180.43.252, 49.119.120.*, 58.144.235.61, 58.251.62*, 221.204.4*.*, 112.84.131.*, 112.80.180.72, 112.98.170.228, 112.99.146.108, 116.136.188.184, 116.162.203.111, 116.177.225.247, 123.138.8.*, 119.188.180.230, 112.240.59.159*
*
*
*/



const header = $request.headers;

// ======= 手动填写区域（必填）=======
const COOKIE = "在这里填写你的喜马拉雅 Cookie";
const USER_AGENT = "ting_v9.4.32_c5(CFNetwork, iOS 15.4.1, iPhone14,2)";
// ======= 手动填写结束 =======

// =============================

function setHeader() {
  if (!COOKIE) {
    $notification.post(
      "喜马拉雅",
      "Cookie 未填写",
      "请在脚本中填写 Cookie"
    );
    return $done({});
  }

  header["cookie"] = COOKIE;
  header["user-agent"] = USER_AGENT;
  $done({ headers: header });
}

// ===== http-request =====
if ($request.method === "GET" && $request.headers) {
  setHeader();
  return;
}

// ===== http-response =====
if ($response && $response.body) {
  let body = $response.body;

  try {
    let obj = JSON.parse(body);

    // ==== 通用广告字段清理 ====
    const removeKeys = [
      "ad", "ads", "advert", "banner", "promotion",
      "vipTip", "vipEntrance", "vipFloat",
      "recommendAd", "adInfo", "adList"
    ];

    function clean(obj) {
      if (Array.isArray(obj)) {
        return obj.map(clean);
      }
      if (typeof obj === "object" && obj !== null) {
        for (const k of Object.keys(obj)) {
          if (removeKeys.some(v => k.toLowerCase().includes(v))) {
            delete obj[k];
          } else {
            obj[k] = clean(obj[k]);
          }
        }
      }
      return obj;
    }

    obj = clean(obj);

    // ==== 解锁标志 ====
    if (obj.isVip !== undefined) obj.isVip = true;
    if (obj.vip !== undefined) obj.vip = true;
    if (obj.hasBuy !== undefined) obj.hasBuy = true;
    if (obj.canPlay !== undefined) obj.canPlay = true;

    body = JSON.stringify(obj);
  } catch (e) {}

  $done({ body });
}
