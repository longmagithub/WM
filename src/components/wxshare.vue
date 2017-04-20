<template>
</template>
<script>
  //  import wx from 'weixin-js-sdk'
  export default {
    mounted () {
      window.alert(window.location.href.split('#')[0])
      this.setShareConfig()
    },
    methods: {
      setShareConfig() {
        let url = window.location.href
        console.log('url地址')
        console.log(url)
        this.axios.get(`/mp/jsapi/sign?url=${encodeURIComponent(url)}`).then((res) => {
          res = res.data
          if (res.success) {
            wx.config({
              debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.appId, // 必填，公众号的唯一标识
              timestamp: res.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
              signature: res.data.signature.toLowerCase(), // 必填，签名，见附录1
              jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo',
                'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
          }
        })
      }
    }
  }
</script>
