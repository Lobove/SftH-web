$(() => {
    function loadCart() {
        $.ajax({
            type: "GET",
            url: "data/routes/cart/getCart.php",
            success: function (data) {
                // console.log(data);
                var $nogoods = $(".nogoods"),
                    $shoppingCart = $("#shopping-cart");
                if (data == 0) {
                    console.log(1);
                    $nogoods.show();
                    $shoppingCart.hide();
                } else {
                    var html = "";
                    for (var p of data) {
                        html += `
                            <div class="imfor">
                                <div class="check">
                                <input type="checkbox"`;
                        if (p.is_checked == '1') {
                            html += `checked`;
                        }
                        html += `
                        data-iid="${p.iid}">
                            </div>
                            <div class="product">
                                <a href="product-details.html?lid=${p.lid}">
                                    <img src="${p.sm}" alt="">
                                </a>
                                <span class="desc">
                                    <a href="product-details.html?lid=${p.lid}">${p.title}</a>
                                </span>
                                <p class="col">
                                    <span>规格：</span>
                                    <span class="color-desc">${p.spec}</span>
                                </p>
                            </div>
                            <div class="price">
                                <span>¥</span>${p.price}
                            </div>
                            <div class="num">
                                <span class="reduce">&nbsp;-&nbsp;</span>
                                <input type="text" value="${p.count}"  data-iid="${p.iid}">
                                <span class="add">&nbsp;+&nbsp;</span>
                            </div>
                            <div class="total-price">
                                <span>¥</span>
                                <span>${(p.price * p.count).toFixed(2)}</span>
                            </div>
                            <div class="del">
                                <a href="#" data-iid="${p.iid}">删除</a>
                            </div>
                        </div>
                    `;
                        var $content = $("#content-box-body");
                        $content.html(html);
                        setTimeout(() => {
                            getTotal();
                            // chkAll()
                        }, 100);
                        var $checkTop = $(".check-top>input");
                        var $checkFoot=$(".foot>.base>.all>input");
                        var $check = $(".check>input");
                        $checkTop.off("click").click(() => {
                            // console.log($checkTop.prop("checked"));
                            if ($checkTop.prop("checked")) { //未全选
                                $check.prop("checked", true);
                                $checkFoot.prop("checked", true);
                                $.ajax({
                                    type: "POST",
                                    url: "data/routes/cart/selectAll.php",
                                    data: {chkAll: '1'},
                                    success: function () {
                                        loadCart();
                                    },
                                    error: function () {
                                        alert("网络故障请检查")
                                    }
                                });
                            } else {
                                $check.prop("checked", false);
                                $checkFoot.prop("checked", false);
                                $.ajax({
                                    type: "POST",
                                    url: "data/routes/cart/selectAll.php",
                                    data: {chkAll: '0'},
                                    success: function () {
                                        loadCart();
                                    },
                                    error: function () {
                                        alert("网络故障请检查")
                                    }
                                });
                            }

                        })
                        $content.off("click").on("click", ".check>input", (e) => {
                            var $tar = $(e.target);
                            var $iid = $tar.data("iid");
                            // console.log($tar.prop("checked"));
                            // console.log($iid);
                            if ($tar.prop("checked")) {
                                $.ajax({
                                    type: "POST",
                                    url: "data/routes/cart/selectOne.php",
                                    data: {chkOne: '1', iid: $iid},
                                    success: function () {
                                        loadCart();
                                    },
                                    error: function () {
                                        alert("网络故障请检查")
                                    }
                                })
                            } else {
                                $.ajax({
                                    type: "POST",
                                    url: "data/routes/cart/selectOne.php",
                                    data: {chkOne: '0', iid: $iid},
                                    success: function () {
                                        $checkTop.prop("checked", false);
                                        loadCart();
                                    },
                                    error: function () {
                                        alert("网络故障请检查")
                                    }
                                })
                            }

                        })
                            .on("click", ".reduce,.add", e => {
                                var $tar = $(e.target);
                                var $num = $tar.siblings("input");
                                var n = parseInt($num.val());
                                var iid = $num.data("iid");
                                if ($tar.is(".add")) {
                                    n++;
                                    $num.val(n);
                                }
                                else {
                                    n--;
                                    $num.val(n);
                                }
                                if (n == 0) {
                                    if (confirm("是否继续删除?"))
                                        $.ajax({
                                            type: "GET",
                                            url: "data/routes/cart/updateCart.php",
                                            data: {count: n, iid: iid},
                                            success: function () {
                                                loadCart();
                                                // $tar.parent().parent().hide();
                                            },
                                            error: function () {
                                                alert("网络故障请检查")
                                            }
                                        })
                                } else
                                    $.get(
                                        "data/routes/cart/updateCart.php",
                                        {count: n, iid: iid}
                                    ).then(() => {
                                        loadCart();
                                    })
                            })
                            .on("click", ".del>a", e => {
                                var $tar = $(e.target);
                                var iid = $tar.data("iid");
                                $.get(
                                    "data/routes/cart/updateCart.php",
                                    {count: 0, iid: iid}
                                ).then(() => {
                                    loadCart();
                                })
                            })

                        var $counts =
                            $("#shopping-cart .total,#shopping-cart .totalOne");
                        var $totals =
                            $("#shopping-cart .totalPrices,#shopping-cart .foot-price");
                        function getTotal() {
                            var $rows = $(".imfor:has(':checked')");
                            // console.log($rows);
                            var $inputs = $rows.find(".num>input");
                            // console.log($inputs);
                            var $subs = $rows.find(".total-price>:last-child");
                            var count = 0;
                            var total = 0;
                            for (var input of $inputs) {
                                count += parseInt($(input).val());
                            }
                            for (var sub of $subs) {
                                total += parseFloat($(sub).html());
                            }
                            $counts.html(count);
                            $totals.html(total);
                        }

                        $checkFoot.off("click").click(() => {
                            // console.log(1);
                            if ($checkFoot.prop("checked")) { //未全选
                                $check.prop("checked", true);
                                $.ajax({
                                    type: "POST",
                                    url: "data/routes/cart/selectAll.php",
                                    data: {chkAll: '1'},
                                    success: function () {
                                        loadCart();
                                        $(".foot>.base>a").click(e=>{
                                            console.log(1);
                                            var $tar=$(e.target);
                                            $.ajax({
                                                type: "POST",
                                                url: "data/routes/cart/clearCart.php",
                                                success: function () {
                                                    loadCart();
                                                },
                                                error: function () {
                                                    alert("网络故障请检查")
                                                }
                                            });
                                        })
                                    },
                                    error: function () {
                                        alert("网络故障请检查")
                                    }
                                });
                            } else {
                                $check.prop("checked", false);
                                $.ajax({
                                    type: "POST",
                                    url: "data/routes/cart/selectAll.php",
                                    data: {chkAll: '0'},
                                    success: function () {
                                        loadCart();

                                    },
                                    error: function () {
                                        alert("网络故障请检查")
                                    }
                                });
                            }

                        })

                        // var unchecked = document.querySelector(
                        //     ".check:first-child>input:not(:checked)"
                        // );
                         var unchecked = $( ".check:first-child>input:not(:checked)");
                        if (unchecked.length>0) {
                            $checkTop.prop("checked", false);
                        } else {
                            $checkTop.prop("checked", true);
                        }

                    }
                }
            },
            error: function () {
                alert("网络故障请检查");
            }
        })
    }

    loadCart();

})