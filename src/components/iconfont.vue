<template>
  <i class="uxwm-iconfont" :class="iconname"></i>
</template>
<script>
  export default {
    props: {
      iconname: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style lang="sass">
@import './../fonts/iconfont.css';
</style>
