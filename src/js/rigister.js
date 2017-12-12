//注册页
$(function(){
	//隐藏所有错误提示框
	$(".err_msg2").hide();
	$(".err_msg1").hide();
	//正则验证
	var $mobileflag = false;
	var $pwdflag = false;
	var $pwdconfflag = false;
	var $rancodeflag = false;
	//手机号
	$("#reg_mobile").on("focus",function(){
		//显示提示
		$("#error_mobile").show();
		$("#error_mobile").html("请输入11位手机号码");
	}).on("blur",function(){
		$mobileflag = false;
		//判断手机号码不为空
		if ($("#reg_mobile").val()) {
			//验证手机
			if(!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($("#reg_mobile").val())){
				$("#error_mobile").html("手机号码格式不正确");
			}else{
				//隐藏提示
				$("#error_mobile").hide();
				$mobileflag = true;
			}
		} else{
			$("#error_mobile").html("手机号码不能为空");
		}
		
	})
	//密码
	$("#password").on("focus",function(){
		//显示提示
		$("#error_password").show();
		$("#error_password").html("请输入您的密码,您的密码可能为字母、数字或符号组合")
	}).on("blur",function(){
		$pwdflag = false;
		//判断密码不为空
		if ($("#password").val()) {
			if (!/^\w{6,20}$/.test($("#password").val())) {
				$("#error_password").html("密码不符合规范")
			} else{
				$pwdflag = true;
				//隐藏提示
				$("#error_password").hide();
			}
		} else{
			$("#error_password").html("密码不能为空");
		}
		
	})
	//确认密码
	$("#password_confirm").on("focus",function(){
		//显示提示
		$("#error_password_confirm").show();
	}).on("blur",function(){
		$pwdconfflag = false;
		if ($("#password_confirm").val() && $("#password_confirm").val()===$("#password").val()) {
			$pwdconfflag = true;
			//隐藏提示
			$("#error_password_confirm").hide();
		} else{
			$("#error_password_confirm").html("密码输入不一致")
		}
	})
	//验证码
	$("#idcode").html(idCodeRandom());
	$(".pis").on("click",function(){
		$("#idcode").html(idCodeRandom());
	});
	$("#random_code").on("focus",function(){
		$("#error_random_cod").show();
	}).on("blur",function(){
		$rancodeflag = false;
		if ($("#idcode").html()==$("#random_code").val()) {
			$rancodeflag = true;
			$("#error_random_cod").hide();
		} else{
			$("#error_random_cod").html("验证码不正确");
		}
	})
	//点击登录
	var $substop = false;//默认不阻止
	$(".register_btn").on("click",function(){
		
		if ($mobileflag == true && $pwdconfflag == true && $pwdflag == true && $rancodeflag == true) {
			$.ajax({
				url: "../php/rigister.php",
			    type:"post",
			    async:true,
			    dataType:'json',
			    data:{
			        	"phone":$("#reg_mobile").val(),
			            "password":$("#password").val()
			    },
			    success: function (data) {
			    	if(data!=1){
			    		$substop = false;
						confirm("注册成功，是否需要登录")?window.location.assign("login.html"):"";
					}else{
						$substop = true;
						confirm("该手机号已经被注册")?window.location.reload():"";
					}
			    }
			})
		} else{
			alert("请填写完整所有信息")
		}
		$('#register_form').on('submit',function(){
			if($substop){
				return false;
			}else{
				location.href = "login.html";
			}
		});
	})
})
//随机验证码
function idCodeRandom(){
	var arr=[];
	for(var i=48;i<=57;i++){
		arr.push(String.fromCharCode(i));
	}
	for(var i=97;i<=122;i++){
		arr.push(String.fromCharCode(i));
	}
	var str='';
	for(var j=0;j<4;j++){
		var ranIndex=parseInt(Math.random()*arr.length);
		if(ranIndex>9){
			var bool=Math.random()>0.5?true:false;
			if(bool){
				str+=arr[ranIndex].toUpperCase();
			}else{
				str+=arr[ranIndex];
			}
		}
		else{
			str+=arr[ranIndex];
		}
	}
	return str;
}
function checkInput(obj) {
    var val = obj.value;
    if(val == "") {   
        return false;
    } else {
        return true;
    }
}