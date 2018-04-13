$(() => {
    if (location.search != "") {
        $.ajax({
            type: "GET",
            url: "data/routes/products/getProductById.php",
            data: location.search.slice(1),
            success: function (data) {
                // console.log(data);
                var {product: p, spec, size, imgs, pic} = data;
                $(".title").html(p.title);
                $(".subtitle").html(p.subtitle);
                if (p.promise) {
                    $(".tag").show();
                    $(".promise").html(p.promise);
                }
                $(".price").html("¥" + p.price);
                $(".integral").html(p.price.slice(0, -3));
                var html = "";
                for (var i in spec) {
                    html += `
                         <span class="spec" data-num="${i}" data-spec="${spec[i]}">${spec[i]}
                            <i></i>
                        </span>
                    `;
                }
                $(".color").html(html).children().first().addClass("selected");
                $(".selected").children().first().addClass("correct");

                if (p.size1) {
                    $("#choose-attrs").show();
                    var html = "";
                    for (var i in size) {
                        html += `
                         <span class="spec">${size[i]}
                            <i></i>
                        </span>
                    `;
                    }
                    $(".size").html(html).children().first().addClass("selected");
                    $(".size").children().first().children().first().addClass("correct");

                }

                $(".inventory").html(p.inventory);
                $(".sales").html(p.sales);

                //详情图片
                var html = "";
                for (var item of pic) {
                    html += `<img src="${item}" alt="">`;
                }
                $(".detail-imgs").html(html);
                //增加删除数量
                $(".account").on("click", (".num-add,.num-reduce"), e => {
                    var $tar = $(e.target);
                    var n = parseInt($(".num-input").val());
                    if ($tar.hasClass("num-add")) {
                        n++;
                        // console.log(n);
                    } else if (n > 1) n--;
                    $(".num-input").val(n);

                })

                //加入购物车图片
                var $addCartImg=$("#add-cart-img");
                $addCartImg.children().first().attr("src",imgs[0].sm);

                // 放大镜
                var $mImg = $("#mImg"),
                    $bigImg = $(".hover-big"),
                    $listImg = $(".list-img");
                $mImg.attr("src", imgs[0].md);
                $bigImg.css("backgroundImage", "url(" + imgs[0].lg + ")");
                var html = "";
                for (var pic of imgs) {
                    html += `
                      <li><img src="${pic.sm}" data-md="${pic.md}" data-lg="${pic.lg}"></li> 
                      `;
                }
                $listImg.html(html);
                $listImg.on("mouseenter", "img", e => {
                    var $tar = $(e.target);
                    var md = $tar.data("md");
                    var lg = $tar.data("lg");
                    $mImg.attr("src", md);
                    $bigImg.css("backgroundImage", "url(" + lg + ")");
                })
                var $superMask = $("#superMask"),
                    $mask = $("#mask");
                $superMask.hover(function () {
                    $mask.show();
                    $bigImg.show();
                }, function () {
                    $mask.hide();
                    $bigImg.hide();
                })
                var MSIZE = 250;
                $superMask.mousemove(e => {
                    var x = e.offsetX, y = e.offsetY;
                    // console.log(x+","+y);
                    var top = y - MSIZE / 2, left = x - MSIZE / 2;
                    if (top < 0) top = 0;
                    else if (top > 250) top = 250;
                    if (left < 0) left = 0;
                    else if (left > 250) left = 250;
                    $mask.css({
                        display: "block",
                        top: top + "px",
                        left: left + "px"
                    })
                    $bigImg.css("backgroundPosition", -1.6 * left + "px " + (-1.6 * top) + "px");
                })
                //选规格
                $(".color").on("click", ".spec", e => {

                    var $tar = $(e.target);
                    $tar.addClass("selected")
                        .siblings().removeClass("selected");
                    $tar.children().first().addClass("correct");
                    $tar.siblings().children(".correct").removeClass("correct");
                    var num = $tar.data().num;
                    // console.log(num);
                    $.ajax({
                        type: "GET",
                        url: "data/routes/products/getProductById.php",
                        data: {lid: location.search.slice(5), num: num},
                        success: function (data) {
                            // console.log(data);
                            var {product: p, spec, size, imgs} = data;
                            var html = "";
                            for (var pic of imgs) {
                                html += `
                      <li><img src="${pic.sm}" data-md="${pic.md}" data-lg="${pic.lg}"></li>
                      `;
                            }
                            $listImg.html(html);
                            $mImg.attr("src", imgs[0].md);
                            $bigImg.css("backgroundImage", "url(" + imgs[0].lg + ")");
                            //更改加入购物车图片
                            $addCartImg.children().first().attr("src",imgs[0].sm);


                        },
                        error: function () {
                            alert("网络故障请检查");
                        }

                    })


                });
                $(".size").on("click", ".spec", e =>{
                    var $tar = $(e.target);
                    $tar.addClass("selected")
                        .siblings().removeClass("selected");
                    $tar.children().first().addClass("correct");
                    $tar.siblings().children(".correct").removeClass("correct");
                });


                //    加入购物车
                $.ajax({
                    type:"GET",
                    url:"data/routes/users/isLogin.php",
                    success:function(data){
                        if(data.ok==1){
                            $(".cart").css("background","#00937f")
                                .next().css("display","inline-block");
                            var clickNum=1;
                            $("#add-cart").click((e)=>{
                                // console.log(clickNum);
                                clickNum++;
                                e.preventDefault();
                                var $confirm=$(".confirm");
                                var $wrap=$(".wrap");
                                var $input=$(".num-input");
                                var count = parseInt($input.val());
                                var lid=location.search.split("=")[1];
                                var spec=$(".selected").data().spec;
                                var sm=$listImg.children().first().children().first().attr("src");
                                // console.log(spec,sm);
                                // if(clickNum>2){
                                //     $(".content").html("该商品已在您的购物车里了哦！！！");
                                //     $("#confirm-btn").hide();
                                // }
                                $confirm.show();
                                $wrap.show();
                                $(".confirm-close").click(()=>{
                                    $confirm.hide();
                                    $wrap.hide();
                                })
                                $("#confirm-btn").click(()=>{
                                    $confirm.hide();
                                    $wrap.hide();
                                    $.ajax({
                                        type:"POST",
                                        url:"data/routes/cart/addToCart.php",
                                        data:{lid:lid,count:count,spec:spec,sm:sm},
                                        success:function(){
                                            $input.val(1);//重置input的值为1
                                            $addCartImg.addClass("img");
                                            //  购物车显示数量
                                            var timer=setTimeout(function(){
                                                $addCartImg.removeClass("img");
                                            },1000);
                                            $.ajax({
                                                type:"GET",
                                                url:"data/routes/cart/countCart.php",
                                                success:function(data){
                                                    // console.log(data);
                                                    $("#cartNum").html(data);
                                                },
                                                error:function(){
                                                    alert("网络故障请检查")
                                                }
                                            });


                                        },
                                        error:function(){
                                            alert("网络故障请检查")
                                        }
                                    })
                                })
                            })
                        }else{
                            $("#add-cart").click((e)=>{
                                e.preventDefault();
                                location="login.html";
                            })
                        }
                    },
                    error: function () {
                        alert("网络故障请检查");
                    }
                })


            },
            error: function () {
                alert("网络故障请检查");
            }
        })
    }
})