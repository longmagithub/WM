<template>
  <div>
    <!--<h1>{{msg}}</h1>-->
    <!--<h2>{{url}}</h2>-->
    <!-- <div style="padding: 8px; border: 1px solid #ddd;" @click="jump">点我跳转【用户授权】</div> -->
  </div>
</template>
<script>
  export default {
    data () {
      return {
        msg: '静默授权',
        url: ''
      }
    },
    mounted () {
      this.url = window.location.href
      window.alert(this.url.indexOf('code'))
      if (this.url.indexOf('code') < 0) {
        window.alert('NO code')
        this.to()
      }
    },
    methods: {
      to () {
        window.alert('获取code')
        const oauthCallbackUrl = encodeURIComponent('http://newpay.tunnel.qydev.com/VAOrderH5/#/jingmo1')
        const oauthJumpUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx980e7bb068f0b763&redirect_uri=${oauthCallbackUrl}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
        window.location.href = oauthJumpUrl
      }
    }
  }
</script>
