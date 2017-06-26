<template>
</template>
<script>
  import {urlParse, setStore} from '../../common/utils/util'
  import {config} from '../../common/utils/index'
  //  import wxshare from '../../components/wxshare.vue'
  const MEMBERCARD = 'member'
  const SHOPLIST = 'jingmo'
  const targetURL = config.test.url
  const appId = config.test.appId
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
        },
        state: ''
      }
    },
    created() {
      this.url = window.location.href
      // console.log(this.url)
      if (this.url.indexOf('code') < 0) { //  没有code
        this.state = this.$router.history.current.path
        console.log('state: ' + this.state)
        // setStore('entry', entry)
        this.to()
      } else {                            //  有code
        const data = {
          code: urlParse().code,
          type: 1 // 授权类型：1静默授权；2用户授权
        }
        this.state = urlParse(window.location.herf).entry
        // console.log(data)
        this.axios.post('/mp/authority/customer', data).then((res) => {
          res = res.data
          if (res.success) {
            this.customerId = res.data.customerId
            setStore('customerId', this.customerId)
            setStore('openId', res.data.openId)
            setStore('token', res.data.token)
            // choose entry
            let entry = urlParse(window.location.herf).state
            // let entry = this.$router.history.current.path.toString()
            console.log('found entry:' + typeof (entry))
            console.log(entry)

            if (entry.indexOf(SHOPLIST) >= 0) {
              this.getShopList()
            } else if (entry.indexOf(MEMBERCARD) >= 0) {
              this.goMemberCard()
            }
            // window.alert(entry)
            console.log('no if-else path matching')
            this.goMemberCard(res.data.customerId)
          }
        })
          .catch((error) => {
            console.log('network error: ' + error)
          })
      }
    },
    methods: {
      to() {
        const oauthCallbackUrl =
          encodeURIComponent(targetURL + '/?#' + this.state)
          // encodeURIComponent('http://newpay.tunnel.qydev.com/VAOrderH5/?#/jingmo')
        // const oauthJumpUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx96f6daa5f8a71039&redirect_uri=${oauthCallbackUrl}&response_type=code&scope=snsapi_base&state=${this.state}#wechat_redirect`
        const oauthJumpUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${oauthCallbackUrl}&response_type=code&scope=snsapi_base&state=${this.state}#wechat_redirect`
        // 跳转授权 浏览器不保留记录
        // console.log(oauthJumpUrl)
        window.location.replace(oauthJumpUrl)
//        window.location.href = oauthJumpUrl
      },
      goMemberCard(custId) {
        window.location.replace(targetURL + '/?#/memberCard?customerId=' + custId)
      },
      getShopList(custId) {
        window.location.replace(targetURL + '/?#/shopList?customerId=' + custId + '&t=' + Date.parse(new Date()))
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
