const cookieName = 'QQ打卡'
const cookieKey = 'jituto_cookie_qqdaka'
const jituto = init()
const cookieVal = jituto.getdata(cookieKey)
//cookie调用成功
//jituto.msg('json解析','v','c')
sign()

function sign() {
 
  let url = {
    url: `https://ti.qq.com/hybrid-h5/api/json/daily_attendance/SignIn`,
    headers: {
      Cookie: cookieVal
    }
}
  url.body = `{
  "uin": "2297810074",
  "type": 1,
  "sId": "",
  "qua": "V1_IPH_SQ_8.3.6_1_APP_A"
}`
  url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 QQ/8.3.6.618 V1_IPH_SQ_8.3.6_1_APP_A Pixel/1080 MiniAppEnable SimpleUISwitch/0 QQTheme/1000 Core/WKWebView Device/Apple(iPhone 7Plus) NetType/WIFI QBWebViewType/1 WKType/1'
  url.headers['Content-Type'] = `application/json;charset=utf-8`



    jituto.post(url, (error, response, data) => {
    let result = JSON.parse(data)
    jituto.log(result.data.retCode)
    let title = `${cookieName}`
    let m=""
    // 签到成功
    if (result.data.retCode = 0) {
      let subTitle = `打卡结果: 成功`
      
      //let detail = `今日标签: ${result.data.signInOutLook.title}, 说明: ${data.signInOutLook.buttonDoc}`
      //jituto.msg(title, subTitle, detail)
      getsigninfo(m)
    }
    // 签到重复
    else if (result.data.retcode = 1) {
     let m="(重复打卡)"
     getsigninfo(m) 
     jituto.log('重复')
    }
    // 签到失败
    else {
      let subTitle = `打卡结果: 失败`
      let detail = `说明: Cookie失效，请重新获取`
      jituto.msg(title, subTitle, detail)
    }
    jituto.log(`${cookieName}, data: ${data}`)
  })
jituto.done()
}


function getsigninfo(m) {
  let url = {
    url: `https://ti.qq.com/hybrid-h5/api/json/daily_attendance/SignInMainPage`,
    headers: {
      Cookie: cookieVal
    }
  }
    url.body=`{"uin":"2297810074","QYY":2,"qua":"V1_IPH_SQ_8.4.5_1_APP_A","loc": {"lat":33880089,"lon":115818398}}`
  
  url.headers['Content-Type'] = 'application/json;charset=utf-8'
  
  jituto.post(url, (error, response, data) => {
    let title = `${cookieName}`
    
    let subTitle = `打卡结果: 成功`
    let detail = ``
    let result = JSON.parse(data)
    jituto.log('aaaaaa')
    jituto.log(result)
    if (result.data.retcode = 0) {
     detail = `${result.data.vecSignInfo.value[0].signInOutLook.title}  ${result.data.vecSignInfo.value[0].signInOutLook.buttonDoc} `}
    let option1={"media-url":`${result.data.vecSignInfo.value[0].signInCover.materialStyle.prelayer}`}
    let option2={"openurl":`${result.data.vecSignInfo.value[0].signInOutLook.buttonJumpUrl}`,"media-url":`${result.data.vecSignInfo.value[0].signInOutLook.url}`}

    
    jituto.msg(title, `${subTitle}${m}`, `${result.data.vecSignInfo.value[0].signInOutLook.title}  ${result.data.vecSignInfo.value[0].signInOutLook.buttonDoc} `,option2)
    jituto.msg(`${result.data.vecSignInfo.value[0].signInCover.title}  ${result.data.vecSignInfo.value[0].signInCover.subTitle}`, `${result.data.vecSignInfo.value[0].signInCover.projTitle}  ${result.data.vecSignInfo.value[0].signInCover.projInfo}`, `${result.data.vecSignInfo.value[0].signInOutLook.collCard.shareTxt}`,option1)
    
  })
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
  msg = (title, subtitle, body，option) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body,option)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, resp, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, resp, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
