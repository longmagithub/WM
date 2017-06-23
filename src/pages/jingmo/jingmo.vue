<template>
</template>
<script>
  import {urlParse, getStore, setStore} from '../../common/utils/util'
  //  import wxshare from '../../components/wxshare.vue'
  const MEMBERCARD = '/memberCard'
  const SHOPLIST = '/shopList'
  export default {
    data () {
      return {
        msg: '静默授权',
        url: '',
        code: '',
        customerId: '',
        shopId: '',
        location: {
          longitude: '', // 经度
          latitude: '' // 维度
        }
      }
    },
    created() {
      this.url = window.location.href
      // console.log(this.url)
      if (this.url.indexOf('code') < 0) { //  没有code
        setStore('entry', this.$router.history.current.path)
        this.to()
      } else {  //  有code
        const data = {
          code: urlParse().code,
          type: 1 // 授权类型：1静默授权；2用户授权
        }
        console.log(data)
        this.axios.post('/mp/authority/customer', data).then((res) => {
          res = res.data
          if (res.success) {
            this.customerId = res.data.customerId
            setStore('customerId', this.customerId)
            setStore('openId', res.data.openId)
            setStore('token', res.data.token)
            // choose entry
            let entry = getStore('entry')
            switch (entry) {
              case MEMBERCARD: {
                this.goMemberCard(res.data.customerId)
                break
              }
              case SHOPLIST: {
                this.getShopList(res.data.customerId)
                break
              }
              default: {
                this.getShopList(res.data.customerId)
                break
              }
            }
            this.getShopList(res.data.customerId)
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
        console.log(oauthJumpUrl)
        window.location.replace(oauthJumpUrl)
//        window.location.href = oauthJumpUrl
      },
      goMemberCard(custId) {
        window.location.replace('http://newpay.tunnel.qydev.com/VAOrderH5/?#/memberCard?customerId=' + custId)
      },
      getShopList(custId) {
        window.location.replace('http://newpay.tunnel.qydev.com/VAOrderH5/?#/shopList?customerId=' + custId + '&t=' + Date.parse(new Date()))
//        this.$router.replace({
//          path: '/index',
//          query: {
//            customerId: id
//          }
//        })
      }
    }
  }
</script>
