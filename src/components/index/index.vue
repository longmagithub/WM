<template>
  <div class="main">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
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
        }
      }
    },
    created() {
      this.axios.get('./api/seller?id=' + this.seller.id).then((response) => {
        response = response.data
        console.log(response)
        if (response.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, response.data)
        }
      })
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
</style>

