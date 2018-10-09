$(function(){
  $.ajax({
    type:'get',
    url: '/user/queryUserMessage',
    dataType: 'json',
    success: function( info ){
      if( info.error === 400){
        location.href= 'login.html';
        return;
      }
      $('.mui-media').html(template('tpl', info));
    }
  });

  $('#loginout').click(function(){
    $.ajax({
      type: 'get',
      url: '/user/logout',
      dataType: 'json',
      success: function( info ){
        if(info.success){
          location.href= 'login.html';
        }
      }
    });
  
  });
});