<template>
<div class="index">
	<fukuanma v-if='showCode' v-on:hide='toggleCode'></fukuanma>
	<div class="card">
		<!-- <img src="../../assets/memberCard/img_huiyuan_normal@2x.png"> -->
    <div class="img">
      <!--<img class="jitui" src="../../assets/memberCard/img_jitui_normal@2x.png">-->
    </div>
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
		<div class="card_main">
			<div class="card_number">
				卡号：{{card_number}}
			</div>
			<div class="card_integral">
				每消费1元得1积分
			</div>
		</div>
	</div>
	<div class="btns">
		<div @click='toggleCode'>
			<img src="../../assets/memberCard/icon_fukuan_normal@2x.png">
			<p>付款</p>
		</div>
		<div @click='goCharge' class="recharge">
			<img src="../../assets/memberCard/icon_chongzhi_normal@2x.png">
			<p>优惠充值</p>
			<div class="youhui">
				优惠
			</div>
        <img class="youhuiIMG" src="../../assets/memberCard/icon_youhui_normal@2x.png">
		</div>
		<div @click='goIntegral' class="integral">
			<img src="../../assets/memberCard/icon_jifen_normal@2x.png"/>
			<p>积分</p>
			<p style="font-size: 12px;letter-spacing: 0.07px;">(500积分)</p>
		</div>
	</div>

    <toast :show="toastShow" :text="toastText"></toast>
</div>
</template>
<script type="text/javascript">
  import fukuanma from '../../components/fukuanma.vue'
  import toast from '../../components/toast.vue'
  import {getLocal} from '../../common/utils/util'
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
      // this.shopId = getStore('userInfo').shopId
      this.customerId = getLocal('customerId')
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
      // 去积分兑换
      goIntegral() {
        this.$router.push({
          path: '/redlist'
        })
      },
      //  获取会员卡信息
      getCard() {
        let data = {
          customerId: this.customerId
          // shopId: this.shopId
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
                let num = response.data.cardInfo.cardId
                this.card_number = num.slice(0, 4) + ' ' + num.slice(4, 8) + ' ' + num.slice(8, 13)
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
  .jitui{
    position: absolute;
    right: 0;
    top: 0;
    width: 59px;
    height: 51px;
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
    height: 198px;
		width: calc(100% + 5px);
		z-index: -1;
	}
  .card>.img{
    background-image: url('../../assets/memberCard/img_huiyuan_normal@2x.png');
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    top: -12px;
    height: 198px;
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
	.card_main{
		width: 100%;
		display: flex;
		justify-content: center;
		align-content: space-between;
	}
	.card_number{
		width: 50%;
		height: 39px;
		line-height: 39px;
		font-family: PingFangSC-Regular;
		font-size: 11px;
		color: #FFFFFF;
		letter-spacing: 0.17px;
	}
	.card_integral {
		width: 40%;
		height: 39px;
		text-align: right;
		line-height: 39px;
		font-family: PingFangSC-Regular;
		font-size: 11px;
		color: #FFFFFF;
		letter-spacing: 0.96px;		
	}
	.btns{
		width: 80%;
		display: flex;
		justify-content: space-around;
		font-size: 14px;
		color: #FFC86D;
		margin-top: 38px;
	}
	.btns p{
		background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255,212,111,1)), to(rgba(255,162,103,1)));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.btns>div{
		display: inline-block;
		text-align: center;
		position: relative;

	}
	.btns>div>img{
		width: 34px;
		height: 34px;
		margin-bottom: 11px;
	}
  .recharge>.youhui{

  }
  .recharge>.youhuiIMG{
    position: absolute;
    left: 70%;
    bottom: 95%;
    width: 36px;
    height: 20px;
    z-index: -1;
    margin-bottom: 0;
  }
	.btns .youhui{
		position: absolute;
		left: 58%;
		bottom: 96%;
		/*background-image: url('../../assets/memberCard/icon_youhui_normal@2x.png');*/
		width: 3em;
		padding-left: 5px;
		font-family: PingFangSC-Light;
		color: #FFFFFF;
		-webkit-text-size-adjust:none; 
		-webkit-font-size-adjust: none;
		font-size-adjust: none;
		font-size:11px;
    margin-bottom: 5px;
	}
	/*.btns .youhui>img{
		position: absolute;
		top: 1px;
		left: 0;
		width: 36px;
		height: 20px;
		z-index: -1;
	}*/
</style>