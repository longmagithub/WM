<template>
<div>
  
  <h1 @click='close'>asfjsl;fj;aslfls</h1>
  <h1 @click='close'>asfjsl;fj;aslfls</h1>
  <h1 @click='close'>asfjsl;fj;aslfls</h1>
  <h1 @click='close'>asfjsl;fj;aslfls</h1>
  <h1 @click='close'>asfjsl;fj;aslfls</h1>
  <h1 @click='close'>asfjsl;fj;aslfls</h1>
  <h1 @click='close'>asfjsl;fj;aslfls</h1>
  <h1 @click='close'>asfjsl;fj;aslfls</h1>
</div>
</template>
<script>
  // window.alert('111')
  
  export default {
    mounted() {
      WeixinJSBridge.call('closeWindow')
      if (WeixinJSBridge) {
        window.alert('aaa')
      }
      WeixinApi.ready((Api) => {
        WeixinJSBridge.invoke('closeWindow', {}, function(e) {})
      })
    },
    methods: {
      close () {
        WeixinJSBridge.call('closeWindow')
      }
    }
  }
</script>
