$(document).ajaxStart(function(){
  NProgress.start();
});
$(document).ajaxStop(function(){
  setTimeout(function(){
    NProgress.done();
  },500); 
});


// 左侧侧边栏下拉列表
// 点击category按钮二级菜单展开
$('.lt_aside .category').click(function(){
  $('.lt_aside .child').stop().slideToggle();
});

// 点击顶部导航左侧图标展开左侧导航
$('.icon_menu').click(function(){
  $('.lt_aside').toggleClass('hidemenue');
  $('.lt_main .lt_topbar').toggleClass('hidemenue');
  $('.lt_main').toggleClass('hidemenue');
});

// 点击退出按钮，弹出确认框，单击取消，弹出框隐藏。单击确认退出到登录页面，并发送给后端
$('.icon_logout').click(function(){
  $('#logoutModal').modal('show');
});

// 点击确定按钮退出登录
$('#logoutBtn').click(function(){
  $.ajax({
    type: 'get',
    url: '/employee/employeeLogout',
    success: function(info){
      if(info.success){
        location.href = 'login.html';
      }
    }
  })
});

