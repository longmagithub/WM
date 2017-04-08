<template>
  <div class="submitPay">
    <div class="time-wrapper">
      <p class="timeTitle">支付剩余时间</p>
      <count-down class="timeNum"
                  v-on:end_callback="countDownFun"
                  :currentTime="currentTime"
                  :startTime="currentTime"
                  :endTime="endTime"></count-down>
      <!--<p class="timeNum" v-else>00:00:00</p>-->
      <p class="timeText">
        <span class="text">详情</span>
        <span class="price">￥{{paidPrice}}</span>
      </p>
    </div>
    <div class="payPattern-wrapper">
      <p class="payPattern-tiele">选择支付方式</p>
      <p class="payPattern">
        <i class="uxwm-iconfont icon_wechat_normal"></i>
        <span class="text">微信支付</span>
        <i class="uxwm-iconfont btn_right_normal"></i>
      </p>
    </div>
    <div class="submit-wrapper" @click="weChatPay">
      <div class="submitBtn">确认支付￥{{paidPrice}}</div>
    </div>
    <!--<div class="image-wrapper">-->
    <!--<div class="image"></div>-->
    <!--</div>-->
    <toast :show="toastShow" :text="toastText"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import CountDown from './counter/counter.vue'
  import toast from '../toast.vue'
  import {getStore} from '../../common/js/util'
  //  import {getStore, removeStore, setStore} from '../../common/js/util'
  import {mapMutations} from 'vuex'
  const SUCCESS_OK = true
  export default {
    data() {
      return {
        currentTime: Math.round(new Date().getTime() / 1000), // 当前时间戳
        endTime: Math.round(new Date().setMinutes(new Date().getMinutes() + 15) / 1000), // 15分钟后
        isTime: true,
        toastShow: false,
        toastText: '',
        orderId: '',
        paidPrice: 0 // 支付多少
      }
    },
    mounted() {
      this.orderId = this.$route.query.orderId ? this.$route.query.orderId : ''
      this.paidPrice = getStore('userOrderIofo').paidPrice ? getStore('userOrderIofo').paidPrice : 0
    },
    methods: {
      ...mapMutations(['CLEAR_CART']),
      countDownFun() {
        this.isTime = !this.isTime
        this.toggleToast(1, '订单已超时')
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
              orderId: this.orderId
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
        const that = this
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
            window.alert(res.err_msg)
            // get_brand_wcpay_request：ok; get_brand_wcpay_request：cancel; get_brand_wcpay_request：fail
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              window.alert('支付成功啦！！')
//              removeStore('buyCart')
//              that.CLEAR_CART(getStore('buyCart').shopId)
//              setStore('userPrice', [])
              this.toggleToast(1, '支付成功')
              this.$router.replace({
                path: '/orderList',
                query: {
                  'shopId': getStore('userInfo').shopId,
                  'sessionId': getStore('userInfo').customerId
                }
              })
              // window.location.href = 'paySuccess.html?shopCode=' + shopCode + '&oid=' + orderId + '&addActivity=' + addActivity;
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
          }, 1000)
        } else {
          return
        }
      }
    },
    components: {
      CountDown,
      toast
    }
  }
</script>

<style scoped>
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
    margin-top: 44px;
    padding: 0 17px;
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


