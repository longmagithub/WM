<template>
  <div class="header" ref="header">
    <router-link class="content-wrapper" tag="div" :to="{path:'/shopDetail'}" @click.stop="goSeller">
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
        <div class="enter uxwm-iconfont btn_right"></div>
      </div>
      <div class="activity">
        <span class="text">满20减5，满20减5,满20减5,满20减5,满20减5，满20减5，</span>
        <span class="number">2个活动</span>
      </div>
    </router-link>
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
    created() {
    },
    methods: {
      goSeller(ele) {
        console.log('去往商家详情')
      },
      goUser(ele) {
        this.$router.push({path: '/orderList'})
      }
    }
  }
</script>

<style scoped>
  .header {
    overflow: hidden;
    position: relative;
    padding: 15px 7px 8px 10px;
    height: 92px;
  }

  .header .content-wrapper {
    margin-right: 90px;
    font-size: 0px;
  }

  .header .content-wrapper .box-content {
    position: relative;
    display: flex;
    padding-right: 20px;
  }

  .header .content-wrapper .box-content .logo {
    flex: 0 0 48px;
  }

  .header .content-wrapper .box-content .logo img {
    border-radius: 4px;
  }

  .header .content-wrapper .box-content .content {
    flex: 1;
    margin-left: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
    color: #ffffff;
  }

  .header .content-wrapper .box-content .content .title-name {
    margin-bottom: 5px;
    font-size: 14px;
  }

  .header .content-wrapper .box-content .content .description {
  }

  .header .content-wrapper .box-content .content .bulletin {
    margin-top: 8px;
  }

  .header .content-wrapper .box-content .content .title-name,
  .header .content-wrapper .box-content .content .bulletin,
  .header .content-wrapper .box-content .content .description {
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
    color: #ffffff;
  }

  .activity {
    position: relative;
    box-sizing: border-box;
    padding-left: 17px;
    padding-right: 55px;
    margin-top: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
    color: #ffffff;
    background: url("../../assets/icon_activity_status0.png") no-repeat left center;
    background-size: 12px 12px;
  }

  .activity .number {
    position: absolute;
    top: 0px;
    right: 0px;
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
    filter: blur(30px);
    opacity: 0.8;
  }
</style>
