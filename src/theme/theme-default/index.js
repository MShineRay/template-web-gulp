// import '@/theme/assets/common.css'// 公共css
// import '@/theme/assets/iconfont.css'//公共iconfont
// import './theme-base/index.css'
// import './assets/iconfont/iconfont.css'//业务iconfont 使用 https://www.iconfont.cn/ 维护
import { Button, Toast, Col, Row, Cell, CellGroup, Icon, Popup } from 'vant'
let install = function install(Vue) {
  Vue.use(Button)
  Vue.use(Toast)
  Vue.use(Col)
  Vue.use(Row)
  Vue.use(Cell)
  Vue.use(CellGroup)
  Vue.use(Icon)
  Vue.use(Popup)
}
let theme = {
  install: install,
}
export default theme
