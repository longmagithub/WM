<template>
  <div class="loading">loading....</div>
</template>

<script type="text/ecmascript-6">
  import {getStore} from '../../common/utils/util'
  export default {
    data() {
      return {
        shopId: '',
        customerId: ''
      }
    },
    created() {
      this.shopId = this.$route.query.shopId ? this.$route.query.shopId : getStore('userInfo').shopId
      this.customerId = this.$route.query.customerId ? this.$route.query.customerId : getStore('userInfo').customerId
      console.log(this.shopId)
      console.log(this.customerId)
    },
    mounted() {
      this.goIndex()
    },
    methods: {
      goIndex() {
        console.log(1231)
//        setTimeout(() => {
        this.$router.replace({
          path: '/index',
          query: {
            shopId: this.shopId,
            customerId: this.customerId
          }
        })
//        }, 500)
      }
    }
  }
</script>

<style>
  .loading {
    text-align: center;
    font-size: 30px;
    margin: 30% auto;
  }
</style>
