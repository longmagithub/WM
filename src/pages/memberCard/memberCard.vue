<template>
<div class="index">
	<fukuanma v-if='showCode' v-on:hide='toggleCode'></fukuanma>
	<div class="card">
		<img src="../../assets/memberCard/img_huiyuan_normal@2x.png">
		<div class="card_content">
			<div class="logo">
				<img src="../../assets/thankumom.jpg">
			</div>
			<div class="card_text">
				<span> Thank u mom</span>
				<span>会员卡</span>
				<span>余额</span>
				<span>{{balance}}<span>元</span></span>
			</div>
		</div>
		<div class="card_number">
			卡号：{{card_number}}
		</div>
	</div>
	<div class="btns">
		<div @click='toggleCode'>
			<img src="../../assets/memberCard/icon_fukuan_normal@2x.png">
			<p>付款</p>
		</div>
		<div @click='goCharge'>
			<img src="../../assets/memberCard/icon_chongzhi_normal@2x.png">
			<p>充值</p>
			<div class="youhui">
				优惠
				<img src="../../assets/memberCard/icon_youhui_normal@2x.png">
			</div>
		</div>
	</div>

    <toast :show="toastShow" :text="toastText"></toast>
</div>
</template>
<script type="text/javascript">
  import fukuanma from '../../components/fukuanma.vue'
  import toast from '../../components/toast.vue'
  import {getStore} from '../../common/utils/util'
  export default{
    data() {
      return {
        balance: 0,         //  会员卡余额
        card_number: '',    //  卡号
        shopId: '',         //  店铺id
        customerId: '',     //  顾客id
        showCode: false,    //  是否展示付款码
        toastShow: false,   //  是否展示toast
        toastText: ''       //  toast文字
      }
    },
    mounted() {
      console.log(this.$router)
      this.shopId = getStore('userInfo').shopId
      this.customerId = getStore('userInfo').customerId
      this.getCard()
    },
    methods: {
      //  切换付款码展示状态
      toggleCode() {
        this.showCode = !this.showCode
      },
      //  去充值
      goCharge() {
        this.$router.push({
          path: '/recharge'
        })
      },
      //  获取会员卡信息
      getCard() {
        let data = {
          customerId: this.customerId,
          shopId: this.shopId
        }
        // this.axios.get(`/wlj/member/card${this.PublicJs.createParams(data)}`,
        //                 { responsetype: 'json',
        //                   // `headers`是自定义的要被发送的头信息
        //                   headers: { 'X-Requested-with': 'XMLHttpRequest' },
        //                   timeout: 1000 })
        this.axios.get(`/br/member/card${this.PublicJs.createParams(data)}`)
          .then((response) => {
              response = response.data
              if (response.success) {
                // 操作成功
                this.balance = response.data.cardInfo.balance
                this.card_number = response.data.cardInfo.cardId
              } else {
                this.toggleToast(1, 'server error.')
              }
            })
          .catch((error) => {
            console.log('get card info fail' + error)
            this.toggleToast(1, 'network error, plz try later')
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
      }
    },
    components: {
      fukuanma,
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
		align-items: center;
		font-size: 12px;
		background-color: white;
	}
	.card{
		margin-top: 20px;
		width: 85.6%;
		/*height: 15.67em;*/
		display: flex;
		flex-direction: column;
		position: relative;
		color: white;
		background-size: cover;
		position: relative;
	}
	.card>img{
		position: absolute;
		left: 0;
		top: -12px;
		width: calc(100% + 5px);
		z-index: -1;
	}
	.card_content{
		width: 100%;
		height: 146px;
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid white;
		padding-top: 15px;
		padding-left: 11px;
		box-sizing: border-box;
	}	
	.logo img{
		width: 36px;
		height: 36px;
		border-radius: 50%;
	}
	.card_text{
		display: flex;
		flex-direction: column;
	}
	.card_text>span:first-child{
		line-height: 20px;
		font-size: 14px;
		margin-left: 7px;
	}
	.card_text>span:nth-child(2){
		line-height: 18px;
		font-size: 14px;
		margin-left: 7px;
	}
	.card_text>span:nth-child(3){
		line-height: 28px;
		font-size: 11px;
		margin-left: 5px;
	}
	.card_text>span:nth-child(4){
		/*line-height: 28px;*/
		font-size: 45px;
		/*margin-left: 5px;*/
	}
	.card_text>span>span{
		font-size: 14px;
	}
	.card_number{
		width: 100%;
		height: 39px;
		line-height: 39px;
		padding-left: 19px;
		font-size: 11px;
	}
	.btns{
		width: 80%;
		display: flex;
		justify-content: space-around;
		font-size: 14px;
		color: #FFC86D;
		margin-top: 38px;
	}
	.btns>div{
		display: inline-block;
		text-align: center;
		position: relative;

	}
	.btns img{
		width: 34px;
		height: 34px;
		margin-bottom: 11px;
	}
	.btns .youhui{
		position: absolute;
		left: 100%;
		bottom: 100%;
		/*background-image: url('../../assets/memberCard/icon_youhui_normal@2x.png');*/
		width: 2em;
		padding-left: 5px;
		font-family: PingFangSC-Light;
		color: #FFFFFF;
		-webkit-text-size-adjust:none; 
		-webkit-font-size-adjust: none;
		font-size-adjust: none;
		font-size:9px;
	}
	.btns .youhui>img{
		position: absolute;
		top: 1px;
		left: 0;
		width: 36px;
		height: 20px;
		z-index: -1;
	}
</style>