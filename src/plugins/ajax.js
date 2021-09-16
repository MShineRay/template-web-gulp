'use strict'

// import Vue from 'vue'
// import axios from 'axios'
// import { Toast } from 'vant'

// const config = {
//   baseURL: '',
//   timeout: 60 * 1000 // Timeout
//   // withCredentials: true, // 是否携带cookie信息
// }
// const _axios = axios.create(config)
//
// _axios.interceptors.request.use(
//   function(config) {
//     Toast.loading({
//       message: 'Loading...',
//       forbidClick: true,
//       duration: 0
//     })
//     // Do something before request is sent
//     return config
//   },
//   function(error) {
//     // Do something with request error
//     return Promise.reject(error)
//   }
// )
//
// // Add a response interceptor
// _axios.interceptors.response.use(
//   function(response) {
//     Toast.clear()
//     if (response.data.code !== '00000') {
//       Toast(response.data.message)
//       return Promise.reject()
//     }
//     // Do something with response data
//     return response
//   },
//   function(error) {
//     // Do something with response error
//     Toast(error.message)
//     return Promise.reject(error)
//   }
// )
//
// Plugin.install = function(Vue) {
//   Vue.axios = _axios
//   window.axios = _axios
//   Object.defineProperties(Vue.prototype, {
//     axios: {
//       get() {
//         return _axios
//       }
//     },
//     $axios: {
//       get() {
//         return _axios
//       }
//     }
//   })
// }
//
// Vue.use(Plugin)

export default Plugin
