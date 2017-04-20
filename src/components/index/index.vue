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
    <div class="boon" v-show="isCloseBoon">
      <i class="close" @click="closeBoon"></i>
      <div class="backImg">
        <div class="textContent">
          <p class="price">{{boonPrice}}<span class="desc">元</span></p>
          <p>恭喜您</p>
          <p>获得一个悠先外卖红包</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import banner from '../header/header.vue'
  import goods from '../goods/goods.vue'
  import {setStore, getStore} from '../../common/js/util'
  import toast from '../../components/toast.vue'
  import {mapState, mapMutations} from 'vuex'
  import wx from 'weixin-js-sdk'
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
//        'shopId': 'd8438de5-d90d-431d-bd68-0d0a85f4401a'
//      })
      // ↑↑↑↑↑调试带代码↑↑↑↑
      this.shopId = getStore('userInfo').shopId
      this.customerId = getStore('userInfo').customerId
      // 红包信息
      this.getRedEnvelope()
      // 商家信息
      this.getShopDetail()
      // 微信分享
      this.setShareConfig()
      // 隐藏右上角菜单接口
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
      // 设置微信分享
      setShareConfig() {
        let url = window.location.href.split('#')[0]
        console.log(url)
        this.axios.get(`/mp/jsapi/sign?url=${encodeURIComponent(url)}`).then((res) => {
          res = res.data
          if (res.success) {
            wx.config({
              debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.appId, // 必填，公众号的唯一标识
              timestamp: res.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
              signature: res.data.signature, // 必填，签名，见附录1
              jsApiList: ['hideOptionMenu', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo',
                'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
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
    height: 100%;
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
