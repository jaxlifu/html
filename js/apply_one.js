//调用赛区
$.ajax({
	type: "post",
	url: address_url + "/api/web/index.php?r=enroll/enroll/game-area",
	data: {
		from: from,
		app_version: app_version
	},
	async: false,
	success: function(data) {
		console.log(data)
		if (data.isSuccess) {
			var html = "";
			for (var i = 0; i < data.result.length; i++) {

				html += '<div class="select_list"><div class="list_top" style="background:transparent url(' + address_url + data.result[i]["cover"] + ') no-repeat center"><div class="list_click" id="' + data.result[i]["id"] + '" data-type = "' + data.result[i]["status"] + '" data-address="' + data.result[i]["area"] + '" data-choose = "0"><div class="click_division"></div></div></div><div class="list_left"><div class="address">' + data.result[i]["area"] + '</div><div class="data_time">' + data.result[i]["start_time"] + '~' + data.result[i]["end_time"] + '</div></div><div class="list_right" data-address="' + data.result[i]["area"] + '">赛点详情 </div></div>'

			}

			$(".select_content").append(html);
		} else {
			alert(data.msg);
			return false;
		}

	}
});

//选择赛区初始化
$(".list_click").each(function() {
	var state = $(this).attr("data-type");
	if (state == 1) {
		$(this).css("background", "transparent url(img/b_actend.png) no-repeat center")
	}
	if (state == 2) {
		$(this).css("background", "transparent url(img/b_start.png) no-repeat center")
	}
	if (state == 3) {
		$(this).css("background", "transparent url(img/b_end.png) no-repeat center")
	}
	if (state == 4) {
		$(this).css("background", "transparent url(img/b_full.png) no-repeat center")
	}
})

//点击选择赛区页面
$(".list_click").on("click", function() {

	var state = $(this).attr("data-type");
	if (state == 0) {
		$(".list_click").attr("data-choose", 0);
		$(".list_click").find(".click_division").css("background", "transparent url(img/click_division.png) no-repeat center");

		$(this).attr("data-choose", 1);
		$(this).find(".click_division").css("background", "transparent url(img/choose.png) no-repeat center");
	}
})

//点击确定按钮
var province = "";
$(".submit").on("click", function() {
	$(".list_click").each(function() {
		var choose = $(this).attr("data-choose");

		if (choose == 1) {
			province = $(this).attr("data-address");

		}

	})

	if (province != "") {
		console.log(province + "token :" + token)
		$.ajax({
			type: "post",
			url: address_url + "/api/web/index.php?r=enroll/enroll/enroll-area",
			data: {
				token: token,
				from: from,
				app_version: app_version,
				area: province
			},
			async: false,
			success: function(data) {
				if (data.isSuccess) {
					//location.href="../h5/apply_two.html";
					var data = "file:///android_asset/h5/apply_two.html";
					//发送消息给Android让Android来实现跳转
					sendMessage(data);
				} else {
					alert(data.msg);
					return false;
				}

			}
		});

	} else {
		alert("请选择一个赛区");
		return false;
	}

})

//新增查看赛区赛点
$(".list_right").on("click", function() {

	$(".address_sling").children().remove();
	$(".sling,.address_sling").css("display", "block");

	var address = $(this).attr("data-address");
	$.ajax({
		type: "post",
		url: address_url + "/api/web/index.php?r=enroll/enroll/game-address",
		data: {
			token: token,
			from: from,
			app_version: app_version,
			area: address
		},
		async: false,
		success: function(data) {
			console.log(data)
			if (data.isSuccess) {

				var html = '<aside class="address_title"><p>' + data.result.area + '</p><div class="click_close"></div></aside>';

				//console.log(data.result.list.length)

				html += '<aside class="address_content">';

				if (data.result.list.length > 0) {
					for (var i = 0; i < data.result.list.length; i++) {

						html += '<div class="address_list"><div class="area">' + data.result.list[i]["address"] + '</div><div class="address_list_bottom"><div class="timer">' + data.result.list[i]["game_time"] + '</div><div class="toal">' + data.result.list[i]["success_num"] + '/' + data.result.list[i]["total"] + '</div><div class="sling_state" data-type="' + data.result.list[i]["status"] + '"></div></div></div>';

					}
				} else {
					html += '<p class="prompt">当前赛区还未有参赛点</p>';
				}

				html += '</aside>';
				$(".address_sling").append(html);

			} else {
				alert(data.msg);
				return false;
			}
		}
	});

	//选择赛区初始化
	$(".sling_state").each(function() {
		var state = $(this).attr("data-type");

		console.log(state)

		if (state == 0) {
			$(this).css("background", "transparent url(img/select_state.png) no-repeat center")
		}
		if (state == 2) {
			$(this).css("background", "transparent url(img/select_start.png) no-repeat center")
		}
		if (state == 3) {
			$(this).css("background", "transparent url(img/select_end.png) no-repeat center")
		}
		if (state == 4) {
			$(this).css("background", "transparent url(img/select_full.png) no-repeat center")
		}
	})

})

$(".address_sling").on("click", ".click_close", function() {
	$(".sling,.address_sling").css("display", "none");
})