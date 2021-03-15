const cookieName = '地平线抽奖'
const cookieKey = 'chavy_cookie_地平线抽奖'
const chavy = init()
var total=0
var i=0
//const cookieVal = chavy.getdata(cookieKey)

sign()

function sign() {
  let url = {
    url: `https://erp.level8.com.cn:11443//miniProgram/api/trophy/get?token=31bbdae1dfc640b78e2ddb23af9979b3`,
    headers: {
      //Cookie: cookieVal
    }
  }
  url.headers['Referer'] = 'https://servicewechat.com/wxb4aa148ab9b37bc5/80/page-frame.html'
  url.headers['Host'] = 'erp.level8.com.cn:11443'
  url.headers['Accept'] = '*/*'
  url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.2(0x18000229) NetType/WIFI Language/zh_CN'
//url.body='token=31bbdae1dfc640b78e2ddb23af9979b3'

  chavy.get(url, (error, response, data) => {
    let result = JSON.parse(data)
    let title = `${cookieName}`
    // 签到成功
    if (result && result.status == 0) {
      let subTitle = `抽奖成功`
      if(result.data.trophyName=='谢谢参与')
      {i=0}
      else{
      i=parseInt(result.data.trophyName)}
      total =i
      let x=1
      let detail =  `说明: 第1次：${result.data.trophyName}`
      while(i>10){
      detail=x(detail,x)
      total=total+i
      x=x+1
      }
      detail=`累计: ${total}个出发币,`+detail
      chavy.msg(title, subTitle, detail)
    }
    // 签到重复
    else {
      let subTitle = `抽奖失败`
      let detail = `说明: ${result.msg}`
      chavy.msg(title, subTitle, detail)
    }
    chavy.log(`${cookieName}, data: ${data}`)
    chavy.done()
  })
}
function x(detail,x) {
  let url = {
    url: `https://erp.level8.com.cn:11443//miniProgram/api/trophy/get?token=31bbdae1dfc640b78e2ddb23af9979b3`,
    headers: {
      //Cookie: cookieVal
    }
  }
  url.headers['Referer'] = 'https://servicewechat.com/wxb4aa148ab9b37bc5/80/page-frame.html'
  url.headers['Host'] = 'erp.level8.com.cn:11443'
  url.headers['Accept'] = '*/*'
  url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.2(0x18000229) NetType/WIFI Language/zh_CN'

  chavy.get(url, (error, response, data) => {
    
    let result = JSON.parse(data)
    if (result && result.status == 0) {
    if(result.data.trophyName=='谢谢参与')
      {i=0}
      else{
      i=parseInt(result.data.trophyName)}
    a=x+1
    
    }
    else
      {i=0}
  })
  detail=detail+`|第${a}次：${result.data.trophyName}`
  chavy.log(`${cookieName}, data: ${data}`)
  return detail
}
function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}


