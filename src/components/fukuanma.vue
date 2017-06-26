<template>
	<div class="index">
		<div class="overlay" @click='hide'></div>
		<div class="content">
			<span class="title">付款码</span>
			<img :src="qrImageBase64">
			<span class="code">{{qrCodeStyle}}</span>
			<div class="text">
				<img src="../assets/memberCard/btn_gengxin_normal@2x.png" @click='requestCode()'>
				<span>为保障您的资金安全，该付款码定时更新</span>
			</div>
		</div>
		<toast :show="toastShow" :text="toastText"></toast>
	</div>
</template>
<script>
  import {getLocal} from '../common/utils/util'
  import toast from '../components/toast.vue'
  import axios from 'axios'
  const TIMER_COUNT = 90 * 1000		// 90	秒失效
  const XHR_TIMEOUT = 30 * 1000		// 30 秒重试
  let CancelToken = axios.CancelToken	// axios取消令牌
  let cancel
	export default {
		data () {
			return {
				shopId: '',
        customerId: '',
        qrCode: '',
        qrCodeStyle: '',
        qrImageBase64: '',
        timer: null,
        toastTimer: null,
        token: null,
        toastShow: false,
        toastText: ''
			}
		},
		methods: {
			// 查询付款码
			requestCode () {
				let data = {
					customerId: this.customerId,
					token: this.token
          // shopId: this.shopId
				}
				this.axios.get(`/br/member/card/payment/qrcode${this.PublicJs.createParams(data)}`)
					.then((response) => {
            response = response.data
						if (response.success) {
							// 查询成功
							let code = response.data.qrCodeInfo.qrCode
							this.qrCode = code
							this.qrCodeStyle = code.slice(0, 4) + ' ' + code.slice(4, 8) + ' ' + code.slice(8, 12) + ' ' + code.slice(12, 18)
							this.qrImageBase64 = response.data.qrCodeInfo.qrImageBase64
							if (!this.timer)	this.startTimer()
							this.requestState()
						} else {
							// 展示错误信息
							this.toggleToast(1, response.message)
						}
					})
					.catch((error) => {
						if (this.timer) clearInterval(this.timer)
						console.log('network error when requestCode: ' + error)
					})
			},
			// 查询状态
			requestState () {
				if (cancel) cancel()	// 若已经有该请求则取消，重新发送
				let data = {
					customerId: this.customerId,
          // shopId: this.shopId,
          qrcode: this.qrCode,
          token: this.token
				}
				this.axios.get(`/br/member/card/payment/qrcode/state${this.PublicJs.createParams(data)}`, {
							timeout: XHR_TIMEOUT,
							cancelToken: new CancelToken(function executor(c) {
								cancel = c
							})
						})
					.then((response) => {
            response = response.data
						if (response.success) {	// 收到支付结果，页面跳转
							let result = response.data.payResult
							if (result.success) {
								// go to paysuccess
								this.$router.push({
									path: '/paySuccess',
									query: {
										amount: result.payAmount
									}
								})
							} else {
								// go to payFail
								this.$router.push({
									path: '/payFail'
								})
							}
						} else {
							// 展示错误信息
							// this.toggleToast(1, response.message)
							this.requestState()
						}
					})
					.catch((error) => {
						console.log('network error' + error + ' about to resend request')
						// 准备重新发送请求
						// this.requestState()
					})
			},
			// 开始倒计时（先清空已有计时器）
			startTimer () {
				console.log('start timer')
				if (this.timer) clearInterval(this.timer)
				this.timer = setInterval(() => {
					this.requestCode()
				}, TIMER_COUNT)
			},
			hide () {
				if (cancel) cancel()	// 若已经有该请求则取消
				if (this.timer) clearInterval(this.timer)
				this.$emit('hide')
			},
			// toggle toast
      toggleToast(show, text) {
        if (show === true || show === 1) {
          this.toastShow = !this.toastShow
          this.toastText = text
          clearTimeout(this.timer)
          this.toastTimer = setTimeout(() => {
            this.toastShow = !this.toastShow
          }, 1500)
        } else {
          return
        }
      }
		},
		mounted () {
      // this.shopId = getStore('userInfo').shopId
      this.token = getLocal('token')
      // this.customerId = getStore('userInfo').customerId
      this.customerId = getLocal('customerId')
      this.requestCode()
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
		align-items: center;
		justify-content: center;
		/*font-size: 12px;*/
		background-color: transparent;
		z-index: 99;
		/*box-sizing: border-box;*/
	}
	.overlay{
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		opacity: 0.52;
		background: rgba(62,62,62,0.84);
	}
	.content{
		opacity: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-image: url('../assets/memberCard/img_fukuanma_normal@2x.png');
		background-size: 100%;
		width: 289px;
		height: 316px;
		z-index: 9;
		padding-top: 20px;
		position: relative;
		top: -10%;
	}
	.content>.title{
		font-size: 16px;
		color: #FFC86D;
		letter-spacing: 0.79px;
		margin-top: 31px;
	}
	.content>img{
		width: 159px;
		height: 159px;
		margin-top: 7px;
	}
	.content>.code{
		font-size: 14px;
		color: #262626;
		letter-spacing: 0.12px;
		line-height: 20px;
	}
	.content>.text{
		font-size: 10px;
		color: #262626;
		letter-spacing: 0.11px;
		line-height: 14px;
		margin-top: 7px;
		display: flex;
		align-items: center;
	}
	.content>.text>img{
		width: 14px;
		height: 14px;
		margin-right: 6px;
	}
</style>