webpackJsonp([4,16],{8:function(t,e,i){i(12);var a=i(1)(i(9),i(13),"data-v-773e25fd",null);t.exports=a.exports},9:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{text:{type:String},t:{type:Number,default:2e3},show:{type:Boolean,defalut:!1}}}},11:function(t,e,i){e=t.exports=i(3)(),e.push([t.id,".toast[data-v-773e25fd]{position:fixed;top:0;left:0;width:100%;height:100%}.toast .toast-mask[data-v-773e25fd]{position:absolute;top:0;left:0;width:100%;height:100%;background:transparent}.toast .toast-text[data-v-773e25fd]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);padding:20px;min-width:120px;max-width:80%;line-height:1.5em;text-align:center;color:#fff;background:rgba(0,0,0,.7);border-radius:4px}",""])},12:function(t,e,i){var a=i(11);"string"==typeof a&&(a=[[t.id,a,""]]);i(4)(a,{});a.locals&&(t.exports=a.locals)},13:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"toast"},[i("div",{staticClass:"toast-mask"}),t._v(" "),i("div",{staticClass:"toast-text"},[t._v(t._s(t.text))])])},staticRenderFns:[]}},60:function(t,e,i){t.exports=i.p+"static/img/img.753c69e.png"},161:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={replace:!0,data:function(){return{tipShow:!0,msTime:{show:!1,day:"",hour:"",minutes:"",seconds:""},star:"",end:"",current:""}},watch:{currentTime:function(t,e){this.gogogo()}},props:{tipText:{type:String,default:"距离开始"},tipTextEnd:{type:String,default:"距离结束"},id:{type:String,default:"1"},currentTime:{type:Number},startTime:{type:Number},endTime:{type:Number},endText:{type:String,default:"00:00:00"},secondsFixed:{type:Boolean,defaule:!1},dayTxt:{type:String,defaule:":"},hourTxt:{type:String,defaule:":"},minutesTxt:{type:String,defaule:":"},secondsTxt:{type:String,defaule:":"}},mounted:function(){this.gogogo()},methods:{gogogo:function(){var t=this;10===this.startTime.toString().length?this.star=1e3*this.startTime:this.star=this.startTime,10===this.endTime.toString().length?this.end=1e3*this.endTime:this.end=this.endTime,this.currentTime?10===this.currentTime.toString().length?this.current=1e3*this.currentTime:this.current=this.currentTime:this.current=(new Date).getTime(),this.end<this.current?(this.msTime.show=!1,this.end_message()):this.current<this.star?(this.$set(this,"tipShow",!0),setTimeout(function(){t.runTime(t.star,t.current,t.start_message)},1)):(this.end>this.current&&this.star<this.current||this.star===this.current)&&(this.$set(this,"tipShow",!1),this.msTime.show=!0,this.$emit("start_callback",this.msTime.show),setTimeout(function(){t.runTime(t.end,t.star,t.end_message,!0)},1))},runTime:function(t,e,i,a){var s=this,r=this.msTime,n=t-e;if(n>0){this.msTime.show=!0,r.day=Math.floor(n/864e5),n-=864e5*r.day,r.hour=Math.floor(n/36e5),n-=36e5*r.hour,r.minutes=Math.floor(n/6e4),n-=6e4*r.minutes,r.seconds=Math.floor(n/1e3).toFixed(0),n-=1e3*r.seconds,r.hour<10&&(r.hour="0"+r.hour),r.minutes<10&&(r.minutes="0"+r.minutes),r.seconds<10&&(r.seconds="0"+r.seconds);var o=Date.now(),u=Date.now(),p=u-o;setTimeout(function(){a?s.runTime(s.end,e+=1e3,i,!0):s.runTime(s.star,e+=1e3,i)},1e3-p)}else i()},start_message:function(){var t=this;this.$set(this,"tipShow",!1),this.$emit("start_callback",this.msTime.show),setTimeout(function(){t.runTime(t.end,t.star,t.end_message,!0)},1)},end_message:function(){this.msTime.show=!1,this.currentTime<=0||this.$emit("end_callback",this.msTime.show)}}}},162:function(t,e,i){"use strict";function a(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e}function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=i(23),n=s(r),o=i(280),u=s(o),p=i(8),d=s(p),m=i(18),c=i(29),h=a(c),l=i(25),g=!0;e.default={data:function(){return{currentTime:Math.round((new Date).getTime()/1e3),reverseTime:(0,m.getStore)("reverseTime").reverseTimeKey?(0,m.getStore)("reverseTime").reverseTimeKey:Math.round((new Date).setMinutes((new Date).getMinutes()+15)/1e3),isTime:!0,toastShow:!1,toastText:"",orderId:"",paidPrice:0,textTime:[{beginTime:"08:00",endTime:"12:00"},{beginTime:"13:00",endTime:"14:00"},{beginTime:"13:00",endTime:"22:00"}]}},created:function(){h.changeTitleInWx("在线支付"),this.CONFIRM_REMARK({remarkText:"",inputText:"",indexRemark:null})},mounted:function(){this.orderId=this.$route.query.orderId?this.$route.query.orderId:"",this.paidPrice=(0,m.getStore)("userOrderIofo").paidPrice?(0,m.getStore)("userOrderIofo").paidPrice:0},methods:(0,n.default)({},(0,l.mapMutations)(["CLEAR_CART","BOON_PRICE","CONFIRM_REMARK"]),{countDownFun:function(){this.isTime=!this.isTime,this.toggleToast(1,"订单已超时")},weChatPay:function(){var t=this;if(this.isTime){if(this.PublicJs.isWechat()===!0)return void this.toggleToast(1,"仅支持微信中支付，且微信版本需在5.0以上");var e={customerId:(0,m.getStore)("userInfo").customerId,shopId:(0,m.getStore)("userInfo").shopId,orderId:this.orderId};this.axios.post("/br/order/pay",e).then(function(e){e=e.data,e.success===g?t.sendWxSDK(e.data):t.toggleToast(1,e.message)},function(e){t.toggleToast(1,e.message)})}else this.toggleToast(1,"订单已超时")},sendWxSDK:function(t){var e=this;WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:t.appId,timeStamp:t.timeStamp,nonceStr:t.nonceStr,package:t.packageDetail,paySign:t.paySign,signType:t.signType},function(t){"get_brand_wcpay_request:ok"===t.err_msg?(e.CLEAR_CART((0,m.getStore)("userInfo").shopId),e.BOON_PRICE({boonPrice:0,endDate:null,redEnvelopeType:null,redEnvelopeId:""}),(0,m.removeStore)("buyCart"),(0,m.removeStore)("userPrice"),e.$router.replace({path:"/index",query:{shopId:(0,m.getStore)("userInfo").shopId,customerId:(0,m.getStore)("userInfo").customerId,isDistance:1}})):"get_brand_wcpay_request:cancel"===t.err_msg?e.toggleToast(1,"您已取消支付"):"get_brand_wcpay_request:fail"===t.err_msg&&e.toggleToast(1,"订单支付失败")})},toggleToast:function(t,e){var i=this;t!==!0&&1!==t||(this.toastShow=!this.toastShow,this.toastText=e,clearTimeout(this.timer),this.timer=setTimeout(function(){i.toastShow=!i.toastShow},1300))}}),components:{CountDown:u.default,toast:d.default},filters:{toFixedFil:function(t){return t.toFixed(2)}}}},203:function(t,e,i){e=t.exports=i(3)(),e.push([t.id,".submitPay .time-wrapper[data-v-64a46472]{padding:24px 17px 0;line-height:1em;text-align:center;background:#fff}.submitPay .time-wrapper .timeTitle[data-v-64a46472]{font-size:13px;color:#c5c5c5}.submitPay .time-wrapper .timeNum[data-v-64a46472]{padding:13px 0 25px;font-size:24px;color:#343434}.submitPay .time-wrapper .timeText[data-v-64a46472]{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;height:39px;line-height:39px;letter-spacing:1px;font-size:14px;border-top:1px solid #f1f1f1}.submitPay .time-wrapper .timeText .text[data-v-64a46472]{color:#c5c5c5}.submitPay .time-wrapper .timeText .price[data-v-64a46472]{color:#ff8932}.submitPay .payPattern-wrapper .payPattern-tiele[data-v-64a46472]{padding:0 17px;height:35px;line-height:35px;font-size:12px;color:#a9a9a9}.submitPay .payPattern-wrapper .payPattern[data-v-64a46472]{display:-ms-flexbox;display:flex;position:relative;padding:0 17px;height:59px;line-height:59px;font-size:14px;color:#343434;background:#fff}.submitPay .payPattern-wrapper .payPattern .icon_wechat_normal[data-v-64a46472]{margin-right:14px;font-size:30px;color:#44c144}.submitPay .payPattern-wrapper .payPattern .btn_right_normal[data-v-64a46472]{position:absolute;right:16px;font-size:21px;color:#44c144}.submitPay .submit-wrapper[data-v-64a46472]{margin-top:44px;padding:0 17px}.submitPay .submit-wrapper .submitBtn[data-v-64a46472]{width:100%;height:48px;line-height:48px;text-align:center;font-size:15px;color:#fff;background:#4cd964;border-radius:7px}.submitPay .image-wrapper[data-v-64a46472]{margin-top:69px;padding:0 17px}.submitPay .image-wrapper .image[data-v-64a46472]{width:100%;height:134px;background:url("+i(60)+") no-repeat;background-size:100% 134px}@media (min-width:414px){.submitPay .image-wrapper .image[data-v-64a46472]{width:100%;height:164px;background:url("+i(60)+") no-repeat;background-size:100% 164px}}@media (min-width:375px){.submitPay .image-wrapper .image[data-v-64a46472]{width:100%;height:164px;background:url("+i(60)+") no-repeat;background-size:100% 164px}}@media (min-width:768px){.submitPay .image-wrapper .image[data-v-64a46472]{width:100%;height:278px;background:url("+i(60)+") no-repeat;background-size:100% 278px}}@media (max-width:328px){.submitPay .image-wrapper .image[data-v-64a46472]{width:100%;height:139px;background:url("+i(60)+") no-repeat;background-size:100% 139px}}",""])},223:function(t,e,i){var a=i(203);"string"==typeof a&&(a=[[t.id,a,""]]);i(4)(a,{});a.locals&&(t.exports=a.locals)},280:function(t,e,i){var a=i(1)(i(161),i(297),null,null);t.exports=a.exports},281:function(t,e,i){i(223);var a=i(1)(i(162),i(296),"data-v-64a46472",null);t.exports=a.exports},296:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"submitPay"},[i("div",{staticClass:"time-wrapper"},[i("p",{staticClass:"timeTitle"},[t._v("支付剩余时间")]),t._v(" "),i("count-down",{staticClass:"timeNum",attrs:{currentTime:t.currentTime,startTime:t.currentTime,endTime:t.reverseTime},on:{end_callback:t.countDownFun}}),t._v(" "),i("p",{staticClass:"timeText"},[i("span",{staticClass:"text"},[t._v("详情")]),t._v(" "),i("span",{staticClass:"price"},[t._v("￥"+t._s(t._f("toFixedFil")(t.paidPrice)))])])],1),t._v(" "),t._m(0),t._v(" "),i("div",{staticClass:"submit-wrapper",on:{click:t.weChatPay}},[i("div",{staticClass:"submitBtn"},[t._v("确认支付￥"+t._s(t._f("toFixedFil")(t.paidPrice)))])]),t._v(" "),i("toast",{attrs:{show:t.toastShow,text:t.toastText}})],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"payPattern-wrapper"},[i("p",{staticClass:"payPattern-tiele"},[t._v("选择支付方式")]),t._v(" "),i("p",{staticClass:"payPattern"},[i("i",{staticClass:"uxwm-iconfont icon_wechat_normal"}),t._v(" "),i("span",{staticClass:"text"},[t._v("微信支付")]),t._v(" "),i("i",{staticClass:"uxwm-iconfont btn_right_normal"})])])}]}},297:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t.msTime.show?i("p",[i("span",[t._v(t._s(t.msTime.hour)+":")]),t._v(" "),i("span",[t._v(t._s(t.msTime.minutes)+":")]),t._v(" "),i("span",[t._v(t._s(t.msTime.seconds))])]):t._e(),t._v(" "),t.msTime.show?t._e():i("p",{staticClass:"timeNum"},[t._v(t._s(t.endText))])])},staticRenderFns:[]}}});