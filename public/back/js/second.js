
var currentPage = 1;
var size = 5;
render();
function render(){
  $.ajax({
    type: 'get',
    url: '/category/querySecondCategoryPaging',
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
          currentPage= page;
          render(currentPage);
        }
      })
    }
  })
}