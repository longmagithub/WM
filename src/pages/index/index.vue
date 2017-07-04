<template>
  <div class="index">
    <div class="index-box">
      <div class="header" ref="header">
        <div class="title-name" @click="switchShop">{{shopDetail.name}}<i class="down-sanjian"
                                                                          v-if="0"></i></div>
        <!--<div class="shopList" v-show="0">-->
        <!--<div class="shopList" v-show="shopListShow">-->
        <!--<ul>-->
        <!--<li class="shopLsit-item"-->
        <!--v-for="(item,index) in shopListArr"-->
        <!--@click="changeShop(item)">-->
        <!--<span class="item-text">{{item.shopName}}</span></li>-->
        <!--</ul>-->
        <!--</div>-->
        <div class="shopListTost" v-show="shopListShow" @click="switchShop"></div>
        <div class="content-wrapper"
             @click="goSeller">
          <div class="box-content">
            <div class="logo">
              <img v-if="shopDetail.logo" :src="shopDetail.logo" width="48px" height="48px">
              <!--<img v-else src="../../assets/item_logo.png" width="50px" height="50px">-->
              <!--<img src="../../assets/item_logo.png" width="50px" height="50px">-->
            </div>
            <div class="content">
              <!--下面打开-->
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
          <div class="activity" v-show="shopDetail.activity">
          <span class="text" style="margin-right: 5px" v-show="shopDetail.activity"
                v-for="item in shopDetail.activity">{{item.title}}</span>
            <!--<span class="number" v-if="detailBox.activity">{{detailBox.activity.length}}个活动</span>-->
          </div>
          <div class="fessDesc" v-if="freedispatch.state === 1">
            满{{freedispatch.price}}元免配送费
          </div>
        </div>
            <!-- circle="circleMenu.circle" -->
        <div class="user" @click="goMy">
        	<img src="../../assets/my.jpg"/>
          <!--<circle-menu
            class="circle_menu_box"
            type="bottom"
            :circle="true"
            :number="3"
            mask="white"
            :colors="circleMenu.colors">
            <div class="circle-menu"
                 slot="item_btn">
              <i class="remind"
                 v-show="isRemind.orderRemind || !menuRemind || isRemind.boonRemind"></i>
            </div>
            <span slot="item_1" @click="goUser" class="menu-orderList">订单</span>
            <span slot="item_2" @click="goInviteNum" class="menu-inviteNum">邀请码
              <i class="remind" v-show="!menuRemind"></i></span>
            <span slot="item_3" @click="goredList" class="">红包</span>
          </circle-menu>-->
        </div>
      </div>
      <div class="tips" v-if='weatherInfo.switch'>
        <div class="text" v-if='weatherInfo.switch'>
          {{weatherInfo.text}}
          <img src="../../assets/tips/notice@2x.png">
        </div>
      </div>
      <div class="main">
        <goods :seller="shopDetail" :min-price="shopDetail.minPrice"
               :freedispatchPrice="freedispatch"></goods>
      </div>
    </div>
    <toast :show="toastShow" :text="toastText"></toast>
    <!--红包toast-->
    <div class="boon" v-show="isCloseBoon">
      <!--<div class="boon" v-show="1">-->
      <div class="backImg">
        <i class="closeBoon" @click="closeBoon"></i>
        <div class="boonDesc" v-html="boonMegText"></div>
        <div class="textContent">
          <p class="price">{{IndexboonPrice}}<i class="yuanIcon"></i></p>
        </div>
        <div class="boonBtn" :class="{toogleBoonBtnClass:toogleBoonBtnClass}" @click="toogleBoonBtn">
          {{toogleBoonBtnText}}
        </div>
      </div>
    </div>
    <wxshare></wxshare>
  </div>
</template>

<script>
  import goods from '../goods/goods.vue'
  import {setStore, getStore, getLocal} from '../../common/utils/util'
  import toast from '../../components/toast.vue'
  import {mapState, mapMutations} from 'vuex'
  import wxshare from '../../components/wxshare.vue'
  import CircleMenu from '../../components/circleMenu/circleMenu'
  export default{
    data() {
      return {
        isRemind: { // 提醒小红点
          orderRemind: false,
          inviteNumRemind: true,
          boonRemind: false
        },
        shopListShow: false, // 门店列表 switch
        freedispatch: {}, // 免配送费
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
        headerHeight: 0,
        toogleBoonBtnText: '邀请好友下单，领取更多红包',
        toogleBoonBtnClass: false,
        boonMegText: '', // 红包提示语
        shopListArr: [],
        weatherInfo: {
          switch: false,
          text: ''
        }
      }
    },
    created() {
      setStore('userInfo', {
        'customerId': this.$route.query.customerId,
        'shopId': this.$route.query.shopId
      })
      setStore('openId', {
        'customerId': this.$route.query.customerId,
        'shopId': this.$route.query.shopId
      })

      this.shopId = getStore('userInfo').shopId
      this.customerId = getStore('userInfo').customerId
      this.getRedEnvelope()
      // 商家信息
      this.getShopDetail()
      // 免配送费
      this.getFreedispatch()
      // 红包提示语
      this.getBoonMeg()
      // 获取天气信息
      this.getWeather()
      // 修改提示状态
      if (getStore('isRemind') && getStore('isRemind').isRemind !== undefined) {
        this.MENU_REMIND(getStore('isRemind').isRemind)
      }
      // 测试shoplist
      // this.testShopList(this.customerId, 0, 0)
    },
    computed: {
      // 检测 vuex 中boonPrice
      ...mapState(['boonPrice', 'cartList', 'menuRemind']),
      initHeight() {
        this.headerHeight = this.$refs.header
      }
    },
    mounted() {
    },
    methods: {
      // 获取天气信息
      getWeather() {
        const data = {
          // shopId: this.shopId,
          customerId: getLocal('customerId')
          // customerId: this.customerId
        }
        this.axios.get(`/br/shop/weather${this.PublicJs.createParams(data)}`)
          .then((response) => {
            response = response.data
            if (response.success) {
              this.weatherInfo.switch = response.data.dispatchRemarkSwitch
              this.weatherInfo.text = response.data.dispatchRemark
            }
          })
      },
      // 红包
      ...mapMutations(['BOON_PRICE', 'MANJIAN_FEESPRICE', 'CLEAR_CART', 'INIT_BUYCART', 'MENU_REMIND']),
      // 测试shopList
      testShopList(id, lon, lat) {
        const data = {
          customerId: id,
          pageSize: 30,
          pageNumber: 1,
          longitude: lon, // 经度
          latitude: lat, // 维度
          discounts: [], // uxwm 满减
          thirdDiscounts: [] // 其他平台满减
        }
        this.axios.get(`/br/shop/list${this.PublicJs.createParams(data)}`).then((res) => {
          res = res.data
          if (res.success) {
            if (res.data.length > 0) {
              res.data.forEach((data) => {
                data.discounts = data.discounts.reverse()
                data.thirdDiscounts = data.thirdDiscounts.reverse()
                // 添加 图片分割
                if (data.logo) {
                  data.logo = data.logo + '?x-oss-process=image/resize,m_fill,h_100,w_100'
                }
              })
              this.shopListArr = res.data
              console.log(this.shopListArr)
            }
          }
        })
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
            this.$nextTick(() => {
              res.data.activity = res.data.activity.reverse()
              this.shopDetail = res.data
              setStore('shopInfo', this.shopDetail)
            })
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
                  let IndexboonPriceArr = []
                  IndexboonPriceArr.push(res.data.price)
                  if (IndexboonPriceArr.join().length === 3) {
                    this.IndexboonPrice = IndexboonPriceArr.join() + '0'
                  } else {
                    this.IndexboonPrice = res.data.price
                  }
                }
                this.isCloseBoon = true
              }
            }
          }
        })
      },
      // 查询免配送费
      getFreedispatch() {
        const data = {
          shopId: this.shopId,
          customerId: this.customerId
        }
        this.axios.get(`/br/shop/freedispatch${this.PublicJs.createParams(data)}`).then((res) => {
          res = res.data
          if (res.success) {
            res.data.price = res.data.price / 100
            this.freedispatch = res.data
            setStore('manjianInfo', res.data || {})
            this.MANJIAN_FEESPRICE(res.data)
            if (res.data === null) {
              this.freedispatch = {
                state: 0,
                price: 0
              }
              this.MANJIAN_FEESPRICE({
                state: 0,
                price: 0
              })
            }
          }
        })
      },
      // 关闭红包
      closeBoon() {
        this.isCloseBoon = false
//        this.toggleToast(1, '领取成功，支付时将自动抵扣', 1300)
      },
      // 切换门店
      changeShop(item) {
        this.shopListShow = !this.shopListShow
        this.shopId = item.shopId
        this.$router.push({
          path: '/loading',
          query: {
            shopId: item.shopId,
            customerId: getStore('userInfo').customerId
          }
        })
//        window.location.href = 'http://newpay.tunnel.qydev.com/VAOrderH5/?#/index?customerId=' + this.customerId +
//          '&shopId=' + item.shopId + '&t=' + Date.parse(new Date())
      },
      // 切换门店 遮盖
      switchShop() {
        return
//        if (this.shopListArr === null) {
//          return
//        } else {
//          this.shopListShow = !this.shopListShow
//        }
      },
      // 去我的
      goMy() {
        this.$router.push({
          path: '/my',
          query: {
            shopId: this.shopId,
            customerId: getStore('userInfo').customerId
          }
        })
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
      /* goUser() {
        this.$router.push({
          path: '/orderList',
          query: {
            shopId: this.shopId,
            sessionId: getStore('userInfo').customerId
          }
        })
      }, */
      // 去红包列表
      goredList() {
        this.$router.push({
          path: '/redlist',
          query: {
            shopId: this.shopId,
            customerId: getStore('userInfo').customerId
          }
        })
      },
      // 邀请码
      goInviteNum() {
        this.isRemind.inviteNumRemind = false
        this.$router.push({
          path: '/inviteNum',
          query: {
            shopId: this.shopId,
            sessionId: getStore('userInfo').customerId
          }
        })
      },
      // 点击红包跳转邀请码
      toogleBoonBtn() {
        this.goInviteNum()
//        this.toogleBoonBtnText = '右上角你懂得'
//        this.toogleBoonBtnClass = true
      },
      // 红包提示语
      getBoonMeg() {
        this.axios.get('/common/sysconfig?name=shareMessage').then((res) => {
          res = res.data
          if (res.success) {
            this.boonMegText = res.data.content
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
//    watch: {
//      shopId: function (value) {
//        // 调试代码 提交时注释
//        setStore('userInfo', {
//          'customerId': this.$route.query.customerId,
//          'shopId': value
//        })
//        setStore('openId', {
//          'customerId': this.$route.query.customerId,
//          'shopId': value
//        })
//        this.customerId = getStore('userInfo').customerId
//        this.shopListArr = getStore('shopList')
//        this.CLEAR_CART(value)
//        // 红包信息
//        this.getRedEnvelope()
//        // 商家信息
//        this.getShopDetail()
//        // 免配送费
//        this.getFreedispatch()
//        // 红包提示语
//        this.getBoonMeg()
//        // 测试shoplist
//        this.testShopList(this.customerId, 0, 0)
//      }
//    },
//    updared() {
//      console.log('虚拟dom更新')
//    },
    components: {
      wxshare,
      goods,
      toast,
      CircleMenu
    }
  }
</script>

<style>
  .tips{
    padding: 11px 0;
    width: 100%;
    /*height: 50px;*/
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    overflow: scroll;
  }
  .tips>.text{
    margin: 0 24px;
    background: rgba(255,174,100,.21);
    border-radius: 2px;
    font-size: 10px;
    color: #ff8932;
    letter-spacing: 0;
    position: relative;
    box-sizing: border-box;
    padding: 6px 10px;
  }
  .tips>.text>img{
    position: absolute;
    left: -16px;
    top: 50%;
    width: 12px;
    height: 12px;
    transform: translate(0,-50%);
  }
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
    box-sizing: border-box;
    position: relative;
    top: 10%;
    left: 11%;
    padding-left: 16px;
    width: 78%;
    height: 374px;
    background: url("../../assets/hongbao@2x.png") no-repeat center;
    /*background-size: 288px 374px;*/
    background-size: 288px 374px;
  }

  .boon .backImg .closeBoon {
    position: absolute;
    top: -10px;
    right: 0px;
    display: block;
    width: 80px;
    height: 60px;
    /*border: 1px solid #fff;*/
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

  .boon .backImg .boonBtn {
    position: absolute;
    top: 389px;
    /*padding-right: 10px;*/
    left: 3%;
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-family: STYuanti-SC-Bold;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 1.15px;
    background: url("../../assets/boonBtn.png") no-repeat center;
    background-size: 80% 45px;
  }

  .boon .backImg .toogleBoonBtnClass {
    position: absolute;
    top: 389px;
    left: 10%;
    width: 80%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-family: STYuanti-SC-Bold;
    font-size: 22px;
    color: #FFFFFF;
    letter-spacing: 3.84px;
    background: url("../../assets/boonBtn.png") no-repeat center;
    background-size: 214px 45px;
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

  .header .title-name {
    box-sizing: border-box;
    position: absolute;
    top: 15px;
    left: 64px;
    width: 100%;
    margin-bottom: 4px;
    padding-right: 145px;
    font-size: 14px;
    color: #fff;
    z-index: 100;
  }

  .header .title-name .down-sanjian {
    display: inline-block;
    margin-left: 10px;
    width: 11px;
    height: 9px;
    background: url("../../assets/downSj.png") no-repeat center;
    background-size: 11px 9px;
  }

  .header .shopList {
    /*box-sizing: border-box;*/
    /*padding: 0 22px;*/
    position: absolute;
    top: 38px;
    left: 64px;
    width: 162px;
    height: 228px;
    overflow: scroll;
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 2px 6px 0 rgba(133, 132, 132, 0.24);
    border-radius: 5px;
    z-index: 100;
  }

  .header .shopListTost {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background: rgba(0, 0, 0, .4);
  }

  .header .shopList .shopLsit-item {
    box-sizing: border-box;
    padding: 0 20px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .header .shopList .shopLsit-item .item-text {
    display: block;
    width: 100%;
    font-family: PingFangSC-Medium;
    font-size: 13px;
    color: #333333;
    letter-spacing: 0.2px;
    border-bottom: 1px solid #d9d7d7;
  }

  .header .shopList .shopLsit-item:last-child .item-text {
    border-bottom: none;
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
    margin-top: 16px;
    margin-left: 6px;
    overflow: hidden;
    /*text-overflow: ellipsis;*/
    /*white-space: nowrap;*/
    font-size: 10px;
    color: #ffffff;
  }

  .header .content-wrapper .box-content .content .title-name {
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
  	width: 48px;
  	height: 48px;
    position: absolute;
    top: 15px;
    right: 20px;
    background: palegreen;
    border: 2px solid #fff;
    border-radius: 100%;
  }
  
  .user img{
  	width: 48px;
  	height: 48px;
  	border-radius: 100%;
  }

/*  .user .circle-menu {
    box-sizing: border-box;
    position: relative;
    width: 48px;
    height: 48px;
    line-height: 45px;
    font-size: 22px;
    color: #fff;
    border-radius: 50%;
    background: url("../../assets/userImg.png") no-repeat center;
    background-size: 48px 48px;
  }*/

/*  .user #CircleMenu .oy-menu-group .btn-list .oy-menu-item span {
    box-sizing: border-box;
    display: block;
    width: 48px !important;
    height: 48px !important;
    line-height: 48px !important;
    border-radius: 50% !important;
    background: none !important;
    border: 1px solid rgba(255, 255, 255, 0.9) !important;
    color: #fff;
  }*/

/*  .user #CircleMenu .oy-menu-group .btn-list .oy-menu-item .orderList {
    font-size: 13px;
  }

  .menu-inviteNum,
  .menu-orderList {
    position: relative;
  }

  .user .circle-menu .remind,
  .menu-inviteNum .remind {
    position: absolute;
    top: 1px;
    right: 1px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #FF553E;
  }*/

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
