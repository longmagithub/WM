<template>
  <div class="invice">
    <div class="invice-wrapper">
      <input type="text" class="inviceText" v-model="isInvice" placeholder="个人或公司全称">
    </div>
    <div class="invice-submit">
      <div class="submitBtn"
           :class="{'active': isInvice.length > 0}" @click="gotoSubmitOrder">确定
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  export default{
    data() {
      return {
        isInvice: ''
      }
    },
    created() {
      this.PublicJs.changeTitleInWx('发票抬头')
      this.isInvice = this.invoice
    },
    computed: {
      ...mapState(['invoice'])
    },
    methods: {
      ...mapMutations(['CONFIRM_INVOICE']),
      gotoSubmitOrder() {
        this.CONFIRM_INVOICE(this.isInvice)
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .invice {
    padding-top: 19px;
  }

  .invice .invice-wrapper {
    padding: 0 17px;
    background: #ffffff;
  }

  .invice .invice-wrapper .inviceText {
    width: 100%;
    height: 39px;
    /*line-height: 39px;*/
    font-size: 14px;
    color: #343434;
    border: none;
  }

  .invice .invice-wrapper .inviceText::-webkit-input-placeholder {
    font-size: 14px;
    color: #c5c5c5;
  }

  .invice .invice-submit {
    margin-top: 25px;
    padding: 0 17px;
  }

  .invice .invice-submit .submitBtn {
    width: 100%;
    height: 42px;
    line-height: 42px;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 2px;
    color: #ffffff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    background: #c1c1c1;
  }

  .invice .invice-submit .active {
    background: #ff8932;
  }
</style>
