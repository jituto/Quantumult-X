/*
 @𝐗𝐢𝐝𝐍 𝐃𝐃
//++++++++++++++++++++++++++++++++-

趣客有礼小程序

微信小程序  建议2分钟运行一下
打开小程序获取ck 签到获取 转盘抽奖 红包抽奖






surge:本地
趣客有礼小程序 = type=http-request,pattern=^https:\/\/choujiang-server\.visvos\.com\/*,requires-body=1,max-size=0,script-path=qkylck.js


圈x:本地
^https:\/\/choujiang-server\.visvos\.com\/* url script-request-body qkylck.js


loon:本地
http-request ^https:\/\/choujiang-server\.visvos\.com\/* script-path=qkylck.js, requires-body=true, timeout=10, tag=趣客有礼小程序



MITM= choujiang-server.visvos.com






*/













const $XidN = XidN();//声明必须



const  qukeyouli="趣客有礼小程序";


const qkyl_signurlbdname="qkyl_signurlbdname";
const qkyl_signckname="qkyl_signckname";

const qkyl_signbdname="qkyl_signbdname";
const qkyl_videobdname="qkyl_videobdname";

const qkyl_drawvosbdname="qkyl_drawvosbdname";
const qkyl_drawbdname="qkyl_drawbdname";

const qkyl_runbdname="qkyl_runbdname";

const qkyl_luckybdname="qkyl_luckybdname";


const qkyl_signidckname="qkyl_signidckname";



//++++++++++++++++++++++++++++++++-


if ($XidN.isRequest)
{

qkyl_writeck();
  
  }
$XidN.end()
  
  
function qkyl_writeck() {

if ($request.headers) {

 var urlval = $request.url;

var md_headerck=$request.headers;
var md_bd=$request.body;
var tt=qukeyouli;
console.log(md_headerck)
if(urlval.indexOf("task/sign")>=0)
{


  var bo= $XidN.write(md_bd,qkyl_signbdname);


if (bo==true) 

  papa(tt,"[签到ck]","获取" + tt + "数据成功⭕️");}





else if(urlval.indexOf("Account/getUserMoney")>=0)
{

  var xo= $XidN.write(md_headerck["token"],qkyl_signckname);


var ao= $XidN.write(md_headerck["userId"],qkyl_signidckname);

 var so= $XidN.write(md_bd,qkyl_signurlbdname);

  

if (so==true&&xo==true&&ao==true) 
console.log(md_bd)
  papa(tt,"[签到奖励ck]","获取" + tt + "数据成功⭕️");}



else if(urlval.indexOf("task/watchVideo")>=0)
{

 var so= $XidN.write(md_bd,qkyl_videobdname);

  

if (so==true) 
console.log(md_bd)
  papa(tt,"[视频奖励ck]","获取" + tt + "数据成功⭕️");}






else if(urlval.indexOf("draw/getDrawList")>=0)
{

 var so= $XidN.write(md_bd,qkyl_drawbdname);

  

if (so==true) 
console.log(md_bd)
  papa(tt,"[首页ck]","获取" + tt + "数据成功⭕️");}


else if(urlval.indexOf("Exchange/run")>=0)
{

 var so= $XidN.write(md_bd,qkyl_runbdname);

  

if (so==true) 
console.log(md_bd)
  papa(tt,"[每日红包ck]","获取" + tt + "数据成功⭕️");}

else if(urlval.indexOf("lucky-draw/Run")>=0)
{


 var so= $XidN.write(md_bd,qkyl_luckybdname);


if (so==true) 
console.log(md_bd)
  papa(tt,"[转盘ck]","获取" + tt + "数据成功⭕️");}



}
}





//可以增加模块



function papa(x,y,z){
 $XidN.notify(x,y,z);}




function XidN() {
    const isRequest = typeof $request != "undefined"
    const isSurge = typeof $httpClient != "undefined"
    const isQuanX = typeof $task != "undefined"
    const notify = (title, subtitle, message) => {
        if (isQuanX) $notify(title, subtitle, message)
        if (isSurge) $notification.post(title, subtitle, message)
    }
    const write = (value, key) => {
        if (isQuanX) return $prefs.setValueForKey(value, key)
        if (isSurge) return $persistentStore.write(value, key)
    }
    const read = (key) => {
        if (isQuanX) return $prefs.valueForKey(key)
        if (isSurge) return $persistentStore.read(key)
    }
    const get = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "GET"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.get(options, callback)
    }
    const post = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "POST"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.post(options, callback)
    }
    const end = () => {
        if (isQuanX) isRequest ? $done({}) : ""
        if (isSurge) isRequest ? $done({}) : $done()
    }
    return { isRequest, isQuanX, isSurge, notify, write, read, get, post, end }
};
