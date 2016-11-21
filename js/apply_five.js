function getData() {

	//调用报名成功信息
	$.ajax({
		type: "post",
		url: address_url + "/api/web/index.php?r=enroll/enroll/enroll-success",
		data: {
			from: from,
			app_version: app_version,
			token: token
		},
		async: false,
		success: function(data) {
			console.log(data)
			if (data.isSuccess) {
				$(".rank").text(data.result.rank);
				$(".address").text(data.result.address);
				$(".qr_code").attr("src", address_url + data.result.qr_code);
				$(".code").text(data.result.code);
			} else {
				alert(data.msg);
				return false;
			}
		}
	});

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
}

//延时800毫秒执行填充数据
setTimeout("getData();", 800)