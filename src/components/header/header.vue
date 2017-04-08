<template>
  <div>
    <div class="header" ref="header">
      <div class="content-wrapper"
           @click="goSeller">
        <div class="box-content">
          <div class="logo">
            <img :src="seller.logo" alt="" width="48px" height="48px">
          </div>
          <div class="content">
            <div class="title-name">{{seller.name}}</div>
            <!-- 描述 -->
            <div class="description">
              <!--{{seller.dispatching.name}}/{{seller.dispatching.duration}}分钟到达<span-->
              <!--v-if="seller.dispatching.fees.length">/满{{seller.dispatching.fees[0]-->
              <!--.price}}{{seller.dispatching.fees[0].fee | fees}}</span>-->
            </div>
            <div class="bulletin" v-if="seller.notice">公告：{{seller.notice}}</div>
          </div>
          <div class="enter uxwm-iconfont btn_right"></div>
        </div>
        <div class="activity">
          <!--<span class="text">{{seller.dispatching.activity[0].title}}</span>-->
          <!--<span class="number">{{seller.dispatching.activity.length}}个活动</span>-->
        </div>
      </div>
      <div class="user">
        <div class="user-btn" @click="goUser">我的订单</div>
      </div>
      <div class="background">
        <img :src="seller.logo" alt="" width="100%" height="100%">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getStore} from '../../common/js/util'
  export default {
    props: {
      seller: {
        type: Object
      },
      detail: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        shopId: ''
      }
    },
    created() {
      this.shopId = getStore('userInfo').shopId
      // 配送方式
      // this.getDispatching()
    },
    methods: {
      goSeller() {
        this.$router.push({
          path: '/shopDetail',
          query: {
            shopId: this.$route.query.shopId,
            customerId: this.$route.query.customerId
          }
        })
      },
      goUser() {
        this.$router.push({
          path: '/orderList',
          query: {
            shopId: this.$route.query.shopId,
            sessionId: this.$route.query.customerId
          }
        })
      }
      // 配送方式查询
//      getDispatching() {
//        this.axios.get(`${this.api}/br/shop/dispatching?shopId=${this.shopId}`).then((res) => {
//          if (res.success) {
//          }
//        })
//      }
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
    background-size: contain;
    /*background-image: url("http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg")*/
    -webkit-filter: blur(5px); /* Chrome, Opera */
    -moz-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
    filter: blur(5px);
    /*opacity: 0.4;*/
  }
</style>
