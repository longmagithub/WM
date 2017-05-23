<template>
	<div class="redList">
		<header id="header">
			<div class="canUse" v-for="item in redPacket">{{item}}</div>
			<div class="oldRed">{{usePacket}}</div>
		</header><!-- /header -->
		<section>
	  	<ul class="red-packet">
	  		<li></li>
	  	</ul>
		</section>
	</div>
</template>
<script>
export default {
	data() {
		return {
			redPacket: ['可用红包','过期红包']
		}
	}
}
</script>
<style>
	.redList{
		background:red;
	}
</style>