var currentPage = 1;
var size = 5;
render(currentPage);
function render(currentPage){
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategoryPaging',
    data: {
      page: currentPage,
      pageSize: size
    },
    dataType: 'json',
    success: function( info ){
      console.log(info);
      $('.lt_content tbody').html(template('tmp', info));
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


// 添加分类功能
$('#addBtn').click(function(){
  $('#addModal').modal('show');

});

$('#form').bootstrapValidator({
  feedbackIcons:{
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields:{
    category:{
      validators:{
        notEmpty:{
          message: '请输入一级分类名称'
        }
      }
    }
  }
});

$('#form').on('success.form.bv',function(e){
  e.preventDefault();
  console.log($('#form').serialize());
  $.ajax({
    type:'post',
    url: '/category/addTopCategory',
    data: $('#form').serialize(),
    dataType: 'json',
    success: function(info){
      if(info.success){
        render(currentPage);
      }
      $('#form').data('bootstrapValidator').resetForm();
      $('#form')[0].reset();
      $('#addModal').modal('hide');
 
    }
  });
});