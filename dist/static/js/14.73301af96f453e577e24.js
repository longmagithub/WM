webpackJsonp([14,16],{149:function(e,t,r){t=e.exports=r(3)(),t.push([e.id,".remark[data-v-b1b7903a]{padding-top:19px;font-size:14px;font-weight:700;color:#343434}.remark .orderRemark[data-v-b1b7903a]{margin-bottom:14px;padding:13px 8px 5px 17px;background:#fff}.remark .orderRemark .orderContent[data-v-b1b7903a]{font-size:0;font-weight:500;color:#565656}.remark .orderRemark .orderContent .acquiesce[data-v-b1b7903a]{box-sizing:border-box;display:inline-block;vertical-align:top;margin:7px 0;margin-right:6px;height:25px;line-height:25px;text-align:center;border:1px solid #ff8932;border-radius:5px}.remark .orderRemark .orderContent .acquiesce .acquiesce-orderItem[data-v-b1b7903a]{display:inline-block;padding:0 7px;height:24px;line-height:24px;font-size:12px;border-right:1px solid #ff8932}.remark .orderRemark .orderContent .acquiesce .acquiesce-orderItem[data-v-b1b7903a]:last-child{border-right:none}.remark .orderRemark .orderContent .orderItem[data-v-b1b7903a]{box-sizing:border-box;display:inline-block;margin:7px 0;margin-right:6px;padding:0 7px;height:25px;line-height:25px;text-align:center;font-size:12px;border:1px solid #ff8932;border-radius:5px}.remark .orderRemark .orderContent .acquiesce .selectClass[data-v-b1b7903a],.remark .orderRemark .orderContent .selectClass[data-v-b1b7903a]{color:#fff;background:#ff8932}.remark .elseRemark[data-v-b1b7903a]{box-sizing:border-box;padding:13px 14px 20px 10px;background:#fff}.remark .elseRemark .elseTitle[data-v-b1b7903a]{box-sizing:border-box;padding:0 0 13px 7px}.remark .elseRemark .elseContent[data-v-b1b7903a]{position:relative}.remark .elseRemark .elseContent .elseText[data-v-b1b7903a]{box-sizing:border-box;padding:12px 10px;resize:none;overflow:hidden;width:100%;height:70px;color:#343434;font-size:12px;border-radius:7px;border:1px solid #e0e0e0;background:#f5f5f5}.remark .elseRemark .elseContent .elseText[data-v-b1b7903a]::-webkit-input-placeholder{font-size:12px;color:#b3b3b3}.remark .elseRemark .elseContent .length[data-v-b1b7903a]{position:absolute;right:10px;bottom:7px;letter-spacing:1px;font-size:11px;color:#b3b3b3}.remark .elseRemark .elseContent .length .lengthNum[data-v-b1b7903a]{color:#343434}.remark .submit[data-v-b1b7903a]{box-sizing:border-box;padding:0 17px;padding-bottom:30px;background:#fff}.remark .submit .submitBtn[data-v-b1b7903a]{width:100%;height:42px;line-height:42px;text-align:center;border-radius:5px;letter-spacing:2px;font-size:16px;color:#fff;background:#ff8932}",""])},196:function(e,t,r){var a=r(149);"string"==typeof a&&(a=[[e.id,a,""]]);r(4)(a,{});a.locals&&(e.exports=a.locals)},220:function(e,t,r){r(196);var a=r(1)(r(304),r(244),"data-v-b1b7903a",null);e.exports=a.exports},244:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"remark"},[r("section",{staticClass:"orderRemark"},[r("div",{staticClass:"orderTitle"},[e._v("\n      订单备注\n    ")]),e._v(" "),r("div",{staticClass:"orderContent"},[r("div",{staticClass:"acquiesce"},e._l(e.initremark,function(t,a){return r("span",{staticClass:"acquiesce-orderItem",class:{selectClass:a===e.remarkIndex},on:{click:function(t){e.selectRemark(a)}}},[e._v(e._s(t)+"\n        ")])}))])]),e._v(" "),r("section",{staticClass:"elseRemark"},[r("div",{staticClass:"elseTitle"},[e._v("\n      其他备注\n    ")]),e._v(" "),r("div",{staticClass:"elseContent"},[r("textarea",{directives:[{name:"model",rawName:"v-model",value:e.elseText,expression:"elseText"}],staticClass:"elseText",attrs:{maxlength:"50",cols:"50",rows:"3",placeholder:"请输入备注内容（可不填）"},domProps:{value:e.elseText},on:{input:function(t){t.target.composing||(e.elseText=t.target.value)}}}),e._v(" "),r("div",{staticClass:"length"},[r("span",{staticClass:"lengthNum"},[e._v(e._s(e.elseText.length))]),e._v("/50")])])]),e._v(" "),r("div",{staticClass:"submit"},[r("div",{staticClass:"submitBtn",on:{click:e.goSubmitOrder}},[e._v("确定")])])])},staticRenderFns:[]}},304:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=r(25),s=a(i),n=r(23);t.default={data:function(){return{elseText:"",selectClass:!1,userSelect:!1,initremark:["不要辣","少要辣","多要辣"],remarkIndex:0}},created:function(){this.PublicJs.changeTitleInWx("订单备注"),this.remarkIndex=this.indexRemark,this.elseText=this.inputText},computed:(0,s.default)({},(0,n.mapState)(["indexRemark","inputText"])),methods:(0,s.default)({},(0,n.mapMutations)(["CONFIRM_REMARK"]),{selectRemark:function(e){this.remarkIndex=e},goSubmitOrder:function(){this.CONFIRM_REMARK({remarkText:this.initremark[this.remarkIndex],inputText:this.elseText,indexRemark:this.remarkIndex}),this.$router.go(-1)}})}}});