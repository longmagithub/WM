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
        shopId: '',
        time: Date.parse(new Date()) / 100000
      }
    },
    created() {
      this.shopId = window.location.href.split('=')[1]
      this.to()
      console.log('jingmo')
    },
    mounted () {
      this.url = window.location.href
      if (this.url.indexOf('code') < 0) {
      }
    },
    methods: {
      to () {
        const oauthCallbackUrl =
          encodeURIComponent('http://newpay.tunnel.qydev.com/VAOrderH5/#/jingmo1')
        const oauthJumpUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx96f6daa5f8a71039&redirect_uri=${oauthCallbackUrl}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
        // 跳转授权 浏览器不保留记录
        // window.location.replace(oauthJumpUrl)
        window.location.href = oauthJumpUrl
      }
    }
  }
</script>
