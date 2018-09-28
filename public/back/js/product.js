var currentPage = 1;
var size = 5;

render(currentPage);
function render(currentPage){
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetailList',
    data: {
      page: currentPage,
      pageSize: size
    },
    dataType: 'json',
    success: function(info){
      console.log(info);
      $('.lt_content tbody').html(template('tmp',info));
      $('#paginator').bootstrapPaginator({
        bootstrapMajorVersion: 3,
        currentPage: currentPage,
        totalPages: Math.ceil(info.total/info.size),
        onPageClicked: function(a,b,c,page){
          currentPage = page;
          render(currentPage);
        }
      });
    }
  });
}