<template>
  <div>
    <!--<h1>{{msg}}</h1>-->
    <!--<h2>{{url}}</h2>-->
  </div>
</template>
<script>
  import {urlParse, getStore} from '../common/js/util'

  export default {
    data () {
      return {
        msg: '用户授权',
        url: ''
      }
    },
    created() {
      let url = window.location.href.split('=')
      console.log(url)
      console.log(getStore('userInfoID'))
//      this.shopId = url[url.length - 1]
    },
    mounted () {
      this.url = window.location.href
      if (this.url.indexOf('code') < 0) {
        this.to()
      } else {
        this.getOpenId()
      }
    },
    methods: {
      to () {
        const oauthCallbackUrl = encodeURIComponent('http://newpay.tunnel.qydev.com/VAOrderH5/#/zhengchang1')
        const oauthJumpUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4340e30a4fa4b63b&redirect_uri=${oauthCallbackUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
        window.location.href = oauthJumpUrl
      },
      getOpenId () {
        const data = {
          customerId: getStore('userInfoID').customerId,
          code: urlParse().code,
          type: 2 // 授权类型：1静默授权；2用户授权
        }
        const api = '/mp/authority/customer'
        this.axios.post(api, data).then((res) => {
          const d = res.data
          if (d.success) {
            this.jump(d.data.customerId)
          }
        }, (errorRes) => {
          console.log(errorRes)
        })
      },
      // 如果有code 跳转页面
      jump (customerId) {
        this.$router.replace({
          path: '/index',
          query: {
            'shopId': getStore('userInfoID').shopId,
            'customerId': customerId
          }
        })
      }
    }
  }
</script>
