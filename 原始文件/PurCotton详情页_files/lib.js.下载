var libjs = {};

libjs.to_top = function (obj,speed) {
	$(obj).click(function () {
		$('body,html').animate({scrollTop:0}, speed);
	});
};

libjs.top_hide = function (obj,show_height) {
	var top = $(document).scrollTop();

	if (top > show_height) {
		$(obj).show();
	}else {
		$(obj).hide();
	}
};

libjs.lazy = function (obj) {
	$(obj + ' img').each(function(){
		_this = $(this);
		if(_this.attr('data-original') != undefined){
			var temp = _this.attr('data-original')+"?zyv="+Date.parse(new Date());
			
			_this.addClass('imgLazy');
			_this.attr({'data-original':temp});
		}
	});
	$('.imgLazy').lazyload({
		threshold : 0,
		effect : "fadeIn"
	});
};

libjs.go_to = function (obj_id) {
	var floor = $(obj_id).offset().top;
	$('body,html').animate({scrollTop:floor}, 500);
}

libjs.right_bar = function (obj,show_height,margin_t,margin_l) {
	$obj  = $(obj);
	$right_img = $obj.children('.img-nav');
	var img_w = parseFloat($right_img.css('width'));
	var img_h = parseFloat($right_img.css('height'));

	$obj.css({
		width: img_w + 'px',
		height: img_h + 'px',
		display: 'none',
		zIndex: '100',
		position: 'fixed',
		left: '50%',
		top: '50%',
		marginTop: margin_t + 'px',
		marginLeft: margin_l + 'px'
	});

	$obj.find('area[href^="#F"],a[href^="#F"]').each(function () {
		$(this).click(function (event) {
			$this = $(this);
			var temp = $this.attr('href');
			var floor = $(temp).offset().top-110;
			event.preventDefault();
			$('body,html').animate({scrollTop:floor}, 500);
		});
	});

	var top = $(document).scrollTop();
	if (top > show_height) {
		$obj.show();
	}else {
		$obj.hide();
	}

	$(window).scroll(function(event){
		libjs.top_hide ($obj,show_height);
	});
}

// 弹框
;(function($){
	$.fn.popup = function (options) {
		$.fn.popup.defaults = {
			title: '信息',
			content: '来自网页的提示',
			btn: true,
			ok: '确定'
		};
		var opts = $.extend({},$.fn.popup.defaults,options);
		var __this = $(this);

		return this.each(function () {
			var html = '';
			var button = '';
			if (opts.btn) {
				button = '<div class="btn close">'
			}else {
				button = '<div class="btn close hide">'
			};
			html = '<div class="popup-box">'
					+	'<div class="popup-title">'
					+		opts.title
					+	'</div>'
					+	'<div class="popup-content">'
					+		'<div class="content">'
					+			opts.content
					+		'</div>'
					+		'<div class="popup-btn">'
					// +			'<div class="btn close">'
					+			button
					+				opts.ok
					+			'</div>'
					+		'</div>'
					+	'</div>'
					+	'<div class="popup-close close">x</div>'
					+'</div>'
					+'<div class="popup-mask"></div>';
			
			__this.append(html);

			__this.find('.close').click(function () {
				$(this).parents('.popup-box').hide();
				$('.popup-mask').remove();
			});
		});
	}
})(jQuery);

(function($){
    $.fn.extend({
	    Scroll:function(opt,callback){
	    	if(!opt) var opt={};
	    	var oo;
	    	var _this=this.eq(0).find("ul:first");
	    	var lineH=_this.find("li:first").height(),//23
	    	line = opt.line?parseInt(opt.line,10):parseInt(this.height()/lineH,10),
	    	speed=opt.speed?parseInt(opt.speed,10):7000, //卷动速度，数值越大，速度越慢（毫秒）
	    	timer=opt.timer?parseInt(opt.timer,10):7000; //滚动的时间间隔（毫秒）
	    	if(line==0) line=1;
	    	var upHeight = 0-line*lineH;//-总高度
		    scrollUp=function(){
			    _this.animate({
			    marginTop:upHeight // <li>的margin-top
			    },speed,function(){
				    for(i=1;i<=line;i++){
				    _this.find("li:first").appendTo(_this);
				    }
			    	_this.css({marginTop:0});
			    	}
			    );
		    };
		    var timerID = function(){
		    	oo =setInterval("scrollUp()",timer);
		    };
		   	timerID();
	    _this.hover(function(){
		    clearInterval(oo);
		    },function(){
				timerID();
		    }).mouseout(function(){
		    	
		    });
	    }
    });
})(jQuery);