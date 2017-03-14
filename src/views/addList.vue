<template>
  <div class="addlist-wrap">
    <section class="addlist">
      <div class="bg-white add add-available">
        <div class="add-inf off" @click="selectAdd">
          <p class="name-and-phone">张先生<span>18767781322</span></p>
          <p>保亿创艺大1203滨江区南环路3760号保亿创艺大1203滨江区南环路3760号</p>
        </div>
        <div class="add-edit" v-on:click="addNew"></div>
      </div>
    </section>
    <p class="add-un-tip">以下地址超出配送范围</p>
    <section class="addlist">
      <div class="bg-white add add-unusable">
        <div class="add-inf">
          <p class="name-and-phone">张先生<span>18767781322</span></p>
          <p>保亿创艺大1203滨江区南环路3760号</p>
        </div>
        <div class="add-edit" @click="addNew"></div>
      </div>
    </section>
    <div class="bg-white add-new" @click="addNew">
      <iconfont :iconname="icon.new"></iconfont>
      新增收货地址
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        icon: {
          new: 'btn_add_normal'
        },
        nowSelADDId: ''
      }
    },
    methods: {
      // 选择地址
      selectAdd (id) {
        this.nowSelADDId = id
      },
      // 新增地址
      addNew () {
        this.$router.push({
          path: '/addNew'
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  .addlist-wrap {
    position: relative;
    line-height: 1em;

  .add-un-tip {
    padding: 7px 16px;
    font-size: 12px;
    color: #707070;
  }

  .add-new {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 49px;
    line-height: 49px;
    color: #ff8932;
    text-align: center;
  }

  section {

  .add {
    padding: 16px 0;
    display: flex;
    display: -webkit-flex;

  .add-inf {
    margin-left: 16px;
    font-size: 12px;
    flex-grow: 1;

  .name-and-phone {
    margin-bottom: 8px;
    font-size: 14px;

  span {
    margin-left: 7px;
  }

  }
  }

  .add-edit {
    flex-shrink: 0;
    width: 46px;
    background: url('../assets/icon_pen.png') no-repeat center center;
    background-size: 18px 18px;
  }

  }
  .add-available {

  .add-inf {
    padding-left: 37px;
    color: #949494;

  .name-and-phone {
    color: #343434;
  }

  }
  }
  .add-inf.on {
    background: url('../assets/btn_right_normal.svg') no-repeat left center;
    background-size: 20px 20px;
  }

  .add-inf.off {
    background: url('../assets/btn_right_disabled.svg') no-repeat left center;
    background-size: 20px 20px;
  }

  .add-unusable {

  .add-inf {
    color: #c5c5c5;

  .name-and-phone {
    color: #c5c5c5;
  }

  }
  }
  }
  }
</style>
