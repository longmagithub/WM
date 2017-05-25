<template>
  <div class="inviteWap">
    <div class="invite">
      <div class="logoimg"></div>
      <div class="inviteText">
        <p class="title">我的邀请码：<input class="inviteNum" type="text" v-model="idcode" readonly="readonly"></p>
        <p class="inviteDesc">好友使用您的邀请码并成功下单后,<br>
          您与好友都会获得一个最高<span class="inviteNum">10元</span>的红包</p>
      </div>
      <div class="inviteBorder"></div>
      <div class="inviteBox">
        <p class="inviteWrapper">
          <i class="uxwm-iconfont icon_inviteNum"></i>
          <input type="text" class="inviteInput" v-model="referenceCode" placeholder="输入您的优惠码">
        </p>
        <div class="inviteBtn" @click="goShopList">确定</div>
      </div>
      <toast :show="toastShow" :text="toastText"></toast>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import toast from '../../components/toast.vue'
  import {getStore, urlParse, setStore} from '../../common/utils/util'
  export default {
    data() {
      return {
        inviteText: '',
        toastShow: false,
        toastText: '',
        customerId: '',
        idcode: '',
        referenceCode: '',
        isSuccessInviteNum: '',
        isSuccessInvite: false
      }
    },
    created() {
      this.shopId = this.$route.query.shopId
      this.customerId = this.$route.query.customerId
      if (this.shopId && this.customerId) {
        this.getIdcode(this.customerId)
      } else {
        this.isCode()
      }
    },
    methods: {
      isCode() {
        let url = window.location.href
        if (getStore('openId') === null) {
          if (url.indexOf('code') < 0) {
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
              this.getIdcode(this.customerId)
              setStore('openId', {
                customerId: res.data.customerId
              })
            })
          }
        } else if (getStore('openId').customerId === undefined) {
          const data = {
            code: urlParse().code,
            type: 1 // 授权类型：1静默授权；2用户授权
          }
          const api = '/mp/authority/customer'
          this.axios.post(api, data).then((res) => {
            res = res.data
            this.customerId = res.data.customerId
            this.getIdcode(this.customerId)
            setStore('openId', {
              customerId: res.data.customerId
            })
          })
        } else {
          this.customerId = getStore('openId').customerId
          this.getIdcode(this.customerId)
        }
      },
      // 我的邀请码
      getIdcode(id) {
        this.axios.get(`/br/customer/idcode?sessionId=${id}`).then((res) => {
          res = res.data
          if (res.success) {
            this.idcode = res.data.idCode
            this.isSuccessInviteNum = res.data.referenceCode
            if (this.isSuccessInviteNum === '') {
              this.isSuccessInvite = false
            } else {
              this.isSuccessInvite = true
            }
          }
        })
      },
      // 去列表页面
      goShopList() {
        const data = {
          sessionId: this.customerId,
          referenceCode: this.referenceCode
        }
        this.axios.post('/br/customer/idcode', data).then((res) => {
          res = res.data
          if (res.success && res.code === 200) {
            console.log(res.data)
            this.toggleToast(1, res.message, 1500)
            setTimeout(() => {
              window.location.href =
                'http://newpay.tunnel.qydev.com/VAOrderH5/?#/index?customerId=' + this.customerId + '&shopId=' + this.shopId + '&T=' + Date.parse(new Date()) / 1000
            }, 2000)
          } else if (res.code === 14001) {
            this.toggleToast(1, res.message, 1500)
            setTimeout(() => {
              window.location.href =
                'http://newpay.tunnel.qydev.com/VAOrderH5/?#/index?customerId=' + this.customerId + '&shopId=' + this.shopId + '&T=' + Date.parse(new Date()) / 1000
            }, 2000)
          } else {
            this.toggleToast(1, res.message, 1500)
          }
        })
      },
      // 去授权
      to() {
        const oauthCallbackUrl =
          encodeURIComponent('http://newpay.tunnel.qydev.com/VAOrderH5/?#/inviteNum?t=' + Date.parse(new Date()) / 1000)
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
    /*display: none;*/
    position: fixed;
    z-index: 111;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(255, 209, 102, 1);
    background-size: 100%;
  }

  .invite .logoimg {
    position: absolute;
    top: 47px;;
    width: 100%;
    height: 182px;
    background: url("../../assets/inviteLogo.png") no-repeat center;
    background-size: 182px 100%;
  }

  /*ip5*/
  @media (max-width: 320px) {
    .invite .logoimg {
      position: absolute;
      top: 40px;;
      width: 100%;
      height: 155px;
      background: url("../../assets/inviteLogo.png") no-repeat center;
      background-size: 155px 100%;
    }
  }

  .invite .inviteText {
    position: absolute;
    top: 254px;
    width: 100%;
    text-align: center;
    color: #fff;
  }

  @media (max-width: 320px) {
    .invite .inviteText {
      position: absolute;
      top: 210px;
      width: 100%;
      text-align: center;
      color: #fff;
    }
  }

  .invite .inviteText .title {
    font-family: STYuanti-SC-Regular;
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: 0.64px;
  }

  .invite .inviteText .title .inviteNum {
    width: 100px;
    font-family: STYuanti-SC-Bold;
    font-size: 24px;
    color: #FF5544;
    background: none;
    /*border: none;*/
    letter-spacing: 0.85px;
  }

  .invite .inviteText .inviteDesc {
    font-family: STYuanti-SC-Regular;
    font-size: 13px;
    color: #FFFFFF;
    letter-spacing: 1px;
    line-height: 23px;
  }

  .invite .inviteText .inviteDesc .inviteNum {
    font-family: STYuanti-SC-Bold;
    font-size: 16px;
    color: #FF5544;
    letter-spacing: 1.24px;
  }

  .invite .inviteBorder {
    position: absolute;
    top: 55%;
    width: 100%;
    height: 20px;
    background: url("../../assets/inviteBorder.png") no-repeat center;
    background-size: 94% 20px;
  }

  .inviteSuccess {
    position: fixed;
    z-index: 111;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: url("../../assets/inviteSuccess02.png") no-repeat;
    background-size: 100%;
  }

  .inviteBox {
    position: absolute;
    top: 62%;
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
    color: #FF5544;
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
    background: #FF5544;
    border-radius: 6px;
  }
</style>
