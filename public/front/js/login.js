$(function(){

  $('#loginBtn').click(function(){
    var username =$('#username').val();
    var password= $('#password').val();
    if(username.trim() === ''){
      mui.toast('请输入用户名');
      return;
    }
    if(password.trim() === ''){
      mui.toast('请输入密码');
      return;
    }
    // 发送ajax请求
    $.ajax({
      type: 'post',
      url: '/user/login',
      data: {
        username : username,
        password : password
      },
      dataType: 'json',
      success: function( info ){
        console.log( info );
        if(info.error){
          mui.toast('用户名或密码错误');
          return; 
        }
        if(info.success){
          location.href="user.html";
        }
      }
    });

  });
});