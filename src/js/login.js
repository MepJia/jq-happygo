//登录界面
define(['lib/jquery','lib/cookie'],function(){
	return {
		login:(function(){
			$(function(){
				//点击选取登录方式
				$('.radio').on('click',function(){
					if ($('#radio2').prop('checked')){
						$('#radio1').removeAttr('checked');
						$('#pwd_mc').show().siblings('#phone_mc').hide();
					}
					if ($('#radio1').prop('checked')){
						$('#radio2').removeAttr('checked');
						$('#phone_mc').show().siblings('#pwd_mc').hide();
					}
				})
				//input
				$('.err_msg2').hide();
				$('#user_name').on('focus',function(){
					$('#error_user_name').show();
				}).on('blur',function(){
					$('#error_user_name').hide();
				})
				$('#password').on('focus',function(){
					$('#error_password').show();
				}).on('blur',function(){
					$('#error_password').hide();
				})
				//点击登录
				$('#loginsubmit').on('click',function(){
					$.ajax({
						url: "../php/login.php",
					    type:"post",
					    async:true,
					    dataType:'json',
					    data:{
					        	"phone":$("#user_name").val(),
					            "password":$("#password").val()
					    },
					    success: function (data) {
					    	if(data!=1){
					    		confirm("登陆失败，用户名或密码错误")?window.location.reload():"";
			               	}else{
			               		confirm("登陆成功")?window.location.assign("index.html"):"";
			                }
					    }
					})
					var d=new Date();
					d.setDate(d.getDate()+7);//10天后的时间
					document.cookie="phone="+$("#user_name").val()+";expires="+d;
				})
				
				
			})
		})()
	}
})