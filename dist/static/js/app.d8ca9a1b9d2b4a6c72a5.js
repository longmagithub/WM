webpackJsonp([18,16],{0:function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.store=t.router=t.app=void 0;var r=n(23),i=u(r),l=n(102),c=u(l),a=n(95),s=u(a),d=n(260),f=u(d),A=n(135),p=u(A),m=n(138),R=u(m),I=n(114),S=u(I),E=n(258),g=u(E),h=n(308),D=u(h),M=n(306),_=u(M),v=n(309),y=n(133),C=o(y),O=n(134),N=u(O),T=n(259),k=u(T),P=n(29),U=o(P),b=n(262),G=u(b);s.default.component("iconfont",G.default),(0,v.sync)(R.default,p.default),(0,c.default)(C).forEach(function(e){s.default.filter(e,C[e])}),console.log(N.default),s.default.use(_.default),s.default.use(D.default),s.default.use(g.default,S.default),s.default.use(k.default,{loading:n(113),error:n(113)}),s.default.prototype.PublicJs=U,s.default.prototype.api="/VAOrderH5";var L=new s.default((0,i.default)({router:p.default,store:R.default},f.default)).$mount("#app");t.app=L,t.router=p.default,t.store=R.default},18:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function u(){var e=window.location.search,t={},n=/[?&][^?&]+=[^?&]+/g,o=e.match(n);return o&&o.forEach(function(e){var n=e.substring(1).split("="),o=decodeURIComponent(n[0]),u=decodeURIComponent(n[1]);t[o]=u}),t}Object.defineProperty(t,"__esModule",{value:!0}),t.getSINStore=t.setSINStore=t.removeStore=t.getStore=t.setStore=void 0;var r=n(61),i=o(r);t.urlParse=u;t.setStore=function(e,t){e&&("string"!=typeof t&&(t=(0,i.default)(t)),window.localStorage.setItem(e,t))},t.getStore=function(e){if(e)return JSON.parse(window.localStorage.getItem(e))},t.removeStore=function(e){e&&window.localStorage.removeItem(e)},t.setSINStore=function(e,t){e&&("string"!=typeof t&&(t=(0,i.default)(t)),window.sessionStorage.setItem(e,t))},t.getSINStore=function(e){if(e)return JSON.parse(window.sessionStorage.getItem(e))}},29:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.changeTitleInWx=function(e){document.title=e;var t=document.createElement("iframe");t.src="/favicon.ico",t.style.display="none",t.onload=function(){setTimeout(function(){t.remove()},9)},document.body.appendChild(t)},t.isWechat=function(){var e=window.navigator.userAgent.toLowerCase(),t=e.match(/MicroMessenger\/([\d.]+)/i);return t?t[1]<"5.0"?1:2:0},t.createParams=function(e){var t=[];for(var n in e)t.push((n+"="+e[n]).toString());return"?"+t.join("&")},t.formatTime=function(e,t){if(!e)return"-";var n=new Date(0),o=new Date("1970/01/01 08:00:00");e=parseInt(e)+(o.getTime()-n.getTime())/1e3;var u=new Date(1e3*parseInt(e)),r=t,i={"M+":u.getMonth()+1,"d+":u.getDate(),"h+":u.getHours(),"s+":u.getSeconds(),"m+":u.getMinutes(),"q+":Math.floor((u.getMonth()+3)/3),S:u.getMilliseconds()};/(y+)/.test(r)&&(r=r.replace(RegExp.$1,(u.getFullYear()+"").substr(4-RegExp.$1.length)));for(var l in i)new RegExp("("+l+")").test(r)&&(r=r.replace(RegExp.$1,1===RegExp.$1.length?i[l]:("00"+i[l]).substr((""+i[l]).length)));return r},t.callPhone=function(e){window.location.href="tel:"+e},t.bubbleSort=function(e){for(var t=0;t<e.length;t++)for(var n=t;n<e.length;n++)if(e[t].price<e[n].price){var o=e[t];e[t]=e[n],e[n]=o}return e}},101:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.SET_STATUS="SET_STATUS",t.RECORD_ADDRESS="RECORD_ADDRESS",t.ADD_CART="ADD_CART",t.REDUCE_CART="REDUCE_CART",t.INIT_BUYCART="INIT_BUYCART",t.CLEAR_CART="CLEAR_CART",t.RECORD_SHOPDETAIL="RECORD_SHOPDETAIL",t.RECORD_USERINFO="RECORD_USERINFO",t.GET_USERINFO="GET_USERINFO",t.CONFIRM_REMARK="CONFIRM_REMARK",t.CONFIRM_INVOICE="CONFIRM_INVOICE",t.CHOOSE_SEARCH_ADDRESS="CHOOSE_SEARCH_ADDRESS",t.SAVE_GEOHASH="SAVE_GEOHASH",t.CHOOSE_ADDRESS="CHOOSE_ADDRESS",t.NEED_VALIDATION="NEED_VALIDATION",t.SAVE_CART_ID_SIG="SAVE_CART_ID_SIG",t.SAVE_ORDER_PARAM="SAVE_ORDER_PARAM",t.CHANGE_ORDER_PARAM="CHANGE_ORDER_PARAM",t.ORDER_SUCCESS="ORDER_SUCCESS",t.SAVE_SHOPID="SAVE_SHOPID",t.SAVE_ORDER="SAVE_ORDER",t.OUT_LOGIN="OUT_LOGIN",t.USER_PRICE="USER_PRICE",t.USER_ADDRESSID="USER_ADDRESSID",t.BOON_PRICE="BOON_PRICE",t.MANJIAN_FEESPRICE="MANJIAN_FEESPRICE",t.MENU_REMIND="MENU_REMIND"},113:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABoCAYAAAAdHLWhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkQyNkI5QjlGQTQzMTFFNjhFODlFRDJCMzEzQzczMTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkQyNkI5QkFGQTQzMTFFNjhFODlFRDJCMzEzQzczMTMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCRDI2QjlCN0ZBNDMxMUU2OEU4OUVEMkIzMTNDNzMxMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCRDI2QjlCOEZBNDMxMUU2OEU4OUVEMkIzMTNDNzMxMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtCXFM0AAA6jSURBVHja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"},133:function(e,t){"use strict";function n(){return console.log(1),1}function o(e){for(var t=0;t<e.length;t++)for(var n=t;n<e.length;n++)if(e[t].price>e[n].price){var o=e[t];e[t]=e[n],e[n]=o}return e}function u(e){return 0===e?"免配送费":"配送费"+e+"元"}Object.defineProperty(t,"__esModule",{value:!0}),t.test=n,t.bubbleSort=o,t.fees=u},134:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var u=n(231),r=o(u);r.default.mock("/api/test",{"province|2-4":{110000:"北京市",120000:"天津市",130000:"河北省",140000:"山西省"}}),e.exports=r.default},135:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(95),r=o(u),i=n(307),l=o(i);r.default.use(l.default);var c=function(e){return n.e(15,function(){return e(n(270))})},a=function(e){return n.e(10,function(){return e(n(277))})},s=function(e){return n.e(11,function(){return e(n(267))})},d=function(e){return n.e(12,function(){return e(n(275))})},f=function(e){return n.e(5,function(){return e(n(269))})},A=function(e){return n.e(0,function(){return e(n(268))})},p=function(e){return n.e(8,function(){return e(n(273))})},m=function(e){return n.e(3,function(){return e(n(272))})},R=function(e){return n.e(2,function(){return e(n(264))})},I=function(e){return n.e(7,function(){return e(n(265))})},S=function(e){return n.e(6,function(){return e(n(276))})},E=function(e){return n.e(1,function(){return e(n(280))})},g=function(e){return n.e(13,function(){return e(n(279))})},h=function(e){return n.e(14,function(){return e(n(278))})},D=function(e){return n.e(4,function(){return e(n(282))})},M=function(e){return n.e(9,function(){return e(n(274))})};t.default=new l.default({scrollBehavior:function(){return{y:0}},routes:[{path:"/",redirect:"/jingmo"},{path:"/jingmo",component:c},{path:"/loading",component:n(271)},{path:"/shopList",component:a},{path:"/erweima",component:s},{path:"/share",component:d},{path:"/inviteNum",component:f},{path:"/index",component:A},{path:"/orderList",component:p},{path:"/orderDetail",component:m},{path:"/addList",component:R},{path:"/addNew",component:I},{path:"/shopDetail",component:S},{path:"/submitOrder",component:E},{path:"/remark",component:g},{path:"/invoice",component:h},{path:"/submitPay",component:D},{path:"/redlist",component:M}]})},136:function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}Object.defineProperty(t,"__esModule",{value:!0}),t.setStatus=void 0;var u=n(101),r=o(u);t.setStatus=function(e,t){var n=e.commit;n(r.SET_STATUS,t)}},137:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={}},138:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(95),r=o(u),i=n(25),l=o(i),c=n(139),a=o(c),s=n(136),d=o(s),f=n(137),A=o(f);r.default.use(l.default);var p={latitude:"",longitude:"",cartList:{},shopDetail:null,userInfo:null,shopID:null,remarkText:"",indexRemark:null,inputText:"",invoice:"",searchAddress:null,geohash:null,choosedAddress:null,addressIndex:null,needValidation:null,cartId:null,sig:null,orderParam:null,orderMessage:null,orderDetail:null,login:!0,totalPack:null,feesPrice:null,allPrice:null,userAddressId:"",boonPrice:0,endDate:null,redEnvelopeType:null,redEnvelopeId:"",manJianFeesPrice:null,menuRemind:!1};t.default=new l.default.Store({state:p,getters:A.default,actions:d.default,mutations:a.default})},139:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u,r=n(167),i=o(r),l=n(62),c=o(l),a=n(101),s=n(18);t.default=(u={},(0,i.default)(u,a.ADD_CART,function(e,t){var n=t.shopid,o=t.categoryId,u=t.itemId,r=t.foodId,i=t.name,l=t.price,a=t.specs,d=t.packingFee,f=t.dishTypeStyle,A=t.limitCount,p=t.originalPrice,m=t.remainQuantity,R=t.userCount,I=t.categoryIdLength,S=e.cartList;S[n]&&S[n][o]&&S[n][o][u]&&S[n][o][u][r]?(console.log("_____----111111----______"),1===S[n][o][u][r].dishTypeStyle&&(S[n][o][u][r].num>R?(S[n][o][u][r].overflowNum++,S[n][o][u][r].num++,console.log("1-1")):S[n][o][u][r].num<R?(S[n][o][u][r].limitNum++,S[n][o][u][r].num++,console.log("1-2")):S[n][o][u][r].num===R&&(S[n][o][u][r].num++,S[n][o][u][r].overflowNum++,console.log("1-3"))),0===S[n][o][u][r].dishTypeStyle&&(S[n][o][u][r].limitCount===R?(console.log("2-1"),S[n][o][u][r].overflowNum++,S[n][o][u][r].num++):S[n][o][u][r].num++)):S[n]&&S[n][o]&&S[n][o][u]?(console.log("_____----222222----______"),S[n][o][u][r]={},S[n][o][u][r].num=1,S[n][o][u][r].limitNum=1,S[n][o][u][r].overflowNum=0,S[n][o][u][r].id=r,S[n][o][u][r].name=i,S[n][o][u][r].price=l,S[n][o][u][r].specs=a,S[n][o][u][r].packingFee=d,S[n][o][u][r].dishTypeStyle=f,S[n][o][u][r].limitCount=A,S[n][o][u][r].originalPrice=p,S[n][o][u][r].remainQuantity=m,S[n][o][u][r].categoryIdLength=I):S[n]&&S[n][o]?(console.log("_____----33333----______"),S[n][o][u]={},S[n][o][u][r]={},S[n][o][u][r].num=1,S[n][o][u][r].limitNum=1,S[n][o][u][r].overflowNum=0,S[n][o][u][r].id=r,S[n][o][u][r].name=i,S[n][o][u][r].price=l,S[n][o][u][r].specs=a,S[n][o][u][r].packingFee=d,S[n][o][u][r].dishTypeStyle=f,S[n][o][u][r].limitCount=A,S[n][o][u][r].originalPrice=p,S[n][o][u][r].remainQuantity=m,S[n][o][u][r].userCount=R,S[n][o][u][r].categoryIdLength=I):S[n]?(console.log("_____----44444----______"),S[n][o]={},S[n][o][u]={},S[n][o][u][r]={},S[n][o][u][r].num=1,S[n][o][u][r].limitNum=1,S[n][o][u][r].overflowNum=0,S[n][o][u][r].id=r,S[n][o][u][r].name=i,S[n][o][u][r].price=l,S[n][o][u][r].specs=a,S[n][o][u][r].packingFee=d,S[n][o][u][r].dishTypeStyle=f,S[n][o][u][r].limitCount=A,S[n][o][u][r].originalPrice=p,S[n][o][u][r].remainQuantity=m,S[n][o][u][r].userCount=R,S[n][o][u][r].categoryIdLength=I):(console.log("_____----666666----______"),S[n]={},S[n][o]={},S[n][o][u]={},S[n][o][u][r]={},S[n][o][u][r].num=1,S[n][o][u][r].limitNum=1,S[n][o][u][r].overflowNum=0,S[n][o][u][r].id=r,S[n][o][u][r].name=i,S[n][o][u][r].price=l,S[n][o][u][r].specs=a,S[n][o][u][r].packingFee=d,S[n][o][u][r].dishTypeStyle=f,S[n][o][u][r].limitCount=A,S[n][o][u][r].originalPrice=p,S[n][o][u][r].remainQuantity=m,S[n][o][u][r].userCount=R,S[n][o][u][r].categoryIdLength=I),e.cartList=(0,c.default)({},S),(0,s.setStore)("buyCart",e.cartList)}),(0,i.default)(u,a.REDUCE_CART,function(e,t){var n=t.shopid,o=t.categoryId,u=t.itemId,r=t.foodId,i=(t.name,t.price,t.specs,t.dishTypeStyle),l=(t.limitCount,t.originalPrice,t.remainQuantity,t.userCount),a=e.cartList;a[n]&&a[n][o]&&a[n][o][u]&&a[n][o][u][r]&&(a[n][o][u][r].num>0?(1===i&&(a[n][o][u][r].num>l?(a[n][o][u][r].overflowNum--,a[n][o][u][r].num--):a[n][o][u][r].num<l?(a[n][o][u][r].limitNum--,a[n][o][u][r].num--):a[n][o][u][r].num===l&&(a[n][o][u][r].num--,a[n][o][u][r].limitNum--)),0===i&&(a[n][o][u][r].num--,a[n][o][u][r].num===l&&(a[n][o][u][r].limitNum=0,a[n][o][u][r].overflowNum=0)),e.cartList=(0,c.default)({},a),(0,s.setStore)("buyCart",e.cartList)):a[n][o][u][r]=null)}),(0,i.default)(u,a.CLEAR_CART,function(e,t){e.cartList[t]=null,e.cartList=(0,c.default)({},e.cartList),(0,s.setStore)("buyCart",e.cartList)}),(0,i.default)(u,a.INIT_BUYCART,function(e){var t=(0,s.getStore)("buyCart");t&&(e.cartList=t)}),(0,i.default)(u,a.SAVE_SHOPID,function(e,t,n){e.shopid=t,e.customerid=n}),(0,i.default)(u,a.CHOOSE_ADDRESS,function(e,t){var n=t.address,o=t.index;e.choosedAddress=n,e.addressIndex=o}),(0,i.default)(u,a.USER_PRICE,function(e,t){var n=t.totalPack,o=t.feesPrice,u=t.allPrice;e.totalPack=n,e.feesPrice=o,e.allPrice=u}),(0,i.default)(u,a.CONFIRM_REMARK,function(e,t){var n=t.remarkText,o=t.inputText,u=t.indexRemark;e.remarkText=n,e.inputText=o,e.indexRemark=u}),(0,i.default)(u,a.CONFIRM_INVOICE,function(e,t){e.invoice=t}),(0,i.default)(u,a.USER_ADDRESSID,function(e,t){e.userAddressId=t}),(0,i.default)(u,a.RECORD_USERINFO,function(e,t,n){e.userInfo=n,e.shopID=t,console.log(e.userInfo),console.log(e.shopID)}),(0,i.default)(u,a.BOON_PRICE,function(e,t){var n=t.boonPrice,o=t.endDate,u=t.redEnvelopeType,r=t.redEnvelopeId;console.log(n),console.log(o),console.log(u),console.log(r),e.boonPrice=n,e.endDate=o,e.redEnvelopeType=u,e.redEnvelopeId=r}),(0,i.default)(u,a.MANJIAN_FEESPRICE,function(e,t){console.log(t),e.manJianFeesPrice=t}),(0,i.default)(u,a.MENU_REMIND,function(e,t){e.menuRemind=t}),u)},140:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={}},142:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{iconname:{type:String,default:""}}}},151:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(18);t.default={data:function(){return{shopId:"",customerId:""}},created:function(){this.shopId=this.$route.query.shopId?this.$route.query.shopId:(0,o.getStore)("userInfo").shopId,this.customerId=this.$route.query.customerId?this.$route.query.customerId:(0,o.getStore)("userInfo").customerId,console.log(this.shopId),console.log(this.customerId)},mounted:function(){this.goIndex()},methods:{goIndex:function(){console.log(1231),this.$router.replace({path:"/index",query:{shopId:this.shopId,customerId:this.customerId}})}}}},213:function(e,t){},218:function(e,t){},227:function(e,t){},260:function(e,t,n){n(227);var o=n(1)(n(140),n(302),null,null);e.exports=o.exports},262:function(e,t,n){n(218);var o=n(1)(n(142),n(291),null,null);e.exports=o.exports},271:function(e,t,n){n(213);var o=n(1)(n(151),n(286),null,null);e.exports=o.exports},286:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"loading"},[e._v("loading....")])},staticRenderFns:[]}},291:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("i",{staticClass:"uxwm-iconfont",class:e.iconname})},staticRenderFns:[]}},302:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("router-view",{staticClass:"view"})],1)],1)},staticRenderFns:[]}},311:function(e,t){}});