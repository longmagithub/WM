<template>
  <div class="main">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller" :isYingye="isYingye"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../header/header.vue'
  import {urlParse} from '../../common/js/util'

  const ERR_OK = 0
  export default{
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse()
            return queryParam.id
          })()
        },
        shopId: '',
        isYingye: false,
        nowTime: new Date(),
        beginTime: '',
        endTime: '',
        deliveryfee: {} // 配送费
      }
    },
    created() {
      // 判断是否营业
      if (this.nowTime > this.beginTime && this.nowTime < this.endTime) {
        this.isYingye = true
      } else {
        this.isYingye = true
      }
      this.axios.get('./api/seller?id=' + this.seller.id).then((res) => {
        res = res.data
        console.log(res)
        if (res.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, res.data)
        }
      })
    },
    methods: {
      // 营业时间
      getBusinesshours() {
        this.axios.get('/br/shop/businesshours?shopId' + this.shopId).then((res) => {
          if (res.data.success) {
            res = res.data.data
            // 开始时间
            this.beginTime = res.beginTime
            // 结束时间
            this.endTime = res.endTime
          }
        })
      }
    },
    components: {
      'v-header': header
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

  .tab-item > a {
    display: block;
    color: #ff6651;
    font-size: 17px;
  }

  .appViem {
    position: relative;
  }
</style>
