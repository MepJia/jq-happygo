define(['lib/jquery','lib/cookie'],function(){
	return {
		cart:!function(){
			//获取全部cookie
			var objALL = getCookieAll();
			var arr = [];
			for(var key in objALL) {
				if(key.indexOf("list") != -1) {
					arr.push(objALL[key]);
				}
			}
			var sum = 0;
			var thNum = 0;
			//判断是否有商品
			if (arr.length != 0) {
				$('.car_no_goods').css('display','none');
				$('#has_goods').css('display','block');
				//动态创建
				for (var i=0;i<arr.length;i++) {
					var $createDiv = '<div class="item_form clear"><div class="cell p_checkbox"><input type="checkbox" class="cb_s_goods" /></div>';
					$createDiv+='<div class="cell p_goods"><div class="p_img"><a target="_blank" href="details.html?id='+JSON.parse(arr[i]).id+'">';
					$createDiv+='<img src="'+JSON.parse(arr[i]).imgurl+'"/></a></div><div class="item_msg"><div class="p_name">';
					$createDiv+='<a target="_blank" href="details.html?id='+JSON.parse(arr[i]).id+'">'+JSON.parse(arr[i]).detail+'</a></div></div></div>';
					$createDiv+='<div class="cell p_prices"><p class="p_prices2">'+JSON.parse(arr[i]).price+'</p></div><div class="cell p_quantity clear">';
					$createDiv+='<div class="wrap_input"><a href="javascript://" data-param="0" class="btn-reduce">-</a><input value="'+JSON.parse(arr[i]).num+'" id="buy_num" class="text">';
					$createDiv+='<a href="javascript://" data-param="0" class="btn-add">+</a></div></div><div class="cell p_sum"><strong>￥<em>'+(JSON.parse(arr[i]).price).replace(/[^0-9]/ig,"")*JSON.parse(arr[i]).num+'</em></strong></div>'
					$createDiv+='<div class="cell p_ops"><a href="javascript:void(0);" class="car_remove">删除</a></div></div>';
					$('.item_list').append($createDiv);
					
					//默认全选中，计算总数
   				 	$('.jdcheckbox').prop('checked',true);
   				 	if(	$('.jdcheckbox').prop('checked',true)){
   				 		$('.cb_s_goods').prop('checked',true);
   				 	}
   				 	thNum+= Number(JSON.parse(arr[i]).num);
					$('#sunm').html(thNum);
					sum +=Number(JSON.parse(arr[i]).price.replace(/[^0-9]/ig,""))*Number(JSON.parse(arr[i]).num)
					$('#cartTotal').html(sum);
					
				}
				// 减少购买数量
				$('.p_quantity a.btn-reduce').click(function(event) {
					
					var num = Number($(this).siblings('#buy_num').val());
					if($(this).siblings('#buy_num').val() && num > 1) {
						num -=1;
						$(this).siblings('#buy_num').val(num);
						//获取单价
						var $danjia = Number($(this).parents('.p_quantity').siblings('.p_prices').find('.p_prices2').html().replace(/[^0-9]/ig,""));
						var $zongjia = $danjia * num;
						$(this).parents('.p_quantity').siblings('.p_sum').find('em').html($zongjia);
						$zongjia += $danjia
						totalprice()
						
					} else {
						$(this).siblings('#buy_num').val(1);
					}
					return false;
				});
				// 增加购买数量
				$('.p_quantity a.btn-add').click(function(event) {
					var num = Number($(this).siblings('#buy_num').val());
					if($(this).siblings('#buy_num').val()) {
						num ++;
						$(this).siblings('#buy_num').val(num);
						//获取单价
						var $danjia = Number($(this).parents('.p_quantity').siblings('.p_prices').find('.p_prices2').html().replace(/[^0-9]/ig,""));
						//console.log($danjia)
						//总价
						var $zongjia = $danjia * num;
						$(this).parents('.p_quantity').siblings('.p_sum').find('em').html($zongjia);
						$zongjia += $danjia

						totalprice()
						
					} else {
						$(this).siblings('#buy_num').val(1);
					}
					return false;

				});
				//默认全选
				//全选
				$('.jdcheckbox').on('change', function() {
				    $('.item_form').find('input:checkbox').prop('checked', $(this).prop('checked'));
				    $('.jdcheckbox').prop('checked', $(this).prop('checked'));
				    totalprice();
				});
				
				var $inputchecked = $('.jdcheckbox').find('input:checkbox');//获取委托元素
				$('.cb_s_goods').on('change', $inputchecked, function() {
				    var $inputs = $('.item_form').find('input:checkbox'); //放内部
				    if ($('.item_form').find('input:checked').length == $inputs.size()) {
				        $('.jdcheckbox').prop('checked', true);
				    } else {
				        $('.jdcheckbox').prop('checked', false);
				    }
				    totalprice();
				});
					
			   	function totalprice() {//计算总价
				    var total = 0;
				    var countnum = 0;
				    $('.item_form').each(function() {
				        if ($(this).find('input:checkbox').is(':checked')) {
				            total += parseFloat($(this).find('.p_sum strong em').html());
				            countnum += parseInt($(this).find('#buy_num').val());
				        }
				    });
				    $('#cartTotal').html( total.toFixed(2));
				    $('#sunm').html(countnum);
				} 
				$('.cb_s_goods').on('click',function(){
					//获取数量
					var $number = Number($(this).parents('.p_checkbox').siblings('.p_quantity').find('#buy_num').val())
					console.log($number)
					//获取单行总价
					var $danjia =  Number($(this).parents('.p_checkbox').siblings('.p_prices').find('.p_prices2').html().replace(/[^0-9]/ig,""));
					console.log($danjia)
					var $zongjia = $number * $danjia;   //一行
					console.log($zongjia)
					if ($(this).is(':checked')) {
						$zongjia += $zongjia;
						$('#cartTotal').html($zongjia);
					}else{
						$zongjia -= $zongjia;
						$('#cartTotal').html($zongjia);
					}
					totalprice()
				})
				//点击删除
				$('.car_remove').on('click',function(){
					if ($(this).parents('.item_form').length>=1) {
						$(this).parents('.item_form').remove();
						delCookie(key)
						//confirm("确定删除")?:"";
						//强制刷新  清空
						window.location.reload();
					}
				})
				
			} else{
				$('.car_no_goods').css('display','block');
				$('#has_goods').css('display','none');
			}
		}(),
	}
})