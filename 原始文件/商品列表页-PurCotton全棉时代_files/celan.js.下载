// 将浏览地址写入redis
$(document).ready(function(e) {
	//获取当前浏览url
    var url=document.URL;
//    var url="http://localhost:8080/ECW-Mall/mall/commodity/getCommodityDetail.ihtml?prodNo=800-000278";
//    alert(url);
//    alert('oprtCatNo='.indexOf(url));
    if(url.indexOf('?prodNo=')!=-1){
    	jump(url);
    }
//    if(url.indexOf('oprtCatNo=')>-1){
//    	jump(url);
//    }
//    alert(url.indexOf('purcotton.com/detail/'));
    if(url.indexOf('purcotton.com/detail/')!=-1){ 	 
    	jump(url);
    }
});

function jump(url)
{	
//	alert("进来jump了");
	var url2=MallPath+'/mall/commodity/liulanSet.ihtml?d_url='+url;
//	alert(url2);
	var params={};
	$.ajax({  
	  type: "post",
	  dataType: "json",
	  url: url2,
	  data: params,
	  success: function(secces){}
	})
}

//用户中心
function toLogin()
{	
	window.open(MallPath+"/mall/member/myIndex.ihtml");
}

//返回顶部
function toTop()
{	
	$('body,html').animate({scrollTop:0},500); 
}


//查看购物车
function showCart()
{	
//	alert("查看购物车");
	var url2=MallPath+'/mall/cart/showcart2.ihtml';
	var params={};
	$.ajax({
		  type: "post",
		  dataType: "json",
		  url: url2,
		  data: params,
		  success: function(secces){
			  if(secces!=null && secces!=''){
//				  alert("请求成功");
				  var obj=secces.data;
//				  alert(obj);
				  var alldetail=[];
                  if(obj!=null){
                	    if(obj=="0"){
                	    	$("#cbcartNum").html("0");
    			    		$("#cbcartNum").show();
    			    		$("#cartDetail").html("");
			    			$("#cartDetail").show();
//                	    	 alert("用户没有登录");
                       	  $('.login-register').show();
           					var loginRegister = $(".login-register"),
           					    left,
           					    top,
           					    clientWidth,
           					    clientHeight,
           					    scrollTop,
           					    loginWidth;
           						clientWidth = $(window).width();
           						clientHeight = $(window).height();
           						loginWidth = parseInt(loginRegister.width());
           						left = (clientWidth - loginWidth)/2;
           														
           						loginRegister.css({
           							"position": "absolute",
           							top: $(window).scrollTop()+50,
           							left: left
           						}).show();    
           				         return;
                	    }
                	    $("#id1").css('visibility','visible');
                	    $("#id2").css('visibility','visible');
                	    $("#id3").css('visibility','visible');
						alldetail=obj;
						var item1="";
						var item2="";
						var item3="";
						var item4="";
						var str="";
						var item5=alldetail.length/4;
//						alert(item5);
						$("#cbcartNum").html(item5);
			    		$("#cbcartNum").show();
			    		if(alldetail.length>=44){
			    		   var	length=alldetail.length-44;
			    		}
			    		else{
			    			var	length=-1;
			    		}
						for (var i=alldetail.length-4;i>length;i=i-4){
//							alert("进来for循环了");
//							alert("alldetail");
							if(alldetail!=null){
//								alert("进来if判断了");
								//货品名
								item1=alldetail[i];
//								alert(item1);
								//图片地址
						        item2=alldetail[i+1];
//                                alert(item2);
                                //物料号
						        item3="'"+alldetail[i+2]+"'";
						        var wl=alldetail[i+2].substring(alldetail[i+2].length-3,alldetail[i+2].length); 
						        //价格
						        item4=alldetail[i+3];
//						        alert(item4);
                                str=str+'<div class="tm-mcOrder"><div class="tm-mcItem"><a class="tm-mcPic" href="https://www.purcotton.com/detail/'+wl+'/'+alldetail[i+2]+'.html"  target="_blank"> <img height="70" width="70" src="https://res.purcotton.com//'+item2+'"></a></div><div class="tm-mcTxt"><div class="tm-mcSku"><p>'+item1+'</p></div><div class="tm-mcCost"><a href="javascript:void(0)" class="tm-mcDel" title="删除" data-tmc="del"></a><strong class="tm-mcPrice"><em>￥</em>'+item4+'</strong></div></div><div class="tm-mcOrder-del" onClick="del_cart('+item3+')"></div></div>';
//						        alert(str);
						        $("#cartDetail").html(str);
				    			$("#cartDetail").show();
							}else{
								var item5="0";
								$("#cbcartNum").html(item5);
					    		$("#cbcartNum").show();
								$("#id2").css('visibility','hidden');
								$("#id1").css('visibility','hidden');
								$("#id3").css('visibility','hidden');
							}
						}
                  
                  }else{
                	  var item5="0";
					  $("#cbcartNum").html(item5);
			    	  $("#cbcartNum").show();
                	  $("#id2").css('visibility','hidden');
					  $("#id1").css('visibility','hidden');
                	  $("#id3").css('visibility','hidden');
                  }
				  
			  }
		  
		  }
		  });
	
	var levelurl=MallPath+'/mall/cart/getMemberDiscountLevel.ihtml';
    var levelparams={};
    $.ajax({
          type: "post",
          dataType: "json",
          url: levelurl,
          data: levelparams,
          success: function(success){
              if(success!=null && success!=''){
                  var obj=success.data; 
                  if(obj!=null){
                      $("#memberDiscountLevel").val(obj[1] + "未参加活动商品可享受<strong>" + obj[0] + "折</strong>优惠");
                  }
              }
          }
          });
}

function deleteLiulan()
{
	confirmBox("提示", "确定要删除该商品吗？",
		     {"ensure_func" : function(){
//	alert("删除浏览记录");
	var url2=MallPath+'/mall/commodity/liulanSetNull.ihtml';
	$.ajax({
		  type: "post",
		  dataType: "json",
		  url: url2,
		  success: function(secces){
			  if(secces!=null && secces!=''){
				  var obj=secces.data;
//				  alert(obj);
				  var alldetail=[];
                  if(obj!=null){
                	    if(obj=="ok"){
                	    	showLiulan();
                	    }else{
                	    	$("#idd4").html("");
			    			$("#idd4").show();
			    			$("#liulan").css('visibility','hidden');
			    			$("#idd3").css('visibility','hidden');
//                	    	 alert("用户没有登录");
                       	    $('.login-register').show();
           					var loginRegister = $(".login-register"),
           					    left,
           					    top,
           					    clientWidth,
           					    clientHeight,
           					    scrollTop,
           					    loginWidth;
           						clientWidth = $(window).width();
           						clientHeight = $(window).height();
           						loginWidth = parseInt(loginRegister.width());
           						left = (clientWidth - loginWidth)/2;
           														
           						loginRegister.css({
           							"position": "absolute",
           							top: $(window).scrollTop()+50,
           							left: left
           						}).show();    
           				         return;
                	    }
                  }else{
                	  $("#idd4").html("");
		    			$("#idd4").show();
		    			$("#liulan").css('visibility','hidden');
		    			$("#idd3").css('visibility','hidden');
//          	    	 alert("用户没有登录");
                 	    $('.login-register').show();
     					var loginRegister = $(".login-register"),
     					    left,
     					    top,
     					    clientWidth,
     					    clientHeight,
     					    scrollTop,
     					    loginWidth;
     						clientWidth = $(window).width();
     						clientHeight = $(window).height();
     						loginWidth = parseInt(loginRegister.width());
     						left = (clientWidth - loginWidth)/2;
     														
     						loginRegister.css({
     							"position": "absolute",
     							top: $(window).scrollTop()+50,
     							left: left
     						}).show();    
     				         return;
          	      
                  }
				  
			  }
		  
		  }
		  });
	
		     }
		     })
	
}




//查看我的浏览记录
function showLiulan()
{	
//	alert("查看浏览记录");
	var url2=MallPath+'/mall/commodity/liulanget.ihtml';
	var params={};
	$.ajax({
		  type: "post",
		  dataType: "json",
		  url: url2,
		  data: params,
		  success: function(secces){
			  if(secces!=null && secces!=''){
//				  alert("请求成功");
				  var obj=secces.data;
//				  alert(obj);
				  var alldetail=[];
                  if(obj!=null){
                	    if(obj=="no"){
    			    		$("#idd4").html("");
			    			$("#idd4").show();
			    			$("#liulan").css('visibility','hidden');
			    			$("#idd3").css('visibility','hidden');
//                	    	 alert("用户没有登录");
                       	    $('.login-register').show();
           					var loginRegister = $(".login-register"),
           					    left,
           					    top,
           					    clientWidth,
           					    clientHeight,
           					    scrollTop,
           					    loginWidth;
           						clientWidth = $(window).width();
           						clientHeight = $(window).height();
           						loginWidth = parseInt(loginRegister.width());
           						left = (clientWidth - loginWidth)/2;
           														
           						loginRegister.css({
           							"position": "absolute",
           							top: $(window).scrollTop()+50,
           							left: left
           						}).show();    
           				         return;
                	    }
                	    $("#liulan").css('visibility','visible');
		    			$("#idd3").css('visibility','hidden');
						alldetail=obj;
						var item1="";
						var item2="";
						var item3="";
						var item4="";
						var str="";
//						var item5=alldetail.length/4;
//						alert(item5);
//						$("#cbcartNum").html(item5);
//			    		$("#cbcartNum").show();
			    		if(alldetail.length>=80){
			    		   var	length=80;
			    		}
			    		else{
			    			var	length=alldetail.length;
			    		}
//			    		alert("length="+length);
			    		if(length<1){
			    			 $("#liulan").css('visibility','hidden');
				    		 $("#idd3").css('visibility','visible');
				    		 return;
			    		}
						for (var i=0;i<length;i=i+4){
//							alert("进来for循环了");
//							alert("alldetail");
							if(alldetail!=null){
//								alert("进来if判断了");
								//物料号
								item1="'"+alldetail[i]+"'";
								var wl=alldetail[i].substring(alldetail[i].length-3,alldetail[i].length); 
//								alert(item1);
								//市场价
						        item2=alldetail[i+1];
//                                alert(item2);
                                //图片
						        item3=alldetail[i+2];
						        //描述
						        item4=alldetail[i+3];
//						        alert(item4);
//                                str=str+'<li><a class="at-mcPic"><img height="114" width="114" src="http://res.purcotton.com//'+item3+'"><span class="at-addCar" onClick="addcart2('+item1+');">加入购物车</span></a><p class="at-txt"> <a href=http://www.purcotton.com/detail/'+wl+'/'+alldetail[i]+'.html>'+item4+'</a> </p><div class="at-mcCost"><strong class="at-mcPrice"><em>￥</em>'+item2+'</strong></div></li>';
                                str=str+'<li><a class="at-mcPic" href=https://www.purcotton.com/detail/'+wl+'/'+alldetail[i]+'.html target="_blank"><img height="114" width="114" src="https://res.purcotton.com//'+item3+'"></a><p class="at-txt"> <a href=https://www.purcotton.com/detail/'+wl+'/'+alldetail[i]+'.html target="_blank">'+item4+'</a> </p><div class="at-mcCost"><strong class="at-mcPrice"><em>￥</em>'+item2+'</strong></div></li>';
//                                alert("---"+str+"---");
						        $("#idd4").html(str);
				    			$("#idd4").show();
							}else{
//								alert("没浏览记录");
								$("#liulan").css('visibility','hidden');
				    			$("#idd3").css('visibility','visible');
							}
						}
                  
                  }else{
//                	    alert("没浏览记录");
                	    $("#liulan").css('visibility','hidden');
		    			$("#idd3").css('visibility','visible');
                  }
				  
			  }
		  
		  }
		  });
}

//查看收藏
function shouCang()
{	
//	alert("关注");
	var url2=MallPath+'/mall/member/myCollect2.ihtml';
	var params={};
	$.ajax({
		  type: "post",
		  dataType: "json",
		  url: url2,
		  data: params,
		  success: function(secces){
				if(secces!=null && secces!=''){
					var obj=secces.data;
					var alldetail=[];
                    if(obj!=null){                 	
						alldetail=obj;
						if(alldetail==null||alldetail==""){
	                    	$("#guanzhu").css('visibility','hidden');
						  }
//						alert(alldetail);
						var item1="";
						var item2="";
						var item3="";
						var item4="";
						var str="";
						for (var i=39;i>-1;i=i-4){
							if(alldetail[i]!=null){
								item1="'"+alldetail[i-3]+"'";
								var wl=alldetail[i-3].substring(alldetail[i-3].length-3,alldetail[i-3].length);
						        item2=alldetail[i-2];
						        item3=alldetail[i-1];
						        item4=alldetail[i];
//						        str=str+'<li><a class="at-mcPic"><img height="114" width="114" src="http://res.purcotton.com//'+item4+'"><span class="at-addCar" onClick="addcart2('+item1+');">加入购物车</span></a><p class="at-txt"> <a target="_blank" href=http://www.purcotton.com/detail/'+wl+'/'+alldetail[i-3]+'.html>'+item2+'</a> </p><div class="at-mcCost"><strong class="at-mcPrice"><em>￥</em>'+item3+'</strong></div></li>';
						        str=str+'<li><a class="at-mcPic"  href=https://www.purcotton.com/detail/'+wl+'/'+alldetail[i-3]+'.html  target="_blank"><img height="114" width="114" src="https://res.purcotton.com//'+item4+'"></a><p class="at-txt"> <a target="_blank" href=https://www.purcotton.com/detail/'+wl+'/'+alldetail[i-3]+'.html>'+item2+'</a> </p><div class="at-mcCost"><strong class="at-mcPrice"><em>￥</em>'+item3+'</strong></div></li>';
//						        alert(str);
						        $("#detail").html(str);
				    			$("#detail").show();
							}
						}
                    }else{
                    	$("#lookAll2").css('visibility','hidden');
        				$('.login-register').show();
        				$("#detail").html("");
			    		$("#detail").show();
        				var loginRegister = $(".login-register"),
        				    left,
        				    top,
        				    clientWidth,
        				    clientHeight,
        				    scrollTop,
        				    loginWidth;
        					clientWidth = $(window).width();
        					clientHeight = $(window).height();
        					loginWidth = parseInt(loginRegister.width());
        					left = (clientWidth - loginWidth)/2;
        													
        					loginRegister.css({
        						"position": "absolute",
        						top: $(window).scrollTop()+50,
        						left: left
        					}).show();    
        			         return;
        				}
                    
			}
	
		  }
	})
}

//资产
function ziChan(){
	var url2=MallPath+'/mall/member/memberIntegral/searchMemberIntegral2.ihtml';
	$.ajax({
		  type: "post",
		  dataType: "json",
		  url: url2,
		  success: function(secces){
				if(secces!=null && secces!=''){
					var obj=secces.data;
					var alldetail=[];
                  if(obj!=null){
//                	  $("#asset-detail").style.display="inline";
						alldetail=obj;
						var item1=alldetail[0];
						var str="";
						str=item1;
						$("#jifen").html(str);
						$("#jifen").show();
                  }else{
              	   // alert("我的资产未登录");
                	  $("#iddd1").css('display', 'none');
                	  $("#idd1").css('visibility', 'hidden');
                	  $("#idd2").css('visibility', 'hidden');
                	  $("#lookAll").css('visibility', 'hidden');
                	  $("#cardDetail1").html("");
					  $("#cardDetail1").show();
					  $("#otherCard").html("");
					  $("#otherCard").show();
					  $('.login-register').show();
						var loginRegister = $(".login-register"),
						    left,
						    top,
						    clientWidth,
						    clientHeight,
						    scrollTop,
						    loginWidth;
							clientWidth = $(window).width();
							clientHeight = $(window).height();
							loginWidth = parseInt(loginRegister.width());
							left = (clientWidth - loginWidth)/2;
															
							loginRegister.css({
								"position": "absolute",
								top: $(window).scrollTop()+50,
								left: left
							}).show();    
					         return;
				  }
			} 
		  }
	});
    var url2=MallPath+'/mall/member/memberBalance/searchMemberBalance2.ihtml';
     $.ajax({
			  type: "post",
			  dataType: "json",
			  url: url2,
			  success: function(secces){
					if(secces!=null && secces!=''){
						var obj=secces.data;
						var alldetail=[];
						var str="";
	                  if(obj!=null){                 	
							alldetail=obj;
							var item2=alldetail[0];
							str='<em>￥</em>'+item2;
	                  }else{
	                	  str=0;
	                  }
	                  $("#money").html(str);
					  $("#money").show();
					  }
	                  
				} 
		
		});
     
     var url3=MallPath+'/mall/myCoupons/queryCoupones2.ihtml';
     $.ajax({
			  type: "post",
			  dataType: "json",
			  url: url3,
			  success: function(secces){
					if(secces!=null && secces!=''){
						var obj=secces.data;
//						alert(obj);
						var alldetail=[];
						var arrData = secces.data[2];
//						alert(arrData[1]);
						var str="";
						var str2='';//存放即将过期优惠劵
						var str3="";//存放其他优惠劵信息
						if(obj!=null){   
							alldetail=obj;
							var item3=alldetail[0];
							str=item3;
							//将即将过期优惠劵取出来
							var item4=secces.data[1];
//							alert(item4);
							//将优惠劵信息取出来
							var item5=secces.data[2];
//							alert(item5);
							if(item4==null&&item5==null){
//								alert("两个都为空");
                            	$("#id4").css('display', 'block');
                            }else{
                            	$("#id4").css('display', 'none');
                            }
//							alert("两个都为空2");
                            if(item4!=null){
//                            	alert("两个都为空3");
                              $("#title1").css('display', 'block');
                              for(var i=0;i<8;i=i+4){
                            	 if(item4[i]!=null){
							       str2=str2+'<li class="tl-coupon s-current"><div class="s-quota"><p class="s-desc"><span>1天后</span><span>过期</span></p><span class="s-num">￥<em>'+item4[i+3]+'</em></span></div><div class="s-info"><p class="s-text">'+item4[i]+'</p><p class="s-time">有效期：<em>'+item4[i+1]+' - '+item4[i+2]+'</em></p></div></li>';
//							       alert(str2);
                            	 }
                             }
                            }
                            else{
//                            	alert("jinlai");
                            	$("#title1").css('display', 'none');
                            	str2=str2+"";
                            }
                            if(item5!=null){
//                            	alert("两个都为空4");
                            	$("#title2").css('display', 'block');
                            	for(var i=0;i<16;i=i+4){
                            		if(item5[i]!=null){
//                            			alert(item5[i+1]);
                            		 str3=str3+'<li class="tl-coupon s-current"><div class="s-quota"><span class="s-num">￥<em>'+item5[i+3]+'</em></span></div><div class="s-info s-info2"><p class="s-text">'+item5[i]+'</p><p class="s-time">有效期：<em>'+item5[i+1]+' - '+item5[i+2]+'</em></p></div></li>';
                            		  }
                            		}
                            }
                            else{
                            	 $("#title2").css('display', 'none');
       	                	     str3=str3+"";
                            }
                            
	                  }else{//没有获取到优惠劵信息
	                	  str='0';
	                	  $("#title1").css('display', 'none');
                      	  str2=str2+"";
                      	  $("#title2").css('display', 'none');
                      	  str3=str3+"";
	                  }
//					}else{//没有获取到优惠劵信息
//	                	  str='0';
//	                	  $("#title1").css('visibility','hidden');
//                      	  str2="";
//                      	  $("#title2").css('visibility','hidden');
//	                	  str3="";
//	                  }
	                  $("#card").html(str);
					  $("#card").show();
					  $("#cardDetail1").html(str2);
					  $("#cardDetail1").show();
					  $("#otherCard").html(str3);
					  $("#otherCard").show();
					}
					}
		});
}


function kf_openChatWindow(flag, wpadomain, kfguin)
{
    var crm_id = null;
	var purl = window.location.href.replace(MallPath,'');
	//window.open('http://'+wpadomain+'.qq.com/webc.htm?new=0&sid='+kfguin+'&eid='+eid+'&o=&q=7&ref='+document.location, '_blank', 'height=544, width=644,toolbar=no,scrollbars=no,menubar=no,status=no');
	//window.open('http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODA0MzM3OF8yMDMyMDdfNDAwNjA4MTAwMF8yXw', '_blank', 'height=544, width=644,toolbar=no,scrollbars=no,menubar=no,status=no');
    $.ajax({
        type : "POST",
        url : MallPath + "/mall/memberLogin/checkOnlineService.ihtml?",
        async : false,
        dataType : "text",
        success : function(data) {
            crm_id = data;
        }
    });
    if(null == crm_id || '' == crm_id){
        window.location.href = MallPath+"/mall/memberLogin/toLogin.ihtml?urlPath="+purl;
    }else{
        window.open('http://58.61.145.54:9080/webchat/chat.html?c=1&jId=1&memberId='+crm_id);
    }
	
	if(flag==1)
	{
		kf_hidekfpopup();
	}
	return false;
}

//购物车删除
function del_cart(prod){
//	alert(prod);
//	alert("删除购物车商品");
	confirmBox("提示", "确定要删除该商品吗？",
		     {"ensure_func" : function(){
				 var prods="";
				 $.ajax({
						url:MallPath+"/mall/cart/del_cart.ihtml",
						data:{"prods":prods,"prod":prod},
						dataType:"json",
						cache:false,
						success:function(result){
//							alert("删除是否成功，返回数据了");
//							alert(result);
							if(typeof(result)=='object' && null!=result){
								showCart();
							}else{
								alertBox("删除失败");
							}
						},
						error:function(){
							alertBox("请求超时失败");
						}
				 });
		     }}
		    );
}

//侧边栏我的关注之将关注的商品添加到购物车
function addcart2(prodNo){
	confirmBox("添加购物车", "确定要加入购物车吗？",
     {"ensure_func" : function(){
       var url=MallPath+"/mall/cart/add_cart.ihtml?&sellType=1&prodNo="+prodNo+"&num=1";
//       alert(url);
		$.ajax({ 
				type: "POST",
			  	url: url,
				success: function(msg){
//					alert("请求了");
			    	if(msg=='success'){
			    		alertBox('您选中的商品已添加到购物车');
			    	}else{
			    		alertBox('您选中的商品添加失败');
			    	}				    	
				}
		 });
     
      }}
    );

}



		  