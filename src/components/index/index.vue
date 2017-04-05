<template>
  <div class="index">
    <div class="header">
      <vheade :seller="shopDetail" :detail="detail"></vheade>
    </div>
    <div class="tab">
      <div class="tab-item">
        <span class="label">商品</span>
      </div>
    </div>
    <div class="main">
      <goods :seller="shopDetail" :min-price="0" :is-yingye="isYingye"></goods>
    </div>
    <toast :show="toastShow" :text="toastText"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import vheade from '../header/header.vue'
  import goods from '../goods/goods.vue'
  import {setStore} from '../../common/js/util'
  import toast from '../../components/toast.vue'

  const SUCCESS_OK = true
  export default{
    data() {
      return {
        shopDetail: {}, // 商家信息
        detail: {}, // 配送信息
        shopId: null,
        customerId: null,
        toastShow: false,
        toastText: '',
        nowTime: new Date(),
        endTime: '',
        deliveryfee: {}, // 配送费
        isYingye: true, // 是否营业
        shopStatus: 0 // 门店状态
      }
    },
    created() {
      console.log('**下面是两个ID**')
      console.log(this.$route.query.shopId)
      console.log(this.$route.query.customerId)
//      this.shopId = getStore('user').shopId
//      this.shopId = 'ca2939cf-f42f-402f-8b75-53283431ee68'
//      this.customerId = '640a4f47-916b-48fd-9bd3-ea36fd33365b'
      setStore('user', {
        'shopId': this.$route.query.shopId,
        'customerId': this.$route.query.customerId
      })
//      this.setStore('user', {
//        'shopId': 'ca2939cf-f42f-402f-8b75-53283431ee68'
//      })
      // 如果没有 customerId 就去授权
//      if (!this.customerId) {
//        this.$router.replace({
//          path: '/jingmo',
//          query: {
//            shopId: this.shopId
//          }
//        })
//      } else {
//        setStore('user', {
//          'shopId': this.shopId,
//          'customerId': this.customerId
//        })
//        removeStore('userInfoID')
        // 商家信息
      this.getShopDetail()
//      }

//      if (getStore('user')) {
//        this.shopId = getStore('user').shopId
//        this.customerId = getStore('user').customerId
//      } else {
//        setStore('user', {
//          'shopId': 'ca2939cf-f42f-402f-8b75-53283431ee68',
//          'customerId': '640a4f47-916b-48fd-9bd3-ea36fd33365b'
//        })
//      }
    },
    mounted() {
      // 门店状态
      // this.getShopState()
      // 营业时间
      // this.getBusinesshours()
    },
    methods: {
      // 营业时间
      getBusinesshours() {
        this.axios.get('/br/shop/businesshours?shopId=' + this.shopId).then((res) => {
          if (res.data.success) {
            res = res.data.data
            let strB = res.beginTime.split(':', 2)
            let strE = res.endTime.split(':', 2)
            let b = new Date()
            let e = new Date()
            b.setHours(strB[0])
            b.setMinutes(strB[1])
            e.setHours(strE[0])
            e.setMinutes(strE[1])
            if (this.nowTime.getTime() - b.getTime() >= 0 && this.nowTime.getTime() - e.getTime() <= 0) {
              this.isYingye = true
            } else {
              this.isYingye = false
              this.toggleToast(true, '没在营业时间内')
            }
          }
        })
      },
      // 门店门店状态
      getShopState() {
        this.axios.get(`/br/shop/state?shopId=${this.shopId}`).then((res) => {
          res = res.data
          if (res.success === SUCCESS_OK) {
            if (res.data.state === 1) {
              return
            } else {
              this.toggleToast(!res.data.state, '商家关闭')
              this.isYingye = true
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
            res.data.dispatching.fees = this.PublicJs.bubbleSort(res.data.dispatching.fees,
              res.data.dispatching.fees.price)
            this.detail = Object.assign({}, this.detail, res.data.dispatching)
            this.shopDetail = Object.assign({}, this.shopDetail, res.data)
            setStore('shopInfo', this.shopDetail)
            // 设置微信title
            this.PublicJs.changeTitleInWx(this.shopDetail.name.split('（')[0])
          }
        })
      },
      // toggle toast
      toggleToast(show, text) {
        if (show === true || show === 1) {
          this.toastShow = !this.toastShow
          this.toastText = text
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.toastShow = !this.toastShow
          }, 1000)
        } else {
          return
        }
      }
    },
    components: {
      vheade,
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
</style>
