/*
*
*

[rewrite_local]
^https:\/\/mxsa\.mxbc\.net\/api\/v1\/customer\/info url script-request-header mxbc_token.js

[mitm]
hostname = mxsa.mxbc.net
*
*
*/

let token = $prefs.valueForKey('mxbc_token') || '';
let cid = $prefs.valueForKey('mxbc_cid') || '';
let sign = $prefs.valueForKey('mxbc_sign') || '';
let url = $prefs.valueForKey('mxbc_url') || '';

if ($request) {
  const headers = $request.headers || {};
  const fullUrl = $request.url || '';
  const query = fullUrl.split('?')[1] || '';
  const params = query ? Object.fromEntries(new URLSearchParams(query)) : {};

  token = headers['Access-Token'] || headers['access-token'] || token;
  cid = headers['x-ssos-cid'] || headers['X-Ssos-Cid'] || cid;
  sign = params['sign'] || sign;

  if (token) $prefs.setValueForKey(token, 'mxbc_token');
  if (cid) $prefs.setValueForKey(cid, 'mxbc_cid');
  if (sign) $prefs.setValueForKey(sign, 'mxbc_sign');
  if (fullUrl) $prefs.setValueForKey(fullUrl, 'mxbc_url');

  const msg = `Access-Token:\n${token}\n\nx-ssos-cid:\n${cid}\n\nsign:\n${sign}\n\n请求URL:\n${fullUrl}`;
  console.log(msg);
  $notify('蜜雪冰城 抓取成功', '', msg);
}

$done({});
