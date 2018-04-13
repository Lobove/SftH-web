//加载index.html->自动执行header.js
$(()=>{
    function loadStatus(){
        //判断登录:
        var $loginList=$("#loginList");
        var $welcomeList=$("#welcomeList");
        $.ajax({
            type:"GET",
            url:"data/routes/users/isLogin.php",
            success:function(data){
                // console.log(data);
                if(data.ok==1){
                    $loginList.hide();
                    $welcomeList.show();
                    $("#uname").html(data.uname);
                    $(".top-cart").click(()=>{
                        location="cart.html";
                    })
                }else{
                    $loginList.show();
                    $welcomeList.hide();
                    $(".top-cart").click(()=>{
                        location="login.html";
                    })
                }
            },
            error:function(){
                alert("网络故障，请检查");
            }
        })
    }
	$.ajax({
		type:"get",
		url:"header.html",
		dataType:"html"
	})
	.then(html=>{
	    // console.log(html);
		$("#header").html(html);
        loadStatus();
        function top_nav () {
            var top = $(window).scrollTop();
            var $li = $(".first-menu-wrap>li");
            var $logo = $(".logo2");
            var $top_bar =$(".top-bar");
            var $nav_bar =$(".nav-bar");
            var $search = $(".search-bar");
            if (top > 280) {
                $li.css({
                    margin: "0 25px"
                },800);
                $logo.addClass("logo-show");
                $nav_bar.css({
                    marginLeft: "-52px"
                });
                $top_bar.css({
                    marginTop: "-94px"
                });
                $search.css({
                    top: "120px"
                });
            }else {
                $li.css({
                    margin: "0 40px"
                },800);
                $logo.removeClass("logo-show");
                $nav_bar.css({
                    marginLeft: "0"
                });
                $top_bar.css({
                    marginTop: "0"
                });
                $search.css({
                    top: "36px"
                });
            }
        };
        $(window).scroll(()=>{
            top_nav ();
        })
        // 注销:
        $("#logout").click(()=>{
            $.ajax({
                type:"GET",
                url:"data/routes/users/logout.php",
                success:function(){
                    console.log(1);
                    location.reload();
                },
                error:function(){
                    alert("网络故障请检查");
                }
            })
        })
        $(".first-menu-wrap>li")
            .hover(function(){
                $(this)
                    .children(".second-menu-wrap")
                    .toggleClass("in")
            })

        // //将地址栏的kw读取到搜索框中
        // if(location.search){
        //     $("#txtSearch").val(
        //         decodeURI(location.search.split("=")[1])
        //     );
        // }
        //将搜索框中的kw放到地址栏中，跳转到商品列表页
        $("[data-trigger=search]").click(()=>{
            var kw=$("#txtSearch").val().trim();
            if(kw!=="")
                location="products.html?kw="+kw;
        });

        //搜索帮助:
        var $txtSearch=$("#txtSearch"),
            $shelper=$("#shelper");
        $txtSearch.keyup(e=>{
            if(e.keyCode!=13){
                if(e.keyCode==40){
                    if(!$shelper.is(":has(.focus)")){
                        $shelper.children()
                            .first().addClass("focus");
                    }else{
                        if($shelper.children().last()
                                .is(".focus")){
                            $shelper.children(".focus")
                                .removeClass("focus");
                            $shelper.children()
                                .first().addClass("focus");
                        }else{
                            $shelper.children(".focus")
                                .removeClass("focus")
                                .next().addClass("focus");
                        }
                    }
                    $txtSearch.val(
                        $shelper.children(".focus")
                            .attr("title")
                    );
                }else if(e.keyCode==38){
                    if(!$shelper.is(":has(.focus)")){
                        $shelper.children()
                            .last().addClass("focus");
                    }else{
                        if($shelper.children()
                                .first().is(".focus")){
                            $shelper.children(".focus")
                                .removeClass("focus");
                            $shelper.children()
                                .last().addClass("focus");
                        }else{
                            $shelper.children(".focus")
                                .removeClass("focus")
                                .prev().addClass("focus");
                        }
                    }
                    $txtSearch.val(
                        $shelper.children(".focus").attr("title")
                    );
                }else{
                    var $tar=$(e.target);
                    $.get(
                        "data/routes/products/searchHelper.php",
                        "term="+$tar.val()
                    ).then(data=>{
                        var html="";
                        for(var p of data){
                            html+=`<li title="${p.title}">
						<div class="search-item" title="${p.title}" data-url="product_details?lid=${p.lid}">${p.title}</div>
						<div class="sales">销量：${p.sales}</div>
					</li>`
                        }
                        $shelper.show().html(html);
                    });
                }
            }else
                $("[data-trigger=search]").click();
        }).blur(()=>$shelper.hide());
        //  购物车显示数量
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
    });
    if(screen.width>=1150){
        $("body").css("overflow-x","hidden");
    }

})


