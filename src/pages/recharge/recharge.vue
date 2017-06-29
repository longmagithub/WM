<template>
  <div class="index">
    <div class="header">
      <img src="../../assets/thankumom.jpg">
      <div class="title">
        <span>Thank u mom</span>
        <span>会员卡</span>
      </div>
    </div>  
    <h3>充值金额</h3>
    <div class="btns">
      <div class="grid" 
        v-for='(item, index) in discounts' 
        v-bind:class='{left_align: index%3===0, 
                        center_align: index%3===1, 
                        right_align: index%3===2}'>
        <div class="amount_btn" 
            @click='invokePay(index)'
            v-bind:class='{btn_selected: item.selected, 
                            btn_not_Selected: !item.selected}'>
          {{item.rechargeValue}}    
          <div class="sale">赠{{item.discountValue}}</div>              
        </div>
      </div>
      
    </div>
    <h3 class="member">会员权益</h3>
    <ol>
      <li v-for='(item, index) in rights'>{{index+1}}.{{item.content}}</li>
    </ol>
    <toast :show="toastShow" :text="toastText"></toast>
  </div>
</template>
<script type="text/javascript">
  import {getStore, getLocal} from '../../common/utils/util'
  import toast from '../../components/toast.vue'
  export default {
    data () {
      return {
        selected: false,
        discounts: [],
        rights: [],
        toastShow: false,
        toastText: '',
        canSelect: true,
        customerId: '',
        token: ''
      }
    },
    mounted() {
      // this.shopId = getStore('shopId').shopId
      this.customerId = getLocal('customerId')
      this.token = getLocal('token')
      this.getDiscounts()
    },
    methods: {
      // toggleClass(index) {
      //   this.discounts[index].selected = !this.discounts[index].selected
      // },
      // 选择充值金额
      selectBtn(index) {
        this.discounts.forEach((item) => {
          item.selected = false
        })
        // this.discounts[index].selected = true
        let item = this.discounts[index]
        item.selected = true
        this.$set(this.discounts, index, item)
      },
      // 清空选择
      clearSelect () {
        this.discounts.forEach((item, index) => {
          // item.selected = false
          let clearItem = this.discounts[index]
          clearItem.selected = false
          this.$set(this.discounts, index, clearItem)
        })
      },
      // 获取优惠信息
      getDiscounts() {
        let data = {
          customerId: this.customerId,
          token: this.token
          // shopId: this.shopId
        }
        this.axios.get(`/br/shop/member/recharge${this.PublicJs.createParams(data)}`)
          .then((response) => {
            response = response.data
            if (response.success === true) {
              // 成功返回
              this.discounts = response.data.memberRechargeDiscounts
              this.discounts.forEach((element) => {
                element.selected = false
              })
              this.rights = response.data.memberRights
            } else {
              console.log('返回错误')
            }
          })
          .catch((error) => {
             console.log('network error' + error)
          })
      },
      // 生成预订单，以发起微信支付
      invokePay(index) {
        if (this.PublicJs.isWechat() === true) {
          this.toggleToast(1, '仅支持微信中支付，且微信版本需在5.0以上')
          return
        } else {
          this.selectBtn(index)
          this.$nextTick(function() {
            this.selectBtn(index)
            // 发起支付
            const data = {
              customerId: getStore('userInfo').customerId,
              shopId: getStore('userInfo').shopId,
              rechargeId: this.discounts[index].discountId
            }
            this.axios.post('/br/member/recharge', data)
              .then((response) => {
                response = response.data
                if (response.success) {
                  this.sendWxSDK(response.data)
                } else {
                  this.toggleToast(1, response.message)
                  this.clearSelect()
                }
              })
              .catch((error) => {
                console.log('network error' + error)
                this.clearSelect()
              })
          })
          setTimeout(function() {
          }, 500)
        }
      },
      // 调取微信支付
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
            window.alert(res)
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              // 支付成功
              console.log('payment OK')
              that.$router.replace({
                path: '/memberCard'
              })
            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
              window.alert('您已取消支付')
              that.clearSelect()
              that.toggleToast(1, '您已取消支付')
            } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
              window.alert('订单支付失败')
              that.clearSelect()
              that.toggleToast(1, '订单支付失败')
            } else {
              window.alert('other choice')
              that.clearSelect()
            }
          })
      },
      toggleToast(show, text) {
        if (show === true || show === 1) {
          this.toastShow = true
          this.toastText = text
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.toastShow = false
          }, 1300)
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
<style scoped>
  .index{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    /*align-items: center;*/
    font-size: 12px;
    background-color: white;
    box-sizing: border-box;
    padding: 17px 15px;
  }
  .header{
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 18px;
    margin-bottom: 14.5px;
    border-bottom: 0.5px solid #dbdbdb;
    display: flex;
    align-items: stretch;
  }
  .header>img{
    width: 44px;
    height: 44px;
    margin-right: 14px;
    border-radius: 50%;
    border: 1px solid #dbdbdb;
  }
  .header>.title{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .header>.title>span:first-child{
    line-height: 20px;
    font-size: 14px;
  }
  .header.title>span{
    line-height: 16px;
    font-size: 11px;
  }
  .btns{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /*justify-content: space-between;*/
    margin-top: 18px;
    margin-bottom: 28px;
  }
  .btns>.grid{
    flex: 0 0 33%;
    display: inline-block;
    margin-bottom: 16px;
  }
  .btns>.grid>.amount_btn{
    position: relative;
    /*flex: 0 0 33%;*/
    display: inline-block;
    text-align: center;
    width: 79px;
    height: 42px;
    border-radius: 4px;
    font-size: 16px;
    line-height: 42px;
  }
  .btns>.grid>.amount_btn>.sale{
    position: absolute;
    right: -8px;
    top: -8px;
    min-width: 38px;
    height: 16px;
    font-family: PingFangSC-Light;
    font-size: 11px;
    line-height: 16px;
    background-color: #ffcd5d;
    color: #FFFFFF;
    letter-spacing: 0.07px; 
    border-radius: 8px;
  }
  .member{
    position: relative;
  }
  .member:after{
    content: ' ';
    background-image: url('../../assets/memberCard/icon_quanyi_normal@2x.png');
    background-size: 100%;
    position: absolute;
    left: 4.6em;
    top: 2px;
    width: 16px;
    height: 14px;
  }
  h3{
    font-size: 14px;
    color: #363636;
    letter-spacing: 0.79px;
  }
  ol{
    /*list-style-type:decimal;*/
    margin-top: 5px;
  }
  li{
    font-size: 13px;
    color: #8C8C8C;
    letter-spacing: 0.5px;
    line-height: 30px;
    /*position: relative;
    left: 1em;*/
  }
  .left_align{
    text-align: left;
  }
  .center_align{
    text-align: center;
  }
  .right_align{
    text-align: right;
  }
  .btn_selected{
    background: #FF6D5C;
    color: #FFFFFF;
    border: 0;
  }
  .btn_not_Selected{
    border: 1px solid #333333;
  }
</style>