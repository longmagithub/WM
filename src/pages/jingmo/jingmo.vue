<template>
</template>
<script>
  import {urlParse} from '../../common/utils/util'
//  import wxshare from '../../components/wxshare.vue'
  export default {
    data () {
      return {
        msg: '静默授权',
        url: '',
        code: '',
        customerId: '',
        shopId: ''
      }
    },
    created() {
      this.url = window.location.href
      console.log(this.url)
      if (this.url.indexOf('code') < 0) {
        this.to()
      } else {
        const data = {
          code: urlParse().code,
          type: 1 // 授权类型：1静默授权；2用户授权
        }
        this.axios.post('/mp/authority/customer', data).then((res) => {
          res = res.data
          if (res.success) {
            this.customerId = res.data.customerId
            this.shopId
            this.goIndex(this.customerId)
//            this.getShopList(res.data.customerId)
          }
        })
      }
    },
    methods: {
      to() {
        const oauthCallbackUrl =
          encodeURIComponent('http://newpay.tunnel.qydev.com/VAOrderH5/?#/jingmo')
        const oauthJumpUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx96f6daa5f8a71039&redirect_uri=${oauthCallbackUrl}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
        // 跳转授权 浏览器不保留记录
        window.location.replace(oauthJumpUrl)
//        window.location.href = oauthJumpUrl
      },
      goIndex(custId) {
        window.location.replace('http://newpay.tunnel.qydev.com/VAOrderH5/?#/shopList?customerId=' + custId + '&t=' + Date.parse(new Date()))
//        this.$router.replace({
//          path: '/index',
//          query: {
//            customerId: id
//          }
//        })
      }
    }
//    ,
//    components: {
//      wxshare
//    }
  }
</script>
