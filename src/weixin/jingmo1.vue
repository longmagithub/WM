<template>
  <div>
    <!--<h1>{{msg}}</h1>-->
    <!--<h2>{{url}}</h2>-->
    <!--<div style="padding: 8px; border: 1px solid #ddd;" @click="jump">点我跳转【用户授权】</div>-->
  </div>
</template>
<script>
  import {urlParse, setStore, getStore} from '../common/js/util'
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
      let url = 'http://newpay.tunnel.qydev.com/VAOrderH5/?code=011oVaMa1xSVms08kSLa1P18Ma1oVaMY&state=STATE#/jingmo1?shopId=ca2939cf-f42f-402f-8b75-53283431ee68'
      this.shopId = getStore('user').shopId
      console.log(url.split('='))
    },
    mounted () {
      this.url = window.location.href
      if (this.url.indexOf('code') > 0) {
//        this.getOpenId()
      }
    },
    methods: {
      getOpenId () {
//        const that = this
        const data = {
          code: urlParse().code,
          type: 1 // 授权类型：1静默授权；2用户授权
        }
        const api = '/mp/authority/customer'
        this.axios.post(api, data).then((res) => {
          let d = res.data
          if (d.success) {
            setStore('user', {
              'customerId': d.data.customerId
            })
//            that.jump()
          }
        }, (errorRes) => {
        })
      },
      jump () {
        window.location.href = 'http://newpay.tunnel.qydev.com/VAOrderH5/#/zhengchang'
      }
    }
  }
</script>
