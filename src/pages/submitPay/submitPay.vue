<template>
  <div class="submitPay">
    <div class="time-wrapper">
      <p class="timeTitle">支付剩余时间</p>
      <count-down class="timeNum"
                  v-on:end_callback="countDownFun"
                  :currentTime="currentTime"
                  :startTime="currentTime"
                  :endTime="reverseTime"></count-down>
      <!--<p class="timeNum" v-else>00:00:00</p>-->
      <p class="timeText">
        <span class="text">详情</span>
        <span class="price">￥{{paidPrice | toFixedFil}}</span>
      </p>
    </div>
    <div class="payPattern-wrapper">
      <p class="payPattern-tiele">选择支付方式</p>
      <p class="payPattern" v-if='enableMember' @click='choosePay("memberCard")'>
        <img class="balance" src="../../assets/tips/balance@2x.png">
        <span class="text">
          会员卡余额
          <span class="buzu" v-if='!balanceEnough'>(余额不足，请选择其他支付方式）</span>
        </span>
        <img :src='payConfig.method.memberCard?payConfig.iconUrl[1]:payConfig.iconUrl[0]' 
              class="icon_xuanze_normal">
      </p>
      <p class="payPattern topline" v-if='showWeChat' @click='choosePay("weChat")'>
        <i class="uxwm-iconfont icon_wechat_normal"></i>
        <span class="text">微信支付</span>
       <!--  <i class="uxwm-iconfont btn_right_normal"></i> -->
       <img :src='payConfig.method.weChat?payConfig.iconUrl[1]:payConfig.iconUrl[0]' 
              class="icon_xuanze_normal">
      </p>
      <div class="checkMore topline" @click='showWxPay' v-if='!showWeChat'>
        查看更多支付方式
        <img src="../../assets/memberCard/btn_xiangxia_normal@2x.png">
      </div>
    </div>
    <div class="submit-wrapper" @click="startPay">
      <div class="submitBtn">确认支付￥{{paidPrice | toFixedFil}}</div>
    </div>
    <div  class="submit-pic"></div>
    <!--<div class="image-wrapper">-->
    <!--<div class="image"></div>-->
    <!--</div>-->
    <toast :show="toastShow" :text="toastText"></toast>
  </div>
</template>

<script>
  import CountDown from './counter/counter.vue'
  import toast from '../../components/toast.vue'
  import {getStore, removeStore} from '../../common/utils/util'
  import * as PublicJs from '../../common/utils/public'
  import {mapMutations} from 'vuex'
  const SUCCESS_OK = true
  export default {
    data() {
      return {
        currentTime: Math.round(new Date().getTime() / 1000), // 当前时间戳
        reverseTime: getStore('reverseTime').reverseTimeKey ? getStore('reverseTime').reverseTimeKey : Math.round(new
            Date().setMinutes(new Date().getMinutes() + 15) / 1000),
        // 15分钟后
        isTime: true,
        toastShow: false,
        toastText: '',
        orderId: '',
        paidPrice: 0, // 支付多少
        textTime: [
          {
            beginTime: '08:00',
            endTime: '12:00'
          }, {
            beginTime: '13:00',
            endTime: '14:00'
          }, {
            beginTime: '13:00',
            endTime: '22:00'
          }
        ],
        shopId: '',
        customerId: '',
        balance: 0,
        showWeChat: false,
        enableMember: false,
        balanceEnough: false,
        payConfig: {
          method: {
            weChat: false,
            memberCard: false
          },
          // 由于webpack 相对路径需要使用require
          iconUrl: [require('../../assets/memberCard/icon_xuanze_normal@2x.png'),
                    require('../../assets/memberCard/icon_xuanze_pressed@2x.png')]
        }
      }
    },
    created() {
      // 修改 title
      PublicJs.changeTitleInWx('在线支付')
      this.CONFIRM_REMARK({
        remarkText: '', inputText: '', indexRemark: null
      })
    },
    mounted() {
      this.orderId = this.$route.query.orderId ? this.$route.query.orderId : ''
      this.paidPrice = getStore('userOrderInfo').paidPrice ? getStore('userOrderInfo').paidPrice : 0
      this.shopId = getStore('userInfo').shopId
      this.customerId = getStore('userInfo').customerId
      this.checkMemberCard()
    },
    methods: {
      ...mapMutations(['CLEAR_CART', 'BOON_PRICE', 'CONFIRM_REMARK']),
      countDownFun() {
        this.isTime = !this.isTime
        this.toggleToast(1, '订单已超时')
      },
      // 切换支付方式
      choosePay(key) {
        if (key === 'memberCard' && !this.balanceEnough) return
        this.payConfig.method.weChat = false
        this.payConfig.method.memberCard = false
        this.payConfig.method[key] = true
      },
      // 显示微信支付方式
      showWxPay() {
        this.showWeChat = true
      },
      startPay() {
        if (!this.isTime) {
          this.toggleToast(1, '订单已超时')
        } else {
          if (this.payConfig.method.weChat) {
            this.weChatPay()
          } else if (this.payConfig.method.memberCard) {
            this.memberPay()
          } else {
            console.log('wrong path. check selected way.')
          }
        }
      },
      // 使用会员卡支付
      memberPay() {
        if (!this.isTime) {
          this.toggleToast(1, '订单已超时')
        } else {
          let data = {
            customerId: getStore('userInfo').customerId,
            shopId: getStore('userInfo').shopId,
            orderId: this.orderId,
            payType: 2
          }
          this.axios.post('/br/order/pay', data)
            .then((response) => {
              response = response.data
              if (response.success) {
                //  支付成功
                this.toggleToast(1, '支付成功')
                setTimeout(() => {
                  this.CLEAR_CART(getStore('userInfo').shopId)
                  this.BOON_PRICE({
                    boonPrice: 0,
                    endDate: null,
                    redEnvelopeType: null,
                    redEnvelopeId: ''
                  })
                  removeStore('buyCart')
                  removeStore('userPrice')
                  this.$router.replace({
                    path: '/index',
                    query: {
                      'shopId': getStore('userInfo').shopId,
                      'customerId': getStore('userInfo').customerId,
                      'isDistance': 1
                    }
                  })
                }, 1300)
              } else {
                this.toggleToast(1, response.message)
              }
            })
        }
      },
      // 调取微信支付
      weChatPay() {
        if (!this.isTime) {
          this.toggleToast(1, '订单已超时')
        } else {
          if (this.PublicJs.isWechat() === true) {
            this.toggleToast(1, '仅支持微信中支付，且微信版本需在5.0以上')
            return
          } else {
            // 发起支付
            const data = {
              customerId: getStore('userInfo').customerId,
              shopId: getStore('userInfo').shopId,
              orderId: this.orderId,
              payType: 1
            }
            this.axios.post(`/br/order/pay`, data)
            .then((res) => {
              res = res.data
              if (res.success === SUCCESS_OK) {
                this.sendWxSDK(res.data)
              } else {
                this.toggleToast(1, res.message)
              }
            }, (res) => {
              this.toggleToast(1, res.message)
            })
          }
        }
      },
      // 调取微信 支付
      sendWxSDK (data) {
        const that = this //  微信支付回调中 this指向会出现问题
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            'appId': data.appId,
            'timeStamp': data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            'nonceStr': data.nonceStr, // 支付签名随机串，不长于 32 位
            'package': data.packageDetail, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            'paySign': data.paySign, // 支付签名
            'signType': data.signType // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          },
          function (res) {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              that.CLEAR_CART(getStore('userInfo').shopId)
              that.BOON_PRICE({
                boonPrice: 0,
                endDate: null,
                redEnvelopeType: null,
                redEnvelopeId: ''
              })
              removeStore('buyCart')
              removeStore('userPrice')

              that.$router.replace({
                path: '/index',
                query: {
                  'shopId': getStore('userInfo').shopId,
                  'customerId': getStore('userInfo').customerId,
                  'isDistance': 1
                }
              })
            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
              that.toggleToast(1, '您已取消支付')
            } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
              that.toggleToast(1, '订单支付失败')
            }
          })
      },
      // toggle toast
      toggleToast(show, text) {
        if (show === true || show === 1) {
          this.toastShow = !this.toastShow
          this.toastText = text
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.toastShow = !this.toastShow
          }, 1300)
        } else {
          return
        }
      },
      // 查询是否有会员卡
      checkMemberCard () {
        let data = {
          customerId: this.customerId,
          shopId: this.shopId
        }
        this.axios.get(`/br/shop/system/list${this.PublicJs.createParams(data)}`)
          .then((response) => {
            response = response.data
            if (response.code === 200) {
              if (response.data.enableMemberSystem) {   // 如果开通了会员功能
                this.enableMember = true
                this.checkBalance()
              } else {
                this.enableMember = false
                this.showWeChat = true
              }
            } else {
              this.toggleToast(1, response.message)
            }
          })
          .catch((error) => {
            console.log('network error' + error)
          })
      },
      // 查询会员卡余额
      checkBalance () {
        let data = {
          customerId: this.customerId,
          shopId: this.shopId
        }
        this.axios.get(`/br/member/card${this.PublicJs.createParams(data)}`)
          .then((response) => {
              response = response.data
              if (response.code === 200) {
                // 操作成功
                this.balance = response.data.cardInfo.balance
                this.balanceEnough = (this.balance >= this.paidPrice)
                if (this.balanceEnough) {
                  this.payConfig.method.memberCard = true
                }
              } else {
                this.toggleToast(1, 'server error.')
              }
            })
          .catch((error) => {
            console.log('get card info fail' + error)
            this.toggleToast(1, 'network error, plz try later')
          })
      }
    },
    components: {
      CountDown,
      toast
    },
    filters: {
      // 保留2位
      toFixedFil(val) {
        return val.toFixed(2)
      }
    }
  }
</script>

<style scoped>
  .buzu{
    font-size: 10px;
    color: #c5c5c5;
    letter-spacing: 0.59px;
    line-height: 20px;
  }
  .balance{
    margin-right: 14px;
    height: 30px;
    width: 30px;
  }
  .icon_xuanze_normal{
    position: absolute;
    right: 17px;
    top: 50%;
    transform: translate(0, -50%);
    width: 21px;
    height: 21px;
  }
  .checkMore{
    position: relative;
    width: 100%;
    text-align: center;
    background-color: white;
    font-size: 10px;
    color: #A9A9A9;
    letter-spacing: 0.38px;
    padding: 5px 0;
  }
  .checkMore>img{
    width: 8px;
    height: 5px;
  }
  .underline:after{
    content: '';
    width: calc(100% - 34px);
    height: 1px;
    position: absolute;
    top: 100%;
    left: 17px;
    border-top: 1px solid #f1f1f1;
  }
  .topline:before{
    content: '';
    width: calc(100% - 34px);
    height: 1px;
    position: absolute;
    top: 0;
    left: 17px;
    border-top: 1px solid #f1f1f1;
  }
  .submitPay .time-wrapper {
    padding: 24px 17px 0px 17px;
    line-height: 1em;
    text-align: center;
    background: #ffffff;
  }

  .submitPay .time-wrapper .timeTitle {
    font-size: 13px;
    color: #c5c5c5;
  }

  .submitPay .time-wrapper .timeNum {
    padding: 13px 0 25px 0;
    /*letter-spacing: 3px;*/
    font-size: 24px;
    color: #343434;
  }

  .submitPay .time-wrapper .timeText {
    display: flex;
    justify-content: space-between;
    height: 39px;
    line-height: 39px;
    letter-spacing: 1px;
    font-size: 14px;
    border-top: 1px solid #f1f1f1;
  }

  .submitPay .time-wrapper .timeText .text {
    color: #c5c5c5;
  }

  .submitPay .time-wrapper .timeText .price {
    color: #ff8932;
  }

  .submitPay .payPattern-wrapper .payPattern-tiele {
    padding: 0 17px;
    height: 35px;
    line-height: 35px;
    font-size: 12px;
    color: #a9a9a9;
  }

  .submitPay .payPattern-wrapper .payPattern {
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 17px;
    height: 59px;
    line-height: 59px;
    font-size: 14px;
    color: #343434;
    background: #ffffff;
  }

  .submitPay .payPattern-wrapper .payPattern .icon_wechat_normal {
    margin-right: 14px;
    font-size: 30px;
    color: #44c144;
  }

  .submitPay .payPattern-wrapper .payPattern .btn_right_normal {
    position: absolute;
    right: 16px;
    font-size: 21px;
    color: #44c144;
  }

  .submitPay .submit-wrapper {
    margin-top: 24px;
    padding: 0 17px;
    margin-bottom: 20px;
  }

  .submitPay .submit-wrapper .submitBtn {
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 15px;
    color: #ffffff;
    background: #4cd964;
    border-radius: 7px;
  }

  .submitPay .image-wrapper {
    margin-top: 69px;
    padding: 0 17px;
  }

  .submitPay .image-wrapper .image {
    width: 100%;
    height: 134px;
    background: url("../../assets/img.png") no-repeat;
    background-size: 100% 134px;
  }
  
  .submitPay .submit-pic {
  	width: 100%;
  	height: 265px;
  	background: url("../../assets/Group6@2x.png") no-repeat;
  	background-size: 100% 265px;
  }

  /*6p*/
  @media (min-width: 414px) {
    .submitPay .image-wrapper .image {
      width: 100%;
      height: 164px;
      background: url("../../assets/img.png") no-repeat;
      background-size: 100% 164px;
    }
  }

  @media (min-width: 375px) {
    .submitPay .image-wrapper .image {
      width: 100%;
      height: 164px;
      background: url("../../assets/img.png") no-repeat;
      background-size: 100% 164px;
    }
  }

  /*ipad*/
  @media (min-width: 768px) {
    .submitPay .image-wrapper .image {
      width: 100%;
      height: 278px;
      background: url("../../assets/img.png") no-repeat;
      background-size: 100% 278px;
    }
  }

  /*Android*/
  @media (max-width: 328px) {
    .submitPay .image-wrapper .image {
      width: 100%;
      height: 139px;
      background: url("../../assets/img.png") no-repeat;
      background-size: 100% 139px;
    }
  }
</style>


