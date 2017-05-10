<template>
  <div class="index">
    <div class="index-box">
      <div class="header">
        <div class="content-wrapper"
             @click="goSeller">
          <div class="box-content">
            <div class="logo">
              <img v-if="shopDetail.logo" :src="shopDetail.logo" alt="" width="48px" height="48px">
              <img v-else src="../../assets/item_logo.png" alt="" width="50px" height="50px">
            </div>
            <div class="content">
              <!--下面打开-->
              <div class="title-name">{{shopDetail.name}}</div>
              <!-- 描述 -->
              <!--<div class="description">-->
              <!--name 打开-->
              <!--<span>{{detailBox.dispatching.name}}</span>-->
              <!--<span>{{detailBox.dispatching.duration}}分钟到达</span>-->
              <!--<span>/ 满{{detailBox.dispatching.fees[0].price}}{{detailBox.dispatching.fees[0].fee | fees}}</span>-->
              <!--</div>-->
              <div class="bulletin" v-if="shopDetail.notice">公告：{{shopDetail.notice}}</div>
              <!--<div class="bulletin" v-if="shopDetail.notice">-->
              <!--<textarea class="elseText"-->
              <!--v-model="shopDetail.notice"-->
              <!--disabled="disabled"-->
              <!--rows="2" maxlength="10"-->
              <!--placeholder="请输入备注内容（可不填）"></textarea>-->
              <!--</div>-->
            </div>
            <!--<div class="enter uxwm-iconfont btn_right"></div>-->
          </div>
          <div class="activity" v-if="shopDetail.activity">
          <span class="text" style="margin-right: 5px" v-if="shopDetail.activity"
                v-for="item in shopDetail.activity">{{item
            .title}}</span>
            <!--<span class="number" v-if="detailBox.activity">{{detailBox.activity.length}}个活动</span>-->
          </div>
          <!--<div class="boonDesc" v-if="boonPrice">-->
          <!--您有一个平台红包￥{{boonPrice}}元-->
          <!--</div>-->
        </div>
        <div class="user" v-if="1">
          <div class="user-btn" @click="goUser">我的</div>
        </div>
        <div class="background">
          <!--<img :src="seller.logo" alt="" width="100%" height="100%">-->
        </div>
      </div>
      <div class="main">
        <goods :seller="shopDetail" :min-price="shopDetail.minPrice"></goods>
      </div>
    </div>
    <toast :show="toastShow" :text="toastText"></toast>
    <!--红包toast-->
    <div class="boon" v-show="isCloseBoon">
      <i class="close" @click="closeBoon"></i>
      <div class="backImg" @click="goShare">
        <div class="textContent">
          <p class="price">{{IndexboonPrice}}<span class="desc">元</span></p>
          <p>恭喜您</p>
          <p>获得一个悠先外卖红包</p>
        </div>
      </div>
    </div>
    <wxshare></wxshare>
  </div>
</template>

<script type="text/ecmascript-6">
  import goods from '../goods/goods.vue'
  import {setStore, getStore} from '../../common/utils/util'
  import toast from '../../components/toast.vue'
  import {mapState, mapMutations} from 'vuex'
  import wxshare from '../../components/wxshare.vue'
  export default{
    data() {
      return {
        shopDetail: {}, // 商家信息
        detail: {}, // 配送信息
        shopId: '',
        customerId: '',
        toastShow: false,
        toastText: '',
        nowTime: new Date(),
        endTime: '',
        deliveryfee: {}, // 配送费
        shopStatus: 0, // 门店状态
        isCloseBoon: false,
        IndexboonPrice: 0
      }
    },
    created() {
      // 调试代码 提交时注释
      setStore('userInfo', {
        'customerId': 'dcfae6aa-83af-484d-bbb6-8e0096d16272',
        'shopId': 'e3e616f2-dee1-49d8-8dff-08ba9a203dd4'
      })
      setStore('openId', {
        'customerId': 'dcfae6aa-83af-484d-bbb6-8e0096d16272',
        'shopId': 'e3e616f2-dee1-49d8-8dff-08ba9a203dd4'
      })
      // ↑↑↑↑↑调试带代码↑↑↑↑
      this.shopId = getStore('userInfo').shopId
      this.customerId = getStore('userInfo').customerId
      // 红包信息
      this.getRedEnvelope()
      // 商家信息
      this.getShopDetail()
    },
    computed: {
      // 检测 vuex 中boonPrice
      ...mapState(['boonPrice'])
    },
    methods: {
      // 红包
      ...mapMutations(['BOON_PRICE']),
      // 分享按钮
      goShare() {
        console.log('我是胖子')
      },
      // 商家信息
      getShopDetail() {
        const data = {
          shopId: this.shopId,
          customerId: this.customerId
        }
        this.axios.get(`/br/shop/detail${this.PublicJs.createParams(data)}`).then((res) => {
          res = res.data
          if (res.success) {
            // 排序
            res.data.activity = res.data.activity.reverse()
            this.shopDetail = res.data
            console.log(this.shopDetail)
            setStore('shopInfo', this.shopDetail)
          }
        })
      },
      // 红包信息
      getRedEnvelope() {
        const data = {
          shopId: this.shopId,
          customerId: this.customerId
        }
        this.axios.get(`/br/customer/redEnvelope${this.PublicJs.createParams(data)}`).then((res) => {
          res = res.data
          if (res.success) {
            if (res.data.type === 1) {
              if (res.data.first) {
                if (res.data.price > 0) {
                  this.IndexboonPrice = res.data.price
                  this.isCloseBoon = true
                }
              }
            }
          }
        })
      },
      // 关闭红包
      closeBoon() {
        this.isCloseBoon = false
        this.toggleToast(1, '领取成功，支付时将自动抵扣', 1300)
      },
      // 去用户详情
      goSeller() {
        this.$router.push({
          path: '/shopDetail',
          query: {
            shopId: getStore('userInfo').shopId,
            customerId: getStore('userInfo').customerId
          }
        })
      },
      // 去我的
      goUser() {
        this.$router.push({
          path: '/orderList',
          query: {
            shopId: getStore('userInfo').shopId,
            sessionId: getStore('userInfo').customerId
          }
        })
      },
      // toggle toast
      toggleToast(show, text, time) {
        if (show === true || show === 1) {
          this.toastShow = !this.toastShow
          this.toastText = text
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.toastShow = !this.toastShow
          }, time)
        } else {
          return
        }
      }
    },
    components: {
      wxshare,
      goods,
      toast
    }
  }
</script>

<style scoped>
  /*.index {*/
  /**/
  /*}*/
  .tab {
    display: flex;
    width: 100%;
    height: 45px;
    line-height: 45px;
    background: #ffffff;
    border-bottom: 1px solid #f5f5f5;
  }

  .tab-item {
    flex: 1;
    text-align: center;
  }

  .tab-item .label {
    display: block;
    color: #ff6651;
    font-size: 17px;
  }

  .appViem {
    position: relative;
  }

  .boon {
    position: fixed;
    z-index: 111;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }

  .boon .close {
    position: fixed;
    top: 10px;
    right: 4px;
    padding: 10px;
    display: block;
    z-index: 112;
    width: 31px;
    height: 31px;
    background: url("../../assets/close.png") no-repeat center top 50%;
    background-size: 31px 31px;
  }

  .boon .backImg {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 70%;
    margin-top: 30%;
    background: url("../../assets/Group33@2x.png") no-repeat center top 50%;
    background-size: 270px 375px;
  }

  .boon .backImg .textContent {
    position: relative;
    top: 45%;
    margin: 0 auto;
    color: #fff;
    text-align: center;
    font-size: 13px;
  }

  .boon .backImg .textContent .price {
    color: #fdff08;
    height: 62px;
    font-size: 58px;
    line-height: 40px;
    line-height: 1em;
    font-family: STYuanti-TC-Regular;
  }

  .boon .backImg .textContent .price .desc {
    font-size: 15px;
  }

  .header {
    box-sizing: border-box;
    /*overflow: hidden;*/
    /*position: relative;*/
    padding: 15px 7px 8px 10px;
    height: 100px;
  }

  .header .content-wrapper {
    margin-right: 50px;
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
    margin-bottom: 4px;
    font-size: 14px;
  }

  .header .content-wrapper .box-content .content .title-name .description {
    font-size: 10px;
  }

  .header .content-wrapper .box-content .content .bulletin {
  }

  .header .content-wrapper .box-content .content .title-name,
  .header .content-wrapper .box-content .content .description {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .header .content-wrapper .box-content .content .bulletin {
    margin-top: 8px;
    height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /*.header .content-wrapper .box-content .content .bulletin .elseText {*/
  /*box-sizing: border-box;*/
  /*width: 100%;*/
  /*max-height: 30px;*/
  /*color: #343434;*/
  /*font-size: 12px;*/
  /*border: none;*/
  /*background: none;*/
  /*overflow: hidden;*/
  /*text-overflow: ellipsis;*/
  /*!*white-space: nowrap;*!*/
  /*}*/

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
    margin-top: 4px;
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

  .boonDesc {
    position: relative;
    box-sizing: border-box;
    padding-left: 17px;
    padding-right: 55px;
    margin-top: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
    color: #ffffff;
    background: url("../../assets/icon_packets.png") no-repeat left center;
    background-size: 11px 14px;
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
