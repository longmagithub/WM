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
        const code = this.$route.query.code
        const type = 'zhengchang'
        const api = `http://preapi.wuliaogoule.com/VAMall/SG/api/wechat/getaccesstoken?code=${code}&type=${type}`
        this.axios.get(api).then((res) => {
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
        const oauthCallbackUrl = encodeURIComponent('http://preapi.wuliaogoule.com/VAMall/H5/#/2')
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
