//轮播
$(() => {
    var $imgs = $(".banner-img"),
        $inds = $(".indicators"),
        LIWIDTH = 1920,
        INTERVAL = 500, WAIT = 3000,
        moved = 0, timer = null, canMove = true;
    $.ajax({
        type: "GET",
        url: "data/routes/products/getCarousel.php",
        success: function (data) {
            console.log(data);
            var html = "";
            for (var c of data) {
                html += `
                <li>
                    <a href="${c.href}" title="${c.title}">
                        <img src="${c.img}">
                    </a>
                </li>
                `;
            }
            html += `
                <li>
                    <a href="${data[0].href}" title="${data[0].title}">
                        <img src="${data[0].img}">
                    </a>
                </li>
            `;
            $imgs.html(html).css("width", "13440px");
            $inds.html("<li></li>".repeat(data.length))
                .children().first().addClass("hover");

            //定义自动轮播函数
            function autoMove() {
                if (canMove) {
                    if (moved == data.length) {
                        moved = 0;
                        $imgs.css("left", 0)
                    }
                    timer = setTimeout(() => {
                        move(1, autoMove)
                    }, WAIT);
                }
            }

            autoMove();
            //鼠标悬停时停止轮播
            $("#banner").hover(
                () => {//关闭轮播的开关变量
                    canMove = false;
                    clearTimeout(timer);
                    timer = null;
                },
                () => {//打开轮播开关，启动自动轮播
                    canMove = true;
                    autoMove();
                }
            );
            //为小圆点绑定单击事件
            $inds.on("click", "li", e => {
                moved = $(e.target).index();
                $imgs.stop(true).animate({
                    left: -LIWIDTH * moved
                }, INTERVAL);
                $(e.target).addClass("hover")
                    .siblings().removeClass("hover");
            });
            //为上一页下一页绑定单击事件
            $("[data-move=right]").click((e) => {
                e.preventDefault();
                if (moved == data.length) {
                    moved = 0;
                    $imgs.css("left", 0);
                }
                move(1);
            });
            $("[data-move=left]").click((e) => {
                e.preventDefault();
                //如果是第一张
                if (moved == 0) {//就跳到最后一张
                    moved = data.length;
                    $imgs.css("left", -LIWIDTH * moved);
                }
                move(-1);
            })

            //定义移动函数
            function move(dir, callback) {
                moved += dir;//按照方向增减moved
                //小圆点的变化
                if (moved < data.length) {
                    $inds.children(":eq(" + moved + ")")
                        .addClass("hover")
                        .siblings().removeClass("hover");
                } else {
                    $inds.children(":eq(0)")
                        .addClass("hover")
                        .siblings().removeClass("hover");
                }
                //图片的变化，让imgs移动到新的left位置
                $imgs.stop(true).animate({
                    left: -LIWIDTH * moved
                }, INTERVAL, callback);
            }
        },
        error: function () {
            alert("网络发了故障，请检查");
        }
    })
})
//重要公告轮播
$(() => {
    var line = 0,
        INTERVAL = 500, WAIT = 3000,
        timer = null, canScroll = true;
    var $content = $(".notice-content").children().first();
    var lineH = $content.children().first().height();

    //定义自动轮播函数
    function autoScroll() {
        if (canScroll) {
            if (line == 3) {
                line = 0;
                $content.css("marginTop", 0);
            }
            timer = setTimeout(() => {
                scrollUp(autoScroll)
            }, WAIT);
        }
    }

    function scrollUp(callback) {
        line++;
        $content.stop(true).animate({
            marginTop: -lineH * line
        }, INTERVAL, callback,)
    }

    autoScroll();
//鼠标悬停时停止
    $content.hover(
        () => {//关闭轮播的开关变量
            clearTimeout(timer);
            timer = null;
            canScroll = false;
        },
        () => {//打开轮播开关，启动自动轮播
            canScroll = true;
            autoScroll();
        }
    )
})
//首页四块推荐商品
// $(() => {

//四块轮播动态加载
$.ajax({
    type:"GET",
    url: "data/routes/products/getIndexProducts.php",
    success:function(data) {
        // console.log(data.nmian);
        // console.log(data.children);
        var {nmian, children, women, home, men} = data;
        var $d1 = $("#d1");
        var html = "";
        for (var c of nmian) {
            var title = (c.title).slice(0, 10) + "...";
            html += `
                <div class="slide" title="${c.title}">
                    <a href="${c.href}">
                        <div class="pro-img">
                             <img src="${c.pic}" alt="">
                        </div>
                        <div class="title">${title}</div>
                        <div class="price">¥${c.price}</div>
                    </a>
                </div>
            `
        }
        for (var i = 0; i < 4; i++) {
            var title = (nmian[i].title).slice(0, 10) + "...";
            html += `
                 <div class="slide" title="${nmian[i].title}">
                    <a href="${nmian[i].href}">
                        <div class="pro-img">
                             <img src="${nmian[i].pic}" alt="">
                        </div>
                        <div class="title">${title}</div>
                        <div class="price">¥${nmian[i].price}</div>
                    </a>
                 </div>
             `
        }
        $d1.html(html);
        var $d2 = $("#d2");
        var html = "";
        for (var w of women) {
            var title = (w.title).slice(0, 10) + "...";
            html += `
                <div class="slide" title="${w.title}">
                    <a href="${w.href}">
                        <div class="pro-img">
                             <img src="${w.pic}" alt="">
                        </div>
                        <div class="title">${title}</div>
                        <div class="price">¥${w.price}</div>
                    </a>
                </div>
            `
        }
        for (var i = 0; i < 4; i++) {
            var title = (women[i].title).slice(0, 10) + "...";
            html += `
                 <div class="slide" title="${women[i].title}">
                    <a href="${women[i].href}">
                        <div class="pro-img">
                             <img src="${women[i].pic}" alt="">
                        </div>
                        <div class="title">${title}</div>
                        <div class="price">¥${women[i].price}</div>
                    </a>
                 </div>
             `
        }
        $d2.html(html);
        var $d3 = $("#d3");
        var html = "";
        for (var h of home) {
            var title = (h.title).slice(0, 10) + "...";
            html += `
                <div class="slide" title="${h.title}">
                    <a href="${h.href}">
                        <div class="pro-img">
                             <img src="${h.pic}" alt="">
                        </div>
                        <div class="title">${title}</div>
                        <div class="price">¥${h.price}</div>
                    </a>
                </div>
            `
        }
        for (var i = 0; i < 4; i++) {
            var title = (home[i].title).slice(0, 10) + "...";
            html += `
                 <div class="slide" title="${home[i].title}">
                    <a href="${home[i].href}">
                        <div class="pro-img">
                             <img src="${home[i].pic}" alt="">
                        </div>
                        <div class="title">${title}</div>
                        <div class="price">¥${home[i].price}</div>
                    </a>
                 </div>
             `
        }
        $d3.html(html);
        var $d4 = $("#d4");
        var html = "";
        for (var m of men) {
            var title = (m.title).slice(0, 10) + "...";
            html += `
                <div class="slide" title="${m.title}">
                    <a href="${m.href}">
                        <div class="pro-img">
                             <img src="${m.pic}" alt="">
                        </div>
                        <div class="title">${title}</div>
                        <div class="price">¥${m.price}</div>
                    </a>
                </div>
            `
        }
        for (var i = 0; i < 4; i++) {
            var title = (men[i].title).slice(0, 10) + "...";
            html += `
                 <div class="slide" title="${men[i].title}">
                    <a href="${men[i].href}">
                        <div class="pro-img">
                             <img src="${men[i].pic}" alt="">
                        </div>
                        <div class="title">${title}</div>
                        <div class="price">¥${men[i].price}</div>
                    </a>
                 </div>
             `
        }
        $d4.html(html);
        //点击移动
        $(".recommend-tab").on("click","li",function(){
            $(this).addClass("cur")
                .siblings().removeClass("cur");
            var $recommendContent=$(".recommend-content"),
            $recommendTabLi=$(".recommend-tab>li"),
            INTERVAL = 500, WAIT = 3000,
            timer = null, canScroll = true,
            lineH =310,move=0;
            // console.log( $recommendTabLi.length);
            var move = $(this).index();
            console.log(move);
            $recommendContent.css("top",-move*lineH);
        })
        //单块自动轮播
        var $imgs = $(".slide-wrap"),
            LIWIDTH = 220,
            INTERVAL = 500,
            moved = 0;

        function move(dir, callback) {
            moved += dir;
            $imgs.stop(true).animate({
                left: -LIWIDTH * moved
            }, INTERVAL, callback);
        }
        $(".slide-button-right").click((e) => {
            console.log(1);
            if (moved == 6) {
                moved = 0;
                $imgs.css("left", 0);
            }
            move(1);
        });
        $(".slide-button-left").click((e) => {
            if (moved == 0) {
                moved = 6;
                $imgs.css("left", -LIWIDTH * moved);
            }
            move(-1);
        })

    },
    error:function(){
        alert("网络故障请检查")
    }
})


// 楼梯
$(() => {
    var $divLift = $("#lift"),
        $floors = $(".index-section");
    $(window).scroll(() => {
        var scrollTop = $(window).scrollTop();
        //任意元素距body顶部的总距离
        var offsetTop = $("#f1").offset().top;
        if (offsetTop < scrollTop + innerHeight / 2)
            $divLift.show();
        else
            $divLift.hide();
        /*********具体显示哪个电梯按钮**********/
        for (var f of $floors) {
            var $f = $(f);
            var offsetTop = $f.offset().top;
            if (offsetTop < scrollTop + innerHeight / 2) {
                //找到该楼层对应的li按钮
                var i = $floors.index($f);
                var $li = $divLift.find(".lift_item:eq(" + i + ")");
                $li.addClass("lift_item_on")
                    .siblings()
                    .removeClass("lift_item_on");
                var $act = $li.children().first();
                // console.log($act);
                $act.addClass("col");
                console.log($li.siblings().children().first());
                $li.siblings().children(".lift_btn").removeClass("col");

            }
        }
    });
    $(".lift_item").hover(function(){
        $(this).children().first().toggleClass("white");
    })
    $divLift.on("click", ".lift_item", function () {
        var $li = $(this);//this->li
        if (!$li.is(":last-child")) {
            var i = $li.index();//找当前li对应的楼层
            var offsetTop = $floors.eq(i).offset().top;
            $("html,body").stop(true).animate({
                scrollTop:
                    $(".comm-header").is(".logo-show") ?
                        offsetTop - 80 : offsetTop - 80 - 80
            }, 500);
        } else
            $("html,body").stop(true).animate({
                scrollTop: 0
            }, 500);
    })
})
//首页商品列表
$(()=>{
    $.ajax({
        type:"GET",
        url: "data/routes/products/getIndexProducts.php",
        success:function(data){
            // console.log(data.nmian);
            // console.log(data.children);
            var {nmian,children,women,home,men}=data;

            var $nmContent=$("#f1>.section-content");
            var html="";
            html+=`
            <div class="section-two lf">
               <div class="bg-img">
                    <a href="#" target="_blank">
                        <img src="img/index/nm.jpg">
                    </a>
               </div>
            </div>
            `
            for(var n of nmian){
                html+=`
                    <div class="item lf">
                        <a href="${n.href}" title="${n.title}">
                            <div class="good-img-wrap">
                                <img src="${n.pic}">
                            </div>
                            <div class="good-name">
                                <p>${n.title}</p>
                            </div>
                            <div class="good-price">
                                <span>¥${n.price}</span>
                            </div>
                        </a>
                    </div>
                `
            }
            $nmContent.html(html);
            var $childrenContent=$("#f2>.section-content");
            var html="";
            html+=`
            <div class="section-two lf">
                <div class="bg-img">
                    <a href="#" target="_blank">
                          <img src="img/index/children.jpg">
                    </a>
                </div>
            </div>
            `
            for(var c of children){
                html+=`
                    <div class="item lf">
                        <a href="${c.href}" title="${c.title}">
                            <div class="good-img-wrap">
                                <img src="${c.pic}">
                            </div>
                            <div class="good-name">
                                <p>${c.title}</p>
                            </div>
                            <div class="good-price">
                                <span>¥${c.price}</span>
                            </div>
                        </a>
                    </div>
                `
            }
            $childrenContent.html(html);
            var $womenContent=$("#f3>.section-content");
            var html="";
            html+=`
            <div class="section-two lf">
                <div class="bg-img">
                    <a href="#" target="_blank">
                          <img src="img/index/women.jpg">
                    </a>
                </div>
            </div>
            `
            for(var w of women){
                html+=`
                    <div class="item lf">
                        <a href="${w.href}" title="${w.title}">
                            <div class="good-img-wrap">
                                <img src="${w.pic}">
                            </div>
                            <div class="good-name">
                                <p>${w.title}</p>
                            </div>
                            <div class="good-price">
                                <span>¥${w.price}</span>
                            </div>
                        </a>
                    </div>
                `
            }
            $womenContent.html(html);
            var $homeContent=$("#f4>.section-content");
            var html="";
            html+=`
            <div class="section-two lf">
                <div class="bg-img">
                    <a href="#" target="_blank">
                          <img src="img/index/home.jpg">
                    </a>
                </div>
            </div>
            `
            for(var h of home){
                html+=`
                    <div class="item lf">
                        <a href="${h.href}" title="${h.title}">
                            <div class="good-img-wrap">
                                <img src="${h.pic}">
                            </div>
                            <div class="good-name">
                                <p>${h.title}</p>
                            </div>
                            <div class="good-price">
                                <span>¥${h.price}</span>
                            </div>
                        </a>
                    </div>
                `
            }
            $homeContent.html(html);
            var $menContent=$("#f5>.section-content");
            var html="";
            html+=`
            <div class="section-two lf">
                <div class="bg-img">
                    <a href="#" target="_blank">
                          <img src="img/index/men.jpg">
                    </a>
                </div>
            </div>
            `
            for(var m of men){
                html+=`
                    <div class="item lf">
                        <a href="${m.href}" title="${m.title}">
                            <div class="good-img-wrap">
                                <img src="${m.pic}">
                            </div>
                            <div class="good-name">
                                <p>${m.title}</p>
                            </div>
                            <div class="good-price">
                                <span>¥${m.price}</span>
                            </div>
                        </a>
                    </div>
                `
            }
            $menContent.html(html);
        },
        error:function(){
            alert("网络故障请检查")
        }
    })
})

