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
      <goods :seller="shopDetail" :min-price="shopDetail.minPrice"></goods>
    </div>
    <toast :show="toastShow" :text="toastText"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import vheade from '../header/header.vue'
  import goods from '../goods/goods.vue'
  import {setStore} from '../../common/js/util'
  import toast from '../../components/toast.vue'
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
        shopStatus: 0 // 门店状态
      }
    },
    created() {
      this.shopId = this.$route.query.shopId
      this.customerId = this.$route.query.customerId
      setStore('userInfo', {
        'customerId': this.$route.query.customerId,
        'shopId': this.$route.query.shopId
      })
      // 商家信息
      this.getShopDetail()
    },
    mounted() {
      // 营业时间
//      this.getBusinesshours()
    },
    methods: {
      // 营业时间
//      getBusinesshours() {
//        this.axios.get('/br/shop/businesshours?shopId=' + this.shopId).then((res) => {
//          if (res.data.success) {
//            res = res.data.data
//            let strB = res.beginTime.split(':', 2)
//            let strE = res.endTime.split(':', 2)
//            let b = new Date()
//            let e = new Date()
//            b.setHours(strB[0])
//            b.setMinutes(strB[1])
//            e.setHours(strE[0])
//            e.setMinutes(strE[1])
//            if (this.nowTime.getTime() - b.getTime() >= 0 && this.nowTime.getTime() - e.getTime() <= 0) {
//              this.isYingye = true
//            } else {
//              this.isYingye = false
//              this.toggleToast(true, '没在营业时间内')
//            }
//          }
//        })
//      },
      // 商家信息
      getShopDetail() {
        const data = {
          shopId: this.shopId,
          customerId: this.customerId
        }
        this.axios.get(`/br/shop/detail${this.PublicJs.createParams(data)}`).then((res) => {
          res = res.data
          console.log(res)
          if (res.success) {
            // 排序
            this.shopDetail = res.data
            setStore('shopInfo', this.shopDetail)
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
