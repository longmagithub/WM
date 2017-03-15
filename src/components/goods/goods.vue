<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{'current':currentIndex === index}"
            @click="selectMenu(index,$event)">
          <span class="text">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="food-list" ref="foodList">
          <h1 class="food-title">{{item.name}}</h1>
          <ul>
            <li v-for="(food, index) in item.foods" class="food-item">
              <div class="icon"><img :src="food.icon" width="52px" height="52px"></div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <span class="desc">{{food.description}}</span>
                <p class="sellNum">已售{{food.sellCount}}份</p>
                <div class="price-wrapper">
                  <div class="price">￥<span class="price-num">{{food.price}}</span></div>
                  <buyCart @add="addFood" @showSpecs="showSpecsFun" ref="buyCart" :food="food" :index="index"></buyCart>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart"
              :seller="seller"
              :selectFoods="selectFoods"
              :deliveryPrice="seller.deliveryPrice"
              :minPrice="seller.minPrice"></shopcart>
    <transition name="fade">
      <div class="shop-cover" @click="closeSpesc" v-if="showSpecs"></div>
    </transition>
    <!-- 规格弹窗 -->
    <section>
      <transition name="specs">
        <div class="specs-wrapper" v-if="showSpecs">
          <i class="close uxwm-iconfont btn_close_normal" @click="closeSpesc"></i>
          <h2 class="specs-title">{{specs.name}}</h2>
          <div class="specs-content">
            <p class="text">规格</p>
            <div class="content">
              <span class="specs-item" v-for="(itme, index) in specs.specification"
                    :class="{'normal': index === specsIndex}"
                    @click="selectSpecs(index)">{{itme
                .name}}</span>
            </div>
          </div>
          <div class="specs-price">
            <div class="price-box">￥<span class="text">{{specs.specification[specsIndex].dishPrice}}</span></div>
            <div class="submit"
                 @click.stop.prevent="submit(specs.specification[specsIndex].id, specs.specification[specsIndex].name, specs.specification[specsIndex].dishPrice, specs.specification[specsIndex].packPrice)">
              选好了
            </div>
          </div>
        </div>
      </transition>
    </section>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart'
  import buyCart from '../buyCart/buyCart.vue'
  const ERR_OK = 0

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        specs: {}, // 规格
        falg: '',
        listHeight: [], // 存放foodList 区间的高度的数组
        scrollY: 0, // 当前滑动的位置
        selectedFood: {},
        showSpecs: false,
        dishPrice: '',
        normal: false,
        specsIndex: 0,  // 规格的index
        el: {}, // 单元素
        typeNum: 0
      }
    },
    created() {
      this.axios.get('./api/goods').then((response) => {
        response = response.data
        if (response.errno === ERR_OK) {
          this.goods = response.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    computed: {
      currentIndex() { // 判决区间所对应的位置
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods() {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    methods: {
      // 初始化滚动
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true
        })
        // 通过foodsScroll 监听个'scroll'事件 在scroll滚动的时候能把实时的位置给暴露出来
        // 事件回调函数的参数是pos,  pos就是位置（有x、y坐标）
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      // 获取区间高度
      _calculateHeight() {
        let foodList = this.$refs.foodList
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      // menu 改变列表位置
      selectMenu(index, event) {
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodList
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      // 接受子组件传来的方法
      addFood(target) {
        this._drop(target)
      },
      _drop(target) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target)
        })
      },
      // 关闭 弹窗
      closeSpesc() {
        this.showSpecs = false
      },
      // 子组件传来方法
      showSpecsFun(event, toggleSpecs, content, falg) {
        this.el = event
        this.showSpecs = !toggleSpecs
        this.specs = content
        this.falg = falg
      },
      // 改变 规格价格
      selectSpecs(index) {
        this.specsIndex = index
      },
      // 提交
      submit(id, name, dishPrice, packPrice) {
        console.log(id, name, dishPrice, packPrice)
        console.log(this.selectFoods)
        this.$nextTick(() => {
          this.$refs.buyCart[this.falg].addCart(this.el, dishPrice)
        })
        this.showSpecs = false
      }
    },
    components: {
      shopcart,
      buyCart
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    position: absolute;
    top: 161px;
    bottom: 0px;
    margin-bottom: 49px;
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
    width: 100%;
  }

  .menu-wrapper .current {
    box-sizing: border-box;
    position: relative;
    z-index: 10;
    background: #ffffff;
    font-weight: 600;
    border-left: 4px solid #ff6651;
  }

  .menu-wrapper .menu-item .text {
    display: table-cell;
    vertical-align: middle;
    width: 100%;
    padding: 0 15px;
    text-align: center;
    border-bottom: 1px solid #f1f1f1;
    font-size: 12px;
  }

  .menu-wrapper .menu-item:last-child .text {
    border-bottom: none;
  }

  .menu-wrapper .current .text {
    border-bottom: none;
  }

  .foods-wrapper {
    flex: 1;
    background: #ffffff;
  }

  .food-title {
    padding-left: 11px;
    width: 100%;
    height: 33px;
    line-height: 33px;
    border-left: 4px solid #dddddd;
    background: #f5f5f5;
    font-size: 14px;
    font-weight: 400;
    color: #676767;
  }

  .food-item {
    display: flex;
    padding: 20px 12px 15px 0px;
    margin-left: 10px;
    border-bottom: 1px solid #f1f1f1;
  }

  .food-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }

  .food-item .icon {
    flex: 0 0 52px;
    margin-right: 12px;
  }

  .food-item .icon img {
    border-radius: 4px;
  }

  .food-item .content {
    flex: 1;
    line-height: 1em;
  }

  .food-item .content .name {
    font-size: 15px;
    color: #343434;
    font-weight: 600;
    margin-bottom: 9px;
  }

  .food-item .content .desc {
    overflow: hidden;

    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 10px;
    padding-right: 70px;
    line-height: 16px;
    color: #c9c9c9;
  }

  .food-item .content .sellNum {
    margin-top: 7px;
    font-size: 11px;
    color: #6c6c6c;
  }

  .food-item .content .price-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
  }

  .food-item .content .price-wrapper .price {
    font-size: 11px;
    color: #ff5740;
  }

  .food-item .content .price-wrapper .price .price-num {
    font-size: 16px;
  }

  .shop-cover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 60;
    backdrop-filter: blur(10px);
    opacity: 1;
    background: rgba(0, 0, 0, 0.4);
  }

  .goods .fade-enter-active, .goods .fade-leave-active {
    transition: all 0.3s;
  }

  .goods .fade-enter, .goods .fade-leave-active {
    opacity: 0;
    background: rgba(0, 0, 0, 0.4);
  }

  .specs-wrapper {
    position: fixed;
    top: 30%;
    left: 10%;
    width: 80%;
    min-height: 150px;
    z-index: 70;
    border-radius: 12px;
    background: #ffffff;
    opacity: 1;
    padding-top: 19px;
  }

  .btn_close_normal:before {
    position: absolute;
    top: 7px;;
    right: 12px;
    padding: 3px;
    font-size: 16px;
    color: #898989;
  }

  .specs-wrapper .specs-title {
    margin-bottom: 7px;
    text-align: center;
    font-weight: 700;
    font-size: 15px;
    color: #343434;
  }

  .specs-wrapper .specs-content {
    padding: 0 15px;
  }

  .specs-wrapper .specs-content .text {
    margin-bottom: 9px;
    line-height: 18px;
    font-size: 12px;
    color: #565656;
  }

  .specs-wrapper .specs-content .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: space-around;
    min-height: 53px;
    line-height: 0em;
  }

  .specs-wrapper .specs-content .content .specs-item {
    font-size: 12px;
    margin: 3px 17px 12px 0px;
    padding: 0px 5px;
    height: 22px;
    line-height: 22px;
    color: #898989;
    border: 1px solid #898989;
    border-radius: 11px;
  }

  .specs-wrapper .specs-content .content .normal {
    color: #ff8932;
    border: 1px solid #ff8932;
  }

  .specs-wrapper .specs-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 15px;
    width: 100%;
    height: 47px;
    font-size: 11px;
    color: #ff5740;
    background: #f5f5f5;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }

  .specs-wrapper .specs-price .price-box .text {
    font-size: 16px;
  }

  .specs-wrapper .specs-price .submit {
    box-sizing: border-box;
    padding-left: 4px;
    width: 68px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #ff8932;
    color: #ffffff;
    letter-spacing: 2px;
    border-radius: 5px;
  }

  .goods .specs-enter-active, .goods .specs-leave-active {
    transition: all 0.5s;
  }

  .goods .specs-enter, .goods .specs-leave-active {
    opacity: 0;
    background: #ffffff;
  }
</style>
