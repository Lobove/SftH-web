
//轮播
$(()=>{
    var $imgs=$(".banner-img"),
        $inds=$(".indicators"),
        LIWIDTH=1920,
        INTERVAL=500,WAIT=3000,
        moved=0,timer=null,canMove=true;
    $.ajax({
        type:"GET",
        url:"data/routes/products/getCarousel.php",
        success:function(data){
            console.log(data);
            var html="";
            for(var c of data){
                html+=`
                <li>
                    <a href="${c.href}" title="${c.title}">
                        <img src="${c.img}">
                    </a>
                </li>
                `;
            }
            html+=`
                <li>
                    <a href="${data[0].href}" title="${data[0].title}">
                        <img src="${data[0].img}">
                    </a>
                </li>
            `;
            $imgs.html(html).css("width","13440px");
            $inds.html("<li></li>".repeat(data.length))
                .children().first().addClass("hover");
            //定义自动轮播函数
            function autoMove(){
                if(canMove){
                    if(moved==data.length){
                        moved=0;
                        $imgs.css("left",0)
                    }
                    timer=setTimeout(()=>{
                        move(1,autoMove)
                    },WAIT);
                }
            }
            autoMove();
            //鼠标悬停时停止轮播
            $("#banner").hover(
                ()=>{//关闭轮播的开关变量
                    canMove=false;
                    clearTimeout(timer);
                    timer=null;
                },
                ()=>{//打开轮播开关，启动自动轮播
                    canMove=true;
                    autoMove();
                }
            );
            //为小圆点绑定单击事件
            $inds.on("click","li",e=>{
                moved=$(e.target).index();
                $imgs.stop(true).animate({
                    left:-LIWIDTH*moved
                },INTERVAL);
                $(e.target).addClass("hover")
                    .siblings().removeClass("hover");
            });
            //为上一页下一页绑定单击事件
            $("[data-move=right]").click((e)=>{
                e.preventDefault();
                if(moved==data.length){
                    moved=0;
                    $imgs.css("left",0);
                }
                move(1);
            });
            $("[data-move=left]").click((e)=>{
                e.preventDefault();
                //如果是第一张
                if(moved==0){//就跳到最后一张
                    moved=data.length;
                    $imgs.css("left",-LIWIDTH*moved);
                }
                move(-1);
            })
            //定义移动函数
            function move(dir,callback){
                moved+=dir;//按照方向增减moved
                //小圆点的变化
                if(moved<data.length){
                    $inds.children(":eq("+moved+")")
                        .addClass("hover")
                        .siblings().removeClass("hover");
                }else{
                    $inds.children(":eq(0)")
                        .addClass("hover")
                        .siblings().removeClass("hover");
                }
                //图片的变化，让imgs移动到新的left位置
                $imgs.stop(true).animate({
                    left:-LIWIDTH*moved
                },INTERVAL,callback);
            }
        },
        error:function(){
            alert("网络发了故障，请检查");
        }
    })
})
//重要公告轮播
$(()=>{
    var line=1,
        INTERVAL=500,WAIT=3000,
        timer=null,canScroll=true;
    var $content=$(".notice-content").children().first();
    var lineH=$content.children().first().height();
    function autoScroll(){
        if(canScroll){
            console.log(2);
            $content.css({marginTop:0});
            timer=setTimeout(()=>{
                scrollUp(autoScroll)
            },WAIT);
            $content.find("li:first").appendTo($content);
        }
    }
    function scrollUp(callback){
        $content.stop(true).animate({
            marginTop:-lineH*line
        },INTERVAL,callback,)
    }
    autoScroll();
//鼠标悬停时停止
    $content.hover(
        ()=>{//关闭轮播的开关变量
            clearTimeout(timer);
            timer=null;
            canScroll=false;
        },
        ()=>{//打开轮播开关，启动自动轮播
            canScroll=true;
            $content.find("re").appendTo($content);
            autoScroll();
        }
    )
})