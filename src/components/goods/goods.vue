<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item">
          <span class="text">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">食品列表</div>
  </div>
</template>
<script type="text/ecmascript-6">
  const ERR_OK = 0
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: []
      }
    },
    created() {
      this.axios.get('./api/goods').then((response) => {
        response = response.data
        console.log(response)
        if (response.errno === ERR_OK) {
          this.goods = response.data
        }
      })
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    position: absolute;
    top: 140px;
    bottom: 49px;
    width: 100%;
    overflow: hidden;
  }

  .menu-wrapper {
    flex: 0 0 85px;
    width: 85px;
    background: #f8f8f8;
  }
  .menu-wrapper .menu-item {
    display: table;
    height: 51px;
    width: 56px;
    padding: 0 12px;
  }

</style>
