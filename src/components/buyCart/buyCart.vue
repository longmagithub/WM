<template>
  <div class="buyCart">
    <!-- 加减 button -->
    <section class="cart-wrapper" v-if="(food.specification.length === 1 && food.state === 1) || shopcart"
             key="cart-wrapper">
      <transition name="move">
        <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
          <span class="inner uxwm-iconfont btn_reduce_normal"></span>
        </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add uxwm-iconfont btn_add_disabled"
           :class="{forbid: !isYingye}"
           @click.stop.prevent="addCart($event,food.specification[0].dishPrice,food.specification[0].packPrice)"></div>
    </section>
    <!-- 多规格 -->
    <section class="specification-wrapper"
             v-else-if="food.specification.length > 1 && food.state === 1"
             key="specification-wrapper">
      <transition name="move">
        <div class="cart-decrease"
             v-show="food.count>0"
             :class="{specification_delete: food.specification.length > 1}"
             @click.stop.prevent="decreaseCart">
          <span class="inner uxwm-iconfont btn_reduce_normal"></span>
          <transition name="fade">
            <p class="show_delete_tip" v-if="showDeleteTip">多规格商品只能去购物车删除哦</p>
          </transition>
        </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add uxwm-iconfont btn_add_disabled"
           :class="{forbid: !isYingye}"
           @click.stop.prevent="showChooseList($event)"></div>
    </section>
    <!-- 售罄 -->
    <section v-else key="sellout-wrapper">
      <div class="sellout">已售完</div>
    </section>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue'
  //  import {loadFromLocal} from '../../common/js/store'
  export default {
    props: {
      food: {
        type: Object
      },
      index: {
        type: Number
      },
      shopcart: {
        type: Number
      },
      isYingye: {
        type: Boolean
      }
    },
    data() {
      return {
        showSpecs: false, // 控制显示 规格
        showDeleteTip: false // 多规格显示 删除 提示
      }
    },
    mounted() {
//      if (loadFromLocal(this.seller.id, 'userName')) {
//        this.food = loadFromLocal(this.seller.id, 'userName')
//      }
//      console.log(loadFromLocal('undefined', 'userName'))
//      console.log(this.food)
    },
    methods: {
      showChooseList(event) {
        if (!this.isYingye) {
          return
        } else {
          this.$emit('showSpecs', event, this.showSpecs, this.food, this.index)
        }
      },
      // 添加到购物车
      addCart(event, price, pack) {
        console.log(event)
        if (!this.isYingye) {
          return
        } else {
          if (!event._constructed) {
            return
          }
          if (!this.food.count && !this.food.shopCartPrice && !this.food.packPrice) {
            Vue.set(this.food, 'count', 1)
            Vue.set(this.food, 'shopCartPrice', price)
            Vue.set(this.food, 'packPrice', pack)
          } else {
            this.food.shopCartPrice = price
            this.food.packPrce = pack
            this.food.count++
          }
        }
        this.$emit('add', event.target) // 给父组件传递被点击元素
      },
      decreaseCart(event) {
        if (this.food.specification.length > 1) {
          this.showDeleteTip = true
          setTimeout(() => {
            this.showDeleteTip = false
          }, 200)
        } else {
          if (!event._constructed) {
            return
          }
          if (this.food.count) {
            this.food.count--
          }
        }
      }
    }
  }
</script>

<style scoped>
  .specification-wrapper,
  .cart-wrapper {
    font-size: 0;
  }

  .sellout {
    padding-right: 6px;
    font-size: 13px;
    color: #8a8888;
  }

  .specification {
    display: inline-block;
    vertical-align: top;
    padding: 5px 6px 6px 4px;
    font-size: 13px;
  }

  .specification .text {
    display: block;
    padding: 0 5px;
    line-height: 22px;
    background: #ff8932;
    color: #ffffff;
    border-radius: 20px;
  }

  .specification-wrapper .cart-decrease,
  .cart-wrapper .cart-decrease {
    position: relative;
    display: inline-block;
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .specification-wrapper .cart-decrease .inner,
  .cart-wrapper .cart-decrease .inner {
    display: inline-block;
    padding: 5px;
    line-height: 22px;
    font-size: 22px;
    color: #ff8932;
    transition: all 0.5s linear;
    transform: rotate(0deg);
  }

  .specification-wrapper .move-enter-active, .specification-wrapper .move-leave-active,
  .cart-wrapper .move-enter-active, .cart-wrapper .move-leave-active {
    transition: all 0.5s linear;
  }

  .specification-wrapper .move-enter, .specification-wrapper .move-leave-active,
  .cart-wrapper .move-enter, .cart-wrapper .move-leave-active {
    opacity: 0;
    transform: translate3d(24px, 0, 0);
  }

  .specification-wrapper .move-enter .inner,
  .specification-wrapper .move-leave-active .inner,
  .cart-wrapper .move-enter .inner,
  .cart-wrapper .move-leave-active .inner {
    transform: rotate(180deg);
  }

  .specification-wrapper .cart-count,
  .cart-wrapper .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 22px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .specification-wrapper .cart-add,
  .cart-wrapper .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 22px;
    font-size: 22px;
    color: #ff8932;
  }

  .cart-wrapper .forbid {
    color: #dddddd;
  }

  .specification-wrapper .forbid .text {
    background: #dddddd;
  }

  .specification-wrapper .specification_delete .inner {
    color: #dddddd;
  }

  .specification-wrapper .show_delete_tip {
    position: absolute;
    font-size: 12px;

  }

  .shop-cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    backdrop-filter: blur(10px);
    opacity: 1;
    background: rgba(7, 17, 27, 0.4);
  }

</style>
