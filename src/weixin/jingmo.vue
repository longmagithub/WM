<template>
  <div>
    <!--<h1>{{msg}}</h1>-->
    <!--<h2>{{url}}</h2>-->
    <!-- <div style="padding: 8px; border: 1px solid #ddd;" @click="jump">点我跳转【用户授权】</div> -->
  </div>
</template>
<script>
  //  import {setStore} from '../common/js/util'
  export default {
    data () {
      return {
        msg: '静默授权',
        url: '',
        shopId: ''
      }
    },
    created() {
      this.shopId = window.location.href.split('=')[1]
    },
    mounted () {
      this.url = window.location.href
      if (this.url.indexOf('code') < 0) {
        this.to()
      }
    },
    methods: {
      to () {
        const oauthCallbackUrl =
          encodeURIComponent(`http://newpay.tunnel.qydev.com/VAOrderH5/#/jingmo1?shopId=${this.shopId}`)
        const oauthJumpUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx980e7bb068f0b763&redirect_uri=${oauthCallbackUrl}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
        window.location.href = oauthJumpUrl
      }
    }
  }
</script>
