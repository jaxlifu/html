//调用赛区
function userEnrollArea() {
	$.ajax({
		type: "post",
		url: address_url + "/api/web/index.php?r=enroll/enroll/user-enroll-area",
		data: {
			from: from,
			app_version: app_version,
			token: token
		},
		async: false,
		success: function(data) {
			//console.log(data)
			if (data.isSuccess) {
				var html = '<fieldset><legend>' + data.result.area + '</legend></fieldset>';
				for (var i = 0; i < data.result.list.length; i++) {
					html += '	<aside class="address_list"><div class="area">' + data.result.list[i]["address"] + '</div><div class="address_list_bottom"><div class="timer">' + data.result.list[i]["game_time"] + '</div><div class="toal">' + data.result.list[i]["success_num"] + '/' + data.result.list[i]["total"] + '</div><div class="sling_state" data-choose = "0" data-address="' + data.result.area + '" id="' + data.result.list[i]["id"] + '"  data-type="' + data.result.list[i]["status"] + '"><div class="sling_select"></div></div></div></aside>';
				}

				$(".select_content").append(html);
			} else {
				alert(data.msg);
				return false;
			}

		}
	});

	//选择赛区初始化
	$(".sling_state").each(function() {
		var state = $(this).attr("data-type");

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

	//点击选择赛点
	$(".sling_state").on("click", function() {

		var state = $(this).attr("data-type");
		if (state == 0) {
			$(".sling_state").attr("data-choose", 0);
			$(".sling_state").find(".sling_select").css("background", "transparent url(img/click_division.png) no-repeat center");

			$(this).attr("data-choose", 1);
			$(this).find(".sling_select").css("background", "transparent url(img/choose.png) no-repeat center");
		}
	})

	//点击确定提交报名
	var p_id = "";
	var data_address = "";
	$(".submit").on("click", function() {
		$(".sling_state").each(function() {
			var choose = $(this).attr("data-choose");

			if (choose == 1) {
				p_id = $(this).attr("id");
				data_address = $(this).attr("data-address");
			}

		})

		if (p_id != "") {
			$.ajax({
				type: "post",
				url: address_url + "/api/web/index.php?r=enroll/enroll/enroll-address",
				data: {
					token: token,
					from: from,
					app_version: app_version,
					id: p_id,
					area: data_address
				},
				async: false,
				success: function(data) {
					//console.log(data)
					if (data.isSuccess) {
						var data = "file:///android_asset/h5/apply_five.html";
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
}

//延时800毫秒执行填充数据
setTimeout("userEnrollArea();", 800)