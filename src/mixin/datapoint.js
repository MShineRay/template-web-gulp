/**
 * 埋点
 */
function postData(data = {}) {
  let oAjax = null
  try {
    oAjax = new XMLHttpRequest()
  } catch (e) {
    oAjax = new window.ActiveXObject('Microsoft.XMLHTTP')
  }
  const __t = new Date().getTime()
  // post方式打开文件 /cashier
  // TODO 接口url
  oAjax.open('post', '/?t=' + __t, true)
  // post相比get方式提交多了个这个
  oAjax.setRequestHeader('Content-type', 'application/json')
  // post发送数据
  oAjax.send(JSON.stringify(data))
  oAjax.onreadystatechange = function () {}
}
const mixinDatapoint = {
  methods: {
    sendDataPoint(data = {}) {
      // https://developers.google.cn/analytics/devguides/collection/gtagjs/events
      // data对象只能为一层
      window.opay_gtag_event &&
        window.opay_gtag_event(data.pointKey, {
          event_category: data.pointKey + '_category',
          event_label: data.pointKey + '_label',
          ...data.data,
        })
      try {
        data.data = JSON.stringify(data.data)
        postData(data)
      } catch (e) {
        console.log(e)
      }
    },
    /**
     * 使用模块作用域保持不允许外部访问的函数的私有性。如果无法做到这一点，
     * 就始终为插件、混入等不考虑作为对外公共 API 的自定义私有 property 使用 $_ 前缀。
     * 并附带一个命名空间以回避和其它作者的冲突 (比如 $_yourPluginName_)。
     * @reference https://cn.vuejs.org/v2/style-guide/#%E7%A7%81%E6%9C%89-property-%E5%90%8D%E5%BF%85%E8%A6%81
     */
    $_datapoint_test() {
      console.log(11)
    },
  },
}

export default mixinDatapoint
