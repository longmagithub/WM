<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{'current':currentIndex === index}"
            @click="selectMenu(index, $event)">
          <span class="text">{{item.dishTypeName}}</span>
          <span class="category_num" v-if="categoryNum[index] && item.state === 0">{{categoryNum[index]}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="food-list" ref="foodList">
          <h1 class="food-title">{{item.dishTypeName}}</h1>
          <ul>
            <li class="food-item"
                v-for="(food, foodIndex) in item.dishList" :key="foodIndex">
              <div class="icon"><img :src="food.imageUrl" width="52px" height="52px"></div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <span class="desc">{{food.description}}</span>
                <p class="sellNum">已售{{food.dishSpecification[0].saleCount}}份</p>
                <div class="price-wrapper">
                  <div class="price">￥<span class="price-num">{{food.dishSpecification[0].dishPrice}}</span><span
                    class="text" v-if="food.dishSpecification.length > 1">起</span></div>
                  <buyCart ref="buyCart"
                           @add="addFood"
                           @showSpecs="showSpecsFun"
                           :shopId="shopId"
                           :foods="food"
                           :isYingye="isYingye"
                           :index="index"></buyCart>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--<shopcart v-if="isYingye"-->
    <!--ref="shopcart"-->
    <!--:seller="seller"-->
    <!--:selectFoods="selectFoods"-->
    <!--:deliveryPrice="seller.deliveryPrice"-->
    <!--:isYingye="isYingye"-->
    <!--:minPrice="seller.minPrice"></shopcart>-->
    <div class="closeSeller" @click="submitOrder">
      商家休息中，暂不接单
    </div>
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
              <span class="specs-item" v-for="(itme, index) in specs.dishSpecification"
                    :class="{'normal': index === specsIndex}"
                    @click="selectSpecs(index)">{{itme.specificationName}}</span>
            </div>
          </div>
          <div class="specs-price">
            <div class="price-box">￥<span class="text">{{specs.dishSpecification[specsIndex].dishPrice}}</span></div>
            <div class="submit"
                 @click.stop.prevent="addSpecs(
                 specs.dishTypeRelations[0],
                 specs.dishId,
                 specs.dishSpecification[specsIndex].specificationId,
                 specs.name,
                 specs.dishSpecification[specsIndex].dishPrice,
                 specs.dishSpecification[specsIndex].specificationName,
                 specs.dishSpecification[specsIndex].packPrice,
                 $event)">
              选好了
            </div>
          </div>
        </div>
      </transition>
    </section>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart'
  import buyCart from '../buyCart/buyCart.vue'
  import {getStore} from '../../common/js/util'
  //  import {loadFromLocal} from '../../common/js/store'
  const SUCCESS_OK = true
  export default {
    props: {
      seller: {
        type: Object
      },
      isYingye: {
        type: Boolean
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
        specsIndex: 0,  // 规格的index
        shopId: getStore('user').shopId,
        categoryNum: [], // 商品类型右上角已加入购物车的数量
        totalPrice: 0, // 购物车总结
        cartFoodList: [], // 购物车商品列表
        showCartList: false// 显示购物车列表
      }
    },
    created() {
      // 菜谱信息
//      this.getDishList()
      const data = {
        shopId: this.shopId,
        customerId: getStore('user').customerId
      }
      console.log(data)
      this.axios.get(`/br/dish/list${this.PublicJs.createParams(data)}`).then((res) => {
        res = res.data
        console.log(res)
        if (res.success === SUCCESS_OK) {
          this.goods = res.data.dishesList
          console.log(this.goods)
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    computed: {
      // 检测 vuex 中cartList
      ...mapState(['cartList']),
      // 监听cartList变化 更新当前商铺的购物车信息shopCart 同时返回一个新的对象 因为组件buyCart需要监听shopCart的变化
      shopCart: function () {
        console.log('监听cartList变化')
        return Object.assign({}, this.cartList[this.shopId])
      },
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
          good.dishList.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    methods: {
      ...mapMutations(['ADD_CART', 'REDUCE_CART']),
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
        this.specsIndex = 0
      },
      // 子组件传来方法
      showSpecsFun(event, foods, toggleSpecs) {
        this.showSpecs = !toggleSpecs
        this.specs = foods
      },
      // 记录当前所选规格的索引值
      selectSpecs(index) {
        this.specsIndex = index
      },
      // 多规格加入购车
      // 参数列表：分类id，单个菜id，规格id，单个菜名字，单个菜价格，单个菜规格，饭盒费
      addSpecs(categoryId, itemId, foodId, name, price, specs, packPrice, event) {
        this.ADD_CART({shopid: this.shopId, categoryId, itemId, foodId, name, price, specs, packPrice})
        this.closeSpesc()
      },
      /**
       * 初始化和shopCart变化时，重新获取购物车改变过的数据，赋值 categoryNum，totalPrice，cartFoodList，整个数据流是自上而下的形式，所有的购物车数据都交给vuex统一管理，包括购物车组件中自身的商品数量，使整个数据流更加清晰
       */
      initCategoryNum() {
        // 左侧食品列表当前分类中已加入购物车的商品数量
        let newArr = []
        let cartFoodNum = 0
        // 购物车总共的价格
        this.totalPrice = 0
        // 购物车中所有商品的详细信息列表
        this.cartFoodList = []
        this.goods.forEach((item, index) => {
          console.log('↓goods 每个 item↓')
          console.log(item)
          console.log(this.shopCart)
          console.log(this.shopCart[item.dishList])
          if (this.shopCart && this.shopCart[item.dishList[0].dishTypeId]) {
            let num = 0
            console.log(this.shopCart[item.dishList[0].dishTypeId])
            Object.keys(this.shopCart[item.dishList[0].dishTypeId]).forEach(itemid => {
              Object.keys(this.shopCart[item.dishList[0].dishTypeId][itemid]).forEach(foodid => {
                let foodItem = this.shopCart[item.dishList[0].dishTypeId][itemid][foodid]
                num += foodItem.num
                if (item.state === 0) {
                  this.totalPrice += foodItem.num * foodItem.price
                  if (foodItem.num > 0) {
                    this.cartFoodList[cartFoodNum] = {}
                    this.cartFoodList[cartFoodNum].category_id = item.dishList[0].dishTypeId
                    this.cartFoodList[cartFoodNum].item_id = itemid
                    this.cartFoodList[cartFoodNum].food_id = foodid
                    this.cartFoodList[cartFoodNum].num = foodItem.num
                    this.cartFoodList[cartFoodNum].price = foodItem.price
                    this.cartFoodList[cartFoodNum].name = foodItem.name
                    this.cartFoodList[cartFoodNum].specs = foodItem.specs
                    cartFoodNum++
                  }
                }
              })
            })
            newArr[index] = num
          } else {
            newArr[index] = 0
          }
        })
        this.totalPrice = this.totalPrice.toFixed(2)
        this.categoryNum = newArr.concat([])
        console.log(this.categoryNum)
      },
      // 菜谱信息
      getDishList() {
        const data = {
          shopId: this.shopId,
          customerId: getStore('user').customerId
        }
        console.log(data)
        this.axios.get(`/br/dish/list${this.PublicJs.createParams(data)}`).then((res) => {
          res = res.data
          console.log(res)
          if (res.success === SUCCESS_OK) {
            this.goods = res.data.dishesList
            console.log(this.goods)
            this.$nextTick(() => {
              this._initScroll()
              this._calculateHeight()
            })
          }
        })
      },
      // 商户信息
      getShopDetail() {
        // this.axios.get(`${this.api}/br/shop/detail?shopId=${this.shopId}`).then((res) => {
        // 接口通了  注释下面的 打开上面的
        this.axios.get('./api/seller').then((res) => {
          res = res.data
          if (res.success === SUCCESS_OK) {
            this.shopDetail = res.data
            // 排序
            res.data.dispatching.fees = this.PublicJs.bubbleSort(res.data.dispatching.fees,
              res.data.dispatching.fees.price)
            this.seller = Object.assign({}, this.seller, res.data)
            this.PublicJs.changeTitleInWx(this.seller.name.split('（')[0])
          }
        })
      },
      submitOrder() {
        this.$router.push({path: '/submitOrder'})
      }
    },
    watch: {
      // 监听shopCart的变化
      shopCart: function (value) {
        this.initCategoryNum()
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
    top: 160px;
    bottom: 0px;
    /*margin-bottom: 49px;*/
    padding-bottom: 50px;
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
    font-size: 17px;
  }

  .food-item .content .price-wrapper .price .text {
    padding-left: 5px;
    font-size: 9px;
    color: #6c6c6c;
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

  .goods .closeSeller {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 49px;
    line-height: 49px;
    text-align: center;
    color: #ffffff;
    background: rgba(71, 71, 73, 0.8);
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
</style>
