import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
  scrollBehavior: () => ({y: 0}),
  mode: 'hash',
  routes: [
    // 默认
    {
      path: '/',
      redirect: '/jingmo' // 重定向到 /jingmo
    },
    // 静默授权
    {
      path: '/jingmo',
      component: require('../weixin/jingmo.vue')
    },
    // 静默授权1
    {
      path: '/jingmo1',
      component: require('../weixin/jingmo1.vue')
    },
    // 正常授权
    {
      path: '/zhengchang',
      component: require('../weixin/zhengchang.vue')
    },
    // 正常授权1
    {
      path: '/zhengchang1',
      component: require('../weixin/zhengchang1.vue')
    },
    // 首页
    {
      path: '/index',
      component: require('../components/index/index.vue')
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
    // 商家详情
    {
      path: '/shopDetail',
      component: require('../views/shopDetail.vue')
    },
    // 提交订单
    {
      path: '/submitOrder',
      component: require('../components/submitOrder/submitOrder.vue')
    },
    // 订单备注
    {
      path: '/remark',
      component: require('../components/submitOrder/remark/remark.vue')
    },
    // 发票抬头
    {
      path: '/invoice',
      component: require('../components/submitOrder/invoice/invoice.vue')
    },
    // 在线支付
    {
      path: '/submitPay',
      component: require('../components/submitPay/submitPay.vue')
    }
  ]
})
/*
 const router = new Router()
 router.beforeEach((to, from, next) => {
 const token = window.sessionStorage.getItem('demo-token')
 if (to.path === '/' || to.path === '/submitPay') { // 如果是跳转到登录页的
 if (token !== 'null' && token !== null) {
 next('/todolist') // 如果有token就转向todolist不返回登录页
 }
 next() // 否则跳转回登录页
 } else {
 if (token !== 'null' && token !== null) {
 Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
 next() // 如果有token就正常转向
 } else {
 next('/') // 否则跳转回登录页
 }
 }
 })
 */

