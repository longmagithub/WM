<template>
</template>
<script>
  import {urlParse, setStore} from '../../common/utils/util'
  export default {
    data () {
      return {
        msg: '静默授权',
        url: '',
        code: '',
        customerId: ''
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
          if (res.success) {
            this.customerId = res.data.customerId
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
        window.location.replace(oauthJumpUrl)
//        window.location.href = oauthJumpUrl
      },
      // 获取列表
      getShopList(custId) {
        const data = {
          customerId: custId,
          pageSize: 30,
          pageNumber: 1,
          longitude: 0, // 经度
          latitude: 0, // 维度
          discounts: [], // uxwm 满减
          thirdDiscounts: [] // 其他平台满减
        }
        this.axios.get(`/br/shop/list${this.PublicJs.createParams(data)}`).then((res) => {
          res = res.data
          if (res.success) {
            res.data.forEach((data) => {
              data.discounts = data.discounts.reverse()
              data.thirdDiscounts = data.thirdDiscounts.reverse()
              // 添加 图片分割
              if (data.logo) {
                data.logo = data.logo + '?x-oss-process=image/resize,m_fill,h_100,w_100'
              }
            })
            let setStoreContetn = {custId: res.data}
            setStore('shopList', setStoreContetn)
            wx.ready(() => {
              wx.getLocation({
                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                  window.alert(res)
                  this.getBaiDuMap(res)
//                  var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
//                  var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
//                  var speed = res.speed; // 速度，以米/每秒计
//                  var accuracy = res.accuracy; // 位置精度
                }
              })
            })
//            this.goIndex(res.data[0].shopId, custId)
          }
        })
      },
      goIndex(shopId, custId) {
        window.location.replace('http://newpay.tunnel.qydev.com/VAOrderH5/?#/index?customerId=' + custId + '&shopId=' +
          shopId)
//        this.$router.replace({
//          path: '/index',
//          query: {
//            customerId: id
//          }
//        })
      },
      // 百度地址算位置
      getBaiDuMap(location) {
//        getStore('shopList')[this.customerId]
        const data = {
          ak: 'S4x3MzgMib0wWD5knazuh8mIDatI9QMW', // 用户访问权限
          output: 'json', // 输出的数据类型
          origins: location.latitude + ',' + location.longitude, // 起点：维度，经度
          destinations: '30.1854,120.162|30.1854,120.162|30.185,120.161', // 终点：维度，经度|维度，经度  多个用 | 分开
          coord_type: 'gcj02' // 坐标类型
        }
        this.axios.get(`http://api.map.baidu.com/routematrix/v2/riding${this.PublicJs.createParams(data)}`).then((res) => {
          console.log(res)
        })
      }
    }
  }
</script>
