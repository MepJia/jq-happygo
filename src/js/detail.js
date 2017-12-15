define(['lib/jquery','lib/cookie'],function(){
	return {
		detail:!function(){
			//获取id
			var id = window.location.search;
			//console.log(id);
			if(id.indexOf("?") != -1) {
				var arr = id.split("?");
				if(arr[1].indexOf("=") != -1) {
					var arrId = arr[1].split("=");
				}
			}
			//
			
			$.ajax({
				url: "../php/list.php",
			    type:"post",
			    async:true,
			    dataType:'json',
			    success:function(res){
			    	for(var i = 0; i < res.length; i++) {
						if(arrId[1] == res[i].id) {
							var $image = $('.image');
							var $simg = $image.find('.s-img');
							var $sfdj = $image.find('.s-img .s-fdj');
							var $bfdj = $image.find('.b-fdj');
							//放大镜//console.log(arrId[1]);
							$image.find('.s-img').append('<img src="' + res[i].midimg1 + '">');
							$image.find('.b-fdj').append('<img src="' + res[i].bigimg1 + '">');
							$image.find('.small-pic .pic-list').append('<img src="' + res[i].samllimg1 + '">');
							//计算小放大镜的宽高并设置
							var $bimg = $image.find('.b-fdj img');
							$sfdj.width($bfdj.width() * $simg.width() / $bimg.width());
							//console.log($sfdj.width())
							$sfdj.height($sfdj.width());
			
							//鼠标滑过小图片，小/大放大镜显示
							$simg.on('mouseover', function() {
								$sfdj.show();
								$bfdj.show();
								//使小放大镜随着鼠标在小图里移动			
								$(document).on('mousemove', function(e) {
									var $l = e.pageX - $sfdj.width() / 2 - 130;
									var $t = e.pageY - $sfdj.height() / 2 - 100;
									//console.log($l);
									$sfdj.css({
										'left': $l,
										'top': $t
									});
									if($l <= 0) {
										$sfdj.css('left', 0);
									} else if($l >= $simg.width() - $sfdj.width()) {
										$sfdj.css('left', $simg.width() - $sfdj.width());
									}
									if($t <= 0) {
										$sfdj.css('top', 0);
									} else if($t >= $simg.height() - $sfdj.height()) {
										$sfdj.css('top', $simg.height() - $sfdj.height());
									}
									var $scale = $bimg.width() / $bfdj.width();
									var $scale1 = $bimg.height() / $bfdj.height();
									//alert($scale);
									$bimg.css({
										left: -$scale * $l,
										top: -$scale1 * $t
									});
								});
							})
							//鼠标滑出小图片，小/大放大镜消失
							$simg.on('mouseout', function() {
								$sfdj.hide();
								$bfdj.hide();
							})

							
//							//商品详情
							$('.detail_tit').html(res[i].detail);
							$('.detail_tit_md').html(res[i].introduce);
							$('.price_now').html(res[i].price)
							//将ajax请求数据存取
							var setObj = res[i];
						}
					}
			    	//// 减少购买数量
					$('a.btn-reduce').click(function(event) {
						var num = Number($('#buy_num').val());
						if($('#buy_num').val() && num > 1) {
							num -= 1;
							$('#buy_num').val(num);
						} else {
							$('#buy_num').val(1);
						}
						return false;
					});
					// 增加购买数量
					$('a.btn-add').click(function(event) {
						var num = Number($('#buy_num').val());
						if($('#buy_num').val()) {
							num += 1;
							$('#buy_num').val(num);
						} else {
							$('#buy_num').val(1);
						}
						return false;
					});
					//点击添加购物车
//					console.log(setObj)
					$('#add_cart').on('click',function(){
						//1.获取数量
						var $tNumber = $('#buy_num').val()
						//2.存取
						var obj = getCookie();//
						var newObj = setObj;
						newObj.num = $tNumber;
						
						var arr = [];
						for (var key in obj) {
							if (key == "list" + arrId[1]) {
								var newObj = JSON.parse(obj[key]);
								if (!newObj.num) {
									newObj.num = 0;
								}
								newObj.num = parseInt(newObj.num)+$('#buy_num').val();
							}
						}
						var date = new Date();
		               	date.setDate(date.getDate()+7);
		               	addCookie("list" + arrId[1],decodeURIComponent(JSON.stringify(newObj)),date);
						
//						//获取数量
						//$('.car_num')
						
						var cookALL = getCookieAll();
						var sumArr = [];
						for(var key in cookALL) {
							if(key.indexOf("list") != -1) {
								sumArr.push(cookALL[key])
							}
						}
						var sum = 0
						for(var i = 0; i < sumArr.length; i++) {
							sum += Number(JSON.parse(sumArr[i]).num)
						}
						$('.car_num').html(sum);
						$('.i_car_num').html(sum);
					})
					
			    }
			})
			
		}(),
	}
})