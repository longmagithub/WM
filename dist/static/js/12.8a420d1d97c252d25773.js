webpackJsonp([12,15],{184:function(e,t,n){var o=n(1)(n(257),n(203),null,null);e.exports=o.exports},203:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div")},staticRenderFns:[]}},257:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{msg:"静默授权",url:"",shopId:"",time:Date.parse(new Date)/1e5}},created:function(){this.shopId=window.location.href.split("=")[1]},mounted:function(){this.url=window.location.href,this.url.indexOf("code")<0&&this.to()},methods:{to:function(){var e=encodeURIComponent("http://newpay.tunnel.qydev.com/VAOrderH5/#/zhengchang1?T="+this.tiem),t="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx96f6daa5f8a71039&redirect_uri="+e+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";window.location.replace(t)}}}}});