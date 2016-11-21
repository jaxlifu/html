//填充用户数据
function setUserInfo() {
	//判断是否拥有用户信息
	if (name != "") {
		$("#name").attr("readonly", true);
		$("#name").val(name);
	}
	if (tel != "") {
		$(".click_yzm").parent().remove()
		$("#tel").attr("readonly", true);
		$("#tel").val(tel);
	}
	if (idCard != "") {
		$("#id_card").attr("readonly", true);
		$("#id_card").val(idCard);
	}
}

//延时800毫秒执行填充数据
setTimeout("setUserInfo();", 800)

//获取短信验证码
$(".click_yzm").on("click", function() {

	var tel = $("#tel").val();
	if (!checkMobile(tel)) {
		$(".prompt").text("请输入正确的手机号");
		return false;
	}

	//判断是否为可发送状态
	if ($(".click_yzm").attr("name") == "0") {
		$.ajax({
			type: "post",
			url: address_url + "/api/web/index.php?r=login/login/get-captcha",
			data: {
				from: from,
				app_version: app_version,
				mobile: tel
			},
			async: false,
			success: function(data) {

				if (data.isSuccess) {
					$(".click_yzm").attr("name", 1);
					$(".click_yzm").css("background-color", "gray");
					var num = 60;
					var time = setInterval(function() {
						--num;
						$(".click_yzm").text("重新获取" + "(" + num + ")");
						//console.log(num)
						if (num <= 0) {
							clearInterval(time);
							$(".click_yzm").attr("name", 0);
							$(".click_yzm").css("background-color", "#ffbb50");
						}
					}, 1000)
				} else {
					$(".prompt").text(data.msg);
					return false;
				}

			}
		});
	}
})

//提交信息抽取参赛资格
$(".submit").on("click", function() {

	var name = $("#name").val().trim();
	var tel = $("#tel").val();
	var code = $("#code").val();
	console.log(code)
	var id_card = $("#id_card").val();

	if (name == "") {
		$(".prompt").text("请输入您的姓名");
		return false;
	}
	if (!checkMobile(tel)) {
		$(".prompt").text("请输入正确的手机号");
		return false;
	}

	if (code != undefined) {
		if (isNaN(code) || code == "") {
			$(".prompt").text("验证码不正确");
			return false;
		}
	}

	if (id_card == "") {
		$(".prompt").text("请输入身份证号码");
		return false;
	}

	$.ajax({
		type: "post",
		url: address_url + "/api/web/index.php?r=enroll/enroll/enroll-user-info",
		data: {
			token: token,
			from: from,
			app_version: app_version,
			username: name,
			mobile: tel,
			ID_number: id_card,
			captcha: code
		},
		async: false,
		success: function(data) {
			//console.log(data)
			if (data.isSuccess) {
				$.ajax({
					type: "post",
					url: address_url + "/api/web/index.php?r=enroll/enroll/enroll-coupon",
					data: {
						token: token,
						from: from,
						app_version: app_version
					},
					async: false,
					success: function(data) {
						console.log(data)
						if (data.isSuccess) {
							if (data.result == 1) {
								$(".sling , .sling_zhong").css("display", "block");
								//此处跳转到中奖页面 location.href = "javascript:"
								var data = "file:///android_asset/h5/apply_threePrize.html";
								//发送消息给Android让Android来实现跳转
								sendMessage(data);
							}
							if (data.result == 0) {
								$(".sling , .sling_buzhong").css("display", "block");
								//此处跳转到没中奖页面 location.href = "javascript:"
								var data = "file:///android_asset/h5/apply_threeEmpty.html";
								//发送消息给Android让Android来实现跳转
								sendMessage(data);
							}
						} else {
							alert(data.msg)
						}
					}
				});

			} else {
				$(".prompt").text(data.msg);
				return false;
			}
		}
	});

})

$("input").focus(function() {
	$(".prompt").text("");
})

//检查手机正则匹配
function checkMobile(str) {
	var re = /^1\d{10}$/
	if (re.test(str)) {
		return true;
	} else {
		return false;
	}
}