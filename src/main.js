// 引入vue
import Vue from 'vue'
// 引入项目主页
import App from './App.vue'
// 引入路由
import router from './router'
// 引入状态管理
import store from './store'
// 引入数据加载
import axios from 'axios'
import VueAxios from 'vue-axios'
// 引入表单校验
import VueValidator from 'vue-validator'
// 引入路由和状态同步
import { sync } from 'vuex-router-sync'
// 引入自定义过滤
import * as filters from './filters'
// 添加mockjs拦截请求，模拟返回服务器数据
import mock from './plugins/mock'
// 引入工具类
// import * as utils from './utils'
// 引入初始化
// import init from './init.js'

// 引入共用 js
import * as PublicJs from './utils/public.js'

// icon字体
import IconFont from './components/iconfont.vue'
Vue.component('iconfont', IconFont)

// 同步路由和状态
sync(store, router)

// 注册全局实用过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
console.log(mock)

Vue.use(VueAxios, axios) // 声明使用VueAxios
Vue.use(VueValidator) // 声明使用vue-validator

// 注册
Vue.prototype.PublicJs = PublicJs

const app = new Vue({
  router,
  store,
  ...App
}).$mount('#app')

export { app, router, store }
