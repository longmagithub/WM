<template>
  <div class="index">
    <div class="index-box">
      <div class="header" ref="header">
        <div class="content-wrapper"
             @click="goSeller">
          <div class="box-content">
            <div class="logo">
              <img v-if="shopDetail.logo" :src="shopDetail.logo" alt="" width="48px" height="48px">
              <img v-else src="../../assets/item_logo.png" alt="" width="50px" height="50px">
            </div>
            <div class="content">
              <!--下面打开-->
              <!--<div class="title-name">{{shopDetail.name}}</div>-->
              <div class="title-name">麻辣小面联庄店麻辣小面联庄店麻辣小面联庄店</div>
              <!-- 描述 -->
              <!--<div class="description">-->
              <!--name 打开-->
              <!--<span>{{detailBox.dispatching.name}}</span>-->
              <!--<span>{{detailBox.dispatching.duration}}分钟到达</span>-->
              <!--<span>/ 满{{detailBox.dispatching.fees[0].price}}{{detailBox.dispatching.fees[0].fee | fees}}</span>-->
              <!--</div>-->
              <div class="bulletin" v-if="shopDetail.notice">公告：{{shopDetail.notice}}</div>
            </div>
            <!--<div class="enter uxwm-iconfont btn_right"></div>-->
          </div>
          <div class="activity" v-if="shopDetail.activity">
          <span class="text" style="margin-right: 5px" v-if="shopDetail.activity"
                v-for="item in shopDetail.activity">{{item
            .title}}我是满减&npsb我是满减&npsb我是满减&npsb我是满减&npsb我是满减&npsb</span>
            <!--<span class="number" v-if="detailBox.activity">{{detailBox.activity.length}}个活动</span>-->
          </div>
          <div class="fessDesc" v-if="1">
            满87减运费，加加减减
          </div>
        </div>
        <div class="user">
          <circle-menu
            class="circle_menu_box"
            type="bottom"
            circle="circleMenu.circle"
            :number="2"
            mask="white"
            colors="circleMenu.colors">
            <div class="uxwm-iconfont wo circle-menu"
                 slot="item_btn"></div>
            <span slot="item_1" @click="goUser" class="orderList">订单</span>
            <span slot="item_2" @click="goInviteNum" class="">邀请码</span>
          </circle-menu>
        </div>
      </div>
      <div class="main">
        <goods :seller="shopDetail" :min-price="shopDetail.minPrice"></goods>
      </div>
    </div>
    <toast :show="toastShow" :text="toastText"></toast>
    <!--红包toast-->
    <div class="boon" v-show="isCloseBoon" @click="closeBoon">
      <div class="shareJiantou">
      </div>
      <div class="backImg">
        <div class="boonDesc">
          客官，看你骨骼清奇，<br>
          不去晒个红包简直就是浪费良辰美景
        </div>
        <div class="textContent">
          <p class="price">{{IndexboonPrice}}<i class="yuanIcon"></i></p>
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
  import CircleMenu from 'vue-circle-menu'
  export default{
    data() {
      return {
        circleMenu: {
          circle: true,
          colors: ['#ff6651', '#ff6651', '#ff6651', '#ff6651']
        },
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
        IndexboonPrice: 0,
        headerHeight: 0
      }
    },
    created() {
      // 调试代码 提交时注释
      setStore('userInfo', {
        'customerId': this.$route.query.customerId || 'dcfae6aa-83af-484d-bbb6-8e0096d16272',
        'shopId': this.$route.query.shopId
      })
      setStore('openId', {
        'customerId': this.$route.query.customerId || 'dcfae6aa-83af-484d-bbb6-8e0096d16272',
        'shopId': this.$route.query.shopId
      })
      // ↑↑↑↑↑调试带代码↑↑↑↑
      this.shopId = getStore('userInfo').shopId
      this.customerId = getStore('userInfo').customerId
      // 红包信息
      this.getRedEnvelope()
      // 商家信息
      this.getShopDetail()
    },
    mounted() {
      this.$nextTick(() => {
        console.log(this.$refs.header.getBoundingClientRect().height)
        this.headerHeight = document.getElementsByClassName('header')
        console.log(this.headerHeight)
        console.log(document.getElementsByClassName('header')[0].clientHeight)
        console.log(document.getElementsByClassName('header')[0].offsetHeight)
      })
    },
    computed: {
      // 检测 vuex 中boonPrice
      ...mapState(['boonPrice']),
      initHeight() {
        this.headerHeight = this.$refs.header
        console.log(this.headerHeight)
      }
    },
    methods: {
      // 红包
      ...mapMutations(['BOON_PRICE']),
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
      // 分享
      goShare() {
        console.log(123)
        WeixinJSBridge.invoke('sendAppMessage', {
          'appid': 'wx73a13df7b60775a1',
          'img_url': this.shopDetail.logo,
          'link': 'http://newpay.tunnel.qydev.com/VAOrderH5/?#/erweima',
          'title': '我在Thank u mom得到一个大红包，快来~快来~这里还有呐', // 分享标题
          'desc': '微信点外卖-更便宜，更快捷。'
        })
      },
      // 邀请码
      goInviteNum() {
        this.$router.push({
          path: '/inviteNum',
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
      toast,
      CircleMenu
    }
  }
</script>

<style scoped>
  .index-box {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }

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

  .boon.shareJiantou {
    position: absolute;
    top: 0;
    right: 0;
    background: url("../../assets/jiantou@2x.png") no-repeat right;
  }

  .boon .backImg {
    position: relative;
    top: 10%;
    left: 0;
    width: 100%;
    height: 374px;
    background: url("../../assets/hongbao@2x.png") no-repeat center;
    background-size: 288px 374px;
  }

  .boon .backImg .boonDesc {
    position: absolute;
    width: 100%;
    top: 66px;
    text-align: center;
    font-family: STYuanti-SC-Regular;
    font-size: 11px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 18px;
  }

  .boon .backImg .textContent {
    position: absolute;
    top: 126px;
    margin: 0 auto;
    width: 100%;
    height: 77px;
    color: #fff;
  }

  .boon .backImg .textContent .price {
    color: #fdff08;
    height: 77px;
    line-height: 77px;
    text-align: center;
    font-family: STYuanti-SC-Bold;
    font-size: 55px;
    color: #FA6B4B;
    letter-spacing: 0;
  }

  .boon .backImg .textContent .price .yuanIcon {
    display: inline-block;
    position: relative;
    margin-left: 4px;
    width: 20px;
    height: 60px;
    background: url("../../assets/yuan@2x.png") no-repeat center;
    background-size: 20px 20px;
    font-size: 15px;
  }

  .main {
    flex: 1 1 100%;
    overflow: hidden;
    position: relative;
  }

  .header {
    flex: 0 0 auto;
    box-sizing: border-box;
    padding: 15px 7px 8px 10px;
    background: url('../../assets/back.jpg') no-repeat;
    background-size: 100% 100%;
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
    /*text-overflow: ellipsis;*/
    /*white-space: nowrap;*/
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

  .header .content-wrapper .box-content .content .title-name,
  .header .content-wrapper .box-content .content .description {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .header .content-wrapper .box-content .content .bulletin {
    display: none;
    margin-top: 5px;
    /*height: 30px;*/
    display: -webkit-flex;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical !important;
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
    /*padding-right: 55px;*/
    margin-top: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
    color: #ffffff;
    background: url("../../assets/icon_jian_normal@2x.png") no-repeat left center;
    background-size: 11px 11px;
  }

  .activity .number {
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .fessDesc {
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
    background: url("../../assets/icon_pei_normal@2x.png") no-repeat left center;
    background-size: 11px 11px;
  }

  .user {
    position: absolute;
    top: 15px;
    right: 20px;
  }

  .user .circle-menu {
    box-sizing: border-box;
    width: 48px;
    height: 48px;
    line-height: 45px;
    font-size: 22px;
    color: #fff;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.9);
  }

  .user #CircleMenu .oy-menu-group .btn-list .oy-menu-item span {
    display: block;
    width: 48px !important;
    height: 48px !important;
    line-height: 48px !important;
    border-radius: 50% !important;
    background: #ff6651 !important;
    font-size: 12px;
    color: #fff;
  }

  .user #CircleMenu .oy-menu-group .btn-list .oy-menu-item .orderList {
    font-size: 13px;
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
