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
    components: {},
    mounted () {
      this.url = window.location.href
      if (this.url.indexOf('code') < 0) {
        this.to()
      } else {
        this.getOpenId()
      }
    },
    methods: {
      getOpenId () {
        const that = this
        const data = {
//        const code = this.$route.query.code
          code: 123,
          type: 2 // 授权类型：1静默授权；2用户授权
        }
        const api = 'http://192.168.1.51/mp/authority'
        this.axios.post(api, data).then((res) => {
          const d = res.data
          if (d.success) {
            console.log(d)
            that.jump()
          }
        }, (errorRes) => {
          console.log(errorRes)
        })
      },
      to () {
        const oauthCallbackUrl = encodeURIComponent('http://192.168.1.51/VAOrderH5/#/zhengchang')
        const oauthJumpUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx980e7bb068f0b763&redirect_uri=${oauthCallbackUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
        window.location.href = oauthJumpUrl
      },
      // 如果有code 跳转页面
      jump () {
//        window.location.href = 'http://preapi.wuliaogoule.com/VAMall/H5/#/2'
        this.$router.replace({path: '/index'})
      }
    }
  }
</script>
