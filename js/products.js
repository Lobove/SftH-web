//底部推荐商品
$(() => {
    var $imgs = $(".slide-wrap"),
        LIWIDTH = 220,
        INTERVAL = 500, WAIT = 3000,
        moved = 0, timer = null, canMove = true;

    function autoMove() {
        if (canMove) {
            if (moved == 4) {
                moved = 0;
                $imgs.css("left", 0)
            }
            timer = setTimeout(() => {
                move(1, autoMove)
            }, WAIT)
        }
    }

    autoMove();
    // 鼠标悬停时停止轮播
    $(".slide-container").hover(
        () => {
            canMove = false;
            clearTimeout(timer);
            timer = null;
        },
        () => {
            canMove = true;
            autoMove();
        }
    );
    $(".slide-button-right").click((e) => {
        e.preventDefault();
        if (moved == 4) {
            moved = 0;
            $imgs.css("left", 0);
        }
        move(1);
    });
    $(".slide-button-left").click((e) => {
        e.preventDefault();
        if (moved == 0) {
            moved = 4;
            $imgs.css("left", -LIWIDTH * moved);
        }
        move(-1);
    })

    function move(dir, callback) {
        moved += dir;
        $imgs.stop(true).animate({
            left: -LIWIDTH * moved
        }, INTERVAL, callback);
    }
})
//商品展示区
function loadProducts(pno=1){
    $.ajax({
        type:"GET",
        url:"data/routes/products/getProductsByKw.php",
        data:location.search.slice(1)+"&pno="+pno,//{fid:1,style:"婴童床品",pno:pno},
        success:function(output){
            // console.log(data);
            var poster=output.poster;
            var data=output.data;
            // console.log(data);
            var html="";
            for(var p of data){
                html+=`
                    <div class="item lf">
                <a href="${p.href}" title="${p.title}" target="_blank">
                    <div class="good-img-wrap">
                        <img src="${p.pic}">
                    </div>
                    <div class="good-name">
                        <p>${p.title}</p>
                    </div>
                    <div class="good-price">
                        <span>${p.price}</span>
                    </div>
                    <div class="bottom-tip">
                        库存不足
                    </div>
                </a>
            </div>
        </div>
                `;
            }
            $("#listComm").html(html);
            $("#bread-nav").html(poster.fname);
            // console.log(poster.fname);
            $(".img-top").html(`<img src="${poster.poster}" alt="">`);

            var html = "";
                html=`<a href="javascript:;" class="previous">&lt;上一页</a>`;
            if(output.pageNo-2>0){
                html += `<a href="javascript:;">${output.pageNo-2}</a>`;

            }
            if(output.pageNo-1>0){
                html += `<a href="javascript:;">${output.pageNo-1}</a>`;
            }
            html += `<a href="javascript:;" class="cur">${output.pageNo}</a>`;
            if(output.pageNo+1<=output.pageCount){
                html += `<a href="javascript:;">${output.pageNo+1}</a>`;
            }
            if(output.pageNo+2<=output.pageCount){
                html += `<a href="javascript:;">${output.pageNo+2}</a>`;
            }
            html+=`<a href="javascript:;" class="next" data-num="${output.pageCount}">下一页&gt;</a>`;

            $(".page").html(html);
        },
        error:function(){
            alert("网络故障请检查")
        }
    })
}

$(()=>{
    loadProducts();
    $(".page").on("click","a",function(e){
        e.preventDefault();
        //任意元素距body顶部的总距离
        var offsetTop = $(".goods-area-wrap").offset().top;
        $("html,body").scrollTop(offsetTop-120);
        var $tar=$(e.target);
        var num=parseInt($(this).html());
        var pno=parseInt($(".cur").html());
            if($tar.is(".next")){
                if(pno<$(".next").data("num")){
                    loadProducts(pno+1);
                }
            }else if($tar.is(".previous")){
                if(pno>1){
                    loadProducts(pno-1);
                }
            }else{
            loadProducts(num);
        }
    });

})
