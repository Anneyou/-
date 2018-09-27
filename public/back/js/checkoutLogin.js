// 校验当前用户是否是登录状态
$.ajax({
  type:'get',
  url: '/employee/checkRootLogin',
  datatype: 'json',
  success: function(info){
    if(info.error === 400){
      location.href = 'login.html';
    }
  }
});