<template>
</template>
<script>
  import {getStore, setStore} from '../common/utils/util'
  export default {
    data() {
      return {
        latLon: [],
        shopListArr: getStore('shopList')
      }
    },
    created() {
      this.setShareConfig()
//      this.getBaiDuMap()
    },
    methods: {
      setShareConfig() {
        let that = this
        let url = window.location.href.split('#')[0]
        window.alert('下面是URL')
        window.alert(url)
        this.axios.get(`/mp/jsapi/sign?url=${encodeURIComponent(url)}`).then((res) => {
          res = res.data
          if (res.success) {
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.appId, // 必填，公众号的唯一标识
              timestamp: res.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
              signature: res.data.signature, // 必填，签名，见附录1
              jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'getLocation']
            })
            wx.ready(() => {
              wx.onMenuShareTimeline({
                title: '我在马路炸鸡得到一个大红包，快来~快来~这里还有呐!', // 分享标题
                link: `http://newpay.tunnel.qydev.com/VAOrderH5/?#/erweima?${encodeURIComponent('price=6.66&desc=你好')}`, // 分享链接
                imgUrl: '../../assets/item_logo.png', // 分享图标
                success: function () {
                  // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                }
              })
              wx.onMenuShareAppMessage({
                title: '我在马路炸鸡得到一个大红包，快来~快来~这里还有呐', // 分享标题
                desc: '微信点外卖-更便宜，更快捷。', // 分享描述
                link: `http://newpay.tunnel.qydev.com/VAOrderH5/?#/erweima?${encodeURIComponent('price=6.66&desc=你好')}`, // 分享链接
                imgUrl: '../../assets/item_logo.png', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                  // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                }
              })
              wx.getLocation({
                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                  console.log(that)
                  if (res.errMsg === 'getLocation:ok') {
//                    that.getBaiDuMap(res)
                  } else if (res.errMsg === 'getLocation:cancel') {
//                    that.getBaiDuMap(0)
                  }
                }
              })
            })
          }
        })
      },
      // 百度地址算位置
      getBaiDuMap(resData) {
        let defaultLonca = {
          latitude: this.shopListArr[0].latitudeB,
          longitude: this.shopListArr[0].longitudeB
        }
        let defaultRes = {}
        resData === 0 ? defaultRes = defaultLonca : defaultRes = resData
        let location = []
        this.shopListArr.forEach((item) => {
          this.latLon.push(item.latitudeB + ',' + item.longitudeB)
        })
        this.latLon = this.latLon.join('|')
//        window.alert('________----------___________------______-------__')
        const data = {
          ak: 'S4x3MzgMib0wWD5knazuh8mIDatI9QMW', // 用户访问权限
          output: 'json', // 输出的数据类型
          origins: defaultRes.latitude + ',' + defaultRes.longitude, // 起点：维度，经度
//          origins: '30.274085' + ',' + '120.15507', // 起点：维度，经度
          destinations: this.latLon, // 终点：维度，经度|维度，经度  多个用 | 分开
          coord_type: 'gcj02' // 坐标类型
        }
        this.$http.jsonp(`https://api.map.baidu.com/routematrix/v2/riding${this.PublicJs.createParams(data)}`).then((res) => {
          res = res.data
          console.log(res)
//          window.alert(res.message)
          res.result.forEach((item, index) => {
            item.flag = index
            this.shopListArr[index].location = item
            location.push(item)
          })
          for (let i = 0; i < this.shopListArr.length; i++) {
            for (let j = i; j < this.shopListArr.length; j++) {
              if (this.shopListArr[i].location.distance.value > this.shopListArr[j].location.distance.value) {
                let temp = this.shopListArr[i]
                this.shopListArr[i] = this.shopListArr[j]
                this.shopListArr[j] = temp
              }
            }
          }
          setStore('shopList', this.shopListArr)
        })
      }
    }
  }
</script>
<style>
</style>
