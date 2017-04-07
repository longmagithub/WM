import {
  // RECORD_ADDRESS,
  ADD_CART, // 加入购物车
  REDUCE_CART,  // 移出购物车
  INIT_BUYCART, // 初始化购物车
  CLEAR_CART, // 清空购物车
  SAVE_SHOPID, // 保存商户ID
  CHOOSE_ADDRESS, // 选择地址
  USER_PRICE,  // uers 合计费用
  CONFIRM_INVOICE, // 是否开发票
  CONFIRM_REMARK, // 订单备注
  USER_ADDRESSID, // 用户地址id
  RECORD_USERINFO // 用户信息
  // RECORD_SHOPDETAIL,
  // GET_USERINFO,
  // CHOOSE_SEARCH_ADDRESS,
  // SAVE_GEOHASH,
  // NEED_VALIDATION,
  // SAVE_CART_ID_SIG,
  // SAVE_ORDER_PARAM,
  // CHANGE_ORDER_PARAM,
  // ORDER_SUCCESS,
  // SAVE_ORDER,
  // OUT_LOGIN,
} from './mutation-types.js'
import {
  setStore,
  getStore
} from '../common/js/util'

export default {
  // 加入购物车
  [ADD_CART](state, {
    shopid, // 商铺Id
    categoryId, // 分类Id
    itemId, // 单个菜Id
    foodId, // 规格Id
    name, // 菜名字
    price,  // 菜价格
    specs,  // 菜规格
    packingFee // 饭盒费
  }) {
    let cart = state.cartList
    if (cart[shopid] && cart[shopid][categoryId] && cart[shopid][categoryId][itemId] && cart[shopid][categoryId][itemId][foodId]) {
      cart[shopid][categoryId][itemId][foodId]['num']++
    } else if (cart[shopid] && cart[shopid][categoryId] && cart[shopid][categoryId][itemId]) {
      cart[shopid][categoryId][itemId][foodId] = {}
      cart[shopid][categoryId][itemId][foodId]['num'] = 1
      cart[shopid][categoryId][itemId][foodId]['id'] = foodId
      cart[shopid][categoryId][itemId][foodId]['name'] = name
      cart[shopid][categoryId][itemId][foodId]['price'] = price
      cart[shopid][categoryId][itemId][foodId]['specs'] = specs
      cart[shopid][categoryId][itemId][foodId]['packingFee'] = packingFee
    } else if (cart[shopid] && cart[shopid][categoryId]) {
      cart[shopid][categoryId][itemId] = {}
      cart[shopid][categoryId][itemId][foodId] = {}
      cart[shopid][categoryId][itemId][foodId]['num'] = 1
      cart[shopid][categoryId][itemId][foodId]['id'] = foodId
      cart[shopid][categoryId][itemId][foodId]['name'] = name
      cart[shopid][categoryId][itemId][foodId]['price'] = price
      cart[shopid][categoryId][itemId][foodId]['specs'] = specs
      cart[shopid][categoryId][itemId][foodId]['packingFee'] = packingFee
    } else if (cart[shopid]) {
      cart[shopid][categoryId] = {}
      cart[shopid][categoryId][itemId] = {}
      cart[shopid][categoryId][itemId][foodId] = {}
      cart[shopid][categoryId][itemId][foodId]['num'] = 1
      cart[shopid][categoryId][itemId][foodId]['id'] = foodId
      cart[shopid][categoryId][itemId][foodId]['name'] = name
      cart[shopid][categoryId][itemId][foodId]['price'] = price
      cart[shopid][categoryId][itemId][foodId]['specs'] = specs
      cart[shopid][categoryId][itemId][foodId]['packingFee'] = packingFee
    } else {
      cart[shopid] = {}
      cart[shopid][categoryId] = {}
      cart[shopid][categoryId][itemId] = {}
      cart[shopid][categoryId][itemId][foodId] = {}
      cart[shopid][categoryId][itemId][foodId]['num'] = 1
      cart[shopid][categoryId][itemId][foodId]['id'] = foodId
      cart[shopid][categoryId][itemId][foodId]['name'] = name
      cart[shopid][categoryId][itemId][foodId]['price'] = price
      cart[shopid][categoryId][itemId][foodId]['specs'] = specs
      cart[shopid][categoryId][itemId][foodId]['packingFee'] = packingFee
    }
    // 返回一个新的对象，否则计算属性无法监听到数据的变化
    state.cartList = Object.assign({}, cart)
    // 存入localStorage
    setStore('buyCart', state.cartList)
  },
  // 移出购物车
  [REDUCE_CART](state, {
    shopid,
    categoryId,
    itemId,
    foodId,
    name,
    price,
    specs
  }) {
    let cart = state.cartList
    if (cart[shopid] && cart[shopid][categoryId] && cart[shopid][categoryId][itemId] && cart[shopid][categoryId][itemId][foodId]) {
      if (cart[shopid][categoryId][itemId][foodId]['num'] > 0) {
        cart[shopid][categoryId][itemId][foodId]['num']--
        // 返回一个新的对象，否则计算属性无法监听到数据的变化
        state.cartList = Object.assign({}, cart)
        // 存入localStorage
        setStore('buyCart', state.cartList)
      } else {
        // 商品数量为0，则清空当前商品的信息
        cart[shopid][categoryId][itemId][foodId] = null
      }
    }
  },
  // 网页初始化时从本地缓存获取购物车数据
  [INIT_BUYCART](state) {
    let initCart = getStore('buyCart')
    if (initCart) {
      state.cartList = JSON.parse(initCart)
    }
  },
  // 清空当前商品的购物车信息
  [CLEAR_CART](state, shopid) {
    state.cartList[shopid] = null
    state.cartList = Object.assign({}, state.cartList)
    setStore('buyCart', state.cartList)
  },
  // 网页初始化时从本地缓存获取购物车数据
  [INIT_BUYCART](state) {
    let initCart = getStore('buyCart')
    if (initCart) {
      state.cartList = initCart
    }
  },
  // 保存商铺id
  [SAVE_SHOPID](state, shopid, customerid) {
    state.shopid = shopid
    state.customerid = customerid
  },
  // 选择地址
  [CHOOSE_ADDRESS](state, {
    address,
    index
  }) {
    state.choosedAddress = address
    state.addressIndex = index
  },
  // 用户 消费
  [USER_PRICE](state, {
    totalPack,
    feesPrice,
    allPrice
  }) {
    state.totalPack = totalPack
    state.feesPrice = feesPrice
    state.allPrice = allPrice
  },
  // 记录订单页面用户选择的备注, 传递给订单确认页面
  [CONFIRM_REMARK](state, {
    remarkText,
    inputText,
    indexRemark
  }) {
    state.remarkText = remarkText
    state.inputText = inputText
    state.indexRemark = indexRemark
  },
  // 是否开发票
  [CONFIRM_INVOICE](state, invoice) {
    state.invoice = invoice
  },
  // 用户地址ID
  [USER_ADDRESSID](state, userAddressId) {
    state.userAddressId = userAddressId
  },
  // 记录用户信息
  [RECORD_USERINFO](state, shopID, customerID) {
    state.userInfo = customerID
    state.shopID = shopID
    console.log(state.userInfo)
    console.log(state.shopID)
    // let validity = 30
    // let now = new Date()
    // now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000)
    // document.cookie = "USERID=" + info.user_id + ";expires=" + now.toGMTString()
    // document.cookie = "SID=huRyTRd9QLij7NkbpHJoj3PQrx1eRiO6bAiw" + ";expires=" + now.toGMTString()
  }
}
