import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const jingmo = r => require.ensure([], () => r(require('../pages/jingmo/jingmo.vue')), 'jingmo')
const shopList = r => require.ensure([], () => r(require('../pages/shopList/shopList.vue')), 'shopList')
const erweima = r => require.ensure([], () => r(require('../pages/index/erweima.vue')), 'erweima')
const share = r => require.ensure([], () => r(require('../pages/shaerImg/shaerImg.vue')), 'share')
const inviteNum = r => require.ensure([], () => r(require('../pages/inviteNum/inviteNum.vue')), 'inviteNum')
const index = r => require.ensure([], () => r(require('../pages/index/index.vue')), 'index')
const orderList = r => require.ensure([], () => r(require('../pages/orderList/orderList.vue')), 'orderList')
const orderDetail = r => require.ensure([], () => r(require('../pages/orderDetail/orderDetail.vue')), 'orderDetail')
const addList = r => require.ensure([], () => r(require('../pages/addList/addList.vue')), 'addList')
const addNew = r => require.ensure([], () => r(require('../pages/addNew/addNew.vue')), 'addNew')
const shopDetail = r => require.ensure([], () => r(require('../pages/shopDetail/shopDetail.vue')), 'shopDetail')
const submitOrder = r => require.ensure([], () => r(require('../pages/submitOrder/submitOrder.vue')), 'submitOrder')
const remark = r => require.ensure([], () => r(require('../pages/submitOrder/remark/remark.vue')), 'remark')
const invoice = r => require.ensure([], () => r(require('../pages/submitOrder/invoice/invoice.vue')), 'invoice')
const submitPay = r => require.ensure([], () => r(require('../pages/submitPay/submitPay.vue')), 'submitPay')
const redlist = r => require.ensure([], () => r(require('../pages/redList/redlist.vue')), 'redlist')

const memberCard = r => require.ensure([], () => r(require('../pages/memberCard/memberCard.vue')), 'memberCard')
const recharge = r => require.ensure([], () => r(require('../pages/recharge/recharge.vue')), 'recharge')
const paySuccess = r => require.ensure([], () => r(require('../pages/paySuccess/paySuccess.vue')), 'paySuccess')
const payFail = r => require.ensure([], () => r(require('../pages/payFail/payFail.vue')), 'payFail')
const testPage = r => require.ensure([], () => r(require('../pages/testPage/testPage.vue')), 'testPage')
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
      // component: require('../pages/jingmo/jingmo.vue')
      component: jingmo
    },
    {
      path: '/jingmo',
      component: jingmo,
      alias: '/member'
    },
    // {
    //   path: '/jingmo',
    //   component: jingmo,
    //   alias: '/shopList'
    // },
    // loaning
    {
      path: '/loading',
      component: require('../pages/loading/loading.vue')
    },
    // shopList
    {
      path: '/shopList',
      // component: require('../pages/shopList/shopList.vue')
      component: shopList
    },
    // 二维码
    {
      path: '/erweima',
      // component: require('../pages/index/erweima.vue')
      component: erweima
    },
    // 分享
    {
      path: '/share',
      // component: require('../pages/shaerImg/shaerImg.vue')
      component: share
    },
    // 邀请码
    {
      path: '/inviteNum',
      // component: require('../pages/inviteNum/inviteNum.vue')
      component: inviteNum
    },
    // 首页
    {
      path: '/index',
      // component: require('../pages/index/index.vue')
      component: index
    },
    // 订单列表
    {
      path: '/orderList',
      // component: require('../pages/orderList/orderList.vue')
      component: orderList
    },
    // 订单详情
    {
      path: '/orderDetail',
      // component: require('../pages/orderDetail/orderDetail.vue')
      component: orderDetail
    },
    // 地址列表
    {
      path: '/addList',
      // component: require('../pages/addList/addList.vue')
      component: addList
    },
    // 新增/编辑 地址
    {
      path: '/addNew',
      // component: require('../pages/addNew/addNew.vue')
      component: addNew
    },
    // 商家详情
    {
      path: '/shopDetail',
      // component: require('../pages/shopDetail/shopDetail.vue')
      component: shopDetail
    },
    // 提交订单
    {
      path: '/submitOrder',
      // component: require('../pages/submitOrder/submitOrder.vue')
      component: submitOrder
    },
    // 订单备注
    {
      path: '/remark',
      // component: require('../pages/submitOrder/remark/remark.vue')
      component: remark
    },
    // 发票抬头
    {
      path: '/invoice',
      // component: require('../pages/submitOrder/invoice/invoice.vue')
      component: invoice
    },
    // 在线支付
    {
      path: '/submitPay',
      // component: require('../pages/submitPay/submitPay.vue')
      component: submitPay
    },
    // 红包页面
    {
      path: '/redlist',
      // component: require('../pages/redList/redlist.vue')
      component: redlist
    },
    // 会员卡页面
    {
      path: '/memberCard',
      component: memberCard
    },
    // 会员卡别名
    {
      path: '/memberCard',
      component: memberCard,
      alias: '/card'
    },
    // 会员充值页面
    {
      path: '/recharge',
      component: recharge
    },
    // 支付成功
    {
      path: '/paySuccess',
      component: paySuccess
    },
    // 支付失败
    {
      path: '/payFail',
      component: payFail
    },
    {
      path: '/testPage',
      component: testPage
    }
  ]
})

