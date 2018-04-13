$(()=>{
    $("#uname").blur(()=>{
        var $uname=$("#uname").val();
        var unameReg=/^[a-z0-9]{3,12}$/i;
        // console.log($uname);
        if(!unameReg.test($uname)){
            $("#rc-inner-error").html("用户名格式不正确").show();
            return;
        }else{
            $("#rc-inner-error").hide();
        }
    })
    $("#upwd").blur(()=>{
        var $upwd=$("#upwd").val();
        var upwdReg=/^[a-z0-9]{3,12}$/i;
        if(!upwdReg.test($upwd)){
            $("#rc-inner-error").html("密码格式不正确").show();
            return;
        }else{
            $("#rc-inner-error").hide();
        }
    })
    $("#yzm").blur(()=>{
        var $yzm=$("#yzm").val();
        var yzmReg=/^[a-z]{4}$/i;
        if(!yzmReg.test($yzm)){
            $("#rc-inner-error").html("验证码格式不正确").show();
            return;
        }else{
            $("#rc-inner-error").hide();
        }
    })
    $("#btnLogin").click(e=>{
        e.preventDefault();
        var $uname=$("#uname").val();
        var $upwd=$("#upwd").val();
        var $yzm=$("#yzm").val().toLowerCase();
        $.ajax({
            url:"data/routes/users/login.php",
            type:"POST",
            data:{uname:$uname,upwd:$upwd,yzm:$yzm},
            success:function(data){
                // console.log(data);
                if(data.code==1){
                    alert("登录成功");
                    history.go(-1);
                }else if(data.code==-5){
                    $("#rc-inner-error").html("验证码不正确").show();
                }
                else if(data.code==-1){
                    $("#rc-inner-error").html("用户和密码不正确").show();
                }
            },
            error:function(){
                alert("网络发生故障，请检查。。。")
            }
        })
    })
    $(".ewm2").click(()=>{
        $(".form").hide();
        $(".appewm").show();
    });
    $(".back").click(()=>{
        $(".form").show();
        $(".appewm").hide();
    });
    $("#setYzm").click(function(){
        this.src = "data/code_yzm.php";
    })

});
