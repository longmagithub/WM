<template>
  <div class="index">
    <div class="header-box">
      <banner :seller="shopDetail" :detail="detail"></banner>
    </div>
    <!--<div class="tab">-->
    <!--<div class="tab-item">-->
    <!--<span class="label">商品</span>-->
    <!--</div>-->
    <!--</div>-->
    <div class="main">
      <goods :seller="shopDetail" :min-price="shopDetail.minPrice"></goods>
    </div>
    <toast :show="toastShow" :text="toastText"></toast>
    <!--红包toast-->
    <div class="boon" v-show="1">
      <i class="close" @click="closeBoon"></i>
      <div class="backImg" @click="goShare">
        <div class="textContent">
          <p class="price">{{boonPrice}}<span class="desc">元</span></p>
          <p>恭喜您</p>
          <p>获得一个悠先外卖红包</p>
        </div>
      </div>
    </div>
    <wxshare></wxshare>
  </div>
</template>

<script type="text/ecmascript-6">
  import banner from '../header/header.vue'
  import goods from '../goods/goods.vue'
  import {setStore, getStore} from '../../common/js/util'
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
        isCloseBoon: false
      }
    },
    created() {
      // 调试代码 提交时注释
//      setStore('userInfo', {
//        'customerId': 'dcfae6aa-83af-484d-bbb6-8e0096d16272',
//        'shopId': '9480c029-a45d-479e-a3c3-74ed9c65d54d'
//      })
      // ↑↑↑↑↑调试带代码↑↑↑↑
      this.shopId = getStore('userInfo').shopId
      this.customerId = getStore('userInfo').customerId
      // 红包信息
      this.getRedEnvelope()
      // 商家信息
      this.getShopDetail()
    },
    mounted() {
    },
    computed: {
      // 检测 vuex 中boonPrice
      ...mapState(['boonPrice'])
    },
    methods: {
      // 营业时间
      ...mapMutations(['BOON_PRICE']),
      // 分享按钮
      goShare() {
        console.log('我是胖子')
        wx.ready(function () {
          console.log('我是 ready ')
          wx.onMenuShareAppMessage({
            title: '分享标题-大明湖', // 分享标题
            desc: '分享描述-大明湖畔夏雨荷', // 分享描述
            link: 'http://newpay.tunnel.qydev.com/VAOrderH5/#/share', // 分享链接
            imgUrl: '', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              window.alert('分享成功')
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              window.alert('取消分享')
              // 用户取消分享后执行的回调函数
            }
          })
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
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
            this.shopDetail = res.data
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
            this.BOON_PRICE({boonPrice: res.data.price, endDate: res.data.endDate})
            if (res.data.first) {
              if (res.data.price > 0) {
                this.isCloseBoon = true
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
      banner,
      goods,
      toast
    }
  }
</script>

<style scoped>
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
</style>
