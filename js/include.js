// 获取参赛接口        内网
var address_url_debug = 'http://18.18.19.200:8008';
var address_url_release = 'http://jzdtl.astu.cc';
var address_url = address_url_release;
//APP或者WEB平台
var from = "app";
//版本号
var app_version = "11.0";

var token = "";

var name = "";
var tel = "";
var idCard = "";
var img = "";
var mInfo = "";

//JS Android  =====================================================>>>
//发送消息到Android并获取Android返回的消息
function sendMessage(data) { //发送消息给java本地代码
	window.WebViewJavascriptBridge.send(
		data,
		function(responseData) { //获取到的Android返回的消息
			console.log("Android 返回的消息为: " + responseData);
		}
	);
}

//向Android请求接收消息,这个方法最好在页面加载完成后通过onClick获取
function receiveMessage(data) { //call native method 这里传递参数给Android,如果不传就为""
	window.WebViewJavascriptBridge.callHandler('submitFromWeb', {
		'param': data
	}, function(responseData) { //这里处理Android返回的数据
		console.log("Android 返回的消息为: " + responseData);
	});
}

//定义链接JS和Android的桥接
function connectWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) {
		callback(WebViewJavascriptBridge)
	} else {
		document.addEventListener(
			'WebViewJavascriptBridgeReady',
			function() {
				callback(WebViewJavascriptBridge)
			},
			false
		);
	}
}



function getUserInfo() {
	var obj = JSON.parse(mInfo);
	token = obj.token;
	img = obj.user_pic;
	tel = obj.bind_mobile;
	name = obj.real_name;
	//alert(tel + name + token + img)
	console.log(tel + name + token + img);
}
//Android发消息过来需要时间才能接收到,大概在200ms左右,这边给500ms后接收数据,防止没有接收到消息的情况
setTimeout("getUserInfo()", 600);



function init(callback){
	// 第一连接时初始化bridage
connectWebViewJavascriptBridge(function(bridge) {
	bridge.init(function(message, responseCallback) {
		//alert("message" + message)
		console.log("message" + message);
		responseCallback(message);
	});
	// 注册一个"functionInJs",初始化时获取数据在这边处理
	bridge.registerHandler("functionInJs", function(data, responseCallback) {
		//延时200毫秒执行填充数据
		mInfo = data;
		callback(data);
		// response层
		responseCallback(data);

	});
})
}
//JS Android =====================================================>>>

//用户体验填写屏幕滚动技术
$("input").on("focus", function() {
	$('html,body').animate({
		scrollTop: ($(this).offset().top - 210)
	}, 500);
})