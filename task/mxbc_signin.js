/*************************
蜜雪冰城 自动签到脚本（手动填写参数版本）

定时任务示例（每天 9 点执行）：
[task_local]
0 9 * * * mxbc_signin.js, tag=MXBC 签到
**************************/

// === 手动填写以下三个参数 ===
const token = '你的 Access-Token';
const cid = '你的 x-ssos-cid';
const savedUrl = 'https://mxsa.mxbc.net/api/v1/customer/signin?t=你的时间戳&appId=d82be6bbc1da11eb9dd000163e122ecb&sign=你的签名';

if (!token || !cid || !savedUrl) {
  $notify('MXBC 签到失败', '', '请手动填写 token、cid 和完整 URL');
  $done();
}

// 从 URL 中提取参数
try {
  const urlObj = new URL(savedUrl);
  const t = urlObj.searchParams.get('t');
  const sign = urlObj.searchParams.get('sign');
  const appId = urlObj.searchParams.get('appId');

  if (!t || !sign || !appId) {
    $notify('MXBC 签到失败', '', 'URL 中缺少 t、sign 或 appId 参数');
    $done();
  }

  const apiUrl = `https://mxsa.mxbc.net/api/v1/customer/signin?t=${t}&appId=${appId}&sign=${sign}`;
  const headers = {
    'Access-Token': token,
    'x-ssos-cid': cid,
    'content-type': 'application/json',
    'version': '2.5.4',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.43 NetType/WIFI Language/zh_CN',
    'Referer': 'https://servicewechat.com/wx7696c66d2245d107/159/page-frame.html',
    'Cookie': ''
  };

  $task.fetch({
    method: 'GET',
    url: apiUrl,
    headers
  }).then(response => {
    const res = JSON.parse(response.body || '{}');
    if (res.code === 0) {
      const point = res.data?.ruleValuePoint ?? 0;
      $notify('MXBC 签到成功', '', `获得积分：${point}`);
    } else {
      $notify('MXBC 签到失败', '', `返回信息：${res.msg || '未知错误'}`);
    }
    $done();
  }, error => {
    $notify('MXBC 签到失败', '', error.error || '请求异常');
    $done();
  });
} catch (err) {
  $notify('MXBC 签到失败', '', `URL 解析错误：${err.message}`);
  $done();
}
