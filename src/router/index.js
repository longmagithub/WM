import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// const jingmo = r => require.ensure([], () => r(require('../weixin/jingmo.vue')), 'jingmo')
// const jingmo1 = r => require.ensure([], () => r(require('../weixin/jingmo1.vue')), 'jingmo1')
// const zhengchang = r => require.ensure([], () => r(require('../weixin/zhengchang.vue')), 'zhengchang')
// const zhengchang1 = r => require.ensure([], () => r(require('../weixin/zhengchang1.vue')), 'zhengchang1')
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
      redirect: '/jingmo' // 重定向到 /jingmo
    },
    // 静默授权
    {
      path: '/jingmo',
      component: require('../pages/jingmo/jingmo.vue')
    },
    // 分享
    {
      path: '/share',
      component: require('../pages/shaerImg/shaerImg.vue')
    },
    // 邀请码
    {
      path: '/inviteNum',
      component: require('../pages/inviteNum/inviteNum.vue')
    },
    // 首页
    {
      path: '/index',
      component: require('../pages/index/index.vue')
    },
    // 订单列表
    {
      path: '/orderList',
      component: require('../pages/orderList/orderList.vue')
    },
    // 订单详情
    {
      path: '/orderDetail',
      component: require('../pages/orderDetail/orderDetail.vue')
    },
    // 地址列表
    {
      path: '/addList',
      component: require('../pages/addList/addList.vue')
    },
    // 新增/编辑 地址
    {
      path: '/addNew',
      component: require('../pages/addNew/addNew.vue')
    },
    // 商家详情
    {
      path: '/shopDetail',
      component: require('../pages/shopDetail/shopDetail.vue')
    },
    // 提交订单
    {
      path: '/submitOrder',
      component: require('../pages/submitOrder/submitOrder.vue')
    },
    // 订单备注
    {
      path: '/remark',
      component: require('../pages/submitOrder/remark/remark.vue')
    },
    // 发票抬头
    {
      path: '/invoice',
      component: require('../pages/submitOrder/invoice/invoice.vue')
    },
    // 在线支付
    {
      path: '/submitPay',
      component: require('../pages/submitPay/submitPay.vue')
    }
  ]
})

