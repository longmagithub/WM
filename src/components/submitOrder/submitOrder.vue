<template>
  <div class="submitOrder">
    <div class="submitOrder-wrapper">
      <section class="address-wrapper" @click="gotoAddList">
        <i class="uxwm-iconfont icon_Location"></i>
        <div class="address-not">
          请添加一个收获地址
        </div>
        <i class="uxwm-iconfont btn_right"></i>
      </section>
      <section class="serviceTime-wrapper">
        <i class="uxwm-iconfont icon_time"></i>
        <span class="text">送达时间</span>
        <div class="time-wrapper">
          <span class="title" v-if="selected === 0">尽快送达</span>
          <span class="time" v-if="selected === 0">预计{{estimateTime | formatDate}}</span>
          <span class="timeItem" v-if="selected > 0">{{options[selected] | formatDate}}</span>
        </div>
        <select class="time-select" v-model="selected" placeholder="请选择">
          <option class="select-item" v-for="(item, index) in options" :value="index">
            <span class="title" v-if="index === 0">尽快送达 &nbsp|&nbsp</span>
            <span class="time" v-if="index === 0"> 预计{{item | formatDate}}</span>
            <span v-if="index > 0">{{item | formatDate}}</span>
          </option>
        </select>
        <i class="uxwm-iconfont btn_right"></i>
      </section>
      <section class="orderDetail-wrapper">
        <div class="title">订单详情</div>
        <div class="order-list">
          <div class="list-content">
          </div>
          <div class="discount">
            <div class="list-content"></div>
            <p class="discount-title">满减优惠
              <span class="discount-num">-￥5</span>
            </p>
          </div>
          <div class="totalPrice">总计：<span class="totaPrice-num">￥53</span></div>
        </div>
      </section>
      <section class="remark-wapper">
        <router-link class="routerLink" :to="{path:'/remark', query:{id: 'remark'}}">
          <p class="remark-title">订单备注
            <i class="uxwm-iconfont btn_right"></i>
          </p>
        </router-link>
        <router-link class="routerLink" :to="{path:'/invoice', query:{id:'invoice'}}">
          <p class="invoicetitle">发票抬头
            <i class="uxwm-iconfont btn_right"></i>
          </p>
        </router-link>
      </section>
    </div>
    <div class="submitOrder-btn">
      <div class="price">待支付￥98</div>
      <div class="submit-btn" @click="submitOrder">确认下单</div>
    </div>
    <toast :show="toastShow" :text="toastText"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formatDate} from '../../common/js/date'
  import {getStore, setStore} from '../../common/js/util'
  import * as PublicJs from '../../utils/public'
  import toast from '../toast.vue'
  const SUCCESS_OK = true
  export default {
    data() {
      return {
        toastShow: false,
        toastText: '',
        options: [], // 时间数组
        selected: 0, // 默认index
        estimateTime: new Date(new Date().setMinutes(new Date().getMinutes() + 30)), // 预计时间
        endTime: 1489752000000, // 结束时间
        key: 45,
        orderId: '' // 订单id
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.PublicJs.changeTitleInWx('确认订单')
      })
    },
    created() {
      console.log('跳转到提交')
      // 修改 title
      PublicJs.changeTitleInWx('确认订单')
      this.options.push(this.estimateTime)

      let orderTaP = new Date().setMinutes(new Date().getMinutes() + 30)
      let onceTime = this.estimateTime

      // 最后一次时间
      this.endTime = new Date(this.endTime).setMinutes(-15)
      // 预计默认时间
      this.estimateTime = orderTaP >= this.endTime ? this.endTime : orderTaP

      // 开始第一次时间
      let oneTimeIndex = Math.floor(onceTime.getMinutes() / 15)

      if (oneTimeIndex === 0) {
        this.options.push(new Date(orderTaP).setMinutes(15))
      } else if (oneTimeIndex === 1) {
        this.options.push(new Date(orderTaP).setMinutes(30))
      } else if (oneTimeIndex === 2) {
        this.options.push(new Date(orderTaP).setMinutes(45))
      } else if (oneTimeIndex === 3) {
        new Date(new Date(orderTaP).setUTCMinutes(0)).setHours(new Date(orderTaP).getHours() + 1)
        this.options.push(new Date(new Date(orderTaP).setUTCMinutes(0)).setHours(new Date(orderTaP).getHours() + 1))
      }
      let oncTime = this.options[1]
      while (oncTime < this.endTime) {
        this.options.push(oncTime += 900000)
      }
      // 默认地址
      const data = {
        sessionId: '640a4f47-916b-48fd-9bd3-ea36fd33365b',
        shopId: 'ca2939cf-f42f-402f-8b75-53283431ee68'
      }
      this.axios.get(`/br/customer/address/default${this.PublicJs.createParams(data)}`).then((res) => {
        console.log('**默认地址**')
        console.log(res)
      })
    },
    methods: {
      // 提交订单
      submitOrder() {
        const data = {
          shopId: getStore('user').shopId,
          customerId: getStore('user').customerId,
          originalPrice: 0.03, // 订单原价
          packPrice: 0.01, // 订单打包费
          dispatchPrice: 0.01, // 订单配送费
          discountPrice: 0, // 订单优惠金额
          paidPrice: 0.03, // 支付金额
          addressId: '3a88babe-485d-4d59-ba6f-5e6c54169ada',  // 用户收货ID
          receivingAddress: '杭州市滨江区南环路3760号保亿创意大厦1201室', // 用户收货地址
          invoiceTitle: '个人', // 发票抬头
          remark: '翠花上酸菜',  // 订单备注
          expectTime: 1490849400,  // 期望送达时间
          orderDish: [  // 订单菜品
            {
              specificationId: '49dafd43-cd8b-4834-8331-29930dc84fd8', // 菜规格ID
              count: 1,  // 菜数量
              price: 0.01
            }
          ],
          shopDiscountId: '' // 所参加优惠活动ID
        }
        setStore('userOrderIofo', data)
        console.log(data)
        const api = '/br/order'
        this.axios.post(api, data).then((res) => {
          res = res.data
          console.log(res)
          if (res.success === SUCCESS_OK) {
            this.orderId = res.data.orderId
            this.gotoPay()
          } else {
            this.toastText = '网络异常，请稍后再试'
            this.toastShow = true
            setTimeout(() => {
              this.toastShow = false
              this.toastText = ''
            }, 1000)
          }
        })
      },
      // 去支付
      gotoPay() {
        this.$router.push({
          path: '/submitPay',
          query: {
            orderId: this.orderId
          }
        })
      },
      // 去地址列表
      gotoAddList() {
        this.$router.push({
          path: '/addList',
          query: {
            shopId: getStore('user').shopId,
            customerId: getStore('user').customerId
          }
        })
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    components: {
      toast
    }
  }
</script>

<style scoped>
  .address-wrapper {
    box-sizing: border-box;
    margin-bottom: 14px;
    padding: 18px 14px 16px 17px;
    width: 100%;
    height: 67px;
    line-height: 33px;
    font-size: 0;
    background: #ffffff;
  }

  .address-wrapper .address-not {
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
    color: #343434;
  }

  .address-wrapper .icon_Location {
    display: inline-block;
    margin-right: 22px;
    color: #ff8932;
    font-size: 21px;
  }

  .address-wrapper .btn_right {
    display: inline-block;
    vertical-align: top;
    float: right;
    color: #d7d7d7;
    font-weight: 700;
    font-size: 14px;
  }

  .serviceTime-wrapper {
    position: relative;
    box-sizing: border-box;
    margin-bottom: 14px;
    padding: 0 14px;
    width: 100%;
    height: 39px;
    line-height: 39px;
    font-size: 0;
    border-left: 5px solid #ff6651;
    background: #ffffff;
  }

  .serviceTime-wrapper .icon_time {
    display: inline-block;
    vertical-align: top;
    margin-right: 16px;
    color: #ff8932;
    font-size: 21px;
  }

  .serviceTime-wrapper .text {
    display: inline-block;
    color: #343434;
    font-size: 14px;
    font-weight: 700;
  }

  .serviceTime-wrapper .time-wrapper {
    display: inline-block;
    float: right;
    margin-right: 20px;
    color: #ff8923;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
  }

  .serviceTime-wrapper .time-wrapper .title {
    display: inline-block;
    padding-right: 10px;
    font-size: 14px;
    line-height: 14px;
    border-right: 1px solid #ff8932;
  }

  .serviceTime-wrapper .time-wrapper .time {
    display: inline-block;
    padding-left: 10px;
    font-size: 14px;
  }

  .serviceTime-wrapper .time-wrapper .timeItem {
    letter-spacing: 2px;
  }

  .serviceTime-wrapper .time-select {
    position: absolute;
    top: 0;
    right: 0px;
    width: 190px;
    height: 39px;
    color: #ff8923;
    font-size: 14px;
    font-weight: 500;
    border: none;
    opacity: 0;
  }

  .serviceTime-wrapper .time-select .select-item {
    text-align: center;
  }

  .serviceTime-wrapper .btn_right {
    display: inline-block;
    vertical-align: top;
    position: absolute;
    right: 14px;
    color: #d7d7d7;
    font-weight: 700;
    font-size: 14px;
  }

  .orderDetail-wrapper {
    margin-bottom: 14px;
    width: 100%;
    min-height: 37px;
    background: #ffffff;
  }

  .orderDetail-wrapper .title {
    padding-left: 17px;
    height: 37px;
    line-height: 37px;
    font-size: 14px;
    font-weight: 700;
    border-bottom: 1px solid #f1f1f1;
  }

  .orderDetail-wrapper .order-list {
    box-sizing: border-box;
    padding-left: 17px;
  }

  .orderDetail-wrapper .order-list .discount {
    height: 37px;
    line-height: 37px;
    font-size: 13px;
  }

  .orderDetail-wrapper .order-list .discount .discount-title {
    padding-left: 25px;
    padding-right: 14px;
    font-size: 14px;
    color: #343434;
    border-bottom: 1px solid #f1f1f1;
    background: url("../../assets/icon_activity_status0.png") no-repeat left center;
    background-size: 15px 15px;
  }

  .orderDetail-wrapper .order-list .discount .discount-title .discount-num {
    float: right;
    font-size: 14px;
    color: #ff8943;
  }

  .orderDetail-wrapper .order-list .totalPrice {
    height: 37px;
    line-height: 37px;
    padding-right: 14px;
    text-align: right;
    font-size: 13px;
    color: #2b2a2e;
  }

  .orderDetail-wrapper .order-list .totalPrice .totaPrice-num {
    color: #ff8932;
  }

  .remark-wapper {
    box-sizing: border-box;
    margin-bottom: 14px;
    padding-left: 14px;
    width: 100%;
    min-height: 37px;
    background: #ffffff;
  }

  .remark-wapper .routerLink {
    font-size: 13px;
    font-weight: 700;
    color: #343434;
  }

  .remark-wapper .remark-title {
    box-sizing: border-box;
    padding-right: 14px;
    height: 37px;
    line-height: 37px;
    border-bottom: 1px solid #f1f1f1;
  }

  .remark-wapper .invoicetitle {
    box-sizing: border-box;
    padding-right: 14px;
    height: 37px;
    line-height: 37px;
  }

  .remark-wapper .remark-title .btn_right,
  .remark-wapper .invoicetitle .btn_right {
    display: inline-block;
    vertical-align: top;
    float: right;
    color: #d7d7d7;
    font-weight: 700;
    font-size: 14px;
  }

  .submitOrder-btn {
    display: flex;
    position: fixed;
    z-index: 30;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 49px;
    line-height: 49px;
    color: #ffffff;
    font-size: 16px;
  }

  .submitOrder-btn .price {
    flex: 1;
    padding-left: 17px;
    background: #59595b;
  }

  .submitOrder-btn .submit-btn {
    flex: 0 0 107px;
    width: 107px;
    text-align: center;
    font-weight: 700;
    background: #ff8932;
    letter-spacing: 1px;
  }

  .time-select {
    width: 100px;
    font-size: 12px;
  }
</style>
