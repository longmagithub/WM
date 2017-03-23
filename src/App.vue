<template>
  <div id="app">
    <index></index>
    <!--<transition name="fade" mode="out-in">-->
      <!--<router-view class="view"></router-view>-->
    <!--</transition>-->
    <!--<div>测试12123</div>-->
  </div>
</template>
<script type="text/ecmascript-6">
  import index from './components/index/index.vue'
  export default {
    components: {
      index
    }
  }
</script>
<style lang="sass">
  @import './style/base.scss';
</style>
