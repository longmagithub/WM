<template>
  <div class="invite">
    <div class="inviteBox">
      <p class="inviteWrapper">
        <i class="uxwm-iconfont icon_inviteNum"></i>
        <input type="text" class="inviteInput" placeholder="输入您的优惠码">
      </p>
      <div class="inviteBtn" @click="goShopList">确定</div>
    </div>
    <toast :show="toastShow" :text="toastText"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import toast from '../components/toast.vue'
  import {urlParse, setStore} from '../common/js/util'
  export default {
    data() {
      return {
        inviteText: '',
        toastShow: false,
        toastText: ''
      }
    },
    created() {
      let url = window.location.href
      if (url.indexOf('code') < 0) {
        // console.log('没有授权')
        this.to()
      } else {
        const data = {
          code: urlParse().code,
          type: 1 // 授权类型：1静默授权；2用户授权
        }
        const api = '/mp/authority/customer'
        this.axios.post(api, data).then((res) => {
          res = res.data
          this.customerId = res.data.customerId
          setStore('openId', {
            customerId: res.data.customerId
          })
        })
      }
    },
    methods: {
      goShopList() {
        this.toggleToast(1, '成功了，去列表', 1300)
        setTimeout(() => {
          window.location.href = 'http://newpay.tunnel.qydev.com/VAOrderH5/?#/shopList?T=' + Date.parse(new Date()) / 1000
        }, 1800)
      },
      // 去授权
      to() {
        const oauthCallbackUrl =
          encodeURIComponent('http://newpay.tunnel.qydev.com/VAOrderH5/?#/invite')
        const oauthJumpUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx96f6daa5f8a71039&redirect_uri=${oauthCallbackUrl}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
        // 跳转授权 浏览器不保留记录
        window.location.replace(oauthJumpUrl)
//        window.location.href = oauthJumpUrl
      },
      // toggle toast
      toggleToast(show, text, time) {
        if (show === true || show === 1) {
          this.toastShow = !this.toastShow
          this.toastText = text
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.toastShow = !this.toastShow
          }, time)
        } else {
          return
        }
      }
    },
    components: {
      toast
    }
  }
</script>

<style>
  .invite {
    position: fixed;
    z-index: 111;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: url("../assets/inviteNum.png") no-repeat;
    background-size: 100%;
  }

  .inviteBox {
    position: absolute;
    top: 66%;
    left: 15%;
    width: 70%;
  }

  .inviteBox .inviteWrapper {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    padding: 0 18px;
    font-size: 14px;
    background: #ffffff;
    border-radius: 6px;
  }

  .inviteBox .inviteWrapper .inviteInput {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 60px;
    width: 100%;
    height: 50px;
    border: none;
    background: none;
  }

  .inviteBox .inviteWrapper .icon_inviteNum {
    line-height: 50px;
    color: #FFB66C;
  }

  .inviteBox .inviteBtn {
    margin: 0 auto;
    margin-top: 33px;
    width: 123px;
    height: 47px;
    line-height: 47px;
    text-align: center;
    font-family: STYuanti-SC-Regular;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0.57px;
    background: #FFB66C;
    border-radius: 6px;
    box-shadow: 0 2px 2px 0 rgba(255, 166, 78, 0.50);
  }
</style>
