<?php
/**
   * Created by PhpStorm.
   * User: Administrator
   * Date: 2017/9/6
   * Time: 15:19
   */
//跨域
header('Access-Control-Allow-Origin: *');//跨域
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $phone = $_REQUEST["phone"];
    $password = $_REQUEST["password"];
    //1.创建连接
    $dbServer = '127.0.0.1';
    $dbUser = 'root';
    $dbPwd = '12345678';
    $DataBase = 'test';
    //1.1 创建连接的对象
    $connection = new mysqli($dbServer, $dbUser, $dbPwd, $DataBase);
    //2. 设置连接字符集
    mysqli_query($connection, "set names utf8");
    //3.判断是否链接成功
    if($connection->connect_error){
        $arrError = array("status" => 0, "msg" => "连接失败"); //关联数组
        print_r(json_encode($arrError));        //    $arrError["status"]=0;
//        print_r(json_encode(array("status" => 0, "msg" => "连接失败")));
    } else {
        //4.准备一条sql语句
        
        //5.执行sql语句，并返回结果

//      $result = $connection->query($sql);
        $flag="select * from user where phone='$phone'";
        $result = $connection->query($flag);
//      print_r(mysqli_fetch_array($result));
        if(mysqli_fetch_array($result)){
        	echo 'true';	//有重复
        }else{
        	echo 'false';
        	$sql = "INSERT INTO user (phone,password)
                        VALUES('" . $phone . "','" . $password ."')";
        	$result = $connection->query($sql);
        }
    }
    //6.关闭数据库连接
    $connection->close();
}else{
    $arrError = array("status" => 0, "msg" => "请使用post"); //关联数组
    print_r(json_encode($arrError));
}
?>





