//添加cookie的函数
		function addCookie(key,value,day){
			var date=new Date();//创建日期对象
			date.setDate(date.getDate()+day);//过期时间：获取当前的日期+天数，设置给date
			document.cookie=key+'='+encodeURI(value)+';expires='+date;//添加cookie，设置过期时间
		}
//得到cookie
		function getCookie(key){
			var str=decodeURI(document.cookie);
			var arr=str.split('; ');
			for(var i=0;i<arr.length;i++){
				var arr1=arr[i].split('=');
 				if(arr1[0]==key){
					return arr1[1];
				}
			}
		}
//删除cookie
		
		function delCookie(key,value){
			addCookie(key,value,-1);//添加的函数,将时间设置为过去时间
		}
//获取所有cookie
		function getCookieAll() {
		    var result = {};
		    var str = document.cookie; // 1  aaa=bbb;ccc=ddd    2.  aaa=ccc
		
		    if (str.indexOf(";") != -1) {
		        //2+
		        var doubleArr = str.split(";");  // [aaa=bbb,ccc=ddd]
		        for (var i = 0; i < doubleArr.length; i++) {
		            if (doubleArr[i].indexOf("=") != -1) {
		                var arr = doubleArr[i].split("=");  // [aaa,bbb]  [ccc,ddd]
		                result[decodeURIComponent(arr[0].trim())] = decodeURIComponent(arr[1]);
		            }
		        }
		    } else {
		        // 1    aaa=ccc
		        if (str.indexOf("=") != -1) {
		            var arr = str.split("=");
		            result[decodeURIComponent(arr[0])] = decodeURIComponent(arr[1]);
		        }
		    }
		    return result;
		}