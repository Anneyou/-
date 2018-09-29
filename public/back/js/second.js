$(function(){

  var currentPage = 1;
  var size = 5;
  render();
  //1. 进入页面渲染表格
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
        // console.log(info);
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
  
  //2. 点击添加按钮显示模态框，并初始化模态框
  $('#addBtn').click(function(){
    $('#addModal').modal('show');
    // 请求一级目录列表的数据，发送ajax,定义page:1, pageSize:100
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function(info){
        // 渲染对应的下拉列表,绑定模板引擎
        $('.dropdown-menu').html(template('dropdownList',info));
      }
    });
  
  });
  
  //3.下拉列表中a注册点击事件(事件委托)，手动设置给button中的dropdownTxt
  $('.dropdown-menu').on('click','a',function(){
    $('#dropdownTxt').text($(this).text());
    $('[name="categoryId"]').val($(this).data('id'));
    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
  });
  // 4.上传图片按钮功能，选择图片进行图片预览,
    // 做法：先通过插件将图片上传到服务端，然后在将图片地址返回赋值给img的src属性，并写如隐藏域
    $('#fileupload').fileupload({
      dataType: 'json',
      done: function(e, data){
        var picUrl = data.result.picAddr;
        console.log(picUrl);
        $('.imgBox img').prop('src',picUrl);
        $('[name="brandLogo"]').val(picUrl);
        $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
      }
    });

    // 校验初始化,进行表单校验，校验成功，后台发送ajax请求 
    $('#form').bootstrapValidator({
      excluded:[],
      feedbackIcons:{
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields:{
        categoryId:{
          validators:{
            notEmpty:{
              message:'请选择一级分类名'
            }
          }
        },
        brandName:{
          validators:{
            notEmpty:{
              message:'请填写二级分类名'
            }
          }
        },
        brandLogo:{
          validators:{
            notEmpty:{
              message:'请选择图片'
            }
          }
        }
      }
    });
   // 注册校验成功事件
    $('#form').on('success.form.bv',function( e ){
      $.ajax({
        type: 'post',
        url: '/category/addSecondCategory',
        data: $('#form').serialize(),
        success: function(info){
          if(info.success){
            $('#addModal').modal('hide');
            $('#form').data('bootstrapValidator').resetForm(true);
            $('#dropdownTxt').text('请选择一级目录');
            $('.imgBox img').prop('src','./images/none.png');
            currentPage=1;
            render(currentPage);
          }

        }
      });
    });






});
