<template>
  <div class="buyCart">
    <!-- 加减 button -->
    <section class="cart-wrapper"
             v-if="(foods.dishSpecification.length === 1 && foods.state === 1 && (foods.dishSpecification[0].tastes.length === 0))"
             key="cart-wrapper">
      <transition name="move">
        <div class="cart-decrease"
             v-show="foodNum > 0"
             @click="removeOutCart(
             foods.dishTypeRelations[0],
             foods.dishId,
             foods.dishSpecification[0].specificationId,
             foods.name,
             foods.dishSpecification[0].dishPrice,
             foods.dishSpecification[0].specificationName,
             foods.dishSpecification[0].packPrice,
             foods.dishTypeStyleOfDish,
             foods.dishSpecification[0].limitCount,
             foods.dishSpecification[0].originalPrice,
             foods.dishSpecification[0].remainQuantity,
             foods.dishTypeRelations.length)">
          <span class="inner uxwm-iconfont btn_reduce_normal"></span>
        </div>
      </transition>
      <div class="cart-count" v-show="foodNum>0">{{foodNum}}</div>
      <div class="cart-add uxwm-iconfont btn_add_disabled"
           ref="addRef"
           :class="{forbid: !isYingye}"
           @click="addToCart(
           foods.dishTypeRelations[0],
           foods.dishId,
           foods.dishSpecification[0].specificationId,
           foods.name,
           foods.dishSpecification[0].dishPrice,
           '',
           foods.dishSpecification[0].packPrice,
           foods.dishTypeStyleOfDish,
           foods.dishSpecification[0].limitCount,
           foods.dishSpecification[0].originalPrice,
           foods.dishSpecification[0].remainQuantity,
           foods.dishTypeRelations.length,
           foods.dishSpecification[0].tastes)">
        <transition name="fade">
          <p class="show_addToCart_hotType" v-show="showAddToCartAotType">
            该美食限{{userCount}}份优惠，超过以原价计算哦
          </p>
        </transition>
      </div>
    </section>
    <!-- 多规格 -->
    <section class="specification-wrapper"
             v-else-if="(foods.dishSpecification.length > 1 && foods.state === 1) || (foods.dishSpecification[0].tastes.length >= 0 && foods.state === 1)"
             key="specification-wrapper">
      <transition name="move">
        <div class="cart-decrease uxwm-iconfont sanjiao"
             v-show="foodNum > 0"
             :class="{specification_delete: foods.dishSpecification.length > 1 || foods.dishSpecification[0].tastes.length >= 1}"
             @click="showReduceTip(foods.dishSpecification.length, foods.dishSpecification[0].tastes.length)">
          <span class="inner uxwm-iconfont btn_reduce_normal sanjiao"></span>
          <transition name="fade">
            <p class="show_delete_tip" v-if="showDeleteTip">{{showDeleteText}}</p>
           	<p class="show_addToCart_hotType" v-show="showAddToCartAotType">
              该美食限{{showSpecToast}}份优惠，超过以原价计算哦
            </p>
          </transition>
        </div>
      </transition>
      <div class="cart-count" v-show="foodNum > 0">{{foodNum}}</div>
      <div class="cart-add uxwm-iconfont btn_add_disabled"
           :class="{forbid: !isYingye}"
           @click="plusClicked($event,foods,false)"></div>
    </section>
    <!-- 售罄 -->
    <section v-else key="sellout-wrapper">
      <div class="sellout">已售完</div>
    </section>
  </div>
</template>
<script>
  import {mapState, mapMutations} from 'vuex'
  //  import {loadFromLocal} from '../../common/js/store'
  export default {
    props: {
      foods: {
        type: Object
      },
      index: {
        type: Number
      },
      shopId: {
        type: String
      },
      shopcart: {
        type: Number
      },
      isYingye: {
        type: Boolean
      },
      showSpecToast: {
        type: Number
      }
    },
    data() {
      return {
        showSpecs: false, // 控制显示 规格
        showDeleteTip: false, // 多规格显示 删除 提示
        showDeleteText: '多规格或多口味商品只能去购物车删除哦', // 多规格 或 多口味的 删除是 提示文本
        showAddToCartAotType: false, // 超过爆款限制
        isShowSpecToast: false,
        disType: false,
        userCount: 0 // 用户可以点多少个
      }
    },
    computed: {
      // 接受vuex
      ...mapState(['cartList']),
      // 监听cartList变化，更新当前商铺的购物车信息shopCart，同时返回一个新的对象
      shopCart() {
        return Object.assign({}, this.cartList[this.shopId])
      },
      // shopCart变化的时候重新计算当前商品的数量
      foodNum() {
        let categoryId = this.foods.dishTypeRelations[0]
        let itemId = this.foods.dishId
        if (this.shopCart && this.shopCart[categoryId] && this.shopCart[categoryId][itemId]) {
          let num = 0
          Object.values(this.shopCart[categoryId][itemId]).forEach(item => {
//            delete item.specsNum
//            console.log(Object.keys(item))
//            console.log(Object.values(item))
            Object.values(item).forEach(tasteItem => {
              if ((typeof tasteItem) !== 'number') {
                num += tasteItem.num
              }
            })
          })
          return num
        } else {
          return 0
        }
      }
    },
    methods: {
      // 引用vuex方法
      ...mapMutations(['ADD_CART', 'REDUCE_CART']),
      // 加入购物车
      // 参数列表：分类id，单个菜id，规格id，单个菜名字，单个菜价格，单个菜规格，饭盒费，个人限购数量，是否爆款分类，分类id长度
      addToCart(categoryId, itemId, foodId, name, price, specs, packingFee, dishTypeStyle, limitCount, originalPrice,
                remainQuantity, categoryIdLength, tastes) {
        console.log('buyCary --- addToCart')
        if (this.isYingye) {
          if (dishTypeStyle === 1) { // 如果是爆款
          this.dishType = true
            if (limitCount === 0) { // 如果爆款购买无限制
              this.userCount = remainQuantity // 用户可购买数量 = 库存数量
              this.showSpecToastFun(dishTypeStyle)
            } else if (limitCount <= remainQuantity) { // 如果爆款限购 《= 库存
              this.userCount = limitCount // 用户可购买数量 = 爆款限购
              this.showSpecToastFun(dishTypeStyle)
            } else if (limitCount >= remainQuantity) { // 如果爆款限购 》 库存量
              this.userCount = remainQuantity // 用户可购买数量 = 库存数量
              this.showSpecToastFun(dishTypeStyle)
            }
            /* if (this.userCount !== 0) {
              if (this.foodNum < this.userCount) {
              console.log(this.foodNum)
                this.showAddToCartAotType = false
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                  clearTimeout(this.timer)
                  this.showAddToCartAotType = true
                }, 1500)
              }
            } */
          }
          this.ADD_CART({
            shopid: this.shopId,
            categoryId,
            itemId,
            foodId,
            name,
            price,
            specs,
            packingFee,
            dishTypeStyle,
            limitCount,
            originalPrice,
            remainQuantity,
            userCount: this.userCount,
            categoryIdLength,
            tastes: tastes.length === 0 ? '' : tastes
          })
        } else {
          return
        }
      },
      // 移除购物车
      // 参数列表：商品id，分类id，菜品id，规格id，菜品名字，菜品价格，菜品规格，饭盒费
      removeOutCart(categoryId, itemId, foodId, name, price, specs, packingFee, dishTypeStyle, limitCount,
                    originalPrice, remainQuantity, categoryIdLength) {
        console.log('buyCary --- removeOutCart')
        if (this.foodNum > 0) {
          if (limitCount === 0) { // 个人无限制 取库存
            this.userCount = remainQuantity
          } else if (limitCount <= remainQuantity) { // 个人 <= 库存 取个人
            this.userCount = limitCount
          } else if (limitCount >= remainQuantity) { // 个人 >= 库存 取库存
            this.userCount = remainQuantity
          }
          let type = remainQuantity !== 0 ? 1 : 0
          this.REDUCE_CART({
            shopid: this.shopId,
            categoryId,
            itemId,
            foodId,
            name,
            price,
            specs,
            packingFee,
            dishTypeStyle: type,
            limitCount,
            originalPrice,
            remainQuantity,
            userCount: this.userCount,
            categoryIdLength,
            tastes: ''
          })
        }
      },
      testFun() {
        console.log('12312312312312312312312312')
      },
      // 打开goods组件里面 多规格
      showChooseList(event, foods) {
        if (this.isYingye) {
          this.$emit('showSpecs', event, foods, this.showSpecs)
        } else {
          return
        }
      },
      // 点击多规格商品的减按钮，弹出提示
      showReduceTip(specsLength, tastesLength) {
        this.showDeleteTip = true
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          clearTimeout(this.timer)
          this.showDeleteTip = false
        }, 2000)
      },
      /* showSpecToastFun() {
        if (this.showSpecToast !== 0) {
          if (this.foodNum > this.showSpecToast) {
            this.isShowSpecToast = true
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
              clearTimeout(this.timer)
              this.isShowSpecToast = false
            }, 1500)
          }
        }
      } */
      showSpecToastFun() {
        if (this.foodNum >= this.showSpecToast && this.foodNum !== 0) {
          this.showAddToCartAotType = true
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            clearTimeout(this.timer)
            this.showAddToCartAotType = false
          }, 1500)
        }
      },
      plusClicked(e, foods, hot) {
        this.showChooseList(e, foods)
        if (hot) {
          this.showSpecToastFun()
        }
      }
    },
    watch: {
      showSpecToast: function (val) {
        this.showSpecToastFun()
      }
    }
  }
</script>
<style scoped>
  .specification-wrapper,
  .cart-wrapper {
    font-size: 0;
    position: relative;
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
    display: inline-block;
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .specification-wrapper .cart-decrease::before {
    display: none;
    position: absolute;
    top: -6px;
    left: 25%;
    opacity: 0.5;
    font-size: 7px;
    /*background-color: rgba(0, 0, 0, .7);*/
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
    position: relative;
    display: inline-block;
    padding: 6px;
    line-height: 22px;
    font-size: 22px;
    color: #ff8932;
  }

	.show_addToCart_hotType {
    position: absolute;
    /*position: fixed;*/
    padding: .5rem 0;
    top: -60%;
    right: -10%;
    min-width: 210px;
    border: 1px;
    border-radius: 0.25rem;
    text-align: center;
    transform: translateY(-50%);
    color: #ffffff;
    background-color: rgba(0, 0, 0, .7);
    font-size: 10px;		
	}

  .cart-wrapper .forbid {
    color: #dddddd;
  }

  .specification-wrapper .forbid {
    color: #dddddd;
  }

  .specification-wrapper .specification_delete .inner {
    color: #dddddd;
  }

  .specification-wrapper .show_delete_tip {
    position: fixed;
    padding: .5rem 0;
    top: -50%;
    right: -150%;
    min-width: 150px;
    border: 1px;
    border-radius: 0.25rem;
    text-align: center;
    transform: translateY(-50%);
    color: #ffffff;
    background-color: rgba(0, 0, 0, .7);
    font-size: 10px;
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
