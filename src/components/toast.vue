<template>
  <div class="toast" v-show="show">
    <div class="toast-mask"></div>
    <div class="toast-text">{{text}}</div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      t: {
        type: Number,
        default: 2000
      },
      show: {
        type: Boolean,
        defalut: false
      }
    }
  }
</script>
<style scoped lang="scss">
  .toast {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

  .toast-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
  }

  .toast-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    min-width: 120px;
    max-width: 80%;
    line-height: 1.5em;
    text-align: center;
    color: #fff;
    background: rgba(0, 0, 0, .7);
    border-radius: 4px;
  }

  }
</style>
