<template>
  <div>
    <h1>{{msg}}</h1>
    <h2>{{url}}</h2>
    <!--<div style="padding: 8px; border: 1px solid #ddd;" @click="jump">点我跳转【用户授权】</div>-->
  </div>
</template>
<script>
  import {urlParse, setStore} from '../common/js/util'
  export default {
    data () {
      return {
        msg: '静默授权',
        url: ''
      }
    },
    mounted () {
      this.url = window.location.href
      if (this.url.indexOf('code') > 0) {
        this.getOpenId()
      }
    },
    methods: {
      getOpenId () {
        const that = this
        const data = {
          code: urlParse().code,
          type: 1 // 授权类型：1静默授权；2用户授权
        }
        const api = '/mp/authority/customer'
        this.axios.post(api, data).then((res) => {
          let d = res.data
          if (d.success) {
            console.log(urlParse().shopId)
            setStore('user', {
              'shopId': urlParse().shopId,
              'customerId': d.data.customerId
            })
            that.jump()
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
