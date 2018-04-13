/*
show_num: 1,				轮播显示个数
slide_speed: 450,			轮播速度
autoplay: true,				是否自动轮播
auto_time: 1000,			自动轮播时间
slide_radius: false,		是否有小圆点（默认没有）
slide_hover_stop: false		轮播项hover时会不会自动停止轮播（默认不会停止）
 */
;(function($) {
	$.fn.zy_slide = function(options) {
		var defaults = {
			show_num: 1,
			slide_speed: 600,
			autoplay: true,
			auto_time: 4000,
			slide_radius: false,
			slide_hover_stop: false,
			loop: true
		};

		var args = $.extend(defaults, options);

		return $(this).each(function() {
			// 定义定时器
			var timer;
			var _this = $(this);
			if (!args.loop) {
				args.autoplay = false;
			};

			// 容器
			var $slide_container = _this.find('.zyslide-container');
			// 滑动组件
			var $slidewrap = _this.find('.zyslide-wrap');
			// 每一个滑块
			var $slide = _this.find('.zy-slide');
			// 滑块的个数
			var all_num = $slide.length;
			// 圆点wrap
			var $radius_wrap;
			// 圆点
			var $radius;
			// 切换按钮
			var $slide_button = _this.find('.slide-button');

			var slide_w = parseFloat($slide.css('width'));
			var slide_h = parseFloat($slide.css('height'));
			var margin_right = parseFloat($slide.css('marginRight'));

			var show_width = args.show_num*(slide_w+margin_right);

			var all_width = all_num*(slide_w+margin_right);
			var last_left = show_width - all_width;

			jQuery(document).ready(function($) {
				// 小圆点
				if (args.slide_radius) {
					setter_radius ();
				}

				// 开启定时器
				if (args.autoplay) {
					timer = setInterval(auto_slide, args.auto_time);
				}

				hover_stop ($slide_button);
				if (args.slide_hover_stop) {
					hover_stop ($slide);
				}
			});

			// hover时候定时执行函数停止
			var hover_stop = function (obj) {
				if (!args.autoplay) {
					return;
				}
				obj.hover(function(){
					clearInterval(timer);
				},function(){
					timer = setInterval(auto_slide, args.auto_time);
				});
			}

			// 设置
			// 禁止双击选中
			_this.attr({
				'ondragstart': 'return false',
				'onselectstart': 'return false'
			});
			/*_this.css({
				'position': 'relative',
				'width': show_width+'px',
				'height': slide_h+'px'
			});
			$slide_container.css({
				'position': 'relative',
				'overflow': 'hidden',
				'height': slide_h+'px',
				'width': show_width+'px'
			});
			$slide.css({
				'float': 'left',
				'width': slide_w+'px',
				'height': slide_h+'px',
				'margin-right': margin_right+'px'
			});*/
			$slidewrap.css({
				/*'position': 'absolute',
				'left': 0,
				'top': 0,*/
				'width': 2*(all_width+margin_right)+'px'
			});

			// 轮播个数大于显示个数，x2（无缝轮播）
			if (all_num > args.show_num) {
				if (args.loop) {
					var temp = $slidewrap.html();
					$slidewrap.append(temp);
				}
			}

			// 小圆点
			var setter_radius = function () {
				var html = '';
				for (var i = 1; i <= all_num; i++) {
					html += '<div></div>';
				};

				// 圆点wrap
				$radius_wrap = _this.find('.slide-radius');
				hover_stop($radius_wrap);

				$radius_wrap.html(html);
				var radius_wrap_width = parseFloat($radius_wrap.css('width'));
				
				// 圆点
				$radius = $radius_wrap.children('div');
				$radius_wrap.css({
					bottom: '20px',
					marginLeft: -(radius_wrap_width/2)+'px'
				});
				radius (0);

				$radius.bind('click',function () {
					if (!$slidewrap.is(':animated')) {
						var dq = $(this).index();
						radius (dq);
						$slidewrap.filter(':not(:animated)').animate({
							left: -1*dq*slide_w+'px'
						},args.slide_speed);
					};
				})
			}

			// 左右切换按钮
			$slide_button.bind('click', function() {
				if (!$slidewrap.is(':animated')) {
					if($(this).hasClass('prev')) {
						to_loop ('prev');
					}else {
						to_loop ('next');
					}
				}
			});

			// 自动切换
			var auto_slide = function () {
				to_loop ('next');
			}

			// 无缝循环
			var to_loop = function (flag) {
				var left = parseFloat($slidewrap.css('left'));

				if (flag == 'next') {
					if (!args.loop) {
						if (left == last_left) {
							return;
						};
					};
					if (-left == all_width) {
						$slidewrap.css({
							left: '0px'
						});
					};
				} else if (flag == 'prev') {
					if (!args.loop) {
						if (left == 0) {
							return;
						};
					};
					if (all_num > args.show_num) {
						if (left == 0) {
							$slidewrap.css({
								left: -all_width+'px'
							});
						};
					};
				}

				slide (flag);
			}

			// 滑动函数
			var slide = function (flag) {
				var left = parseFloat($slidewrap.css('left'));

				var cur_slide_index = Math.abs(left / slide_w);
				// (cur_slide_index == (all_num-1))?cur_slide_index=0:cur_slide_index+=1;
				/*if (cur_slide_index == all_num-1) {
					cur_slide_index = 0;
				}else {
					cur_slide_index += 1;
				}*/
				
				if (all_num > args.show_num) {
					if (flag == 'next') {
						$slidewrap.filter(':not(:animated)').animate({
							left: left-(slide_w+margin_right)+'px'
						},args.slide_speed);

						(cur_slide_index == (all_num-1))?cur_slide_index=0:cur_slide_index+=1;
						radius (cur_slide_index);
					}else if (flag == 'prev') {
						$slidewrap.filter(':not(:animated)').animate({
							left: left+(slide_w+margin_right)+'px'
						},args.slide_speed);

						(cur_slide_index == 0)?cur_slide_index=(all_num-1):cur_slide_index-=1;
						radius (cur_slide_index);
					}
					// radius (cur_slide_index);
				}else {
					// 滑动元素小于等于显示个数的情况
				}
			}

			// 小圆点
			var radius = function (index) {

				if(args.slide_radius) {
					$radius.eq(Math.round(index)).addClass('cur').siblings('div').removeClass('cur');
				}
			}
		});
	};
})(jQuery);