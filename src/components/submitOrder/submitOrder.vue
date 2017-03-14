<template>
  <div class="submitOrder">
    <div class="submitOrder-wrapper">
      <section class="address-wrapper">
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
          <span class="title">尽快送达</span>
          <span class="time">预计12:30</span>
        </div>
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
      <div class="submit-btn" @click="gotoPay">确认下单</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      gotoPay() {
        this.$router.push({path: '/submitPay'})
      }
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
    color: #ff8923;
    font-size: 0px;
    font-weight: 500;
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
</style>
