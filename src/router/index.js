import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Help from '../views/help.vue'

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/shopDetail',
      component: require('../views/shopDetail.vue')
    },
    {
      path: '/store',
      component: require('../views/store.vue')
    }, {
      path: '/404',
      component: require('../views/404.vue')
    }, {
      path: '/index',
      component: require('../views/index.vue')
    }, {
      path: '/mock',
      component: require('../views/mock.vue')
    }, {
      path: '/help',
      component: Help
    }, {
      path: '/',
      redirect: '/index'
    }
  ]
})
