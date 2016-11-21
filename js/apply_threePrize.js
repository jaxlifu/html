//获取用户token信息
/*$(".user_name").text(name);
if(img!=""){
	$('.user_img').css('background','transparent url('+address_url+img+') no-repeat center');
	$('.user_img').css('background-size','cover');
}*/

$(".submit").on("click", function() {
	var data = "file:///android_asset/h5/apply_four.html";
	sendMessage(data);
})

$(".footer").on("click",function(){
		$(".sling").css("display","block");
		$(".rule").css("display","block");
	})

$(".rule_close").on("click",function(){
$(".sling").css("display","none");
$(".rule").css("display","none");
})

$.ajax({
    type:"post",
    url: address_url+"/api/web/index.php?r=other/other/doc",
    data:{from:from,app_version:app_version,type:2},
    async:false,
    success: function(data){
        if(data.isSuccess){
            //console.log(data.result[0].content)

            var html=data.result[0].content;

            $(".rule_content").children().remove();
            $(".rule_content").append(html);

            $(".tel_click").attr("href","tel:"+$(".tel_click").text())
            $(".tel_click").css("color","#FFFFFF")

        }
        else{
            alert(data.msg);
            return false;
        }

    }
});