<template>
<div class="me">
<!--	<div class="top-pic">-->
		<div class="img">
			<div class="myInfo">
				<div class="my-photo"></div>
				<p class="my-name">国民老司机</p>
			</div>
		</div>
<!--	</div>-->
	<ul class="my-list">
		<li class="order" @click="goOrder">
			<span class="my-icon"><img src="../../assets/my/order@2x.png"/></span>
			<span class="my-main">我的订单</span>
			<span class="to"><img src="../../assets/my/btn_right_normal@2x.png"/></span>
		</li>
		<li class="invite" @click="goInvite">
			<span class="my-icon"><img src="../../assets/my/invite@2x.png"/></span>
			<span class="my-main">我的邀请码</span>
			<span class="to"><img src="../../assets/my/btn_right_normal@2x.png"/></span>
		</li>
		<li class="redPacket" @click="goRedlist">
			<span class="my-icon"><img src="../../assets/my/red@2x.png"/></span>
			<span class="my-main">红包</span>
			<span class="to"><img src="../../assets/my/btn_right_normal@2x.png"/></span>
		</li>
		<li class="address" @click="goAddress">
			<span class="my-icon"><img src="../../assets/my/address@2x.png"/></span>
			<span class="my-main">收货地址</span>
			<span class="to"><img src="../../assets/my/btn_right_normal@2x.png"/></span>
		</li>
	</ul>
</div>	
</template>

<script>
	export default{
		methods: {
			// 去我的订单
			goOrder() {
				this.$router.push({
					path: '/orderList'
				})
			},
			// 去我的邀请码
			goInvite() {
				this.$router.push({
					path: '/inviteNum'
				})
			},
			// 去红包列表
			goRedlist() {
				this.$router.push({
					path: '/redlist'
				})
			},
			// 去收货地址
			goAddress() {
				this.$router.push({
					path: '/addList'
				})
			}
		}
	}
</script>

<style>
/*	.top-pic {
		width: 100%;
	}*/
	.img {
		width: 80%;
		height: 90px;
		background: url(../../assets/my/top_pic@2x.png) no-repeat;
		position: absolute;
		left: 0;
		top: -18px;
		background-size: cover;
		padding:71px 10% 0;
	}
	.myInfo {
		width: 100%;
		height: 98px;
		background: #FFFFFF;
		box-shadow: 0 2px 17px 0 rgba(132,132,132,0.20);
		border-radius: 10px;
		padding-top: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.my-photo {
		width: 51px;
		height: 51px;
		background: palegreen;
		border-radius: 100%;
	}
	.my-name {
		width: 100%;
		height: 20px;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-size: 14px;
		color: #262626;
		letter-spacing: 0;
		margin-top: 5px;
	}
	.my-list {
		width: 98%;
		padding-left: 2%;
		position: absolute;
		left: 0;
		top: 36%;
		background: #fff;
	}
	.my-list li {
		width: 98%;
		border-bottom: 0.5px solid #ECECEC;
		height: 40px;
		background: #fff;
		display: flex;
		align-items: center;
		padding-left: 2%;
	}
	.my-list li .my-icon {
		display: inline-block;
		width: 16px;
		height: 16px;
		margin-right: 6%;
	}
	.my-list li .my-icon img {
		width: 16px;
		height: 16px;
	}
	.my-list li .my-main {
		width: 80px;
		height: 18px;
		font-family: PingFangSC-Regular;
		font-size: 13px;
		color: #555460;
		letter-spacing: 1.03px;	
		margin-right: 60%;
	}
	.my-list li .to {
		display: inline-block;
		width: 6px;
		height: 11px;
		float: right;
	}
	.my-list li .to img {
		width: 6px;
		height: 11px;
	}
</style>