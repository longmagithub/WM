<template>
</template>
<script>
  export default {
    created() {
      this.getBaiDuMap()
    },
    mounted () {
      this.setShareConfig()
    },
    methods: {
      setShareConfig() {
        let url = window.location.href.split('#')[0]
        this.axios.get(`/mp/jsapi/sign?url=${encodeURIComponent(url)}`).then((res) => {
          res = res.data
          if (res.success) {
            wx.config({
              debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.appId, // 必填，公众号的唯一标识
              timestamp: res.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
              signature: res.data.signature, // 必填，签名，见附录1
              jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'getLocation']
            })
            wx.ready(() => {
              wx.onMenuShareTimeline({
                title: '我在Thank u mom得到一个大红包，快来~快来~这里还有呐!', // 分享标题
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
                title: '我在Thank u mom得到一个大红包，快来~快来~这里还有呐', // 分享标题
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
            })
          }
        })
      }
    }
  }
</script>
<style>
</style>
