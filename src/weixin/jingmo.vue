<template>
  <div>
    <h1>{{msg}}</h1>
    <h2>{{url}}</h2>
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
    components: {},
    mounted () {
      this.url = window.location.href
      if (this.url.indexOf('code') < 0) {
        console.log(this.url)
        this.to()
      } else {
        this.getOpenId()
      }
    },
    methods: {
      getOpenId () {
        const that = this
        const code = this.$route.query.code
        const type = 'jingmo'
        const api = `http://preapi.wuliaogoule.com/VAMall/SG/api/wechat/getaccesstoken?code=${code}&type=${type}`
        this.axios.get(api).then((res) => {
          const d = res.data
          if (d.success) {
            that.jump()
          }
        }, (errorRes) => {
        })
      },
      to () {
        const oauthCallbackUrl = encodeURIComponent('http://preapi.wuliaogoule.com/VAMall/H5/#/1')
        const oauthJumpUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx12bf64f5c4595c36&redirect_uri=${oauthCallbackUrl}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
        window.location.href = oauthJumpUrl
      },
      jump () {
        this.$router.replace({path: '/zhengchang'})
      }
    }
  }
</script>
