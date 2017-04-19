<template>
  <div class="order-detail-wrap">
    <section class="bg-white order-status">
      <div class="order-status-icon" :class="'status' + orderDetail.state"></div>
      <p class="order-status-tip" v-if="orderDetail.state === 0 || orderDetail.state === 100">
        {{orderStatus.tip}}</p>
      <p class="order-status-txt">{{orderDetail.stateMsgC}}</p>
      <button type="button" class="btn-to-pay" v-if="orderDetail.state === 0" @click="weChatPay()">去支付</button>
    </section>
    <section class="bg-white order-foods">
      <ul>
        <li class="title">订单详情</li>
        <li v-for="item in orderDetail.dishes">
          {{item.dishName}}
          <label>
            <span v-show="item.dishCount > 1">x{{item.dishCount}}</span>
            <span class="amount">￥{{item.dishCount * item.dishPrice | toFixedFil}}</span>
          </label>
        </li>
        <li>
          餐盒费
          <label>
            <span class="amount">￥{{orderDetail.packPrice}}</span>
          </label>
        </li>
        <li>
          配送费
          <label>
            <span class="amount">￥{{orderDetail.dispatchPrice}}</span>
          </label>
        </li>
        <li v-if="orderDetail.discountPrice">
          <div class="discoount">满减优惠</div>
          <label>
            <span class="discount-amount">-￥{{orderDetail.discountPrice}}</span>
          </label>
        </li>
        <li v-if="orderDetail.activities.length">
          <div class="discoount">红包</div>
          <label>
            <span class="discount-amount">-￥{{orderDetail.activities[0].valueC}}</span>
          </label>
        </li>
        <li class="total-amount">
          总计：<span>￥{{orderDetail.payPrice}}</span>
        </li>
      </ul>
    </section>
    <section class="bg-white others" v-if="orderDetail.remark !== '' || orderDetail.invoiceTitle !== ''">
      <ul>
        <li class="title">其他</li>
        <li v-show="orderDetail.remark !== ''">订单备注：{{orderDetail.remark}}</li>
        <li v-show="orderDetail.invoiceTitle !== ''">发票抬头：{{orderDetail.invoiceTitle}}</li>
      </ul>
    </section>
    <section class="bg-white send">
      <ul>
        <li class="title">配送信息</li>
        <li>送达时间：{{orderDetail.expectedFinish}}</li>
        <li>联系人：{{orderDetail.receiverName}} {{orderDetail.gender === 1 ? '先生' : orderDetail.gender === 2 ? '女士' :
          ''}}
        </li>
        <li>电话：{{orderDetail.phoneNumber}}</li>
        <li>地址：{{orderDetail.address}}{{orderDetail.houseNum}}</li>
        <li v-if="orderStatus.iconCode === 4 || orderStatus.iconCode === 5">配送方式：平台专送</li>
        <li v-if="orderStatus.iconCode === 4 || orderStatus.iconCode === 5">配送骑手：{{orderDetail.dmName}} <span
          @click="callPhone(orderDetail.dmPhone)">{{orderDetail.dmPhone}}</span></li>
      </ul>
    </section>
    <section class="bg-white order-info">
      <ul>
        <li class="title">订单信息</li>
        <li>订单号：{{orderDetail.orderNo}}</li>
        <li v-if="orderStatus.iconCode !== 0">支付方式：在线支付</li>
        <li>下单时间：{{orderDetail.orderTime}}</li>
      </ul>
    </section>
    <section class="bg-white phone">
      <ul @click="callPhone(orderDetail.shopPhone)">
        <li>
          联系商家
          <label>
            <iconfont :iconname="icon.phone"></iconfont>
          </label>
        </li>
      </ul>
    </section>
    <toast :show="toastShow" :text="toastText" v-on:closeToast="doCloseToast"></toast>
  </div>
</template>
<script>
  import Toast from './../components/toast.vue'
  import {getStore} from './../common/js/util'
  import {mapMutations} from 'vuex'
  import * as PublicJs from '../utils/public'
  export default {
    created() {
      PublicJs.changeTitleInWx('订单详情')
    },
    mounted () {
      this.orderNo = this.$route.query.orderNo ? this.$route.query.orderNo : ''
      this.orderId = this.$route.query.orderId ? this.$route.query.orderId : ''
      this.sessionId = this.$route.query.sid ? this.$route.query.sid : ''
      this.shopId = this.$route.query.shopId ? this.$route.query.shopId : ''
      this.$nextTick(() => {
        this.getOrderDetail()
      })
    },
    data () {
      return {
        toastShow: false,
        toastText: '',
        sessionId: '',
        shopId: '',
        orderNo: '',
        orderId: '',
        isAjaxing: false,
        icon: {
          phone: 'btn_phone'
        },
        orderStatus: {
          iconCode: 4,
          tip: ''
        },
        orderDetail: {
          dishes: []
        },
        iconCodeArr: ['status0', 'status1', 'status2', 'status3', 'status4', 'status5', 'status6', 'status7',
          'status8', 'status9', 'status10', 'status11', 'status12', 'status13'],
        orderStatusTipArr: ['', '已付款，待商家接单', '已接单，待配送', '已接单，待配送', '配送中，待收货', '已完成', '订单关闭']
      }
    },
    components: {
      Toast
    },
    methods: {
      ...mapMutations(['CLEAR_CART']),
      getOrderDetail () {
        const data = {
          sessionId: this.sessionId,
          orderNo: this.orderNo
        }
        this.axios.get(`/br/order${this.PublicJs.createParams(data)}`)
        .then((res) => {
          if (res.data.success) {
            this.orderDetail = res.data.data
            console.log(this.orderDetail)
            this.orderStatus.iconCode = res.data.data.state
            if (res.data.data.state === 0) {
              this.orderStatus.tip = `请在${this.addMinutes(res.data.data.orderTime, 15)}前付款，超过时间，订单将被自动取消`
            } else if (res.data.data.state === 6 || res.data.data.state === 100) {
              this.orderStatus.tip = '超过15分钟未付款，系统取消了订单'
            }
          } else {
            console.log(12312312)
            this.toastShow = true
            this.toastText = '网络异常，请稍候再试'
          }
        }, (res) => {
          this.toastShow = true
          this.toastText = '网络异常，请稍候再试'
        })
      },
      addMinutes (date, minutes) {
        minutes = parseInt(minutes)
        var interTimes = minutes * 60 * 1000
        interTimes = parseInt(interTimes)
        return this.PublicJs.formatTime((new Date(Date.parse(date) + interTimes).getTime() / 1000), 'hh:mm')
      },
      callPhone (phone) {
        this.PublicJs.callPhone(phone)
      },
      // 调取微信支付
      weChatPay() {
//        if (false) {
//          this.toggleToast(1, '订单已超时')
//        } else {
        if (this.PublicJs.isWechat() === true) {
          this.toggleToast(1, '仅支持微信中支付，且微信版本需在5.0以上')
          return
        } else {
          // 发起支付
          const data = {
            customerId: this.sessionId,
            shopId: this.orderDetail.shopId,
            orderId: this.orderId
          }
          this.axios.post(`/br/order/pay`, data)
          .then((res) => {
            res = res.data
            if (res.success) {
              this.sendWxSDK(res.data)
            } else {
              this.toggleToast(1, res.message)
            }
          }, (res) => {
            this.toggleToast(1, res.message)
          })
        }
//        }
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
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
//              window.alert(res.err_msg)
//              window.location.href = 'https://www.baidu.com/'
//              window.alert('失败')
//              setStore('userPrice', [])
              that.CLEAR_CART(getStore('userInfo').shopId)
              that.$router.replace({
                path: '/index',
                query: {
                  'shopId': this.orderDetail.shopId,
                  'customerId': this.sessionId
                }
              })
            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
              that.toggleToast(1, '您已取消支付')
            } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
              that.toggleToast(1, '订单支付失败')
            }
          })
      },
      doCloseToast() {
        this.toastShow = false
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
      }
    },
    filters: {
      // 保留2位
      toFixedFil(val) {
        return val.toFixed(2)
      }
    }
  }
</script>
<style scoped lang="scss">
  .order-detail-wrap {
    padding-top: 12px;
    padding-bottom: 12px;
    line-height: 1em;

  section {
    margin-bottom: 12px;

  ul {

  li {
    margin-left: 16px;
    padding: 16px 16px 16px 0;
    color: #949494;
    border-bottom: 1px solid #f1f1f1;

  label {
    float: right;

  .amount {
    margin-left: 37px;
    color: #343434;
  }

  }
  .discoount {
    display: inline;
    background: url('../assets/icon_activity_status0.png') no-repeat left center;
    background-size: 13px 13px;
    padding-left: 24px;
  }

  .discount-amount {
    color: #ff6651;
  }

  a {
    margin-left: 12px;
    color: #32a1ff;
  }

  }
  li.title {
    margin-left: 0;
    padding-left: 16px;
    font-size: 14px;
    color: #2b2a2e;
    border-bottom: 1px solid #f1f1f1;
  }

  li.total-amount {
    color: #343434;
    text-align: right;

  span {
    color: #ff8932;
  }

  }
  li:after {
    clear: both;
  }

  li:last-child {
    border-bottom: none;
  }

  }
  }
  section.order-status {
    padding-bottom: 21px;
    text-align: center;

  .order-status-icon {
    padding-top: 21px;
    height: 55px;
  }

  .order-status-tip {
    margin-top: 5px;
    font-size: 11px;
    color: #b3b3b3;
  }

  .order-status-txt {
    margin-top: 8px;
    font-size: 15px;
  }

  .btn-to-pay {
    margin: 18px auto 0 auto;
    width: 100px;
    height: 24px;
    line-height: 24px;
    color: #fff;
    border: none;
    border-radius: 5px;
    background-color: #32a1ff;
  }

  .status0 {
    background: url('../assets/icon_order_status0.png') no-repeat center bottom;
    background-size: 55px 55px;
  }

  .status1 {
    background: url('../assets/icon_order_status1_.png') no-repeat center bottom;
    background-size: 55px 55px;
  }

  .status2,
  .status8,
  .status9,
  .status13 {
    background: url('../assets/icon_order_status2_8_9_13_.png') no-repeat center bottom;
    background-size: 55px 55px;
  }

  .status3,
  .status4 {
    background: url('../assets/icon_order_status3_4_.png') no-repeat center bottom;
    background-size: 55px 55px;
  }

  .status5 {
    background: url('../assets/icon_order_status5_.png') no-repeat center bottom;
    background-size: 55px 55px;
  }

  .status6,
  .status7,
  .status10,
  .status100 {
    background: url('../assets/icon_order_status6_7_10_.png') no-repeat center bottom;
    background-size: 55px 55px;
  }

  .status12 {
    background: url('../assets/icon_order_status12_.png') no-repeat center bottom;
    background-size: 55px 55px;
  }

  }
  section.phone {
    margin-bottom: 0;

  li {
    color: #343434;

  label {
    color: #ff8932;

  i {
    font-size: 18px;
  }

  }
  }
  }
  }
</style>
