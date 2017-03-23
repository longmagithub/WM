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
        <span class="price">￥20.00</span>
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
      <div class="submitBtn">确认支付￥20.00</div>
    </div>
    <div class="image-wrapper">
      <div class="image"></div>
    </div>
    <toast :show="toastShow" :text="toastText"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import CountDown from './counter/counter.vue'
  import toast from '../toast.vue'
  export default {
    data() {
      return {
        currentTime: Math.round(new Date().getTime() / 1000), // 当前时间戳
        endTime: Math.round(new Date().setMinutes(new Date().getMinutes() + 1) / 1000), // 15分钟后
        isTime: true,
        toastShow: false,
        toastText: ''
      }
    },
    methods: {
      countDownFun() {
        this.isTime = !this.isTime
        console.log(this.isTime)
        this.toastShow = true
        this.toastText = '订单已超时'
        setTimeout(() => {
          this.toastShow = false
          this.toastText = ''
        }, 1000)
      },
      // 调取微信支付
      weChatPay() {
        if (!this.isTime) {
          this.toastShow = true
          this.toastText = '订单已超时'
          setTimeout(() => {
            this.toastShow = false
            this.toastText = ''
          }, 1000)
          console.log('已经超时')
        } else {
          console.log('去支付')
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


