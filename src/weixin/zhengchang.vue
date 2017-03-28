<template>
  <div>
    <h1>{{msg}}</h1>
    <h2>{{url}}</h2>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        msg: '用户授权',
        url: ''
      }
    },
    mounted () {
      this.url = window.location.href
      if (this.url.indexOf('code') < 0) {
        this.to()
      }
    },
    methods: {
      to () {
        const oauthCallbackUrl = encodeURIComponent('http://newpay.tunnel.qydev.com/VAOrderH5/#/zhengchang1')
        const oauthJumpUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx980e7bb068f0b763&redirect_uri=${oauthCallbackUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
        window.location.href = oauthJumpUrl
      }
    }
  }
</script>
