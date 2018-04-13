jQuery(document).ready(function($) {
	/*var html = $('.shop').html();
	html+=html+=html+=html+=html;
	$('.shop').html(html);*/

	// banner 轮播
	$('.banner-wrap').zy_slide({
		auto_time: 4000,
		slide_radius: true
	});

	// 四个推荐
	recommend_four ();

	// 全棉故事 & 全棉店铺
	$('.index-story,.index-shop').zy_slide({
		auto_time: 3000
	});

	$('.notice-content').Scroll({
		line:1,
		speed:1000,
		timer:2000
	});
});

// 四个推荐
function recommend_four () {
	$('.recommend-content > .item').zy_slide({
		show_num: 4,
		auto_time: 1800,
		slide_hover_stop: true
	});

	$('.recommend-tab .recommend-word').click(function () {
		$this = $(this);
		$('.recommend-tab>li').removeClass('cur');
		$this.parent('li').addClass('cur');

		var index = $this.parent('li').index();
		var one = -310;
		go(index*one);
	});

	function go (top) {
		$('.recommend-content').filter(':not(:animated)').animate({
			top: top+'px'
		});
	}	
}

// 输入框placeholder兼容IE低版本
$(function(){
	if(!placeholderSupport()){   // 判断浏览器是否支持 placeholder
	    $('[placeholder]').focus(function() {
	        var input = $(this);
	        if (input.val() == input.attr('placeholder')) {
	            input.val('');
	            input.removeClass('placeholder');
	        }
	    }).blur(function() {
	        var input = $(this);
	        if (input.val() == '' || input.val() == input.attr('placeholder')) {
	            input.addClass('placeholder');
	            input.val(input.attr('placeholder'));
	        }
	    }).blur();
	};
});
function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
}

// 
function function_name (argument) {
	
}