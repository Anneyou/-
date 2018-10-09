$(function(){
// 将历史记录储存在localStorage中,然后读取并渲染到页面上

render();
// 获取本地存储的数据，并转为复杂数据类型 数组/对象
function getStorage() {
  var history = localStorage.getItem('search_list') || '[]';
  var arr = JSON.parse(history);
  return arr;
}

// 渲染历史记录模块
function render(){
  var arr = getStorage();
  $('.lt_history').html(template('tpl',{list: arr}));
}
// 清空记录操作
$('.lt_history').on('click', '.btn_empty',function(){
  mui.confirm('你确定要删除该条记录嘛', '温馨提示', ['取消', '确认'], function( e ){
    console.log(e);
    if(e.index === 1){
      localStorage.removeItem('search_list');
      render();
    }
  }); 
});


// 给每个小叉叉添加点击事件,删除单条记录
$('.lt_history').on('click', '.btn_delete', function(){
  // 弹出确认框根据用户点击的效果是否执行删除操作
  // .confirm( message, title, btnValue, callback [, type] )
  // message:提示对话框上显示的内容
  // title:提示对话框上显示的标题
  // btnValue:提示对话框上按钮显示的内容
  // callback:提示对话框上关闭后的回调函数
  mui.confirm('你确定要删除该条记录嘛', '温馨提示', ['取消', '确认'], function( e ){
    console.log(e);
    if(e.index === 1){
      var index = $(this).data('index');
      var arr = getStorage();
      arr.splice( index, 1);
      localStorage.setItem('search_list', JSON.stringify(arr));
      render();
    }
  }); 




  // var index = $(this).data('index');
  // console.log(index);
  // var arr = getStorage();
  // arr.splice( index, 1);
  // localStorage.setItem('search_list', JSON.stringify(arr));
  // render();
});

// 点击搜索按钮，添加记录并渲染
  // 步骤: 1.注册点击事件，获取输入框中的内容
  //       2.判断本地存储中是否存在这条记录，存在就删除，并将记录添加到最前面
$('.search_btn').click(function(){
  var text = $('.search_input').val().trim();
  if(text === ''){
    mui.toast('请输入搜索关键字');
  }else{
    var arr = getStorage();
    var index = arr.indexOf(text);
    if( index != -1 ){
      // 说明重复，删除
      arr.splice( index, 1 );
      
    }
    if( arr.length >= 10 ){
      arr.pop();
    }
    arr.unshift(text);
    localStorage.setItem('search_list', JSON.stringify(arr));
    $('.search_input').val('');
    render();
    location.href = "searchList.html?key="+text; 
  }
  
});





});