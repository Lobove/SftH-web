<?php
require_once("../../init.php");
//轮播 图片
function getCarousel(){
global $conn;
$sql="SELECT * FROM sh_index_carousel";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,1);
echo json_encode($rows);
}
//getCarousel();
//首页列表
function get_index_products(){
	global $conn;
	$output=[
	      //nmian=>[暖棉]
		//children=>[婴童],
		//women=>[女士]
		//home=>[家居]
		//men=>[男士]

	];
	$sql="SELECT * FROM sh_product WHERE fid=1 AND is_onsale='1' ORDER BY sales DESC LIMIT 0,6";
	$result=mysqli_query($conn,$sql);
	$products=mysqli_fetch_all($result,1);
	$output["nmian"]=$products;

	$sql="SELECT * FROM sh_product WHERE fid=1 AND is_onsale='1' ORDER BY view_count DESC LIMIT 0,6";
	$result=mysqli_query($conn,$sql);
	$products=mysqli_fetch_all($result,1);
	$output["children"]=$products;

	$sql="SELECT * FROM sh_product WHERE fid=2 AND is_onsale='1' ORDER BY sales DESC LIMIT 0,6";
	$result=mysqli_query($conn,$sql);
	$products=mysqli_fetch_all($result,1);
	$output["women"]=$products;

	$sql="SELECT * FROM sh_product WHERE fid=3 AND is_onsale='1' ORDER BY sales DESC LIMIT 0,6";
	$result=mysqli_query($conn,$sql);
	$products=mysqli_fetch_all($result,1);
	$output["home"]=$products;

	$sql="SELECT * FROM sh_product WHERE fid=4 AND is_onsale='1' ORDER BY sales DESC LIMIT 0,6";
	$result=mysqli_query($conn,$sql);
	$products=mysqli_fetch_all($result,1);
	$output["men"]=$products;

	echo json_encode($output);
}

//商品列表
function getProductsByKw(){
	global $conn;
	$output=[
		"count"=>0,//总个数
		"pageSize"=>16,//每页16个
		"pageCount"=>0,//总页数
		"pageNo"=>1,//现在第几页
		"data"=>[],//商品列表
		"poster"=>[]
	];
	@$pno=(int)$_REQUEST["pno"];
	@$fid=$_REQUEST["fid"];
	@$style=$_REQUEST["style"];
	if($pno) $output["pageNo"]=$pno;
	@$kw=$_REQUEST["kw"];
	$sql="SELECT lid,fid,price,title,href,pic FROM sh_product ";
	if($fid){
        $sql.=" WHERE fid=$fid ";
    }else{
        $fid=1;
    }
    if($style){
    	$sql.=" AND style LIKE '%$style%' ";
    }
    if($kw){
    	$kws=explode(" ",$kw);
    	for($i=0;$i<count($kws);$i++){
    	    $kws[$i]=" title LIKE '%".$kws[$i]."%' ";
    	}
    		$sql.=" WHERE ".implode(" AND ",$kws);
    }
	$result=mysqli_query($conn,$sql);
	if(mysqli_error($conn)){
             echo mysqli_error($conn);
    }
	$products=mysqli_fetch_all($result,1);
	$output["count"]=count($products);
	$output["pageCount"]=
		ceil($output["count"]/$output["pageSize"]);
	//$sql.= limit pageNo*pageSize,pageSize
	$sql.=" LIMIT ".
				(($output["pageNo"]-1)*$output["pageSize"]).
		    ",".
				$output["pageSize"];
	$result=mysqli_query($conn,$sql);
	$output["data"]=mysqli_fetch_all($result,1);
	$sql="SELECT fname,poster FROM  sh_family WHERE fid=$fid";
	$result=mysqli_query($conn,$sql);
	$output["poster"]=mysqli_fetch_assoc($result);
	echo json_encode($output);
}
//getProductsByKw();


//详情页
function getProductById(){
	global $conn;
	@$lid=$_REQUEST["lid"];
	@$num=$_REQUEST["num"];
	if(!$num){
     $num = 0;
    }else{
     $num = intval($_REQUEST["num"]);
    }
    $num=$num*5;
	$output=[
		//"product"=>[
			//lid,
			//title,
			//fid,
			//price,
			//promise,
			//md
		//],
		//"spec"=>[spec1,spec2,...],
		//"size"=>[size1,size2,...],
		//"imgs"=>[sm1,sm2,sm3,...],
        //"pic"=>[]详情图片
	];
	if($lid){
		$sql="SELECT lid,fid,title,subtitle,price,promise,spec,size1,inventory,sales FROM sh_product WHERE lid=$lid";
	   if(mysqli_error($conn)){
         echo mysqli_error($conn);
       }
		$result=mysqli_query($conn,$sql);
		$output["product"]=mysqli_fetch_all($result,1)[0];
		$fid=$output["product"]["fid"];
        $output["spec"]=explode("，",$output["product"]["spec"]);
        $output["size"]=explode("，",$output["product"]["size1"]);
		$sql="SELECT sm,md,lg FROM sh_product_pic WHERE lid=$lid LIMIT $num,5";
		$result=mysqli_query($conn,$sql);
		$output["imgs"]=mysqli_fetch_all($result,1);
		$sql="SELECT pic FROM sh_product_details_pic WHERE lid=$lid";
        $result=mysqli_query($conn,$sql);
        $pic=mysqli_fetch_row($result);
		$output["pic"]=explode("，",$pic[0]);
		echo json_encode($output);
	}
}
//getProductById();
//搜索帮助
function searchHelper(){
	global $conn;
	@$kw=$_REQUEST["term"];
	$sql="SELECT lid,title,sales FROM sh_product ";
	if($kw){
		$kws=explode(" ",$kw);
		for($i=0;$i<count($kws);$i++){
			$kws[$i]=" title LIKE '%".$kws[$i]."%' ";
		}
		$sql.=" WHERE ".implode(" AND ",$kws);
	}
	$sql.=" ORDER BY sales DESC LIMIT 10";
	$result=mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
}