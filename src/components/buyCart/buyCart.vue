<template>
  <div class="buyCart">
    <!-- 加减 button -->
    <section class="cart-wrapper" v-if="(!food.specification.length && !food.sellout) || shopcart" key="cart-wrapper">
      <transition name="move">
        <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
          <span class="inner uxwm-iconfont btn_reduce_normal"></span>
        </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add uxwm-iconfont btn_add_disabled" @click.stop.prevent="addCart($event, food.price)"></div>
    </section>
    <!-- 多规格 -->
    <section v-else-if="food.specification.length && !food.sellout" class="specification-wrapper"
             key="specification-wrapper">
      <section>
        <transition name="move">
          <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
            <span class="inner uxwm-iconfont btn_reduce_normal"></span>
          </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="specification" @click.stop.prevent="showChooseList($event)"><span class="text">选规格</span></div>
      </section>
    </section>
    <!-- 售罄 -->
    <section v-else key="sellout-wrapper">
      <div class="sellout">已售完</div>
    </section>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue'

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
      }
    },
    data() {
      return {
        showSpecs: false // 控制显示 规格
      }
    },
    methods: {
      showChooseList(event) {
        this.$emit('showSpecs', event, this.showSpecs, this.food, this.index)
      },
      addCart(event, price) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          this.food.price = price
          console.log(this.food.price)
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.price = price
          console.log(this.food.price)
          this.food.count++
        }
        this.$emit('add', event.target) // 给父组件传递被点击元素
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
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
    display: inline-block;
    padding: 5px;
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .specification-wrapper .cart-decrease .inner,
  .cart-wrapper .cart-decrease .inner {
    display: inline-block;
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

  .cart-wrapper .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 22px;
    font-size: 22px;
    color: #ff8932;
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
