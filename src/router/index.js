import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/shopDetail',
      component: require('../views/shopDetail.vue')
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
