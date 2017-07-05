import {
  // 店铺相关
  SET_WEATHER,
  SET_SHOP_DETAIL,
  SET_REDPACK,
  SET_SHARE,
  SET_DISH,
  SET_HOT,
  SET_DISCOUNT,
  SET_SYSTEM_LIST,
  // 订单相关
  SET_ORDER_LIST,
  SET_ORDER_DETAIL,
  ORDER_SUBMIT,
  ORDER_PAY,
  // 用户相关
  SET_ADD_LIST,
  SET_ADD_DETAIL,
  CHANGE_ADD,
  POST_ADD,
  DELETE_ADD,
  SET_MEMBERCARD,
  SET_USER_INFO,
  INIT_USER,
  // 购物车相关
  INIT_CART,
  ADD_DISH,
  DELETE_DISH,
  CLEAR_CART
} from './mutation-types2.js'
import {
  setStore,
  getStore
} from '../common/utils/util'

export default {
  //  初始化购物车，从local里读取
  [INIT_CART](state) {
    let cart = setStore('cart')
    if(cart) {
      state.cart = cart
    } else {
      state.cart = []
    }
  },
  // 添加菜品
  [ADD_DISH](state, dish) {
    let index = state.cart.findIndex(function(item) {
      return item.shop_id === item.shop_id
    })
    if (index >= 0) { //找到店铺记录
      let shop = state.cart[index]
      let dishIndex = shop.dishes.findIndex(function(item) {
        return item.dishId === dish.dishId && item.specificationId === dish.specificationId && item.tasteId === dish.specificationId
      })
      if (dishIndex >= 0) {   // 有该菜品记录
        state.cart[index].dishes[dishIndex].count ++ 
      } else {
        dish.count = 1
        state.cart[index].dishes.push(dish)
      }
    } else {          //没找到店铺记录
      dish.count = 1
      state.cart.push({
        shop_id: dish.shop_id,
        dishes: [dish]
      })
    }
    setStore('cart', state.cart)
  },
  // 删除菜品
  [DELETE_DISH](state, dish) {
    let index = state.cart.findIndex(function(item) {
      return item.shop_id === item.shop_id
    })
    if (index >= 0) {         // 找到商铺
      let shop = state.cart[index]
      let dishIndex = shop.dishes.findIndex(function(item) {
        return item.dishId === dish.dishId && item.specificationId === dish.specificationId && item.tasteId === dish.specificationId
      })
      if (dishIndex >= 0) {   // 有该菜品记录
        state.cart[index].dishes[dishIndex].count --
        if (state.cart[index].dishes[dishIndex].count === 0) {
          state.cart[index].dishes.splice(dishIndex, 1)
        } 
        setStore('cart', state.cart)
      } else {
        console.log('found shop but unable to find dish to delete!')
      }
    } else {
      console.log('unable to find dish to delete!')
    }
    let index = state.cart.findIndex(function(item) {
      return item.dishId === dish.dishId && item.specificationId === dish.specificationId && item.tasteId === dish.tasteId
    })
  },
  // 清空购物车
  [CLEAR_CART](state, shop_id) {
    let index = state.cart.findIndex(function(item) {
      return item.shop_id === shop_id
    })
    if (index >= 0) { //找到店铺记录
      state.cart[index].dishes = []
      setStore('cart', state.cart)
    } else {
      console.log('unable to find shop!')
    }
  },
  // 设置用户信息 
  [SET_USER_INFO](state, user_info) {
    state.user_info = user_info
    setStore('user_info', user_info)
  },
  [INIT_USER](state) {
    let user_info = getStore('user_info')
    if (user_info) {
      state.user_info = user_info
    }
  }
}