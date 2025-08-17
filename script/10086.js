/*
*
*

[rewrite_local]
^https?://res\.app\.coc\.10086\.cn/qwhdcdn_cmcc-cs_cn/prd-mgcenter/.*\.png\?width=.*&fmt=webp&height=.*$ url script-response-body https://gist.githubusercontent.com/joy123cn/8dcd0f0128987c50cd57cce5094409f4/raw/ad.js


[MITM]
hostname = %APPEND% client.app.coc.10086.cn, res.app.coc.10086.cn
*
*
*/


// block_ad.js: 返回空响应体，屏蔽广告图片
let body = $response.body;
body = '';  // 清空图片数据
$done({body});
