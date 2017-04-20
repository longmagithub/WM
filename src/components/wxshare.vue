<template>
</template>
<script type="text/ecmascript-6">
  export default {
    created() {
      this.setShareConfig()
    },
    methods: {
      setShareConfig() {
        let url = window.location.href.split('?')
        this.axios.get(`/mp/jsapi/sign?url=${encodeURIComponent(url[0])}`).then((res) => {
          res = res.data
          if (res.success) {
            wx.config({
              debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.appId, // 必填，公众号的唯一标识
              timestamp: res.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
              signature: res.data.signature, // 必填，签名，见附录1
              jsApiList: ['hideOptionMenu', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo',
                'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
          }
        })
      }
    }
  }
</script>
// 微信配置
WXJssdk(data) {

},

