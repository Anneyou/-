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

// 1.点击添加分类，模态框出现,渲染二级分类项
$('#productBtn').click(function(){
  $('#productModal').modal('show');
  $.ajax({
    type: 'get',
    url: '/category/querySecondCategoryPaging',
    dataType: 'json',
    data: {
      page: 1,
      pageSize: 100
    },
    success: function(info){
      $('.dropdown-menu').html(template('productTmp',info));
    }
  });
});
// 2.点击下拉列表中的a，将内容复赋值给下拉列表的按钮
$('.dropdown-menu').on('click','a',function(){
  $('#dropdownTxt').text($(this).text());
  $('[name="brandId"]').val($(this).data('id'));
  $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
});
// 3.选择图片并预览功能
var picAddr = [];
$('#fileupload').fileupload({
  dataType:'json',
  // 每选择一次图片就会触发一次这个事件，动态创建img,添加到imgBox中
  done: function( e, data){
    console.log(data.result);
    // 创建img添加到imgBox的最前面
    $('#imgBox').prepend('<img src="'+ data.result.picAddr +'" width="100">');
    // 新添加的地址也添加到数组的最前面
    picAddr.unshift(data.result);
    if(picAddr.length > 3){
      picAddr.pop();
      $('#imgBox img:last-of-type').remove();
    }
    if(picAddr.length===3){
      // 长度等于3的时候
      // 更新校验状态
      $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID');
    } 
  }
});
// 4.表单校验，使用bootstrapValidator
$('#form').bootstrapValidator({
  excluded:[],
  feedbackIcons:{
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields:{
    proName:{
      validators:{
        notEmpty:{
          message:'请输入商品名称'
        }
      }
    },
    brandId:{
      validators:{
        notEmpty:{
          message:'请选择二级分类'
        }
      } 
    },
    proDesc:{
      validators:{
        notEmpty:{
          message:'请输入商品描述'
        }
      }
    },
    num:{
      validators:{
        notEmpty:{
          message:'请输入商品库存'
        },
        regexp:{
          regexp: /^[1-9]\d*$/,
          message:'商品库存格式, 必须是非零开头的数字'
        }
      }
    },
    size:{
      validators:{
        notEmpty:{
          message:'请输入商品尺码'
        },
        regexp:{
          regexp: /^\d{2}-\d{2}$/,
          message:'尺码格式, 必须是 32-40'
        }
      }
    },
    oldPrice:{
      validators:{
        notEmpty:{
          message:'请输入商品原价'
        }
      }
    },
    price:{
      validators:{
        notEmpty:{
          message:'请输入商品价格'
        }
      }
    },
    picStatus:{
      validators:{
        notEmpty:{
          message:'请上传3张图片'
        }
      }
    }
  }

});

// 5.表单验证成功提交ajax请求
$('#form').on('success.form.bv',function( e ){
  e.preventDefault();
  var data = $('#form').serialize();
  data +='&picName1=' + picAddr[0].picName + '&picAddr1=' + picAddr[0].picAddr;
  data +='&picName2=' + picAddr[1].picName + '&picAddr2=' + picAddr[1].picAddr;
  data +='&picName3=' + picAddr[2].picName + '&picAddr3=' + picAddr[2].picAddr; 
  console.log(data);
  $.ajax({
    type: 'post',
    url: '/product/addProduct',
    data: data,
    dataType:'json',
    success: function(info){
      console.log(info);
      if(info.success){
        $('#productModal').modal('hide');
        currentPage = 1;
        render(currentPage);
      }
    }
  });
});

