<?php

header('Access-Control-Allow-Origin: *');//跨域

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $phone = $_REQUEST["phone"];
    $password = $_REQUEST["password"];
//1.连接数据量 ,ip地址、用户名 、密码、 库名称
    $serverName = '127.0.0.1';// 数据库的名称 ip地址
    $dbUser = 'root';//用户名
    $dbPwd = '12345678';//密码
    $dbName = 'test';//库名称

    $conn = new mysqli($serverName, $dbUser, $dbPwd, $dbName); //创建连接对象
//mysqli_query($conn, "set names utf8");//给的$conn的字符串设置字符集
// -> 相当于 js的 .  点属性
    if($conn->connect_error){
        $arr = array();
        $arr["status"] = 0;
        $arr["msg"] = "连接数据库失败";
        print_r(json_encode($arr));//就以json的方式告诉客户端（前端）
    }
//执行sql语句
    $sql = "select * from user where phone='$phone' and password='$password'";  //  WHERE username='".$uname."' AND upwd='".$upwd."'
    $result = $conn->query($sql);//返回一个对象 query 查询
	if(mysqli_fetch_array($result)){
		echo 'true';
	}else{
		echo 'false';
	}

    $conn->close();
}