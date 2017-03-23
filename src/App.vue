<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view class="view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {}
</script>
<style lang="sass">
  @import './style/base.scss';

  /*#app .fade-enter-active, #app .fade-leave-active {*/
    /*transition: all 0.3s;*/
  /*}*/

  /*#app .fade-enter, #app .fade-leave-active {*/
    /*opacity: 0;*/
  /*}*/
</style>
