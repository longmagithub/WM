<template>
  <div class="order-detail-wrap">
    <section class="bg-white order-status">
      <div class="order-status-icon" :class="iconCodeArr[orderStatus.iconCode]"></div>
      <p class="order-status-tip" v-if="orderStatus.iconCode === 0 || orderStatus.iconCode === 6">{{orderStatus.tip}}</p>
      <p class="order-status-txt">{{orderStatusTipArr[orderStatus.iconCode]}}</p>
      <button type="button" class="btn-to-pay" v-if="orderStatus.iconCode === 0" @click="toPay()">去支付</button>
    </section>
    <section class="bg-white order-foods">
      <ul>
        <li class="title">订单详情</li>
        <li v-for="item in orderDetail.dishes">
          {{item.dishName}}{{item.dishType}}
          <label>
            <span v-show="item.dishCount > 1">x{{item.dishCount}}</span>
            <span class="amount">￥{{item.dishPrice}}</span>
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
        <li>
          <div class="discoount">满减优惠</div>
          <label>
            <span class="discount-amount">-￥{{orderDetail.discountPrice}}</span>
          </label>
        </li>
        <li class="total-amount">
          总计：<span>￥{{orderDetail.payPrice}}</span>
        </li>
      </ul>
    </section>
    <section class="bg-white others">
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
        <li>联系人：{{orderDetail.receiverName}} {{orderDetail.gender === 1 ? '先生' : orderDetail.gender === 2 ? '女士' : ''}}</li>
        <li>电话：{{orderDetail.phoneNumber}}</li>
        <li>地址：{{orderDetail.address}}</li>
        <li v-if="orderStatus.iconCode === 4 || orderStatus.iconCode === 5">配送方式：蜂鸟专送</li>
        <li v-if="orderStatus.iconCode === 4 || orderStatus.iconCode === 5">配送骑手：{{orderDetail.dmName}} <span @click="callPhone(orderDetail.dmPhone)">{{orderDetail.dmPhone}}</span></li>
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
export default {
  mounted () {
    this.orderId = this.$route.query.id ? this.$route.query.id : ''
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
      iconCodeArr: ['status0', 'status1', 'status2', 'status3', 'status4', 'status5', 'status6'],
      orderStatusTipArr: ['', '已付款，待商家接单', '已接单，待配送', '已接单，待配送', '配送中，待收货', '已完成', '订单关闭']
    }
  },
  components: {
    Toast
  },
  methods: {
    getOrderDetail () {
      const data = {
        sessionId: this.sessionId,
        orderId: this.orderId
      }
      this.axios.get(`/br/order${this.PublicJs.createParams(data)}`)
      .then((res) => {
        if (res.data.success) {
          this.orderDetail = res.data.data
          this.orderStatus.iconCode = res.data.data.state
          if (res.data.data.state === 0) {
            this.orderStatus.tip = `请在${this.addMinutes(res.data.data.orderTime, 15)}前付款，超过时间，订单将被自动取消`
          } else if (res.data.data.state === 6) {
            this.orderStatus.tip = '超过15分钟未付款，系统取消了订单'
          }
        } else {
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
    toPay () {
      if (!this.PublicJs.isWechat()) {
        this.toastShow = true
        this.toastText = '仅支持微信中支付，且微信版本需在5.0以上'
        return
      }
      if (this.isAjaxing) return
      this.isAjaxing = true
      // 发起支付
      const data = {
        sessionId: this.sessionId,
        shopId: this.shopId,
        orderId: this.orderId
      }
      this.axios.post(`/br/order/pay`, data)
      .then((res) => {
        if (res.data.success) {
          this.sendWxSDK(res.data.data)
        } else {
          this.toastShow = true
          this.toastText = '网络异常，请稍候重试'
        }
      }, (res) => {
        this.isAjaxing = false
        this.toastShow = true
        this.toastText = '网络异常，请稍候重试'
      })
    },
    sendWxSDK (data) {
      wx.chooseWXPay({
        timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
        package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: data.paySign, // 支付签名
        success: function (res) {
          this.isAjaxing = false
          this.toastShow = true
          // get_brand_wcpay_request：ok; get_brand_wcpay_request：cancel; get_brand_wcpay_request：fail
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            this.toastText = '支付成功'
            // window.location.href = 'paySuccess.html?shopCode=' + shopCode + '&oid=' + orderId + '&addActivity=' + addActivity;
          } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            this.toastText = '您已取消支付'
          } else if (res.err_msg == "get_brand_wcpay_request:fail") {
            this.toastText = '支付失败'
          }
        }
      })
    },
    doCloseToast () {
      this.toastShow = false
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
        background: url('../assets/icon_order_status1.png') no-repeat center bottom;
        background-size: 55px 55px;
      }
      .status2 {
        background: url('../assets/icon_order_status2.png') no-repeat center bottom;
        background-size: 55px 55px;
      }
      .status3 {
        background: url('../assets/icon_order_status2.png') no-repeat center bottom;
        background-size: 55px 55px;
      }
      .status4 {
        background: url('../assets/icon_order_status4.png') no-repeat center bottom;
        background-size: 55px 55px;
      }
      .status5 {
        background: url('../assets/icon_order_status5.png') no-repeat center bottom;
        background-size: 55px 55px;
      }
      .status6 {
        background: url('../assets/icon_order_status6.png') no-repeat center bottom;
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
