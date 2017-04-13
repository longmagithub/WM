<template>
  <div>
    <div class="header" ref="header">
      <div class="content-wrapper"
           @click="goSeller">
        <div class="box-content">
          <div class="logo">
            <img v-if="detailBox.logo" :src="detailBox.logo" alt="" width="48px" height="48px">
            <img v-else src="../../assets/item_logo.png" alt="" width="50px" height="50px">
          </div>
          <div class="content">
            <div class="title-name">{{detailBox.name}}</div>
            <!-- 描述 -->
            <div class="description">
              <span>{{detailBox.dispatching.name}}</span>
              <!--<span>{{detailBox.dispatching.duration}}分钟到达</span>-->
              <span>{{detailBox.dispatching.duration}}分钟到达</span>
              <span>/ 满{{detailBox.dispatching.fees[0].price}}{{detailBox.dispatching.fees[0].fee |
                fees}}</span>
            </div>
            <div class="bulletin" v-if="detailBox.notice">公告：{{detailBox.notice}}</div>
          </div>
          <!--<div class="enter uxwm-iconfont btn_right"></div>-->
        </div>
        <div class="activity" v-if="detailBox.activity">
          <span class="text" style="margin-right: 5px" v-if="detailBox.activity"
                v-for="item in detailBox.activity">{{item
            .title}}</span>
          <!--<span class="number" v-if="detailBox.activity">{{detailBox.activity.length}}个活动</span>-->
        </div>
      </div>
      <div class="user">
        <div class="user-btn" @click="goUser">我的订单</div>
      </div>
      <div class="background">
        <!--<img :src="seller.logo" alt="" width="100%" height="100%">-->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getStore} from '../../common/js/util'
  export default {
    props: {
      detail: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        shopId: '',
        sessionId: '',
        detailBox: {}
      }
    },
    created() {
      this.shopId = getStore('userInfo').shopId
      // 配送方式
      // this.getDispatching()
      // 商家信息
      const data = {
        shopId: getStore('userInfo').shopId,
        customerId: getStore('userInfo').customerId
      }
      this.axios.get(`/br/shop/detail${this.PublicJs.createParams(data)}`).then((res) => {
        res = res.data
        console.log(res)
        if (res.success) {
          if (res.data === null) {
            return
          } else {
            // 排序
//            res.data.dispatching.fees = this.PublicJs.bubbleSort(res.data.dispatching.fees, res.data.dispatching.fees.price)
            this.detailBox = res.data
            // 设置微信title
//            this.PublicJs.changeTitleInWx(this.shopDetail.name.split('（')[0])
          }
        } else {
          console.log(2313)
          return
        }
      })
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
    background-size: cover;
    background: url('../../assets/back.jpg') no-repeat;
    /*filter: blur(5px);*/
    /*filter: blur(5px);*/
    /*opacity: 0.4;*/
  }
</style>
