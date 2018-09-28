var currentPage = 1;
var size = 5;

render();
function render(){
  $.ajax({
    type: 'get',
    url: '/user/queryUser',
    data: {
      page: currentPage,
      pageSize: size
    },
    dataType: 'json',
    success: function(info){
      $('.lt_content tbody').html(template('tmp',info));
      $('#paginator').bootstrapPaginator({
        bootstrapMajorVersion: 3,
        currentPage: currentPage,
        totalPages: Math.ceil(info.total/info.size),
        onPageClicked: function(a,b,c, page){
          currentPage = page;
          render(page);
        }
      }); 
    }
  });
}

// 点击按钮禁用或者启用这个用户

$('table').on('click','button',function(){
  $('#userModal').modal('show');
  var that = this;
  $('#userBtn').click(function(){
    $('#userModal').modal('hide');
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: $(that).attr('data-id'),
        isDelete: $(that).attr('data-isDelete')
      },
      dataType: 'json',
      success: function(info){
        if(info.success){
          render(currentPage);
        }
      }
    });
  });
  
});
