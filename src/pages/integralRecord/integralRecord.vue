<template>
	<div class="Record">
		<header class="record-header">
			<div class="record-tab">
				<span class="record-name" :class="{'finish': showIndex === 0}" @click="getShow(0)">兑换记录</span>
			</div>
			<div class="record-tab">
				<span class="record-name" :class="{'finish': showIndex === 1}" @click="getShow(1)">积分记录</span>
			</div>
		</header>
		<section>
			<ul class="exchange" v-show="showIndex === 0">
				<li class="exchange-list" :class="{'finish': showIndex === 1}" v-for="item in exchangeList.redpakcets">
					<div class="exchangeMessage">
						<p class="exchangeName">{{packetNameArr[item.type]}}</p>
						<p class="exchangeTime">{{item.startTime}}<br />{{item.endTime}}</p>
					</div>
					<div class="exchangeTouse">
						￥<span>{{item.price/100}}</span>
					</div>
				</li>
				<li class="footer">
					<p>没有更多了 ~ </p>
				</li>
			</ul>
			<ul class="integral" v-show="showIndex === 1">
				<li class="integral-list" v-for="item in integralList.redpackets">
					<div class="integralMessage">
						<p class="integralName">{{packetNameArr[item.type]}}</p>
						<p class="integralTime">{{item.startTime}}<br />{{item.endTime}}</p>
					</div>
					<div class="integralPrice">
						￥<span>{{item.price/100}}</span>
					</div>
				</li>
				<li class="footer">
					<p>没有更多了 ~ </p>
				</li>
			</ul>
		</section>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				exchangeList: [],
				integralchange: [],
				showIndex: 0,
				shopId: '',
				customerId: '',
				useInfoArr: ['', '', '', '被占用，取消未付款订单后可用'],
				packetNameArr: ['用户红包', '新人红包', '邀请红包', '邀请红吧']
			}
		},
		created() {
			this.shopId = this.$route.query.shopId ? this.$route.quert.shopId : ''
			this.customerId = this.$route.query.customerId ? this.$route.query.customerId : ''
			this.getExchangeList()
			this.getIntegralchange()
		},
		methods: {
			// 控制记录页面切换
			getShow(i) {
				this.showIndex = i
			},
			// huoqu
			getExchangeList() {
				const data = {
					shopId: this.shopId,
					customerId: this.customerId,
					state: 1,
					type: 0
				}
        this.axios.get(`/br/shop/redpacket/list${this.PublicJs.createParams(data)}`).then((res) => {
          res = res.data
          if (res.success) {
            this.exchangeList = res.data
          }
        })
			},
			// sdfsdf
			getIntegralchange() {
				const data = {
					shopId: this.shopId,
					customerId: this.customerId,
					state: 0,
					type: 0
				}
        this.axios.get(`/br/shop/redpacket/list${this.PublicJs.createParams(data)}`).then((res) => {
          res = res.data
          if (res.success) {
            this.integralList = res.data
          }
        })
			}
		}
	}
</script>

<style>
	.finish {
		color: #f60 !important;
		border-bottom: 3px solid rgba(255, 101, 81, 1);
		border-radius: 10%;
	}
	
	.record-header {
		display: flex;
		width: 100%;
		height: 43px;
		line-height: 43px;
		background: #fff;
	}
	
	.record-header .record-tab {
		flex: 1;
		text-align: center;
		font-size: 13px;
		text-align: center;
	}
	
	.record-header .record-tab .record-name {
		display: inline-block;
		width: 58px;
		height: 20px;
		line-height: 18px;
		color: #ccc;
	}
	
	.record section {
		background: rgba(244, 244, 244, 1);
		position: relative;
	}
	
	.record section .exchange {
		box-sizing: border-box;
		width: 100%;
		padding: 18px;
		display: block;
	}
	
	.record section .exchange .exchange-list {
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		margin-top: 5px;
		padding: 12px 23px;
		line-height: 64px;
		background: url('../../assets/Group@2x.png') no-repeat center;
		background-size: 100% 100%;
	}
	
  .record section .exchange .exchange .exchangeMessage {
    flex: 1;
    padding: 3px 0px 8px 0px;
  }

  .record section .exchange .exchange-list .exchangeMessage .exchangeName {
    line-height: 20px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #343434;
    letter-spacing: 0.26px;
  }

  .record section .exchange .exchange-list .exchangeMessage .exchangeTime {
    margin-top: 5px;
    line-height: 14px;
    font-family: PingFangSC-Regular;
    font-size: 10px;
    color: #6C6C6C;
    letter-spacing: 0.19px;
  }
  
  .record section .exchange .exchange-list .exchangeTouse {
  	flex: 0 0 86px;
  	text-align: center;
    border-left: 2px solid #ebebeb;
    padding-left: 5px;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #FF4931;
    letter-spacing: 0;  	
  }
  
  .record section .exchange .exchange-list .exchangeTouse span {
    font-family: PingFangSC-Medium;
    font-size: 22px;
    color: #FF4931;
    letter-spacing: 0;
  }
  
  .record section .integral {
  	box-sizing: border-box;
  	width: 100%;
  	padding: 18px;
  	display: block;
  	top: 0;
  }
  
  .record section .integral .integral-list {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    margin-top: 5px;
    padding: 12px 23px;
    line-height: 64px;
    background: url('../../assets/Group@2x.png') no-repeat center;
    background-size: 100% 100%;
    position: relative;  	
  }
  
  .record section .integral .integral-list .integralMessage {
    flex: 1;
    padding: 3px 0px 10px 0px;  	
  }
  
  .record section .integral .integral-list .integralMessage .integralName {
    line-height: 20px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: rgba(201,201,201,1);
    letter-spacing: 0.26px;  	
  }
  
  .record section .integral .integral-list .integralMessage .integralTime {
    margin-top: 5px;
    line-height: 14px;
    font-family: PingFangSC-Regular;
    font-size: 10px;
    color: rgba(201,201,201,1);
    letter-spacing: 0.19px;  	
  }
  
  .record section .integral .integral-list .integralPrice {
    flex: 0 0 86px;
    text-align: center;
    border-left: 2px solid #ebebeb;
    padding-left: 5px;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: rgba(201,201,201,1);
    letter-spacing: 0;  	
  }
  
  .record section .integral .integral-list .integralPrice span {
    font-family: PingFangSC-Medium;
    font-size: 22px;
    color: rgba(201,201,201,1);
    letter-spacing: 0;  	
  }
  
  .footer {
    width: 100%;
    text-align: center;
    margin-top: 12px;  	
  }
  
  .footer p {
    color: rgba(119, 119, 119, 1);
  }
  
  .status0 {
    background: url('../../assets/icon_yiguoqi_normal@2x.png');
    background-size: 32px 32px;
  }

  .status1 {
    background: url('../../assets/icon_yiguoqi_normal@2x.png');
    background-size: 32px 32px;
  }

  .status2 {
    background: url('../../assets/icon_yishiyong_normal@2x.png');
    background-size: 32px 32px;
  }

  .status3 {
    background: url('../../assets/icon_beizanyong_normal@2x.png');
    background-size: 32px 32px;
  }  
</style>