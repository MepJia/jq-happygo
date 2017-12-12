//主页
define(['lib/jquery','lib/cookie'],function(){
	return {
		index:(function(){
			//header tips
			$('.reg_tips').children('.close_r_tips').on('click',function(){
				$('.reg_tips').css('display','none');
			})
			//头部   客服中心
			$('.custom_service').on('mouseenter',function(){
				$(this).addClass('cus_border')
				$(this).children('.cus_center').show();
			}).on('mouseleave',function(){
				$(this).removeClass('cus_border')
				$(this).children('.cus_center').hide();
			})
			
		})()
	}
})