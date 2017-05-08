<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{'current':currentIndex === index}"
            @click="selectMenu(index, $event)">
          <span class="text">{{item.dishTypeName}}</span>
          <span class="category_num" v-if="categoryNum[index]">{{categoryNum[index]}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="food-list" ref="foodList">
          <h1 class="food-title"><span class="name">{{item.dishTypeName}}</span><span
            class="desc">{{item.dishTypeDescription
            }}</span></h1>
          <ul>
            <li class="food-item"
                v-for="(food, foodIndex) in item.dishList" :key="foodIndex">
              <div class="icon">
                <img v-if="food.imageUrl" :src="food.imageUrl" width="52px" height="52px">
                <img v-else src="../../assets/logo.png" width="52px" height="52px">
              </div>
              <div class="content">
                <div class="name_box"><span class="name">{{food.name}}</span></div>
                <span class="desc">{{food.description}}</span>
                <p class="sellNum" v-if="food.dishSpecification[0].saleCount">
                  已售{{food.dishSpecification[0].saleCount}}份</p>
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
    <div class="shopcart_module" v-show="isYingye">
      <div class="shopcart">
        <div class="content" @click="toggleCartList">
          <div class="content-left">
            <div class="logo-wrapper">
              <div class="logo" :class="{'highlight': totalNum > 0}">
                <span class="uxwm-iconfont btn_shopping_normal" :class="{'highlight': totalNum > 0}"></span>
              </div>
              <div class="num" v-show="totalNum">{{totalNum}}</div>
            </div>
            <div class="price-wrapper">
              <div class="desc" v-if="!totalNum">购物车为空</div>
              <div class="price" v-if="totalNum">
                <div class="price-num">￥{{allPrice | toFixedFil}}</div>
                <!--<div class="delivery">{{deliveryDesc}}</div>-->
              </div>
            </div>
          </div>
          <div class="content-right">
            <div class="pay"
                 v-if="allPrice >= minPrice && allPrice > 0"
                 :class="payClass"
                 @click="gotopay">{{payDesc}}
            </div>
            <div v-else class="pay" :class="payClass">{{payDesc}}</div>
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
                <span class="empty uxwm-iconfont btn_delete_normal" @click="clearToast">清空</span>
              </div>
              <div class="describe" v-if="seller.activity">
                <!--<span class="title">阶梯配送费</span>-->
                <span class="text" v-for="item in seller.activity">{{item.title}} </span>
                <!--<span class="text" v-for="item in seller.dispatching.fees">满{{item.price}}元运费{{item.fee}} </span>-->
              </div>
            </div>
            <div class="list-content" ref="listContent">
              <ul>
                <li class="food" v-for="(item, index) in cartFoodList" v-if="item.num > 0" :key="index">
                  <div class="name-wap">
                    <div class="name-box">
                      <span class="name">{{item.name}}</span>
                      <span class="specs" v-if="item.specs">({{item.specs}})</span>
                    </div>
                  </div>
                  <div class="price-box">
                    <span>￥<span class="price">{{item.price * item.num | toFixedFil}}</span></span>
                  </div>
                  <div class="buyCart-wrapper">
                    <div class="cart-decrease inner uxwm-iconfont btn_reduce_normal"
                         @click.stop.prevent="removeOutCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs, item.packingFee)">
                    </div>
                    <div class="cart-count">{{item.num}}</div>
                    <div class="cart-add uxwm-iconfont btn_add_disabled"
                         @click.stop.prevent="addToCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs, item.packingFee)"></div>
                  </div>
                </li>
                <li class="food" v-if="totalPack">
                  <span class="name">餐盒</span>
                  <div class="price-box">
                    <span>￥<span class="price">{{totalPack}}</span></span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
      <transition name="fade">
        <div class="list-mask" @click="hideList" v-show="listShow">

        </div>
      </transition>
    </div>
    <div class="closeSeller" v-show="!isYingye">
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
                 specs.dishSpecification[specsIndex].packPrice)">
              选好了
            </div>
          </div>
        </div>
      </transition>
    </section>
    <div class="toast" v-if="isToastText">
      <div class="toast-wap">
        <p class="text">{{toastText}}</p>
        <p class="btn"><span class="yes" @click="clearCart">确认</span><span class="no" @click="clearToast">取消</span></p>
      </div>
    </div>
    <toast :show="toastShow" :text="toastText1"></toast>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import BScroll from 'better-scroll'
  import buyCart from '../../components/buyCart/buyCart.vue'
  import {setStore, getStore} from '../../common/utils/util'
  import toast from '../../components/toast.vue'
  const SUCCESS_OK = true
  export default {
    props: {
      seller: {
        type: Object,
        default: {}
      },
      minPrice: {
        type: Number,
        default: 0
      }
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
        toastShow: false,
        toastText1: '',
        goods: [],
        specs: {}, // 规格
        falg: '',
        isYingye: true, // 是否营业 默认是 false 关店
        listHeight: [], // 存放foodList 区间的高度的数组
        scrollY: 0, // 当前滑动的位置
        selectedFood: {},
        showSpecs: false,
        specsIndex: 0,  // 规格的index
        shopId: '',
        customerId: '',
        categoryNum: [], // 商品类型右上角已加入购物车的数量
        totalPrice: 0, // 购物车总结
        cartFoodList: [], // 购物车商品列表
        showCartList: false, // 显示购物车列表
        totalPack: 0, // 餐盒费
        allPrice: 0, // 总价格
        toastText: '清空购物车', // 提示
        isToastText: false, // 控制 提示
        isAjax: false,
        activity: [], // 活动数组
        hoursArr: [], // 营业时间数组
        beginTime: new Date(), // 开始时间
        endTime: new Date() // 结束时间
      }
    },
    created() {
      this.shopId = getStore('userInfo').shopId
      this.customerId = getStore('userInfo').customerId
      this.hoursArr = this.seller.hours
      // 初始化购物车，获取存储在localStorage中的购物车商品信息
      this.INIT_BUYCART()
      const data = {
        shopId: this.shopId,
        customerId: this.customerId
      }
      this.axios.get(`/br/dish/list${this.PublicJs.createParams(data)}`).then((res) => {
        res = res.data
        if (res.success === SUCCESS_OK) {
          if (res.data.dishesList === null) {
            this.toggleToast(1, res.message)
          } else {
            this.isAjax = true
            this.goods = res.data.dishesList
            this.$nextTick(() => {
              this.initCategoryNum()
              this._initScroll()
              this._calculateHeight()
            })
          }
        }
      })
      // 门店状态
      this.getShopState()
//      this.getShopDetail()
    },
    mounted() {
    },
    computed: {
      // 检测 vuex 中cartList
      ...mapState(['cartList']),
      // 监听cartList变化 更新当前商铺的购物车信息shopCart 同时返回一个新的对象 因为组件buyCart需要监听shopCart的变化
      shopCartList: function () {
        return Object.assign({}, this.cartList[this.shopId])
      },
      // 判决区间所对应的位置
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      // 购物车中总共商品的数量
      totalNum: function () {
        let num = 0
        this.cartFoodList.forEach(item => {
          num += item.num
        })
        return num
      },
      listShow() {
        if (!this.totalNum) {
          this.showCartList = true
          return false
        }
        let show = !this.showCartList
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
      },
      // pay 的class
      payClass() {
        if (this.allPrice >= this.minPrice && this.allPrice > 0) {
          return 'enough'
        } else {
          return 'not-enough'
        }
      },
      // 配送费描述
      deliveryDesc() {
        if (this.isAjax) {
//        const fees = this.seller.dispatching.fees
          for (let i = 0; i < this.seller.dispatching.fees.length; i++) {
            if (this.allPrice >= this.seller.dispatching.fees[i].price) {
              let totalPack = this.totalPack
              let feesPrice = this.seller.dispatching.fees[i].fee
              let allPrice = this.allPrice
              this.USER_PRICE({totalPack, feesPrice, allPrice})
//              setStore('userPrice', [totalPack, feesPrice, allPrice])
              return `另需要配送费${this.seller.dispatching.fees[i].fee}元`
            }
          }
        }
      },
      // pay 的描述
      payDesc() {
        if (this.allPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.allPrice < this.minPrice) {
          let diff = this.minPrice - this.allPrice
          return `还差￥${diff.toFixed(2)}元起送`
        } else {
          return '去结算'
        }
      }
    },
    methods: {
      ...mapMutations(['ADD_CART', 'REDUCE_CART', 'CLEAR_CART', 'INIT_BUYCART', 'USER_PRICE']),
      // 门店门店状态
      getShopState() {
        this.axios.get(`/br/shop/status?shopId=${this.shopId}&customerId=${this.customerId}`).then((res) => {
          res = res.data
          if (res.success) {
            // state === 1 开店 然后判断是否在营业时间
            if (res.data.state === 1) {
              this.$nextTick(() => {
                // 当前小时
                let activeTime = Date.parse(new Date())
                for (let i = 0; i < this.hoursArr.length; i++) {
                  // 开始时间
                  let beginTimeHours = parseFloat(this.hoursArr[i].beginTime.split(':')[0])
                  let beginTimeMinutes = parseFloat(this.hoursArr[i].beginTime.split(':')[1])
                  this.beginTime = new Date(this.beginTime).setHours(beginTimeHours)
                  this.beginTime = new Date(this.beginTime).setMinutes(beginTimeMinutes)
                  this.beginTime = new Date(this.beginTime).setSeconds(0, 0)
                  // 结束时间
                  let endTimeHours = parseFloat(this.hoursArr[i].endTime.split(':')[0])
                  let endTimeMinutes = parseFloat(this.hoursArr[i].endTime.split(':')[1])
                  this.endTime = new Date(this.endTime).setHours(endTimeHours)
                  this.endTime = new Date(this.endTime).setMinutes(endTimeMinutes)
                  this.endTime = new Date(this.endTime).setSeconds(0, 0)
                  if (activeTime >= this.beginTime && activeTime <= this.endTime) {
                    this.isYingye = true
                    return
                  } else {
                    this.isYingye = false
                    this.toggleToast(1, '商家关闭')
                  }
                }
              })
            } else {
              this.toggleToast(!res.data.state, '商家关闭')
              this.isYingye = false
            }
          }
        })
      },
      // 初始化滚动
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          deceleration: 0.0008,
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
      addSpecs(categoryId, itemId, foodId, name, price, specs, packingFee) {
        this.ADD_CART({shopid: this.shopId, categoryId, itemId, foodId, name, price, specs, packingFee})
        this.closeSpesc()
      },
      // 加入购物车
      // 参数列表：分类id，单个菜id，规格id，单个菜名字，单个菜价格，单个菜规格，饭盒费
      addToCart(categoryId, itemId, foodId, name, price, specs, packingFee) {
        this.ADD_CART({shopid: this.shopId, categoryId, itemId, foodId, name, price, specs, packingFee})
      },
      // 移除购物车
      // 参数列表：商品id，分类id，菜品id，规格id，菜品名字，菜品价格，菜品规格，饭盒费
      removeOutCart(categoryId, itemId, foodId, name, price, specs, packingFee) {
        this.REDUCE_CART({shopid: this.shopId, categoryId, itemId, foodId, name, price, specs, packingFee})
      },
      // 初始化和shopCart变化时，重新获取购物车改变过的数据，赋值categoryNum，totalPrice，cartFoodList，整个数据流是自上而下的形式，
      // 所有的购物车数据都交给vuex统一管理，包括购物车组件中自身的商品数量，使整个数据流更加清晰
      initCategoryNum() {
        // 左侧食品列表当前分类中已加入购物车的商品数量
        let newArr = []
        let cartFoodNum = 0
        // 购物车总共的价格
        this.totalPrice = 0 // 菜品
        this.totalPack = 0 // 餐盒
        this.allPrice = 0
        // 购物车中所有商品的详细信息列表
        this.cartFoodList = []
        this.goods.forEach((item, index) => {
          if (this.shopCartList && this.shopCartList[item.dishList[0].dishTypeRelations[0]]) {
            let num = 0
            Object.keys(this.shopCartList[item.dishList[0].dishTypeRelations[0]]).forEach(itemid => {
              Object.keys(this.shopCartList[item.dishList[0].dishTypeRelations[0]][itemid]).forEach(foodid => {
                let foodItem = this.shopCartList[item.dishList[0].dishTypeRelations[0]][itemid][foodid]
                num += foodItem.num
//                if (item.state === 0) {
                this.totalPack += foodItem.num * foodItem.packingFee
                this.totalPack = parseFloat(this.totalPack.toFixed(2))
                this.totalPrice += foodItem.num * foodItem.price
                this.allPrice = parseFloat(this.totalPrice.toFixed(2)) + parseFloat(this.totalPack.toFixed(2))
                if (foodItem.num > 0) {
                  this.cartFoodList[cartFoodNum] = {}
                  this.cartFoodList[cartFoodNum].category_id = item.dishList[0].dishTypeRelations[0]
                  this.cartFoodList[cartFoodNum].item_id = itemid
                  this.cartFoodList[cartFoodNum].food_id = foodid
                  this.cartFoodList[cartFoodNum].num = foodItem.num
                  this.cartFoodList[cartFoodNum].price = foodItem.price
                  this.cartFoodList[cartFoodNum].name = foodItem.name
                  this.cartFoodList[cartFoodNum].specs = foodItem.specs
                  this.cartFoodList[cartFoodNum].packingFee = foodItem.packingFee
                  cartFoodNum++
                }
//                }
              })
            })
            newArr[index] = num
          } else {
            newArr[index] = 0
          }
        })
        this.totalPrice = this.totalPrice.toFixed(2)
        this.categoryNum = newArr.concat([])
      },
      // toggle toast
      toggleToast(show, text) {
        if (show === true || show === 1) {
          this.toastShow = !this.toastShow
          this.toastText1 = text
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.toastShow = !this.toastShow
          }, 1000)
        } else {
          return
        }
      },
      // 商户信息（没有执行）
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
          }
        })
      },
      // 控制显示购物车中已选商品列表
      toggleCartList() {
        this.showCartList = !this.showCartList
      },
      // 清空提示
      clearToast() {
        this.isToastText = !this.isToastText
      },
      // 清空当前商铺的购物车信息
      clearCart() {
        this.isToastText = !this.isToastText
        this.toggleCartList()
        this.CLEAR_CART(this.shopId)
      },
      // 关闭购物车
      hideList() {
        this.showCartList = !this.showCartList
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
        setStore('userPrice', [this.totalPack, 0, this.allPrice])
        this.$router.push({
          path: '/submitOrder',
          query: {
            shopId: this.shopId,
            customerId: this.customerId
          }
        })
      }
    },
    watch: {
      // 监听shopCart的变化
      shopCartList: function (value) {
        this.initCategoryNum()
      }
    },
    components: {
      buyCart,
      toast
    },
    filters: {
      // 保留2位
      toFixedFil(val) {
        return val.toFixed(2)
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    position: absolute;
    top: 90px;
    bottom: 0px;
    /*margin-bottom: 49px;*/
    padding-bottom: 50px;
    width: 100%;
    overflow: hidden;
  }

  .goods .toast {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 111;
    /*text-align: center;*/
    /*font-size: 18px;*/
    /*color: #333333;*/
    opacity: 1;
    background: rgba(0, 0, 0, 0.4);
  }

  .goods .toast .toast-wap {
    position: absolute;
    top: 30%;
    left: 15%;
    width: 70%;
    height: 95px;
    background: #fff;
    border-radius: 10px;
  }

  .goods .toast .text {
    box-sizing: border-box;
    height: 55px;
    line-height: 55px;
    text-align: center;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 2px;
    color: #2b2a2e;
    border-bottom: 1px solid #e3e3e3;
  }

  .goods .toast .btn {
    height: 40px;
    line-height: 40px;
  }

  .goods .toast .btn span {
    box-sizing: border-box;
    display: inline-block;
    width: 50%;
    text-align: center;
  }

  .goods .toast .btn .yes {
    border-right: 1px solid #e3e3e3;
  }

  .menu-wrapper {
    flex: 0 0 85px;
    width: 85px;
    background: #f8f8f8;
  }

  .menu-wrapper .menu-item {
    position: relative;
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
    text-align: left;
    border-bottom: 1px solid #f1f1f1;
    font-size: 12px;
  }

  .menu-wrapper .menu-item:last-child .text {
    border-bottom: none;
  }

  .menu-wrapper .menu-item .category_num {
    position: absolute;
    top: 6px;
    right: 4px;
    box-sizing: border-box;
    padding: 2px 4px;
    height: 10px;
    line-height: 8px;
    text-align: center;
    color: #fff;
    font-size: 9px;
    background: #ff553e;
    border-radius: 10px;
  }

  .menu-wrapper .current .text {
    border-bottom: none;
  }

  .foods-wrapper {
    flex: 1;
    background: #ffffff;
  }

  .foods-wrapper > ul {
  }

  .foods-wrapper .food-list:last-child {
    box-sizing: border-box;
    padding-bottom: 300px;
  }

  .food-title {
    display: flex;
    padding-left: 11px;
    height: 33px;
    line-height: 33px;
    border-left: 4px solid #dddddd;
    background: #f5f5f5;
    font-size: 14px;
    font-weight: 400;
    color: #676767;
  }

  .food-title .desc .name {
    display: inline-block;
    line-height: 33px;
  }

  .food-title .desc {
    display: inline-block;
    margin-left: 4px;
    width: 100px;
    font-size: 10px;
    color: #a4a4a4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .food-item {
    display: flex;
    position: relative;
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
    position: absolute;
    margin-right: 12px;
  }

  .food-item .icon img {
    border-radius: 4px;
  }

  .food-item .content {
    flex: 1;
    box-sizing: border-box;
    padding-left: 64px;
  }

  .food-item .content .name_box {
    width: 100%;
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    /*display: -webkit-box;*/
    /*-webkit-line-clamp: 2;*/
    /*-webkit-box-orient: vertical;*/
  }

  .food-item .content .name_box .name {
    line-height: 20px;
    /*height: 40px;*/
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
    display: flex;
    align-items: center;
    height: 49px;
    /*padding: 8px 0;*/
    color: #ffffff;
    text-align: left;
  }

  .shopcart .content .content-left .price-wrapper .price .price-num {
    /*margin-bottom: 5px;*/
    font-size: 17px;
    line-height: 17px;
    font-weight: 500;
  }

  .shopcart .content .content-left .price-wrapper .price .delivery {
    line-height: 11px;
    font-size: 11px;
  }

  .shopcart .content .content-right {
    flex: 0 0 112px;
    width: 112px;
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
    min-height: 32px;
    line-height: 32px;
    padding: 0 20px 0 0;
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: wrap;
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

  .shopcart .shopcart-list .list-content .food .name-wap {
    box-sizing: border-box;
    justify-content: flex-start;
    display: flex;
    position: relative;
    width: 100%;
    padding-right: 150px;
  }

  .shopcart .shopcart-list .list-content .food .name-wap .name-box {
    position: relative;
    width: 100%;
    padding-right: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .shopcart .shopcart-list .list-content .food .name-wap .name-box .name {
    width: 100%;
    line-height: 24px;
    font-size: 14px;
    color: #343434;
  }

  .shopcart .shopcart-list .list-content .food .name-wap .name-box .specs {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    line-height: 24px;
    margin-left: 4px;
    font-size: 14px;
    color: #a2a2a2;
  }

  .shopcart .shopcart-list .list-content .food .price-box {
    position: absolute;
    right: 100px;
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

  .shopcart .shopcart-list .list-content .food .buyCart-wrapper .cart-add,
  .shopcart .shopcart-list .list-content .food .buyCart-wrapper .cart-decrease {
    display: inline-block;
    padding: 6px;
    line-height: 22px;
    font-size: 22px;
    color: #ff8932;
  }

  .shopcart .shopcart-list .list-content .food .buyCart-wrapper .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 22px;
    text-align: center;
    font-size: 14px;
    color: rgb(147, 153, 159);
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
