<template>
  <div>
    <!--<h1>{{msg}}</h1>-->
    <!--<h2>{{url}}</h2>-->
    <!--<div style="padding: 8px; border: 1px solid #ddd;" @click="jump">点我跳转【用户授权】</div>-->
  </div>
</template>
<script>
  import {urlParse} from '../common/js/util'
  export default {
    data () {
      return {
        msg: '静默授权',
        url: '',
        shopId: '',
        customerId: ''
      }
    },
    created() {
      console.log(window.location.href)
      let url = window.location.href.split('=')
      this.shopId = url[url.length - 1]
    },
    mounted () {
      this.url = window.location.href
      if (this.url.indexOf('code') > 0) {
        this.getOpenId()
      }
    },
    methods: {
      getOpenId () {
        const data = {
          code: urlParse().code,
          type: 1 // 授权类型：1静默授权；2用户授权
        }
        const api = '/mp/authority/customer'
        this.axios.post(api, data).then((res) => {
          let d = res.data
          if (d.success) {
            this.jump(d.data.customerId)
          }
        }, (errorRes) => {
          console.log(errorRes)
        })
      },
      jump (customerId) {
//        this.$router.replace({
//          path: '/shopList',
//          query: {
//            t: Date.parse(new Date()) / 100000,
//            'customerId': customerId
//          }
//        })
        window.location.replace('http://newpay.tunnel.qydev.com/VAOrderH5/?#/orderList?customerId=' + customerId +
          '&T=' + Date.parse(new Date()) / 100000)
      }
    }
  }
</script>
