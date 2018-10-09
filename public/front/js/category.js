$(function(){
// 先渲染左边的导航部分
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategory',
    dataType: 'json',
    success: function(info){
      console.log(info);
      $('.lt_category_left ul').html(template('left_tpl', info));
      renderBrand(info.rows[0].id);
    }
  });

  // 给左侧的导航分别注册点击事件
  $('.lt_category_left').on('click', 'a', function(){
    var id = $(this).data('id');
    console.log(id);
    $(this).addClass('current').parent().siblings().children().removeClass('current');
    renderBrand(id);
  });



  function renderBrand(id){
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategory',
      data: {
         id: id
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        $('.lt_category_right ul').html(template('right_tpl', info));
      }
    });
  }

});