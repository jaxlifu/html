$(".return").on("click", function() {
	//返回首页
	var data = {
    			"jump_data": "",
    			"jump_label": "js_jump_home"
    		};
	sendMessage(data);
})

$(".invitation").on("click", function() {
	//邀请好友
	var data = {
    			"jump_data": "",
    			"jump_label": "js_jump_share"
    		};
	sendMessage(data);
})