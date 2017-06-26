<template>
	<div class="index">
		<div class="container">
				<img src="../../assets/memberCard/icon_chenggong_normal@2x.png">
				<span class="success">支付成功</span>
				<span class="text">充值金额</span>
				<div class="amount">
					<span class="symbol">¥</span>
					<span>29.94</span>
				</div>
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
	.index>div>img{
		width: 66px;
		height: 66px;
		margin-bottom: 16px;
		margin-top: 30px;
	}
	.index>div>.success{
		font-size: 18px;
		color: #FFCD5D;
		letter-spacing: 0.77px;
		margin-bottom: 52px;
	}
	.index>div>.text{
		font-size: 14px;
		color: #161616;
		letter-spacing: 0.6px;
	}
	.index>div>.amount{
		font-size: 36px;
		color: #161616;
		letter-spacing: 1.16px;
		display: flex;
		align-items: flex-start;
	}
	.index>div>.amount>.symbol{
		font-size: 24px;
		position: relative;
		top: 4px;
	}
	.finish_btn{
		/*position: absolute;
		bottom: 78px;
		margin: 0 auto;*/
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