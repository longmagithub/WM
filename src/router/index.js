import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// const jingmo = r => require.ensure([], () => r(require('../weixin/jingmo.vue')), 'jingmo')
// const jingmo1 = r => require.ensure([], () => r(require('../weixin/jingmo1.vue')), 'jingmo1')
// const zhengchang = r => require.ensure([], () => r(require('../weixin/zhengchang.vue')), 'zhengchang')
// const zhengchang1 = r => require.ensure([], () => r(require('../weixin/zhengchang1.vue')), 'zhengchang1')
// const shopList = r => require.ensure([], () => r(require('../views/shopList.vue')), 'shopList')
// const orderList = r => require.ensure([], () => r(require('../views/orderList.vue')), 'orderList')
// const orderDetail = r => require.ensure([], () => r(require('../views/orderDetail.vue')), 'orderDetail')
// const addList = r => require.ensure([], () => r(require('../views/addList.vue')), 'addList')
// const addNew = r => require.ensure([], () => r(require('../views/addNew.vue')), 'addNew')
// const shopDetail = r => require.ensure([], () => r(require('../views/shopDetail.vue')), 'shopDetail')
// const index = r => require.ensure([], () => r(require('../components/index/index.vue')), 'index')
// const submitPay = r => require.ensure([], () => r(require('../components/submitPay/submitPay.vue')), 'submitPay')
// const submitOrder = r => require.ensure([], () => r(require('../components/submitOrder/submitOrder.vue')), 'submitOrder')
// const remark = r => require.ensure([], () => r(require('../components/submitOrder/remark/remark.vue')), 'remark')
// const invoice = r => require.ensure([], () => r(require('../components/submitOrder/invoice/invoice.vue')), 'invoice')
export default new Router({
  scrollBehavior: () => ({y: 0}),
  routes: [
    // 默认
    {
      path: '/',
      redirect: '/shopList' // 重定向到 /jingmo
    },
    {
      path: '/jingmo',
      redirect: '/shopList' // 重定向到 /jingmo
    },
    {
      path: '/userOrderList',
      redirect: '/orderList' // 重定向到 /门店列表
    },
    // 除去缓存
    {
      path: '/jingmo',
      component: require('../views/jingmo.vue')
    },
    // 静默授权
    {
      path: '/shopList',
      component: require('../views/shopList.vue')
    },
    // 静默授权
    {
      path: '/jingmo2',
      component: require('../weixin/jingmo.vue')
    },
    // 静默授权1
    {
      path: '/jingmo1',
      component: require('../weixin/jingmo1.vue')
    },
    // 正常授权
    {
      path: '/zhengchang2',
      component: require('../weixin/zhengchang.vue')
    },
    // 正常授权1
    {
      path: '/zhengchang1',
      component: require('../weixin/zhengchang1.vue')
    },
    // 分享
    {
      path: '/share',
      component: require('../components/shaerImg.vue')
    },
    // 邀请码
    {
      path: '/inviteNum',
      component: require('../views/inviteNum.vue')
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

