webpackJsonp([14,15],{182:function(e,t,n){var o=n(1)(n(255),n(192),null,null);e.exports=o.exports},192:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div")},staticRenderFns:[]}},255:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{msg:"静默授权",url:"",shopId:""}},created:function(){this.shopId=window.location.href.split("=")[1],this.to(),console.log("jingmo")},methods:{to:function(){var e=encodeURIComponent("http://newpay.tunnel.qydev.com/VAOrderH5/#/jingmo1"),t="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx96f6daa5f8a71039&redirect_uri="+e+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";window.location.href=t}}}}});