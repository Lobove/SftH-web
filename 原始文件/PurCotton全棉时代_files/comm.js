jQuery(document).ready(function($) {
	// 懒加载
	libjs.lazy('.zymain');
	// 返回顶部
	libjs.to_top ('.to-top',500);
	// 固定右侧工具栏
	libjs.top_hide($('.fixedtool'),500);
	// 公共头部显示隐藏
	top_nav ();

	// 新版pc底部copyright改成“深圳前海全棉时代电子商务有限公司”
	$('.comm-footer-bottom .copyright').text('粤ICP备13084779号-2 Copyright ©2002-2017 深圳前海全棉时代电子商务有限公司 版权所有');

	/*$('.list-comm .time-discount').each(function () {
		$this = $(this);
		if(!$this.hasClass('hide')) {
			$this.parent('.bottom-tip').addClass('bottom-tip-show');
		}
	});*/

	// 新版logo
	$('.logo-search .logo img').css({width:'448px',height:'36px'});
});

$(window).scroll(function () {
	// 公共头部显示隐藏
	top_nav ();
	// 右侧边栏
	libjs.top_hide($('.fixedtool'),500);
});

// 公共头部显示隐藏
function top_nav () {
	var top = $(this).scrollTop();

	var $li = $('.first-menu-wrap>li');
	var $logo = $('.logo2');
	var $wrap = $('.first-menu-wrap');
	var $top_bar =$('.top-bar');
	var $nav_bar =$('.nav-bar');
	var $search = $('.search-bar');

	if (top > 280) {
		$li.css({
			margin: '0 14px'
		},800);
		$logo.addClass('logo-show');
		$nav_bar.css({
			marginLeft: '-52px'
		});
		$wrap.css({
			textAlign: 'center'
		});
		$top_bar.css({
			marginTop: '-94px'
		});
		$search.css({
			top: '120px'
		});
	}else {
		$li.css({
			margin: '0 30px'
		},800);
		$logo.removeClass('logo-show');
		$nav_bar.css({
			marginLeft: '0'
		});
		$wrap.css({
			textAlign: 'center'
		});
		$top_bar.css({
			marginTop: '0'
		});
		$search.css({
			top: '36px'
		});
	}
};

function alertBox(content){
	var alert_box, mask_div;
	if(document.getElementById("alert-box")){
		alert_box = $$("alert-box");
		mask_div = $$("mask-div");
		var alert_content = $$("alert-content");
		alert_content.html(content);
		alert_box.show();
		mask_div.show();
	}else{
		var defaultTitle = "网页提示",
		str = "<div class=\"alert-box\" id=\"alert-box\">";
		str += "<div class=\"alert-title\">";
		str += "<span>" + defaultTitle + "</span>";
		str += "<a id=\"al_close\" href=\"javascript:void(0);\"></a>";
		str += "</div><div class=\"alert-body\"><div id=\"alert-content\" class=\"alert-content\">";
		str += content + "</div><div class=\"alert-btn\">";
		str += "<a id=\"al_ensure\" href=\"javascript:void(0);\" >确定</a>";
		str += "</div></div></div>";
		if(document.getElementById("mask-div"))
			$$("mask-div").show();
		else
			str += "<div class=\"mask-div\" id=\"mask-div\"></div>";
		$("body").append(str);
		alert_box = $$("alert-box");
		mask_div = $$("mask-div");
	}
	
	var ensureBtn2 = $$("al_ensure"), closeBtn2 = $$("al_close");
	checkPosition(alert_box, mask_div);
	window.onresize = function(){
		checkPosition(alert_box, mask_div);
	};
	ensureBtn2.one("click", function(){
		alert_boxHide();
	});
	closeBtn2.one("click", function(){
		alert_boxHide();
	});
	
	function checkPosition(box, mask){
		var _w = document.documentElement.clientWidth,
			_h = document.documentElement.clientHeight;
		box.css({
			left : (_w - box.width()) / 2 + "px",
			top : (_h - box.height()) / 2 + "px"
		});
		mask.css({
			width : _w + "px",
			height : _h + "px"
		});
	};
	

	function alert_boxHide(){
		alert_box.hide();
		mask_div.hide();
	};
};

// 弹出登录框
function alert_login () {
	$('.login-popup').show();

	$('.close-login-popup').click(function () {
		$this = $(this);
		// $this.parents('.popup-box').siblings('.popup-mask').remove();
		$this.parents('.login-popup').hide();
	});
}

// sibel券
function coupons_sibel(schemeNo){
	$.ajax({
		url: 'http://www.purcotton.com/mall/myCoupons/getReceiveVoucher.ihtml?voucherType='+schemeNo,
		type:'POST',
		dataType:"json",
		success: function(result){
			var data = result.data;
			var check = result.success;
			if (check) {
				//领取成功
				layer.msg('优惠券已领取成功~', function(){});
			}
			else {
				if(data == "noLogin") {
					//未登录
					alert_login ();
				}
				else if(data == "null") {
					//优惠券方案号没传
					layer.msg('领券数据异常~', function(){});
				}
				else if(data == "already") {
					//相同的方案优惠券领取过了
					layer.msg('您已经领取了~', function(){});
				}
				else if(data == "failed") {
					//领取异常，请稍后再试或联系在线客服
					layer.msg('领取失败，请稍后再试或联系在线客服~', function(){});
				}
				else {
					//领取失败，请稍后再试
					layer.msg('领取失败，请稍后再试或联系在线客服~', function(){});
				}
			}
		}
	});
}

// 官网券
function coupons_guanwang (schemeNo) {
	$.ajax({
		url:'http://www.purcotton.com/mall/myCoupons/coupon_online.ihtml?schemeNo='+schemeNo+'&url='+window.location.href,
		type:'POST',
		dataType:"json",
		success: function(result){
			if(result=='3'){
				alert_login ();
			}else if(result=='0'){
				layer.msg('该活动已结束~', function(){});
			}else if(result=='1'){
				layer.msg('优惠券已领取成功~', function(){});
			}else if(result=='2'){
				layer.msg('优惠券已领完~', function(){});
			}else if(result=='-1'){
				layer.msg('领券数据异常~', function(){});
			}else if(result=='5'){
				layer.msg('您已经领取了~', function(){});
			}else{
				layer.msg('领取失败~', function(){});
			}
		}
	});
}