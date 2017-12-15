
define(['lib/jquery'],function(){
	return {
		index:function(){
			
			//二级菜单显示
			$('.second_nav .li_has_snav').on('mouseenter',function(){
				$(this).addClass('cur');
				$(this).children('.li_snav_list').show();
			}).on("mouseleave",function(){
				$(this).removeClass('cur');
				$(this).children('.li_snav_list').hide();
			})
			//头部购物车数量加载
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
			$('.i_car_num').html(sum);
			//banner
			var $index = 0;
			var $timer = null;
			var $banner = $('.banner_box');//获取最外层盒子
			var $li = $('.ban_pic').children('li');
			var $btn = $('.btn_all').children('span');
			$('.ban_pic li:first').clone().appendTo('.ban_pic');//克隆
			//小圆点点击
			$btn.on('click',function(){
				$index = $(this).index()
				$(this).addClass('on').siblings().removeClass('on');
				moveAnimate($index);
			})
			//自动轮播
			function moveAnimate($index){
				$('.ban_pic').animate({"left":$index*-$('.ban_pic li').width()},100)
			}
			$timer = setInterval(function(){
				$index++;
				if ($index>$btn.length-1) {
					$index = 0;
				}
				$btn.eq($index).trigger('click');
			},2000)
			//鼠标经过，停止
			$('.banner_box').on('mouseenter',function(){
				clearInterval($timer);
			}).on('mouseleave',function(){
				$timer = setInterval(function(){
					$index++;
					if ($index>$btn.length-1) {
						$index = 0;
					}
					$btn.eq($index).trigger('click');
				},2000)
			})
			//楼梯
			var $floorFlag = true;
			$('.left_slider li').click(function(){
				$floorFlag = false;
				//获取当前楼号top
				var $sTop = $('.mar40').eq($(this).index()).offset().top;
				//页面滚动的距离设置为stop
				$("body,html").animate({
			        "scrollTop": $sTop
			    }, 1000, function() {
			        $floorFlag = true;
			    });
			})
			$(window).scroll(function() {
				if ($(window).scrollTop()>$('#header').height()) {
					$('.left_slider').show();
				} else{
					$('.left_slider').hide();
				}
			})
			//今日直播
			
			$.ajax({
				url: "../php/list.php",
			    type:"post",
			    async:true,
			    dataType:'json',
			    success:function(data){
//			    	console.log(JSON.parse(data))
					var $arr = data;
					//今日直播
					for (var $i=0;$i<18;$i++) {
						$('#tv_zhiobo_ul').append('<li class="pro_list "><a class="pro" href="details.html?id='+$arr[$i].id+'" target="_blank"><img style="" src="'+$arr[$i].imgurl+'" alt="索娜斯 绝色玉琢一领三用进口银兰水貂大衣"></a><p class="p_num">'+$arr[$i].introduce+'</p><p class="box_glay"><a class="pro_text" href="details.html?id='+$arr[$i].id+'" target="_blank"><span>'+$arr[$i].detail+'</span></a></p><div class="now_price"><div class="price_l"><span class="bigfont"><span class="f_14">'+$arr[$i].price+'</span></span><span><del>'+$arr[$i].preprice+'</del></span></div></div></li>');
					}
					//昨日疯抢
					for (var $i=18;$i<30;$i++) {
						$('#zhibo_0').append('<li class="pro_list "><a class="pro" href="details.html?id='+$arr[$i].id+'" target="_blank"><img style="" src="'+$arr[$i].imgurl+'" alt="索娜斯 绝色玉琢一领三用进口银兰水貂大衣"></a><p class="p_num">'+$arr[$i].introduce+'</p><p class="box_glay"><a class="pro_text" href="details.html?id='+$arr[$i].id+'" target="_blank"><span>'+$arr[$i].detail+'</span></a></p><div class="now_price"><div class="price_l"><span class="bigfont"><span class="f_14">'+$arr[$i].price+'</span></span><span><del>'+$arr[$i].preprice+'</del></span></div></div></li>');
					}
					//tab change
					$('.pro_li').on('click',function(){
						$(this).addClass('current').siblings().removeClass('current');
						if ($(this).index()==0) {
							$('.pro_con').eq(0).show().siblings('.pro_con').hide()
						} else{
							$('.pro_con').eq(1).show().siblings('.pro_con').hide()
						}
					})
					//限时抢购
					for(var $i=0;$i<10;$i++){
						$('#xsqg_ul').append('<li class="li_over"><a href="details.html?id='+$arr[$i].id+'" class="sxqg_img" target="_blank"><img src="'+$arr[$i].imgurl+'" style="display: inline;"></a><a href="details.html?id='+$arr[$i].id+'" class="xsqg_title" target="_blank"><p class="xsqg_titel2">'+$arr[$i].introduce+'</p><p class="xsqg_title1">'+$arr[$i].detail+'</p></a><div class="xsqg_btn"><div class="xsqg_l"><span class="xsqg_p1"><strong>'+$arr[$i].price+'</strong></span><span class="xsqg_p2">'+$arr[$i].preprice+'</span><a href="#" class="xsqg_buy" target="_blank">已结束</a></div></li>')
					}
					//tab 鼠标经过切换
					$('.floor_type').children('li').on('mouseenter',function(){
						$(this).addClass('on').siblings('li').removeClass('on');
					})
					//left+right move
					var $i=0;
					$('.next').on('click',function(){
						$i+=5
						if ($i<=15) {
							$('.groUlOut').stop().animate({"left":$i*-$('.groUlOut li').width()},100);
						}
					})
					$('.prev').on('click',function(){
						$i-=5
						if ($i>=0) {
							$('.groUlOut').stop().animate({"left":$i*-$('.groUlOut li').width()},100);
						}
					})
			    }
			})
			//
		}
	}
})