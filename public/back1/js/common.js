// 进度条显示页面加载进度

// 1.在第一个ajax发送请求之前开启进度条
// 2.在所有ajax发送完成时完成进度条
// ajax的全局事件
  // .ajaxComplete() ajax完成请求时调用
  // .ajaxError() ajax请求错误时 调用
  // .ajaxSuccess() 当ajax请求成功时调用
  // .ajaxSend()  ajax发送请求前调用
  // .ajaxStart() 发送第一个ajax时，调用
  // .ajaxStop()  所有的ajax请求完成时调用
  $(document).ajaxStart(function(){
    NProgress.start();
  });
  $(document).ajaxStop(function(){
    NProgress.done();
  })
