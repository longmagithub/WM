<template>
</template>
<script>
  //  import {urlParse, setStore} from '../../common/utils/util'
  import {urlParse} from '../../common/utils/util'
  import wxshare from '../../components/wxshare.vue'
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
      this.shopId = urlParse().shopId
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
            this.goIndex(this.shopId, this.customerId)
//            this.getShopList(res.data.customerId)
          }
        })
      }
    },
    methods: {
      to() {
        const oauthCallbackUrl =
          encodeURIComponent('http://newpay.tunnel.qydev.com/VAOrderH5/?#/jingmo?shopId=' + this.shopId)
        const oauthJumpUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx96f6daa5f8a71039&redirect_uri=${oauthCallbackUrl}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
        // 跳转授权 浏览器不保留记录
        window.location.replace(oauthJumpUrl)
//        window.location.href = oauthJumpUrl
      },
      // 获取列表
//      getShopList(custId) {
//        const data = {
//          customerId: custId,
//          pageSize: 10000,
//          pageNumber: 1,
//          longitude: 0, // 经度
//          latitude: 0, // 维度
//          discounts: [], // uxwm 满减
//          thirdDiscounts: [] // 其他平台满减
//        }
//        this.axios.get(`/br/shop/list${this.PublicJs.createParams(data)}`).then((res) => {
//          res = res.data
//          if (res.success) {
//            res.data.forEach((data) => {
//              data.discounts = data.discounts.reverse()
//              data.thirdDiscounts = data.thirdDiscounts.reverse()
//              // 添加 图片分割
//              if (data.logo) {
//                data.logo = data.logo + '?x-oss-process=image/resize,m_fill,h_100,w_100'
//              }
//            })
//            setStore('shopList', res.data)
//            this.goIndex(res.data[0].shopId, custId)
//          }
//        })
//      },
      goIndex(shopId, custId) {
        window.location.replace('http://newpay.tunnel.qydev.com/VAOrderH5/?#/index?customerId=' + custId + '&shopId=' +
          shopId + '&t=' + Date.parse(new Date()))
//        this.$router.replace({
//          path: '/index',
//          query: {
//            customerId: id
//          }
//        })
      }
    },
    components: {
      wxshare
    }
  }
</script>
