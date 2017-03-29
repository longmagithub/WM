<template>
  <div class="index">
    <div class="heade">
      <vheade :seller="seller"></vheade>
    </div>
    <div class="tab">
      <div class="tab-item">
        <span class="label">商品</span>
      </div>
    </div>
    <div class="main">
      <goods :seller="seller" :is-yingye="isYingye"></goods>
    </div>
    <toast :show="toastShow" :text="'toastText'"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import vheade from '../header/header.vue'
  import goods from '../goods/goods.vue'
//  import {urlParse} from '../../common/js/util'
  import toast from '../../components/toast.vue'

  const SUCCESS_OK = true
  export default{
    data() {
      return {
        seller: {},
        shopId: '',
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
      // 门店状态
      // this.getShopStatus()

      // 营业时间
      // this.getBusinesshours()

      // 商家信息
      // this.axios.get(`${this.api}/br/shop/detail?shopId=${this.shopId}`).then((res) => {
      // 接口通了  注释下面的 打开上面的
      this.axios.get('./api/seller').then((res) => {
        res = res.data
        if (res.success === SUCCESS_OK) {
          // 排序
          res.data.dispatching.fees = this.PublicJs.bubbleSort(res.data.dispatching.fees,
            res.data.dispatching.fees.price)
          this.seller = Object.assign({}, this.seller, res.data)
          // 设置微信title
          this.PublicJs.changeTitleInWx(this.seller.name.split('（')[0])
        }
      })
    },
    methods: {
      // 营业时间
      getBusinesshours() {
        this.axios.get('/br/shop/businesshours?shopId=' + this.shopId).then((res) => {
          if (res.data.success) {
            res = res.data.data
            let strB = res.beginTime.split('：', 2)
            let strE = res.endTime.split('：', 2)
            let b = new Date()
            let e = new Date()
            b.setHours(strB[0])
            b.setMinutes(strB[1])
            e.setHours(strE[0])
            e.setMinutes(strE[1])
            if (this.nowTime.getTime() - b.getTime() >= 0 && this.nowTime.getTime() - e.getTime() <= 0) {
              this.isYingye = true
              console.log('yes')
            } else {
              this.isYingye = false
              this.toggleToast(true, '没在营业时间内')
              console.log('no')
            }
          }
        })
      },
      // 门店门店状态
      getShopStatus() {
        this.axios.get(`${this.api}/br/shop/status?shopId=${this.shopId}`).then((res) => {
          if (res.success) {
            if (res.data === 1) {
              return
            } else {
              this.toggleToast(res.data, '商家关闭')
              this.isYingye = true
            }
          }
        })
      },
      // toggle toast
      toggleToast(show, text) {
        console.log('qweqweqweqweqweq')
        this.toastText = text
        if (show === true || show === 1) {
          this.toastShow = !this.toastShow
          if (this.toastShow) {
            setTimeout(() => {
              this.toastShow = !this.toastShow
            }, 1000)
          }
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
