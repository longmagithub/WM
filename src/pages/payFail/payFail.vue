<template>
	<div class="index">
		<div class="container">
			<img src="../../assets/memberCard/icon_shibai_normal@2x.png">
			<span class="fail">支付失败</span>
			<div class="text"> 由于您的会员卡余额不足，导致付款失败，请采用其他付款方式或充值会员卡继续使用</div>
		</div>
		
		
		<div class="finish_btn" @click='done'>完成</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {}
		},
		methods: {
			done() {
				this.$router.push({
					path: 'memberCard'
				})
			}
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
		justify-content: space-between;
		align-items: center;
		font-size: 12px;
		background-color: white;
		box-sizing: border-box;
	}
	.container{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.index>.container>img{
		width: 66px;
		height: 66px;
		margin-bottom: 16px;
		margin-top: 30px;
	}
	.index>.container>.fail{
		font-size: 18px;
		color: #9F9F9F;
		letter-spacing: 0.77px;
		margin-bottom: 59px;
	}
	.index>.container>.text{
		width: 75%;
		font-size: 14px;
		color: #9F9F9F;
		letter-spacing: 0.6px;
		line-height: 22px;
	}
	.finish_btn{
		width: 180px;
		height: 40px;
		margin-bottom: 78px;
		text-align: center;
		line-height: 40px;
		border: 1px solid #FFCD5D;
		border-radius: 3px;
		font-size: 18px;
		color: #FFCD5D;
		letter-spacing: 0.77px;
	}
	.btn_selected{
		background: #FCCB5C;
		color: #FFFFFF;
	}
</style>