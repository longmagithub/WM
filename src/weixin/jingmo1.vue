<template>
  <div>
    <h1>{{msg}}</h1>
    <h2>{{url}}</h2>
     <!--<div style="padding: 8px; border: 1px solid #ddd;" @click="jump">点我跳转【用户授权】</div>-->
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
      if (this.url.indexOf('code') > 0) {
        window.alert('yes code')
        this.getOpenId()
      }
    },
    methods: {
      getOpenId () {
        const that = this
        const data = {
          code: this.$route.query.code,
          type: 1 // 授权类型：1静默授权；2用户授权
        }
        const api = '/mp/authority'
        this.axios.post(api, data).then((res) => {
          let d = res.data
          if (d.success) {
            that.jump()
          }
        }, (errorRes) => {
          console.log(errorRes)
        })
      },
      jump () {
        this.$router.replace({path: 'http://newpay.tunnel.qydev.com/VAOrderH5/#/zhengchang'})
      }
    }
  }
</script>
