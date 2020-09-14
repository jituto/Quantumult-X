/*=================================
关注微信公众号iosrule和微信群,2020.9.8
by红鲤鱼绿鲤鱼与驴


2020.9.9增加2个,共计5个。
2020.9.10增加1个,共计6个。
2020.9.11更新提现


请及时更新重写命令和mit。
教程:https://mp.weixin.qq.com/s/YjTgTToPEeX1infR1vTwHg
更多教程https://mp.weixin.qq.com/s/zF9lylHflXtbayi2jUg0UA



#欢迎微信撸金币群提出靠谱打卡小程序方便更新。远程库订阅
https://raw.githubusercontent.com/wangdelu2020/hongliyu/master/wxdaka.js


#QX 远程订阅微信签到打卡小程序App签到
https:\/\/(www\.baimaa\.com|www\.2xtj7\.cn|www\.hnmiaosu\.cc|ph0001\.hezyq\.com|wq\.02gk\.com|dk\.ne72\.com)\/app\/index\.php? url script-request-header https://raw.githubusercontent.com/wangdelu2020/hongliyu/master/wxdaka.js



#定时(远程订阅)
0 30 0-24 * * ? https://raw.githubusercontent.com/wangdelu2020/hongliyu/master/wxdaka.js, tag=微信小程序打卡签到, enabled=false

mit=www.2xtj7.cn,www.baimaa.com,www.hnmiaosu.cc,ph0001.hezyq.com,wq.02gk.com,dk.ne72.com

//====================================

#loon 微信签到打卡小程序App签到

http-request https:\/\/(www\.baimaa\.com|www\.2xtj7\.cn|www\.hnmiaosu\.cc|ph0001\.hezyq\.com|wq\.02gk\.com|dk\.ne72\.com)\/app\/index\.php? script-path=https://raw.githubusercontent.com/wangdelu2020/hongliyu/master/wxdaka.js, requires-header=true, timeout=30, tag=微信打卡小程序

mit=www.2xtj7.cn,www.baimaa.com,www.hnmiaosu.cc,ph0001.hezyq.com,wq.02gk.com,dk.ne72.com

#定时间隔30分

#点击打卡获取ck。
#点击打卡获取ck。

*/

const $iosrule = iosrule();
const log=1;//设置0关闭日志,1开启日志
const getck=1;//设置0关闭获取ck,1开启获取ck

var mit=["www.2xtj7.cn","www.baimaa.com","www.hnmiaosu.cc","ph0001.hezyq.com","wq.02gk.com","dk.ne72.com"];
var tt=["小打卡赚钱花(20次)","音乐line(10次)"," 天天(每天早起)打卡赚赚(9次)","天天打卡赚钱(20次)","陀螺打卡(12次)","天天早起打卡哦(50次)"];

//自己增加mit代码中mit tt变量， 同时QX和loon重写命令和mit也要增加打卡程序的域名




//以下部分不要改动
//以下部分不要改动



//以下部分不要改动
//以下部分不要改动



//以下部分不要改动
//以下部分不要改动




var all="";
const weixin_iosrule=tt.length+"个微信小程序打卡集成";


























//++++++++++++++++++++++++++++++++




 async function iosrule_begin(i)
 {

 console.log(weixin_iosrule+"运行中,完成✅程序需要"+tt.length*2+"秒")
 let wx=await iosrule_mycash(i);
let temcash=wx.substring(wx.indexOf("💰")+2,wx.length-1);

all+=await iosrule_sign(i)+wx+await iosrule_withdrawals(i,temcash);
i++;
 if(i<tt.length)
      {
        
        setTimeout(function() {
iosrule_begin(i);

     }, 1 * 1000);

} else


{







 papa(weixin_iosrule,"",all);}
   
}





  
  
  



function iosrule_sign(t)
  {
  return  new Promise((resolve, reject) => {
    
   var result1=tt[t];
   var result2="";

var wxurl=$iosrule.read("wxurlname"+t);
var wxhd=$iosrule.read("wxhdname"+t);

  const llUrl1={
      url:wxurl,
      headers:JSON.parse(wxhd),
      timeout:600};
     
  $iosrule.get(llUrl1,function(error, response, data) {

var obj=JSON.parse(data);
if(obj.status==1)
result2="打卡成功!✅";
else if(obj.status==2)
result2=obj.info;
else
result2="UFO📛🎏❎,面壁思过吧";
result2=tt.length+"-"+(t+1)+"["+result1+"]\n"+`  `+result2+"\n";

resolve(result2);
})
})}
function iosrule_mycash(t)
  {
  return  new Promise((resolve, reject) => {
    
   var result1=tt[t];
   var result2="";
   var sb="";

var wxurl=$iosrule.read("wxurlname"+t);
var wxhd=$iosrule.read("wxhdname"+t);
var cashurl=gongzhonghao_iosrule(wxurl,"action=cash&contr=my","");

  const llUrl1={
      url:cashurl,
      headers:JSON.parse(wxhd),
      timeout:600};
     
  $iosrule.get(llUrl1,function(error, response, data) {

var obj=JSON.parse(data);
if(obj.status==1)
{
  if(obj.info.least_money=="")
 sb=0;
else
sb=obj.info.least_money;

result2="最低提现额度:"+sb+".现金:💰"+obj.info.member.money;}
else
result2="UFO📛🎏❎,面壁思过吧";
result2=`  `+result2+"\n";

resolve(result2);
})
})}


  
function iosrule_withdrawals(t,ai)
  {
   return  new Promise((resolve, reject) => {
    
   var result1=tt[t];
   var result2="";

var wxurl=$iosrule.read("wxurlname"+t);
var wxhd=$iosrule.read("wxhdname"+t);
   
var withdrawurl=gongzhonghao_iosrule(wxurl,"action=withdrawals&contr=my","&money="+ai+"&payment_code=");


  const llUrl1={
      url:withdrawurl,
      headers:JSON.parse(wxhd),
      timeout:600};
     
  $iosrule.get(llUrl1,function(error, response, data) {

var obj=JSON.parse(data);
if(obj.status==1)
result2="提现成功!✅";
else if(obj.status==2)
result2=obj.info;
else if(obj.status==0)
result2="没钱了，继续打卡";
result2=`  `+result2+"\n";
console.log(tt[t]+"运行完成✅");
resolve(result2);
})
})}
   




function gongzhonghao_iosrule(ck,n,extra)
{
  var st=ck.replace("action=sign&contr=clock",n)+extra;
  return st;
  
}


function iosrule_getck() {

  if ($request.headers) {

 var urlval = $request.url;

var md_hd=$request.headers;
if(urlval.indexOf("&action=sign&contr=clock")>=0)
{
for(var i in mit)
{
  if(urlval.indexOf(mit[i])>0)
  {var temp=i;
  var wxurlname="wxurlname"+i;
    var wxhdname="wxhdname"+i;

}}
 var sk= $iosrule.write(urlval,wxurlname);
 var sl= $iosrule.write(JSON.stringify(md_hd),wxhdname);
if (sk==true&&sl==true) 
 papa(tt[temp],"[获取打卡数据]","✌🏻成功");}



  
}}





function main()
{
iosrule_begin(0);}



function papa(x,y,z){

$iosrule.notify(x,y,z);}
function getRandom(start, end, fixed = 0) {
  let differ = end - start
  let random = Math.random()
  return (start + differ * random).toFixed(fixed)
}

if ($iosrule.isRequest) {
  if(getck==1)iosrule_getck()
  $iosrule.end()
} else {
  main();
  $iosrule.end()
 }



function iosrule() {
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




