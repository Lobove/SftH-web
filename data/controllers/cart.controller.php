<?php
require_once("../../init.php");
function addToCart(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
//	@$uid=$_REQUEST["uid"];
	@$lid=$_REQUEST["lid"];
	@$count=$_REQUEST["count"];
	@$spec=$_REQUEST["spec"];
	@$sm=$_REQUEST["sm"];
	if($uid){
		$sql="SELECT * FROM sh_shoppingcart_item WHERE uid=$uid AND lid=$lid";
		$result=mysqli_query($conn,$sql);
		if(mysqli_error($conn)){
		   echo mysqli_error($conn);
		}
		$rows=mysqli_fetch_all($result,1);
		//如果$uid的购物车中有$product_id商品
		if(count($rows))
			$sql="UPDATE sh_shoppingcart_item SET count=count+$count WHERE uid=$uid AND lid=$lid";
		else//否则
			$sql="INSERT INTO sh_shoppingcart_item (uid,lid,count,spec,sm,is_checked) VALUES ($uid,$lid,$count,'$spec','$sm','0')";
		if(mysqli_error($conn)){
            echo mysqli_error($conn);
         }
		$result=mysqli_query($conn,$sql);
		$row=mysqli_affected_rows($conn);
		echo $row;
	}
}
//addToCart();
function countCart(){
    global $conn;
    session_start();
	@$uid=$_SESSION["uid"];
//@$uid=$_REQUEST["uid"];
	if($uid){
	$sql="SELECT count(*) from sh_shoppingcart_item WHERE uid=$uid";
     	$result=mysqli_query($conn,$sql);
     	$row = mysqli_fetch_row($result);
     	echo $row[0];
	}else{
	    echo 0;
	}
}
//countCart();
function updateCart(){
	global $conn;
	@$iid=$_REQUEST["iid"];
	@$count=$_REQUEST["count"];
	if($count==0)
		$sql="DELETE FROM sh_shoppingcart_item WHERE iid=$iid";
	else
		$sql="UPDATE sh_shoppingcart_item SET count=$count WHERE iid=$iid";
	mysqli_query($conn,$sql);
	$row=mysqli_affected_rows($conn);
    echo $row;
}
//updateCart();
function getCart(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
//@$uid=$_REQUEST["uid"];
	if($uid){
		$sql="SELECT i.iid,i.lid, i.count,i.is_checked ,i.sm,i.spec,p.title,p.price FROM sh_shoppingcart_item i ,sh_product p WHERE i.lid=p.lid AND i.uid=$uid";
		if(mysqli_error($conn)){
            echo mysqli_error($conn);
        }
		$result=mysqli_query($conn,$sql);
		echo json_encode(mysqli_fetch_all($result,1));
	}
}
//getCart();
function clearCart(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	if($uid){
		$sql="DELETE FROM sh_shoppingcart_item WHERE uid=$uid";
		mysqli_query($conn,$sql);
		$row=mysqli_affected_rows($conn);
        echo $row;
	}
}
function selectAll(){
	global $conn;
	@$chkAll=$_REQUEST["chkAll"];
	session_start();
	@$uid=$_SESSION["uid"];
	$sql="UPDATE sh_shoppingcart_item SET is_checked='$chkAll' WHERE uid=$uid";
	mysqli_query($conn,$sql);
	$row=mysqli_affected_rows($conn);
	echo $row;
}
//selectAll();
function selectOne(){
	global $conn;
	@$chkOne=$_REQUEST["chkOne"];
	@$iid=$_REQUEST["iid"];
	$sql="UPDATE sh_shoppingcart_item SET is_checked='$chkOne' WHERE iid=$iid";
	mysqli_query($conn,$sql);
	$row=mysqli_affected_rows($conn);
    echo $row;
}
//selectOne();
