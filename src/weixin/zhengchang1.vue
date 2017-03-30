<template>
  <div>
    <h1>{{msg}}</h1>
    <h2>{{url}}</h2>
  </div>
</template>
<script>
  import {urlParse, getStore} from '../common/js/util'

  export default {
    data () {
      return {
        msg: '用户授权',
        url: ''
      }
    },
    components: {},
    mounted () {
      this.url = window.location.href
      if (this.url.indexOf('code') > 0) {
        this.getOpenId()
      }
    },
    methods: {
      getOpenId () {
        console.log('**正常111111授权 调用接口**')
        console.log(data)
        const data = {
          customerId: getStore('user').customerId,
          code: urlParse().code,
          type: 2 // 授权类型：1静默授权；2用户授权
        }
        const api = '/mp/authority/customer'
        this.axios.post(api, data).then((res) => {
          const d = res.data
          if (d.success) {
            this.jump(d.data.customerId)
          }
        }, (errorRes) => {
          console.log(errorRes)
        })
      },
      // 如果有code 跳转页面
      jump (customerId) {
        this.$router.replace({
          path: '/index',
          query: {
            'shopId': 'ca2939cf-f42f-402f-8b75-53283431ee68',
            'customerId': customerId
          }
        })
      }
    }
  }
</script>
