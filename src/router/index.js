import Vue from 'vue'
import VueRouter from 'vue-router'

import routeTest from './routes/routeTest'
import Home from '../views/Home.vue'
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

Vue.use(VueRouter)

const routes = [
  // 注意：自测功能，生产环境可以注释掉
  ...routeTest,

  // 注意：下面两个路由配置，默认放到最后
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // {
  //   path: "/test",
  //   name: "Test",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "test" */ "../views-test/Test.vue"),// 异步加载、模块分组打包
  // },
  {
    path: '*',
    redirect: '/test',
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
