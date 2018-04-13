$(()=>{
    //查找id为txtName的文本框
    var $uname=$("#uname");
    var $upwd=$("#upwd");
    var $rpwd=$("#rpwd");
    var $email=$("#email");
    var $phone=$("#phone");
    var $yzm=$("#yzm");
    //为txtName添加失去焦点事件
    $uname.blur(()=>{
        var uname=$uname.val();
        var unameReg=/^[a-z0-9]{3,12}$/i;
        // console.log($uname);
        if(!unameReg.test(uname)){
            $("#rc-inner-error").html("用户名必须为3-12个字母、数字组成").show();
            return;
        }else {
            checkName(uname);
        }
    })
    $upwd.blur(()=>{
        var upwd=$upwd.val();
        var upwdReg=/^[a-z0-9]{3,12}$/i;
        if(!upwdReg.test(upwd)){
            $("#rc-inner-error").html("密码必须为3-12个字母、数字组成").show();
            return;
        }
    })
    $rpwd.blur(()=>{
        var upwd=$upwd.val();
        var rpwd=$rpwd.val();
        if(rpwd!==upwd){
            $("#rc-inner-error").html("两次密码不一致").show()
        }else{
            $("#rc-inner-error").hide();
        }
    })
    $email.blur(()=>{
        var email=$email.val();
        var emailReg=/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/i;
        if(!emailReg.test(email)){
            $("#rc-inner-error").html("邮箱格式不正确").show();
            return;
        }else{
            $("#rc-inner-error").hide();
        }
    })
    $yzm.blur(()=>{
        var yzm=$yzm.val();
        var yzmReg=/^[a-z]{4}$/i;
        if(!yzmReg.test(yzm)){
            $("#rc-inner-error").html("验证码格式不正确").show();
            return;
        }
    })
    function checkName(uname){
        return new Promise(callback=>{
            $.ajax({
                type:"post",
                url:"data/routes/users/checkName.php",
                data:{uname:uname},
                dataType:"text"
            }).then(text=>{
                console.log(text);
                if(text=="false")
                    $("#rc-inner-error").html("用户名已存在").show();
                else
                    callback();
            })
        })
    }
    $("#btnReg").click(()=>{
        console.log(2);
        var $yzm=$("#yzm").val().toLowerCase();
        $.ajax({
            url:"data/routes/users/register.php",
            type:"POST",
            data:{uname:$uname.val().trim(),upwd:$upwd.val().trim(),yzm:$yzm.trim(),email:$email.val().trim(),phone:$phone.val().trim()},
            success:function(data) {
                console.log(data);
                if (data.code == -6) {
                    $("#rc-inner-error").html("验证码不正确").show();
                }
                location="index.html";
            },
            error:function() {
                alert("网络发生故障，请检查。。。")
            }
        })
    })
    $("#setYzm").click(function(){
        this.src = "data/code_yzm.php";
    })
})