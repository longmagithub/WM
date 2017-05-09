<template>
</template>
<script>
  import {urlParse} from '../../common/utils/util'
  export default {
    data () {
      return {
        msg: '静默授权',
        url: '',
        code: ''
      }
    },
    created() {
      this.url = window.location.href
      if (this.url.indexOf('code') < 0) {
        this.to()
      } else {
        const data = {
          code: urlParse().code,
          type: 1 // 授权类型：1静默授权；2用户授权
        }
        this.axios.post('/mp/authority/customer', data).then((res) => {
          res = res.data
          this.goIndex(res.data.customerId)
        })
      }
    },
    methods: {
      to() {
        const oauthCallbackUrl =
          encodeURIComponent('http://newpay.tunnel.qydev.com/VAOrderH5/#/jingmo')
        const oauthJumpUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx96f6daa5f8a71039&redirect_uri=${oauthCallbackUrl}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
        // 跳转授权 浏览器不保留记录
        window.location.replace(oauthJumpUrl)
//        window.location.href = oauthJumpUrl
      },
      goIndex(id) {
        this.$router.replace({
          path: '/index',
          query: {
            customerId: id
          }
        })
      }
    }
  }
</script>
