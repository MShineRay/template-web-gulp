require.config({
  baseUrl: '/static',
  urlArgs: 'bust=' + (new Date()).getTime(),
  paths: {
    style: 'assets/require/css',
    jquery: 'assets/jquery/jquery-1.11.3.min',
    // template: 'assets/artTemplate/template',
    layui: 'assets/layui/layui',
    mock: 'assets/mockjs/mock',
    index: 'js/index',
    utils: 'js/utils',
  },
  shim: {
    // layui: {
    //   deps: ['style!assets/layui/css/layui.css']
    // },
    // index: {
    //   deps: ['style!assets/styles/index.css']
    // },
    // footer: {
    //   deps: ['style!assets/styles/footer.css']
    // }
  }
})
