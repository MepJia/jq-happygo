//公用js效果
define(['lib/jquery','lib/cookie'],function(){
	return {
		public:function(){
			//header tips
			$('.reg_tips').children('.close_r_tips').on('click',function(){
				$('.reg_tips').css('display','none');
			})
			//获取是否登录
			var $cookie = getCookie('login') || '[]';
			var $data = JSON.parse($cookie);
			if ($data.length&&$data!="undefined") {
				$('.left_h').html('<div class="login_2">欢迎您，</span><a>'+$data[0].phone+'</a><a href="javascript:void(0)" class="exit">[退出]</a></div>');
				//右侧栏 登录前后切换
				$('.user_center').children('.r_s_login').hide();
				$('.user_center').children('.uc_login').show();
				//右侧栏 登录之后显示
				$('.uc_user_name').html('<a href="#">'+$data[0].phone+',您好</a>')
			}else{
				$('.user_center').children('.r_s_login').show();
				$('.user_center').children('.uc_login').hide();
			}
			//header 点击退出登录
			$('.exit').on('click',function(){
				delCookie('login');
				window.location.reload();
			})
			
			//down 二维码
			$('.er_wei_ma').on('mouseenter',function(){
				$(this).children('.download_code').show();
			}).on('mouseleave',function(){
				$(this).children('.download_code').hide();
			})
			//头部   客服中心
			$('.custom_service').on('mouseenter',function(){
				$(this).addClass('cus_border')
				$(this).children('.cus_center').show();
			}).on('mouseleave',function(){
				$(this).removeClass('cus_border')
				$(this).children('.cus_center').hide();
			})
			//slide  right
			//top
			var $arr1 = $('.r_s_c_top').children('.r_s_list');
			for (var $i=0;$i<$arr1.length;$i++) {
				$($arr1[$i]).on('mouseenter',function(){
					$(this).children('a').css('background-color','#94193f');
					$(this).children('.r_s_list_tc').show();
				}).on('mouseleave',function(){
					$(this).children('a').css('background-color','');
					$(this).children('.r_s_list_tc').hide();
				})
			}
			//user login
			$('.r_s_close').on('click',function(){
				$(this).parent('.user_center').hide();
			})
			$('.uc_login').children('#loginsubmit').on('click',function(){
				$.ajax({
					url: "../php/login.php",
				    type:"post",
				    async:true,
				    dataType:'json',
				    data:{
				        	"phone":$("#reg_mobile").val(),
				            "password":$("#password").val()
				    },
				    success: function (data) {
				    	if(data!=1){
				    		confirm("登陆失败，用户名或密码错误")?window.location.reload():"";
		               	}else{
		               		confirm("登陆成功")?window.location.reload():"";
		                }
				    }
				})
			})
			//获取数量
			//$('.car_num')
			var cookALL = getCookieAll();
			var arr = [];
			for(var key in cookALL) {
				if(key.indexOf("list") != -1) {
					arr.push(cookALL[key])
				}
			}
			var sum = 0
			for(var i = 0; i < arr.length; i++) {
				sum += Number(JSON.parse(arr[i]).num)
			}
			$('.car_num').html(sum);
			//bot
			var $arr2 = $('.r_s_c_bot').children('.r_s_list');
			for (var $i=0;$i<$arr2.length;$i++) {
				$($arr2[$i]).on('mouseenter',function(){
					$(this).children('a').css('background-color','#94193f');
					$(this).children('.s_c_list_tc').show();
				}).on('mouseleave',function(){
					$(this).children('a').css('background-color','');
					$(this).children('.s_c_list_tc').hide();
				})
			}
			//返回顶部
			$(window).scroll(function(){
				//返回顶部
			 	if ($(window).scrollTop()<150) {
			 		$('#gotop').css('opacity',0.5);
			 	} else{
			 		$('#gotop').css('opacity',1);
			 		//显示 搜索框
			 		if ($(window).scrollTop()>585) {
			 			$('.search_fixed').show();
			 		} else{
			 			$('.search_fixed').hide();
			 		}
			 		
			 	}
			})
			$('.r_s_list').has('#gotop').on('click',function(){
	 			$("html,body").animate({scrollTop:0},'slow');
	 		})
		}
	}
})