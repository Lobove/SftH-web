<?php
require_once("../../init.php");
function register(){
    session_start();
	global $conn;
	@$uname=$_REQUEST["uname"];
	@$upwd=$_REQUEST["upwd"];
	@$email=$_REQUEST["email"];
	@$phone=$_REQUEST["phone"];
    @$yzm=$_REQUEST["yzm"];
    $uPattern = '/^[a-zA-Z0-9_]{3,12}$/';
    $pPattern = '/^[a-zA-Z0-9_]{3,12}$/';
    $yPattern = '/^[a-zA-Z]{4}$/';
    $ePattern='/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/i';
         if(!preg_match($uPattern,$uname)){
             echo '{"code":-2,"msg":"用户名格式不正确"}';
             exit;
         }
         if(!preg_match($pPattern,$upwd)){
             echo '{"code":-3,"msg":"密码格式不正确"}';
             exit;
         }
         if(!preg_match($ePattern,$email)){
             echo '{"code":-4,"msg":"邮箱格式不正确"}';
             exit;
         }
         if(!preg_match($yPattern,$yzm)){
             echo '{"code":-5,"msg":"验证码格式不正确"}';
             exit;
         }
//         验证用户输入的验证码是否正确
         $code=$_SESSION["code"];
         if($code!=$yzm){
              echo '{"code":-6,"msg":"验证码不正确"}';
              exit;
         }
	if($uname && $upwd){
		$sql="INSERT INTO sh_user (uid,uname,upwd,email,phone) VALUES (null,'$uname',md5('$upwd'),'$email','$phone')";
		$result=mysqli_query($conn,$sql);
		$rows=mysqli_affected_rows($conn);
		if(mysqli_error($conn)){
                   echo mysqli_error($conn);
                }
		if($rows){
		     echo '{"code":1,"msg":"注册成功"}';
		}
	}
}
function checkName(){
	global $conn;
	@$uname=$_REQUEST["uname"];//从request中获得uname
	if($uname){
		$sql="SELECT * FROM sh_user WHERE uname='$uname'";
		$result=mysqli_query($conn,$sql);//执行SQL查询
		$users=mysqli_fetch_all($result,1);
		if(count($users)!=0)//如果查询结果中有数据
			return false;//不能使用
		else//否则
			return true;//可以使用
	}
}
function login(){
    session_start();
	global $conn;
	@$uname=$_REQUEST["uname"];
	@$upwd=$_REQUEST["upwd"];
	@$yzm=$_REQUEST["yzm"];
	//验证格式
	 $uPattern = '/^[a-zA-Z0-9_]{3,12}$/';
     $pPattern = '/^[a-zA-Z0-9_]{3,12}$/';
     $yPattern = '/^[a-zA-Z]{4}$/';
     if(!preg_match($uPattern,$uname)){
         echo '{"code":-2,"msg":"用户名格式不正确"}';
         exit;
     }
     if(!preg_match($pPattern,$upwd)){
         echo '{"code":-3,"msg":"密码格式不正确"}';
         exit;
     }
     if(!preg_match($yPattern,$yzm)){

         echo '{"code":-4,"msg":"验证码格式不正确"}';
         exit;
     }
     //验证用户输入的验证码是否正确
     $code=$_SESSION["code"];
     if($code!=$yzm){
          echo '{"code":-5,"msg":"验证码不正确"}';
          exit;
     }
	$sql="SELECT * FROM sh_user WHERE uname='$uname' AND upwd=md5($upwd)";
		$result=mysqli_query($conn,$sql);
		$user=mysqli_fetch_all($result,1);
        if(mysqli_error($conn)){
          echo mysqli_error($conn);
        }
		if(count($user)!=0){
			$_SESSION["uid"]=$user[0]["uid"];
			  echo '{"code":1,"msg":"登录成功！"}';
		}else
			   echo '{"code":-1,"msg":"用户名和密码错误"}';
}

function logout(){
	session_start();
	$_SESSION["uid"]=null;
    echo(1);
}

function isLogin(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	if($uid){
		$sql=
			"select uname from sh_user where uid=$uid";
		$result=mysqli_query($conn,$sql);
		$user=mysqli_fetch_all($result,1);
		return ["ok"=>1,"uname"=>$user[0]["uname"]];
	}else
		return ["ok"=>0];
}