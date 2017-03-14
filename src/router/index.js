import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: [
    // 商家详情
    {
      path: '/shopDetail',
      component: require('../views/shopDetail.vue')
    },
    // 订单列表
    {
      path: '/orderList',
      component: require('../views/orderList.vue')
    },
    // 订单详情
    {
      path: '/orderDetail',
      component: require('../views/orderDetail.vue')
    },
    // 地址列表
    {
      path: '/addList',
      component: require('../views/addList.vue')
    },
    // 新增/编辑 地址
    {
      path: '/addNew',
      component: require('../views/addNew.vue')
    },
    { // 首页
      path: '/index',
      component: require('../components/index/index.vue'),
      children: [
        {
          path: '/',
          redirect: '/goods'
        },
        { // 首页
          path: '/goods',
          component: require('../components/goods/goods.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: '/index'
    }
  ]
})
