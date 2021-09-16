import Vue from 'vue'
import App from './App.vue'
import router from './router'
import filters from './filters'
import store from './store'
import VuePlugs from './common/vuePlugs'
import { Locale } from 'vant'
// 引入英文语言包
import enUS from 'vant/es/locale/lang/en-US'
Locale.use('en-US', enUS)
import i18n from './locale/index'
import locale from '@/mixin/locale'
Vue.mixin(locale)
/**
 * 桌面端适配
 * Vant 是一个面向移动端的组件库，因此默认只适配了移动端设备，这意味着组件只监听了移动端的 touch 事件，
 * 没有监听桌面端的 mouse 事件。
 * 如果你需要在桌面端使用 Vant，可以引入我们提供的 @vant/touch-emulator，
 * 这个库会在桌面端自动将 mouse 事件转换成对应的 touch 事件，使得组件能够在桌面端使用。
 * @reference https://youzan.github.io/vant/#/zh-CN/advanced-usage
 */
// 引入模块后自动生效
// import '@vant/touch-emulator'

Vue.use(VuePlugs)
Vue.config.productionTip = false
for (const key in filters) {
  Vue.filter(key, filters[key])
}
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
