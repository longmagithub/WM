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
  RECORD_USERINFO, // 用户信息
  BOON_PRICE, // 红包金额
  MANJIAN_FEESPRICE, // 满减_配送费
  MENU_REMIND // 是否有显示提醒小红点
} from './mutation-types.js'
import {
  setStore,
  getStore
} from '../common/utils/util'

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
    packingFee, // 饭盒费
    dishTypeStyle, // 是否爆款分类
    limitCount, // 限制份数
    originalPrice, // 菜原价
    remainQuantity, // 爆款库存
    userCount, // 用户可以点多少
    categoryIdLength, // 分类id长度
    tastes
  }) {
    console.log(JSON.stringify(tastes))
    let cart = state.cartList
    if ((cart[shopid] && cart[shopid][categoryId] && cart[shopid][categoryId][itemId] && cart[shopid][categoryId][itemId][foodId] && cart[shopid][categoryId][itemId][foodId][tastes.id]) && dishTypeStyle === 0) {
      // console.log('_____----11111----______')
      if (cart[shopid][categoryId][itemId][foodId][tastes.id]['dishTypeStyle'] === 1) { // 如果是爆款
        cart[shopid][categoryId][itemId][foodId]['specsNum']++
        if (cart[shopid][categoryId][itemId][foodId][tastes.id]['num'] > userCount) { // 如果超出userConut 增加 num 和 overflowNum
          cart[shopid][categoryId][itemId][foodId][tastes.id]['overflowNum']++
          cart[shopid][categoryId][itemId][foodId][tastes.id]['num']++
          // console.log('1-1')
        } else if (cart[shopid][categoryId][itemId][foodId][tastes.id]['num'] < userCount) { // 如果没有超出 增加 num 和 limitNum
          cart[shopid][categoryId][itemId][foodId][tastes.id]['limitNum']++
          cart[shopid][categoryId][itemId][foodId][tastes.id]['num']++
          // console.log('1-2')
        } else if (cart[shopid][categoryId][itemId][foodId][tastes.id]['num'] === userCount) { // 本命默认是1 === 都不用加了 只是 num
          cart[shopid][categoryId][itemId][foodId][tastes.id]['num']++
          cart[shopid][categoryId][itemId][foodId][tastes.id]['overflowNum']++
          // console.log('1-3')
        }
      } else if (cart[shopid][categoryId][itemId][foodId][tastes.id]['dishTypeStyle'] === 0) {
        cart[shopid][categoryId][itemId][foodId][tastes.id]['num']++
        cart[shopid][categoryId][itemId][foodId][tastes.id]['overflowNum']++
      }
    } else if (cart[shopid] && cart[shopid][categoryId] && cart[shopid][categoryId][itemId] && cart[shopid][categoryId][itemId][foodId] && dishTypeStyle === 1) {
      console.log('_____----22222----______')
      // 爆款逻辑
      if (tastes === '') { // 爆款但是没有口味
        console.log('爆款但是没有口味')
        if (cart[shopid][categoryId][itemId][foodId][tastes.id]['num'] > userCount) { // 如果超出userConut 增加 num 和 overflowNum
          cart[shopid][categoryId][itemId][foodId][tastes.id]['overflowNum']++
          cart[shopid][categoryId][itemId][foodId][tastes.id]['num']++
          // console.log('1-1')
        } else if (cart[shopid][categoryId][itemId][foodId][tastes.id]['num'] < userCount) { // 如果没有超出 增加 num 和 limitNum
          cart[shopid][categoryId][itemId][foodId][tastes.id]['limitNum']++
          cart[shopid][categoryId][itemId][foodId][tastes.id]['num']++
          // console.log('1-2')
        } else if (cart[shopid][categoryId][itemId][foodId][tastes.id]['num'] === userCount) { // 本命默认是1 === 都不用加了 只是 num
          cart[shopid][categoryId][itemId][foodId][tastes.id]['num']++
          cart[shopid][categoryId][itemId][foodId][tastes.id]['overflowNum']++
          // console.log('1-3')
        }
      } else if (cart[shopid][categoryId][itemId][foodId][tastes.id] !== '') { // 爆款有口味
        console.log('爆款有口味')
        // 当前规格id下有多少个子类，需要减1 'specsNum' 多出
        let activeSpecItems = Object.keys(cart[shopid][categoryId][itemId][foodId])
        if (activeSpecItems.indexOf('specsNum') >= 0) {
          activeSpecItems.splice(activeSpecItems.indexOf('specsNum'), 1)
        }
        console.log(activeSpecItems)
        if (activeSpecItems.indexOf(tastes.id) < 0 && tastes !== '') { // 当前爆款类下如果没有这个口味，就创建
          console.log('爆款0000000')
          cart[shopid][categoryId][itemId][foodId][tastes.id] = {}
          cart[shopid][categoryId][itemId][foodId][tastes.id]['num'] = 1
          cart[shopid][categoryId][itemId][foodId][tastes.id]['limitNum'] = 0
          cart[shopid][categoryId][itemId][foodId][tastes.id]['overflowNum'] = 1
          cart[shopid][categoryId][itemId][foodId][tastes.id]['id'] = foodId
          cart[shopid][categoryId][itemId][foodId][tastes.id]['name'] = name
          cart[shopid][categoryId][itemId][foodId][tastes.id]['price'] = price
          cart[shopid][categoryId][itemId][foodId][tastes.id]['specs'] = specs
          cart[shopid][categoryId][itemId][foodId][tastes.id]['packingFee'] = packingFee
          cart[shopid][categoryId][itemId][foodId][tastes.id]['dishTypeStyle'] = dishTypeStyle
          cart[shopid][categoryId][itemId][foodId][tastes.id]['limitCount'] = limitCount
          cart[shopid][categoryId][itemId][foodId][tastes.id]['originalPrice'] = originalPrice
          cart[shopid][categoryId][itemId][foodId][tastes.id]['remainQuantity'] = remainQuantity
          cart[shopid][categoryId][itemId][foodId][tastes.id]['userCount'] = userCount
          cart[shopid][categoryId][itemId][foodId][tastes.id]['categoryIdLength'] = categoryIdLength
          cart[shopid][categoryId][itemId][foodId][tastes.id]['tastes'] = tastes
        } else if (cart[shopid] && cart[shopid][categoryId] && cart[shopid][categoryId][itemId] && cart[shopid][categoryId][itemId][foodId] && cart[shopid][categoryId][itemId][foodId][tastes.id]) {
          // cart[shopid][categoryId][itemId][foodId]['specsNum']++
          console.log(JSON.stringify(cart[shopid][categoryId][itemId][foodId]))
          // cart[shopid][categoryId][itemId][foodId][tastes.id]['specsNum'] = cart[shopid][categoryId][itemId][foodId]['specsNum']
          console.log('爆款111111')
          if (cart[shopid][categoryId][itemId][foodId][tastes.id]['num'] > userCount) { // 如果超出userConut 增加 num 和
            // overflowNum
            cart[shopid][categoryId][itemId][foodId][tastes.id]['overflowNum']++
            cart[shopid][categoryId][itemId][foodId][tastes.id]['num']++
            // console.log('1-1')
          } else if (cart[shopid][categoryId][itemId][foodId][tastes.id]['num'] < userCount) { // 如果没有超出 增加 num 和
            // limitNum
            cart[shopid][categoryId][itemId][foodId][tastes.id]['limitNum']++
            cart[shopid][categoryId][itemId][foodId][tastes.id]['num']++
            // console.log('1-2')
          } else if (cart[shopid][categoryId][itemId][foodId][tastes.id]['num'] === userCount) { // 本命默认是1 === 都不用加了
            // 只是 num
            cart[shopid][categoryId][itemId][foodId][tastes.id]['num']++
            cart[shopid][categoryId][itemId][foodId][tastes.id]['overflowNum']++
            // console.log('1-3')
          }
        }
      }
    } else if (cart[shopid] && cart[shopid][categoryId] && cart[shopid][categoryId][itemId] && cart[shopid][categoryId][itemId][foodId]) {
      console.log('_____----33333----______')
      cart[shopid][categoryId][itemId][foodId][tastes.id] = {}
      cart[shopid][categoryId][itemId][foodId][tastes.id]['num'] = 1
      cart[shopid][categoryId][itemId][foodId][tastes.id]['limitNum'] = 1
      cart[shopid][categoryId][itemId][foodId][tastes.id]['overflowNum'] = 0
      cart[shopid][categoryId][itemId][foodId][tastes.id]['id'] = foodId
      cart[shopid][categoryId][itemId][foodId][tastes.id]['name'] = name
      cart[shopid][categoryId][itemId][foodId][tastes.id]['price'] = price
      cart[shopid][categoryId][itemId][foodId][tastes.id]['specs'] = specs
      cart[shopid][categoryId][itemId][foodId][tastes.id]['packingFee'] = packingFee
      cart[shopid][categoryId][itemId][foodId][tastes.id]['dishTypeStyle'] = dishTypeStyle
      cart[shopid][categoryId][itemId][foodId][tastes.id]['limitCount'] = limitCount
      cart[shopid][categoryId][itemId][foodId][tastes.id]['originalPrice'] = originalPrice
      cart[shopid][categoryId][itemId][foodId][tastes.id]['remainQuantity'] = remainQuantity
      cart[shopid][categoryId][itemId][foodId][tastes.id]['userCount'] = userCount
      cart[shopid][categoryId][itemId][foodId][tastes.id]['categoryIdLength'] = categoryIdLength
      cart[shopid][categoryId][itemId][foodId][tastes.id]['tastes'] = tastes
    } else if (cart[shopid] && cart[shopid][categoryId] && cart[shopid][categoryId][itemId]) {
      console.log('_____----44444----______')
      cart[shopid][categoryId][itemId][foodId] = {}
      cart[shopid][categoryId][itemId][foodId][tastes.id] = {}
      cart[shopid][categoryId][itemId][foodId][tastes.id]['num'] = 1
      cart[shopid][categoryId][itemId][foodId][tastes.id]['limitNum'] = 1
      cart[shopid][categoryId][itemId][foodId][tastes.id]['overflowNum'] = 0
      cart[shopid][categoryId][itemId][foodId][tastes.id]['id'] = foodId
      cart[shopid][categoryId][itemId][foodId][tastes.id]['name'] = name
      cart[shopid][categoryId][itemId][foodId][tastes.id]['price'] = price
      cart[shopid][categoryId][itemId][foodId][tastes.id]['specs'] = specs
      cart[shopid][categoryId][itemId][foodId][tastes.id]['packingFee'] = packingFee
      cart[shopid][categoryId][itemId][foodId][tastes.id]['dishTypeStyle'] = dishTypeStyle
      cart[shopid][categoryId][itemId][foodId][tastes.id]['limitCount'] = limitCount
      cart[shopid][categoryId][itemId][foodId][tastes.id]['originalPrice'] = originalPrice
      cart[shopid][categoryId][itemId][foodId][tastes.id]['remainQuantity'] = remainQuantity
      cart[shopid][categoryId][itemId][foodId][tastes.id]['userCount'] = userCount
      cart[shopid][categoryId][itemId][foodId][tastes.id]['categoryIdLength'] = categoryIdLength
      cart[shopid][categoryId][itemId][foodId][tastes.id]['tastes'] = tastes
      cart[shopid][categoryId][itemId][foodId][tastes.id]['specsNum'] = 1
    } else if (cart[shopid] && cart[shopid][categoryId]) {
      console.log('_____----55555----______')
      cart[shopid][categoryId][itemId] = {}
      cart[shopid][categoryId][itemId][foodId] = {}
      cart[shopid][categoryId][itemId][foodId][tastes.id] = {}
      cart[shopid][categoryId][itemId][foodId][tastes.id]['num'] = 1
      cart[shopid][categoryId][itemId][foodId][tastes.id]['limitNum'] = 1
      cart[shopid][categoryId][itemId][foodId][tastes.id]['overflowNum'] = 0
      cart[shopid][categoryId][itemId][foodId][tastes.id]['id'] = foodId
      cart[shopid][categoryId][itemId][foodId][tastes.id]['name'] = name
      cart[shopid][categoryId][itemId][foodId][tastes.id]['price'] = price
      cart[shopid][categoryId][itemId][foodId][tastes.id]['specs'] = specs
      cart[shopid][categoryId][itemId][foodId][tastes.id]['packingFee'] = packingFee
      cart[shopid][categoryId][itemId][foodId][tastes.id]['dishTypeStyle'] = dishTypeStyle
      cart[shopid][categoryId][itemId][foodId][tastes.id]['limitCount'] = limitCount
      cart[shopid][categoryId][itemId][foodId][tastes.id]['originalPrice'] = originalPrice
      cart[shopid][categoryId][itemId][foodId][tastes.id]['remainQuantity'] = remainQuantity
      cart[shopid][categoryId][itemId][foodId][tastes.id]['userCount'] = userCount
      cart[shopid][categoryId][itemId][foodId][tastes.id]['categoryIdLength'] = categoryIdLength
      cart[shopid][categoryId][itemId][foodId][tastes.id]['tastes'] = tastes
      cart[shopid][categoryId][itemId][foodId][tastes.id]['specsNum'] = 1
    } else if (cart[shopid]) {
      console.log('_____----66666----______')
      cart[shopid][categoryId] = {}
      cart[shopid][categoryId][itemId] = {}
      cart[shopid][categoryId][itemId][foodId] = {}
      cart[shopid][categoryId][itemId][foodId][tastes.id] = {}
      cart[shopid][categoryId][itemId][foodId][tastes.id]['num'] = 1
      cart[shopid][categoryId][itemId][foodId][tastes.id]['limitNum'] = 1
      cart[shopid][categoryId][itemId][foodId][tastes.id]['overflowNum'] = 0
      cart[shopid][categoryId][itemId][foodId][tastes.id]['id'] = foodId
      cart[shopid][categoryId][itemId][foodId][tastes.id]['name'] = name
      cart[shopid][categoryId][itemId][foodId][tastes.id]['price'] = price
      cart[shopid][categoryId][itemId][foodId][tastes.id]['specs'] = specs
      cart[shopid][categoryId][itemId][foodId][tastes.id]['packingFee'] = packingFee
      cart[shopid][categoryId][itemId][foodId][tastes.id]['dishTypeStyle'] = dishTypeStyle
      cart[shopid][categoryId][itemId][foodId][tastes.id]['limitCount'] = limitCount
      cart[shopid][categoryId][itemId][foodId][tastes.id]['originalPrice'] = originalPrice
      cart[shopid][categoryId][itemId][foodId][tastes.id]['remainQuantity'] = remainQuantity
      cart[shopid][categoryId][itemId][foodId][tastes.id]['userCount'] = userCount
      cart[shopid][categoryId][itemId][foodId][tastes.id]['categoryIdLength'] = categoryIdLength
      cart[shopid][categoryId][itemId][foodId][tastes.id]['tastes'] = tastes
    } else {
      console.log('_____----77777----______')
      cart[shopid] = {}
      cart[shopid][categoryId] = {}
      cart[shopid][categoryId][itemId] = {}
      cart[shopid][categoryId][itemId][foodId] = {}
      cart[shopid][categoryId][itemId][foodId][tastes.id] = {}
      cart[shopid][categoryId][itemId][foodId][tastes.id]['num'] = 1
      cart[shopid][categoryId][itemId][foodId][tastes.id]['limitNum'] = 1
      cart[shopid][categoryId][itemId][foodId][tastes.id]['overflowNum'] = 0
      cart[shopid][categoryId][itemId][foodId][tastes.id]['id'] = foodId
      cart[shopid][categoryId][itemId][foodId][tastes.id]['name'] = name
      cart[shopid][categoryId][itemId][foodId][tastes.id]['price'] = price
      cart[shopid][categoryId][itemId][foodId][tastes.id]['specs'] = specs
      cart[shopid][categoryId][itemId][foodId][tastes.id]['packingFee'] = packingFee
      cart[shopid][categoryId][itemId][foodId][tastes.id]['dishTypeStyle'] = dishTypeStyle
      cart[shopid][categoryId][itemId][foodId][tastes.id]['limitCount'] = limitCount
      cart[shopid][categoryId][itemId][foodId][tastes.id]['originalPrice'] = originalPrice
      cart[shopid][categoryId][itemId][foodId][tastes.id]['remainQuantity'] = remainQuantity
      cart[shopid][categoryId][itemId][foodId][tastes.id]['userCount'] = userCount
      cart[shopid][categoryId][itemId][foodId][tastes.id]['categoryIdLength'] = categoryIdLength
      cart[shopid][categoryId][itemId][foodId][tastes.id]['tastes'] = tastes
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
    specs,
    dishTypeStyle,
    limitCount,
    originalPrice,
    remainQuantity,
    userCount,
    tastes
  }) {
    let cart = state.cartList
    if (cart[shopid] && cart[shopid][categoryId] && cart[shopid][categoryId][itemId] && cart[shopid][categoryId][itemId][foodId] && cart[shopid][categoryId][itemId][foodId][tastes.id]) {
      if (cart[shopid][categoryId][itemId][foodId][tastes.id]['num'] > 0) {
        console.log('购物车移除')
        if (dishTypeStyle === 1) { // 如果是爆款
          if (cart[shopid][categoryId][itemId][foodId][tastes.id]['num'] > userCount) { // 如果超出userConut 减少 num 和 overflowNum
            cart[shopid][categoryId][itemId][foodId][tastes.id]['overflowNum']--
            cart[shopid][categoryId][itemId][foodId][tastes.id]['num']--
            console.log('a-a')
          } else if (cart[shopid][categoryId][itemId][foodId][tastes.id]['num'] < userCount) { // 如果没有超出 减少 num 和 limitNum
            cart[shopid][categoryId][itemId][foodId][tastes.id]['limitNum']--
            cart[shopid][categoryId][itemId][foodId][tastes.id]['num']--
            console.log('a-b')
          } else if (cart[shopid][categoryId][itemId][foodId][tastes.id]['num'] === userCount) { // 本命默认是1 === 都不用减了 只是 num
            cart[shopid][categoryId][itemId][foodId][tastes.id]['num']--
            cart[shopid][categoryId][itemId][foodId][tastes.id]['limitNum']--
            console.log('a-c')
          }
        }
        if (dishTypeStyle === 0) { // 非爆款
          cart[shopid][categoryId][itemId][foodId][tastes.id]['num']--
          if (cart[shopid][categoryId][itemId][foodId][tastes.id]['num'] === userCount) {
            cart[shopid][categoryId][itemId][foodId][tastes.id]['limitNum'] = 0
            cart[shopid][categoryId][itemId][foodId][tastes.id]['overflowNum'] = 0
          }
        }
        // 返回一个新的对象，否则计算属性无法监听到数据的变化
        state.cartList = Object.assign({}, cart)
        // 存入localStorage
        setStore('buyCart', state.cartList)
      } else {
        // 商品数量为0，则清空当前商品的信息
        console.log('移除购物车数量为000')
        cart[shopid][categoryId][itemId][foodId][tastes.id] = null
      }
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
  },
  // 红包金额
  [BOON_PRICE](state, {
    boonPrice,
    endDate,
    redEnvelopeType,
    redEnvelopeId
  }) {
    console.log(boonPrice)
    console.log(endDate)
    console.log(redEnvelopeType)
    console.log(redEnvelopeId)
    state.boonPrice = boonPrice
    state.endDate = endDate
    state.redEnvelopeType = redEnvelopeType
    state.redEnvelopeId = redEnvelopeId
  },
  // 满减_配送费
  [MANJIAN_FEESPRICE](state, manJianFeesPrice) {
    console.log(manJianFeesPrice)
    state.manJianFeesPrice = manJianFeesPrice
  },
  // 是否显示 小红点
  [MENU_REMIND](state, menuRemind) {
    state.menuRemind = menuRemind
  }
}
