<template>
  <div class="shopcart_module">
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <span class="uxwm-iconfont btn_shopping_normal" :class="{'highlight':totalCount>0}"></span>
            </div>
            <div class="num" v-show="totalCount">{{totalCount}}</div>
          </div>
          <div class="price-wrapper">
            <div class="desc" v-if="!totalCount">购物车为空</div>
            <div class="price" v-if="totalCount">
              <div class="price-num">￥{{totalPrice}}</div>
              <div class="delivery">另需配送费{{deliveryPrice}}元</div>
            </div>
          </div>
        </div>
        <div class="content-right">
          <div v-if="totalPrice < minPrice" class="pay" :class="payClass">{{payDesc}}</div>
          <div class="pay"
               v-else
               :class="payClass"
               @click="gotopay">{{payDesc}}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <div class="header">
              <h1 class="title">购物车</h1>
              <span class="empty uxwm-iconfont btn_delete_normal" @click="empty">清空</span>
            </div>
            <div class="describe">
              <span class="title">阶梯配送费</span>
              <span class="text">购物车满85免配送费，购物车满85免配送费，购物车满85免配送费</span>
            </div>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price-box">
                  <span>￥<span class="price">{{food.price*food.count}}</span></span>
                </div>
                <div class="buyCart-wrapper">
                  <buyCart @add="addFood" :food="food" :shopcart="1"></buyCart>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  //  import Router from 'vue-router'
  import BScroll from 'better-scroll'
  import buyCart from '../buyCart/buyCart.vue'
  import {saveToLocal} from '../../common/js/store'
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 12,
              count: 1
            }
          ]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      seller: {
        type: Object
      },
      post: null,
      error: null
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      }
    },
    computed: {
      totalPrice() { // 总价格
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount() { // 总个数
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc() { // pay 的描述
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass() { // pay 的class
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    methods: {
      toggleList() { // 打开关闭购物车
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      hideList() { // 关闭购物车
        this.fold = true
      },
      empty() { // 清空购物车
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      addFood(target) { // 接受组件
        this.drop(target)
      },
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeDrop(el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            // 获取小球开始相当于视口的位置 letf 和 top
            let rect = ball.el.getBoundingClientRect()
            // 获取 x 轴偏移; 32是小球落点位置(购物车logo位置) left:32px
            let x = rect.left - 32
            // 获取 y 轴偏移; 22是小球落点位置(购物车logo位置) top: 22px
            let y = -(window.innerHeight - rect.top - 22)
            // v-show 会把元素 设置为none 这里让小球显示
            el.style.display = ''
            // 外层元素做纵向动画
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            // 获取内层元素
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      dropping(el) {
        // 获取 offsetHeight 主动触发浏览器重绘
        // rf 这个变量是不会用的 加下面的注释, eslint不会报错
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          // 在$nextTicl的时候把 状态置回来
          // 这里不能用反引号`` 没有变量 会报错的
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          // 获取内层元素
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
        })
      },
      afterDrop(el) {
        // 动画结束获取 ball; 把show置为false 并 display为none
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      // 去结算
      gotopay() {
        saveToLocal(this.seller.id, 'userName', this.selectFoods)
        this.$router.push({path: '/submitOrder'})
      }
    },
    components: {
      buyCart
    }
  }
</script>

<style scoped>

  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 49px;
  }

  .shopcart .content {
    display: flex;
    background: rgba(71, 71, 73, 0.9);
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);
  }

  .shopcart .content .content-left {
    flex: 1;
  }

  .shopcart .content .content-left .logo-wrapper {
    display: inline-block;
    vertical-align: top;
    position: relative;
    top: -10px;
    margin: 0 20px;
    padding: 8px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    border-radius: 50%;
    background: rgb(89, 89, 91);
  }

  .shopcart .content .content-left .logo-wrapper .logo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    text-align: center;
    background: #474749;
  }

  .shopcart .content .content-left .logo-wrapper .highlight {
    background: #ff8923;
  }

  .shopcart .content .content-left .logo-wrapper .logo .btn_shopping_normal {
    line-height: 40px;
    font-size: 26px;
    color: #68676c;
  }

  .shopcart .content .content-left .logo-wrapper .logo .highlight {
    color: #fff;
  }

  .shopcart .content .content-left .logo-wrapper .num {
    position: absolute;
    top: 0;
    left: 40px;
    box-sizing: border-box;
    padding: 0 4px;
    min-width: 20px;
    height: 12px;
    line-height: 12px;
    text-align: center;
    border-radius: 16px;
    font-weight: 700;
    color: #fff;
    font-size: 9px;
    background: #ff553e;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  }

  .shopcart .content .content-left .price-wrapper {
    display: inline-block;
    vertical-align: top;
  }

  /*.highlight {*/
  /*color: #fff;*/
  /*}*/

  .shopcart .content .content-left .price-wrapper .desc {
    line-height: 49px;
    height: 49px;
    font-size: 14px;
    font-weight: 400;
    color: #d2d2d2;
  }

  .shopcart .content .content-left .price-wrapper .price {
    height: 49px;
    padding: 8px 0;
    color: #ffffff;
    text-align: left;
  }

  .shopcart .content .content-left .price-wrapper .price .price-num {
    margin-bottom: 5px;
    font-size: 17px;
    line-height: 17px;
    font-weight: 500;
  }

  .shopcart .content .content-left .price-wrapper .price .delivery {
    line-height: 11px;
    font-size: 11px;
  }

  .shopcart .content .content-right {
    flex: 0 0 107px;
    width: 107px;
  }

  .shopcart .content .content-right .pay {
    display: block;
    height: 49px;
    line-height: 49px;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    color: #eaeaea;
    background: #6b6b6b;
  }

  .shopcart .content .content-right .highlight {
    background: #ff8932;
    color: #ffffff;
  }

  .shopcart .content .content-right .not-enough {
    color: #eaeaea;
    background: #6b6b6b;
  }

  .shopcart .content .content-right .enough {
    background: #ff8932;
    color: #fff;
  }

  .ball-container .ball {
    position: fixed;
    left: 32px;
    bottom: 22px;
    z-index: 200;
    transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
  }

  .ball-container .ball .inner {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ff8932;
    transition: all 0.4s linear;
  }

  .shopcart .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);
  }

  .shopcart .fold-enter-active, .shopcart .fold-leave-active {
    transition: all 0.5s;
  }

  .shopcart .fold-enter, .shopcart .fold-leave-active {
    transform: translate3d(0, 0, 0);
  }

  .shopcart .shopcart-list .list-header {
    background: #ffffff;
  }

  .shopcart .shopcart-list .list-header .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 33px;
    padding: 0 10px;
    background: #f3f5f7;
  }

  .shopcart .shopcart-list .list-header .header .title {
    /*float: left;*/
    padding-left: 10px;
    height: 20px;
    line-height: 20px;
    font-size: 15px;
    color: #606062;
    border-left: 5px solid #ff8932;
  }

  .shopcart .shopcart-list .list-header .header .empty {
    /*float: right;*/
    font-size: 11px;
    color: #929294;
  }

  .shopcart .shopcart-list .list-header .header .empty:before {
    font-size: 15px;
  }

  .shopcart .shopcart-list .list-header .describe {
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*align-items: center;*/
    height: 32px;
    line-height: 32px;
    padding: 0 20px 0 0;
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
    color: #a2a2a2;
    background: #ffffff;
    border-bottom: 2px solid #f1f1f1
  }

  .shopcart .shopcart-list .list-header .describe .title {
    /*width: 56px;*/
    /*height: 15px;*/
    padding: 2px;
    font-size: 9px;
    color: #ff8932;
    border: 1px solid #ff8932;
    border-radius: 5px;
    margin-right: 18px;
  }

  .shopcart .shopcart-list .list-content {
    padding-left: 10px;
    max-height: 344px;
    overflow: hidden;
    background: #fff;
  }

  .shopcart .shopcart-list .list-content .food {
    position: relative;
    padding: 12px 0;
    /*height: 47px;*/
    box-sizing: border-box;
    border-bottom: 2px solid #f1f1f1;
  }

  .shopcart .shopcart-list .list-content .food:last-child {
    border-bottom: none;
  }

  .shopcart .shopcart-list .list-content .food .name {
    line-height: 24px;
    font-size: 14px;
    color: #343434;
  }

  .shopcart .shopcart-list .list-content .food .price-box {
    position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-size: 11px;
    font-weight: 700;
    color: #ff5740;
  }

  .shopcart .shopcart-list .list-content .food .price-box .price {
    font-size: 15px;
  }

  .shopcart .shopcart-list .list-content .food .buyCart-wrapper {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  .shopcart_module .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    backdrop-filter: blur(10px);
    opacity: 1;
    background: rgba(0, 0, 0, 0.4);
  }

  .shopcart_module .fade-enter-active, .shopcart_module .fade-leave-active {
    transition: all 0.5s;
  }

  .shopcart_module .fade-enter, .shopcart_module .fade-leave-active {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
</style>
