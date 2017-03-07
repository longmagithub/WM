<template>
  <div class="header">
    <div class="content-wrapper" @click.stop="goSeller">
      <div class="box-content">
        <div class="logo">
          <img :src="seller.avatar" alt="" width="48px" height="48px">
        </div>
        <div class="content">
          <div class="title-name">{{seller.name}}</div>
          <!-- 描述 -->
          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟到达/满85免配送费/满85免配送费/满85免配送费/满85免配送费
          </div>
          <div class="bulletin">公告：微信提示为了部落德玛西亚！</div>
        </div>
        <div class="enter">》</div>
      </div>
      <div class="activity">
        <span class="icon">减</span>
        <span class="text">满20减5，满20减5，满20减5，满20减5，满20减5，满20减5，</span>
        <span class="number">2个活动</span>
      </div>
    </div>
    <div class="user">
      <div class="user-btn" @click="goUser">我的订单</div>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    methods: {
      goSeller(ele) {
        console.log('去往商家详情')
      },
      goUser(ele) {
        console.log('去往我的订单')
      }
    }
  }
</script>

<style scoped>
  .header {
    overflow: hidden;
    position: relative;
    padding: 15px 7px 8px 10px;
  }

  .content-wrapper {
    margin-right: 90px;
    font-size: 0px;
  }

  .box-content {
    position: relative;
    display: flex;
    padding-right: 20px;
  }

  .logo {
    flex: 0 0 48px;
    vertical-align: top;
  }

  .logo > img {
    border-radius: 4px;
  }

  .content {
    flex: 1;
    margin-left: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /*padding-right: 20px;*/
    font-size: 10px;
    color: #ffffff;
  }

  .title-name {
    margin-bottom: 5px;
    font-size: 14px;
  }

  .description {
    margin: 3px 0 8px 0;
  }

  .bulletin, .title-name, .description {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .enter {
    position: absolute;
    top: 23px;
    right: 0;
    width: 10px;
    height: 20px;
    font-size: 20px;
    color: #f8e71c;
  }

  .activity {
    margin-top: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
    color: #ffffff;
  }

  .user {
    position: absolute;
    top: 24px;
    right: 7px;
  }

  .user-btn {
    display: block;
    line-height: 19px;
    padding: 11px;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-radius: 5px;
    text-align: center;
    font-size: 12px;
    color: #ffffff;
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-size: cover;
    /*background-image: url("http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg")*/
    filter: blur(10px);
  }
</style>
