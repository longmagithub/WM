<template>
  <div class="submitOrder">
    <div class="submitOrder-wrapper" ref="submitOrderWrapper">
      <ul>
        <section class="address-wrapper" @click="gotoAddList">
          <i class="uxwm-iconfont icon_Location"></i>
          <div class="address-yes" v-if="addRess">
            <p class="submitOrder-header"><span class="name">{{addRess.name}}</span><span
              class="name">{{addRess.phoneNumber}}</span>
            </p>
            <p class="content">{{addRess.address}}{{addRess.houseNum}}</p>
          </div>
          <div class="address-not" v-else>
            请添加一个收货地址
          </div>
          <i class="uxwm-iconfont btn_right"></i>
        </section>
        <section class="serviceTime-wrapper">
          <i class="uxwm-iconfont icon_time"></i>
          <span class="text">送达时间</span>
          <span class="soon" v-if="isJinKuai">尽快送达</span>
          <div class="time-wrapper" v-if="!isJinKuai">
            <span class="title" v-if="selected === 0">尽快送达</span>
            <span class="time" v-if="selected === 0">预计{{options[0] | formatDate}}</span>
            <span class="timeItem" v-if="selected > 0">{{options[selected] | formatDate}}</span>
          </div>
          <select class="time-select" v-model="selected" v-if="!isJinKuai" placeholder="请选择">
            <option class="select-item" v-for="(item, indexOption) in options" :value="indexOption">
              <span class="title" v-if="indexOption === 0">尽快送达 &nbsp|&nbsp</span>
              <!--<span class="title" v-if="indexOption === 0">尽快送达 &nbsp|&nbsp</span>-->
              <span class="time" v-if="indexOption === 0"> 预计{{item | formatDate}}</span>
              <span v-if="indexOption > 0">{{item | formatDate}}</span>
            </option>
          </select>
          <i class="uxwm-iconfont btn_right" v-if="!isJinKuai"></i>
        </section>
        <section class="orderDetail-wrapper">
          <div class="title">订单详情</div>
          <div class="order-list">
            <div class="list-content">
              <ul>
                <li class="food_list_item"
                    v-for="item in newShopCart"
                    v-if="item.num > 0 && item.hotTyep === 1 && item.dishTypeStyle === 1">
                  <div class="name_num">
                    <span class="name">
                      <i class="uxwm-iconfont huo"></i>
                      {{item.name}}
                    </span>
                    <!--<span class="specs" v-if="item.specs">({{item.specs}})</span>-->
                    <span class="specs" v-if="item.specs || item.tastes">
                        (<span v-show="item.specs !== '默认'">{{item.specs}}</span><span
                      v-show="item.specs !== '默认' && item.tastes">，</span><span
                      v-show="item.tastes">{{item
                        .tastes.name}}</span>)
                      </span>
                  </div>
                  <span class="num" v-if="item.hotTyep === 1 && item.dishTypeStyle === 1">×{{item.limitNum}}</span>
                  <div class="price" v-if="item.hotTyep === 1 && item.dishTypeStyle === 1">
                    <s class="originalPrice">￥{{item.limitNum * item.originalPrice | toFixedFil}}</s>
                    ￥{{item.limitNum * item.price | toFixedFil}}
                  </div>
                </li>
                <li class="food_list_item"
                    v-for="item in newShopCart"
                    v-if="item.num > 0 && item.hotTyep === 0 && item.dishTypeStyle === 1 && item.overflowNum > 0 ">
                  <div class="name_num">
                    <span class="name">
                      {{item.name}}
                    </span>
                    <!--<span class="specs" v-if="item.specs">({{item.specs}})</span>-->
                    <span class="specs" v-if="item.specs || item.tastes">
                        (<span v-show="item.specs !== '默认'">{{item.specs}}</span><span
                      v-show="item.specs !== '默认' && item.tastes">，</span><span
                      v-show="item.tastes">{{item
                        .tastes.name}}</span>)
                      </span>
                  </div>
                  <span class="num" v-if="item.hotTyep === 0 && item.dishTypeStyle === 1">×{{item.overflowNum}}</span>
                  <div class="price" v-if="item.hotTyep === 0 && item.dishTypeStyle === 1">
                    <!--<s class="originalPrice">￥{{item.limitNum * item.originalPrice | toFixedFil}}</s>-->
                    ￥{{item.overflowNum * item.originalPrice | toFixedFil}}
                  </div>
                </li>
                <li class="food_list_item"
                    v-for="item in newShopCart"
                    v-if="item.num > 0 && item.hotTyep === 0 && item.dishTypeStyle === 0">
                  <div class="name_num">
                    <span class="name">
                      {{item.name}}
                    </span>
                    <span class="specs" v-if="item.specs">({{item.specs}}<span v-show="item.tastes.name">，{{item.tastes
                        .name}}</span>)</span>
                  </div>
                  <span class="num" v-if="item.hotTyep === 0 && item.dishTypeStyle === 0">×{{item.num}}</span>
                  <div class="price" v-if="item.hotTyep === 0 && item.dishTypeStyle === 0">
                    <!--<s class="originalPrice">￥{{item.limitNum * item.originalPrice | toFixedFil}}</s>-->
                    ￥{{item.num * item.price | toFixedFil}}
                  </div>
                </li>
                <!--<li class="food_list_item" v-for="item in newShopCart" v-if="item.num > 0 && item.dishTypeStyle === 0">-->
                <!--<div class="name_num">-->
                <!--<span class="name">{{item.name}}</span>-->
                <!--<span class="specs" v-if="item.specs">({{item.specs}})</span>-->
                <!--</div>-->
                <!--<span class="num">×{{item.num}}</span>-->
                <!--<div class="price">￥{{item.num * item.price | toFixedFil}}</div>-->
                <!--</li>-->
                <li class="food_list_item">
                  <div
                    class="name_num"><span class="name">餐盒费</span></div>
                  <div class="price">￥{{packPrice}}</div>
                </li>
                <li class="food_list_item" v-if="feesPrice">
                  <!--<li class="food_list_item">-->
                  <div class="name_num"><span class="name">配送费</span></div>
                  <div class="price">￥{{feesPrice}}</div>
                </li>
                <li class="food_list_item" v-if="manJianFeesPrice.state === 1 && allPrice > manJianFeesPrice.price"
                    :class="{'manJianFeesPrice': manJianFeesPrice.state === 1 && allPrice > manJianFeesPrice.price}">
                  <div class="name_num"><span class="name">配送费</span></div>
                  <div class="price">
                    <span class="price_num">￥0</span>
                    <span class="price_desc">(满{{manJianFeesPrice.price}}元免配送费)</span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="discount" v-if="isDiscount">
              <div class="list-content"></div>
              <p class="discount-title" v-for="item in discountList" v-if="item.discountId === shopDiscountId">
                {{item.title}}
                <span class="discount-num">-￥{{item.reductionAmount}}</span>
              </p>
            </div>
            <div class="boonBox" v-if="boonPrice">
              <p class="boonBox-title">
                红包<span class="boonBox-num">-￥{{boonPrice}}</span>
              </p>
            </div>
            <div class="totalPrice"
                 :class="{isTotalPrice: isFeessSwitch}">总计：<span
              class="totaPrice-num">￥{{allNum -
              boonPrice < 0 ?
              0.01 :
              allNum -
              boonPrice | toFixedFil}}</span><span
              v-if="isFeessSwitch"
              class="noFessPrice">(不包含配送费)</span>
            </div>
          </div>
        </section>
        <section class="remark-wapper">
          <router-link class="routerLink" :to="{path:'/remark', query:{id: 'remark'}}">
            <p class="remark-title">订单备注
              <i class="uxwm-iconfont btn_right"></i>
            </p>
          </router-link>
          <router-link class="routerLink" v-if="shopInfo.invoice" :to="{path:'/invoice', query:{id:'invoice'}}">
            <p class="invoicetitle">发票抬头
              <i class="uxwm-iconfont btn_right"></i>
            </p>
          </router-link>
        </section>
      </ul>
    </div>
    <div class="submitOrder-btn">
      <div class="price">待支付￥{{allNum - boonPrice < 0 ? 0.01 : allNum - boonPrice |
        toFixedFil}}<span class="noFessPrice"
                          v-if="isFeessSwitch">(不包含配送费)</span>
      </div>
      <div class="submit-btn" @click="submitOrder">确认下单</div>
    </div>
    <toast :show="toastShow" :text="toastText"></toast>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {formatDate} from '../../common/utils/date'
  import {getStore, setStore} from '../../common/utils/util'
  import * as PublicJs from '../../common/utils/public'
  import toast from '../../components/toast.vue'
  const SUCCESS_OK = true
  export default {
    data() {
      return {
        shopId: null, // 商店的id
        customerId: null, // 用户id
        addRess: null, // 默认地址
        addressId: '', // 用户地址id
        shopCart: null, // vuex购物车数据
        newShopCart: [], // 整理后的数据
        packPrice: 0, // 餐盒费用
        feesPrice: 0,  // 配送费
        allPrice: 0, // 总费用
        allNum: 0,  // 优惠后的总费用
        shopInfo: {},  // 商户信息
        discountList: {}, // 优惠列表
        toastShow: false,
        toastText: '',
        options: [], // 时间数组
        selected: 0, // 默认index
        estimateTime: new Date(), // 预计时间
        beginTime: new Date(), // 开始时间
        endTime: new Date(), // 结束时间
        orderId: '', // 订单id
        orderDish: [], // 订单菜品
        isJinKuai: false, // 是否尽快送达
        isDiscount: false, // 是否可以优惠
        shopDiscountId: '', // 优惠id
        discountPrice: 0, // 优惠金额
        isDoonBox: 1, // 是否有红包
        boonPrice: 0,
        endDate: null,
        redEnvelopeId: '',
        isFeessSwitch: true, // 是否显示 '不包含配送费'
        ReverBeginTime: new Date(), // 用来计算倒计时
        ReverEndTime: new Date(), // 用来计算倒计时
        reverseTime: Math.round(new Date().setMinutes(new Date().getMinutes() + 15) / 1000),
        hoursArr: [],
        discounSwitch: true, // 判断爆款是否可以优惠
        testTime: [
          {
            beginTime: '07:00',
            endTime: '09:00'
          },
          {
            beginTime: '10:00',
            endTime: '18:00'
          },
          {
            beginTime: '20:00',
            endTime: '23:00'
          }
        ]
      }
    },
    created() {
      // 修改 title
      PublicJs.changeTitleInWx('我的订单')
      // 获取上个页面传递过来的customerId值
      this.customerId = this.$route.query.customerId
      // 获取上个页面传递过来的shopid值
      this.shopId = this.$route.query.shopId
      // 用户地址ID
      this.addressId = this.userAddressId ? this.userAddressId : ''
      // 获取购物车信息
      this.INIT_BUYCART()
      // 将当前商品id保存
      this.SAVE_SHOPID(this.shopId, this.customerId)
      // 将购物中当前商品的信息提取出来
      this.shopCart = this.cartList[this.shopId]
      // 商户信息
      this.shopInfo = getStore('shopInfo')
      this.packPrice = parseFloat(getStore('userPrice')[0].toFixed(2))
//      this.feesPrice = parseFloat(getStore('userPrice')[1].toFixed(2))
      this.allPrice = parseFloat(getStore('userPrice')[2].toFixed(2))
      // 默认地址
      this.getAddRess(this.addressId)
      // 红包
      this.getRedEnvelope()
      // 计算预计时间
      this.getShopState()
      console.log(JSON.stringify(this.newShopCart))
    },
    mounted() {
      this.initData()
    },
    computed: {
      ...mapState(['cartList', 'remarkText', 'inputText', 'invoice', 'userAddressId', 'manJianFeesPrice'])
    },
    methods: {
      ...mapMutations(['INIT_BUYCART', 'SAVE_SHOPID', 'CLEAR_CART']),
      // 计算预计时间
      getShopState() {
//        console.log('出餐时间：' + this.shopInfo.makingTime)
//        console.log('配送时间：' + this.shopInfo.dispatching.duration)
        // 默认时间 当前时间 + 出餐时间 + 配送时间
        this.estimateTime = new Date(new Date().setMinutes(new Date().getMinutes() + this.shopInfo.makingTime +
          this.shopInfo.dispatching.duration))
        this.options.push(Date.parse(this.estimateTime))
//        let timeArr = []
//        for (let i = 0; i < this.testTime.length; i++) {
        for (let i = 0; i < this.shopInfo.hours.length; i++) {
          // 开始时间
          let beginTimeHours = parseFloat(this.shopInfo.hours[i].beginTime.split(':')[0])
          let beginTimeMinte = parseFloat(this.shopInfo.hours[i].beginTime.split(':')[1]) + this.shopInfo.makingTime +
            this.shopInfo.dispatching.duration
          this.beginTime = new Date(this.beginTime).setHours(beginTimeHours)
          this.beginTime = new Date(this.beginTime).setMinutes(beginTimeMinte)
          this.beginTime = new Date(this.beginTime).setSeconds(0, 0)
          // 结束时间
          let endTimeHours = parseFloat(this.shopInfo.hours[i].endTime.split(':')[0])
          let endTimeMinte = parseFloat(this.shopInfo.hours[i].endTime.split(':')[1]) + this.shopInfo.makingTime +
            this.shopInfo.dispatching.duration - 15
          this.endTime = new Date(this.endTime).setHours(endTimeHours)
          this.endTime = new Date(this.endTime).setMinutes(endTimeMinte)
          this.endTime = new Date(this.endTime).setSeconds(0, 0)
          // 预约时间判断区间 开始
          let bespeakOncTime = new Date().setMinutes(new Date().getMinutes() + this.shopInfo.makingTime +
            this.shopInfo.dispatching.duration)
          bespeakOncTime = new Date(bespeakOncTime).setSeconds(0, 0)
          // 判断时间2
//          let onceTime = new Date(new Date().setMinutes(new Date().getMinutes() + this.shopInfo.makingTime +
//              this.shopInfo.dispatching.duration + 15))
          if ((bespeakOncTime >= this.beginTime && bespeakOncTime <= this.endTime)) {
            // 开始第一次时间
            let oneTimeIndex = Math.floor(new Date(bespeakOncTime).getMinutes() / 15)
            let flagTime = 0
            let flagTimeArr = []
            if (oneTimeIndex === 0) {
              flagTime = new Date(bespeakOncTime).setMinutes(15)
            } else if (oneTimeIndex === 1) {
              flagTime = new Date(bespeakOncTime).setMinutes(30)
            } else if (oneTimeIndex === 2) {
              flagTime = new Date(bespeakOncTime).setMinutes(45)
            } else if (oneTimeIndex === 3) {
              flagTime = new Date(new Date(bespeakOncTime).setUTCMinutes(0)).setHours(new Date(bespeakOncTime).getHours() + 1)
            }
            do {
              flagTimeArr.push(flagTime += 900000)
            }
            while (flagTime < this.endTime)
            this.options = this.options.concat(flagTimeArr)
          }
          if ((bespeakOncTime <= this.beginTime && bespeakOncTime <= this.endTime)) {
            // 开始第一次时间
            let oneTimeIndex = Math.floor(new Date(this.beginTime).getMinutes() / 15)
            let flagTimeS = 0
            let flagTimeSArr = []
            if (oneTimeIndex === 0) {
              flagTimeS = new Date(this.beginTime).setMinutes(15)
            } else if (oneTimeIndex === 1) {
              flagTimeS = new Date(this.beginTime).setMinutes(30)
            } else if (oneTimeIndex === 2) {
              flagTimeS = new Date(this.beginTime).setMinutes(45)
            } else if (oneTimeIndex === 3) {
              flagTimeS = new Date(new Date(this.beginTime).setUTCMinutes(0)).setHours(new Date(this.beginTime).getHours() + 1)
            }
            do {
              flagTimeSArr.push(flagTimeS += 900000)
            }
            while (flagTimeS < this.endTime)
            this.options = this.options.concat(flagTimeSArr)
          }
        }
      },
      // 优惠列表查询
      getDiscountList() {
        const data = {
          customerId: this.customerId,
          shopId: this.shopId,
          pageIndex: 1,
          pageSize: 10
        }
        this.axios.get(`/br/shop/discount/list${this.PublicJs.createParams(data)}`).then((res) => {
          res = res.data
          if (res.data.discountList.length) {
            this.discountList = res.data.discountList
            if (this.discounSwitch) {
              this.isDiscountFun(res.data.discountList)
            } else {
              this.allNum = this.allPrice + this.feesPrice
            }
          } else {
            this.allNum = this.allPrice + this.feesPrice
          }
        })
      },
      //  红包
      getRedEnvelope() {
        const data = {
          shopId: this.shopId,
          customerId: this.customerId
        }
        this.axios.get(`/br/customer/redEnvelope${this.PublicJs.createParams(data)}`).then((res) => {
          res = res.data
          if (res.success) {
            this.endDate = res.data.endDate
            this.boonPrice = res.data.price
            this.redEnvelopeId = res.data.redEnvelopeId
          }
        })
      },
      // 默认地址
      async getAddRess(id) {
        if (id) { // 改变地址
          const data = {
            sessionId: this.customerId,
            addressId: id,
            shopId: this.shopId
          }
          this.axios.get(`/br/customer/address${this.PublicJs.createParams(data)}`).then((res) => {
            res = res.data
            if (res.success) {
              this.addRess = res.data
              if (res.data) {
                this.getDispatchPrice(res.data.distance)
              } else {
                this.getDispatchPrice(res.data)
              }
            }
          })
        } else {  // 默认地址
          const data = {
            sessionId: this.customerId,
            shopId: this.shopId
          }
          this.axios.get(`/br/customer/address/default${this.PublicJs.createParams(data)}`).then((res) => {
            res = res.data
            if (res.success === true) {
              this.addRess = res.data
              if (res.data) {
                this.getDispatchPrice(res.data.distance)
              } else {
                this.getDispatchPrice(res.data)
              }
            }
          })
        }
      },
      // 异步初始化获取数据
      async initData() {
        // 先将当前商品的购物车数据进行处理，每个商品的信息作为一个对象放入数组中
        this.newShopCart = []
//        console.log(this.newShopCart)
        this.orderDish = []
//        console.log(JSON.stringify(this.shopCart))
        Object.values(this.shopCart).forEach(categoryItem => {
          Object.values(categoryItem).forEach(itemValue => {
            Object.values(itemValue).forEach(specItem => {
              Object.values(specItem).forEach(item => {
//                console.log(JSON.stringify(item))
                // this.packPrice += item.num * item.packingFee
                if (item.price !== null && item.price >= 0 && item.num > 0) {
                  if (item.dishTypeStyle === 1) { // 爆款属性
                    this.discounSwitch = false
                    if (item.overflowNum > 0) { // 是爆款 但是已经超出限制范围
//                    console.log(123131231231)
                      this.newShopCart.push({
                        id: item.id, // 规格id
                        name: item.name,  // 菜品名字
                        num: item.num,  // 正常数量
                        overflowNum: item.overflowNum, // 超出超出爆款限制数量
                        packingFee: item.packingFee, // 餐盒费用
                        price: item.price,  // 单价
                        specs: item.specs,  // 规格名字
                        dishTypeStyle: item.dishTypeStyle,  // 是否爆款 1是 0否
                        limitNum: item.limitNum, // 用户在可点爆款数量
                        limitCount: item.limitCount, // 爆款限制数量
                        originalPrice: item.originalPrice,  // 爆款原价
                        remainQuantity: item.remainQuantity,  // 爆款库存
                        userCount: item.userCount,  // 用户可以点多少个  取item.remainQuantity 和  item.limitCount 最小值
                        tastes: item.tastes, // 口味 对象
                        hotTyep: 0  // 是否爆款 如果是爆款 超出爆款数量限制 也是否
                      })
                      this.orderDish.push({
                        specificationId: item.id, // 规格id
                        tasteId: item.tastes === '' ? '' : item.tastes.id, // 口味id
                        count: item.limitNum, // 数量
                        price: item.price,  // 价格
                        type: 0 // 是否爆款 1是 0否
                      })
                    }
                    this.newShopCart.push({
                      id: item.id, // 规格id
                      name: item.name,  // 菜品名字
                      num: item.num,  // 正常数量
                      overflowNum: item.overflowNum, // 超出超出爆款限制数量
                      packingFee: item.packingFee, // 餐盒费用
                      price: item.price,  // 单价
                      specs: item.specs,  // 规格名字
                      dishTypeStyle: item.dishTypeStyle,  // 是否爆款 1是 0否
                      limitNum: item.limitNum, // 用户在可点爆款数量
                      limitCount: item.limitCount, // 爆款限制数量
                      originalPrice: item.originalPrice,  // 爆款原价
                      remainQuantity: item.remainQuantity,  // 爆款库存
                      userCount: item.userCount,  // 用户可以点多少个  取item.remainQuantity 和  item.limitCount 最小值
                      tastes: item.tastes, // 口味 对象
                      hotTyep: 1  // 是否爆款 如果是爆款 超出爆款数量限制 也是否
                    })
                    this.orderDish.push({
                      specificationId: item.id, // 规格id
                      tasteId: item.tastes === '' ? '' : item.tastes.id, // 口味id
                      count: item.limitNum, // 数量
                      price: item.price,  // 价格
                      type: 1 // 是否爆款 1是 0否
                    })
                  }
                  if (item.dishTypeStyle === 0) { // 非爆款 如果改数据不是爆款正常添加到渲染数组(newShopCart)和提交订单数组(orderDish)
                    this.newShopCart.push({
                      id: item.id, // 规格id
                      name: item.name,  // 菜品名字
                      num: item.num,  // 正常数量
                      overflowNum: item.overflowNum, // 超出超出爆款限制数量
                      packingFee: item.packingFee, // 餐盒费用
                      price: item.price,  // 单价
                      specs: item.specs,  // 规格名字
                      dishTypeStyle: item.dishTypeStyle,  // 是否爆款 1是 0否
                      limitNum: item.limitNum, // 用户在可点爆款数量
                      limitCount: item.limitCount, // 爆款限制数量
                      originalPrice: item.originalPrice,  // 爆款原价
                      remainQuantity: item.remainQuantity,  // 爆款库存
                      userCount: item.userCount,  // 用户可以点多少个  取item.remainQuantity 和  item.limitCount 最小值
                      tastes: item.tastes, // 口味 对象
                      hotTyep: 0  // 是否爆款 如果是爆款 超出爆款数量限制 也是否
                    })
                    this.orderDish.push({
                      specificationId: item.id, // 规格id
                      tasteId: item.tastes === '' ? '' : item.tastes.id, // 口味id
                      count: item.num,  // 数量
                      price: item.dishTypeStyle === 0 ? item.price : item.originalPrice, // 价格
                      type: 0 // 是否爆款 1是 0否
                    })
                  }
                }
              })
            })
          })
        })
//        console.log(JSON.stringify(this.newShopCart))
        console.log(JSON.stringify(this.orderDish))
      },
      // 阶梯配送费
      getDispatchPrice(userPosition) {
        if (this.manJianFeesPrice.state === 1) {
          if (this.allPrice > this.manJianFeesPrice.price) {
            this.feesPrice = 0
            this.getDiscountList()
            this.isFeessSwitch = false
          } else {
            if (userPosition === null) { // 没有位置
              this.feesPrice = 0
              this.getDiscountList()
              this.isFeessSwitch = true
            } else { // 不满足就 去算阶梯配送费
              const data = {
                sessionId: this.customerId,
                shopId: this.shopId
              }
              this.axios.get(`/br/dispatch/price${this.PublicJs.createParams(data)}`).then((res) => {
                res = res.data
                if (res.success) {
                  res.data.forEach((item) => {
                    if (userPosition >= item.startDistance && userPosition < item.endDistance) {
                      this.feesPrice = item.price / 100
                      this.isFeessSwitch = false
                      // 优惠列表
                      this.getDiscountList()
                    }
                  })
                }
              })
            }
          }
        } else {
          if (userPosition === null) { // 没有位置
            this.feesPrice = 0
            this.getDiscountList()
            this.isFeessSwitch = true
          } else { // 不满足就 去算阶梯配送费
            const data = {
              sessionId: this.customerId,
              shopId: this.shopId
            }
            this.axios.get(`/br/dispatch/price${this.PublicJs.createParams(data)}`).then((res) => {
              res = res.data
              if (res.success) {
                res.data.forEach((item) => {
                  if (userPosition >= item.startDistance && userPosition < item.endDistance) {
                    this.feesPrice = item.price / 100
                    this.isFeessSwitch = false
                    // 优惠列表
                    this.getDiscountList()
                  }
                })
              }
            })
          }
        }
      },
      // 提交订单
      submitOrder() {
        let boonPrice = Date.parse(new Date()) > Date.parse(new Date(this.endDate)) ? 0 : this.boonPrice
        if (this.addRess) {
          const data = {
            // 商户id
            shopId: this.shopId,
            // 用户id
            customerId: this.customerId,
            // 订单餐盒费用
            packPrice: this.packPrice,
            // 所有菜
            orderDish: this.orderDish,
            // 订单配送费
            dispatchPrice: this.feesPrice,
            // 订单优惠金额
            discountPrice: this.discountPrice,
            // 用户收货ID
            addressId: this.addRess.addressId,
            // 配送方式
            dispatchType: this.selected === 0 ? 1 : 2,
            // 期望送达时间
            expectTime: parseInt(this.options[this.selected] / 1000),
            // 订单原价
            originalPrice: this.allPrice + this.feesPrice,
            // 支付金额
            paidPrice: parseFloat((this.allNum - boonPrice) < 0 ? 0.01 : (this.allNum - boonPrice).toFixed(2)),
            // 用户收货地址
            receivingAddress: `${this.addRess.address}${this.addRess.houseNum}`,
            // 发票抬头
            invoiceTitle: this.invoice,
            // 订单备注
            remark: `${this.remarkText === undefined ? '' : this.remarkText} ${this.inputText}`,
            // 所参加优惠活动ID
            shopDiscountId: this.shopDiscountId,
            // 红包金额
            redEnvelopePrice: boonPrice,
            // 红包id
            redEnvelopeId: this.redEnvelopeId
          }
          setStore('userOrderIofo', data)
          const api = '/br/order'
          this.axios.post(api, data).then((res) => {
            res = res.data
            if (res.success === SUCCESS_OK) {
              this.orderId = res.data.orderId
              this.gotoPay(res.data.orderId)
            } else if (res.code === 13023 || res.code === 13024 || res.code === 13026) {
              this.CLEAR_CART(data.shopId)
//              this.toggleToast(1, '菜品价格有变化，请重新下单')
              this.toggleToast(1, res.message)
              setTimeout(() => {
                this.$router.replace({
                  path: '/index',
                  query: {
                    'shopId': getStore('userInfo').shopId,
                    'customerId': getStore('userInfo').customerId,
                    'isDistance': 1
                  }
                })
              }, 2000)
            } else {
              this.toggleToast(1, res.message)
            }
          })
        } else {
          this.toggleToast(1, '请选择收货地址')
        }
      },
      // 去支付
      gotoPay() {
        this.getReverTime()
        this.$router.push({
          path: '/submitPay',
          query: {
            orderId: this.orderId
          }
        })
      },
      // 确认支付倒计时
      getReverTime() {
        let activeTime = Date.parse(new Date())
        for (let i = 0; i < this.shopInfo.hours.length; i++) {
          // 开始时间
          let beginTimeHours = parseFloat(this.shopInfo.hours[i].beginTime.split(':')[0])
          let beginTimeMinutes = parseFloat(this.shopInfo.hours[i].beginTime.split(':')[1])
          this.ReverBeginTime = new Date(new Date(this.ReverBeginTime).setHours(beginTimeHours)).setMinutes(beginTimeMinutes)
          // 结束时间
          let endTimeHours = parseFloat(this.shopInfo.hours[i].endTime.split(':')[0])
          let endTimeMinutes = parseFloat(this.shopInfo.hours[i].endTime.split(':')[1])
          this.ReverEndTime = new Date(new Date(this.ReverEndTime).setHours(endTimeHours)).setMinutes(endTimeMinutes)
          if ((activeTime >= this.ReverBeginTime) && (activeTime < this.ReverEndTime)) {
            let timeValue = this.ReverEndTime - activeTime
            if (timeValue > 900000) { // 满足倒计时15分钟
              this.reverseTime = Math.round(new Date().setMinutes(new Date().getMinutes() + 15) / 1000)
              setStore('reverseTime', {
                'reverseTimeKey': this.reverseTime
              })
            } else {  //  不满足15分钟
              let reverseTimeMinutes = new Date(timeValue).getMinutes()
              this.reverseTime = Math.round(new Date().setMinutes(new Date().getMinutes() + reverseTimeMinutes) / 1000)
              setStore('reverseTime', {
                'reverseTimeKey': this.reverseTime
              })
            }
            break
          } else {
            console.log('bbb' + i)
          }
        }
      },
      // 去地址列表
      gotoAddList() {
        this.$router.push({
          path: '/addList',
          query: {
            shopId: this.shopId,
            sessionId: this.customerId,
            addressId: this.addRess === null ? '' : this.addRess.addressId
          }
        })
      },
      // 判断是否可以优惠
      isDiscountFun(data) {
        let discArr = []
        let allFeesPrice = this.allPrice
        let newTime = Date.parse(new Date()) / 1000
//        let beginTime = Date.parse(new Date(data.beginTime)) / 1000
//        let endTime = Date.parse(new Date(data.endTime)) / 1000
        for (let i = 0; i < data.length; i++) {
          if (Date.parse(new Date(data[i].beginTime)) / 1000 <= newTime <= Date.parse(new Date(data[i].endTime)) /
            1000) {
            if (allFeesPrice >= parseFloat(parseFloat(data[i].conditionAmount).toFixed(2))) {
              discArr.push(data[i])
              this.isDiscount = true
              if (allFeesPrice - discArr[0].reductionAmount > 0) {
                this.allNum = (allFeesPrice - parseFloat(discArr[0].reductionAmount)) + this.feesPrice
                this.shopDiscountId = discArr[0].discountId
                this.discountPrice = discArr[0].reductionAmount
              } else {
                this.allNum = 0 + this.feesPrice
              }
            } else {
              this.isDiscount = false
              this.allNum = allFeesPrice + this.feesPrice
            }
          } else {
            this.allNum = allFeesPrice
            this.isDiscount = false
          }
        }
      },
      // toggle toast
      toggleToast(show, text) {
        if (show === true || show === 1) {
          this.toastShow = !this.toastShow
          this.toastText = text
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.toastShow = !this.toastShow
          }, 1500)
        } else {
          return
        }
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      },
      // 保留2位
      toFixedFil(val) {
        return val.toFixed(2)
      }
    },
    components: {
      toast
    }
  }
</script>

<style>
  .submitOrder-wrapper {
    padding-bottom: 49px;
  }

  .address-wrapper {
    position: relative;
    box-sizing: border-box;
    margin-bottom: 14px;
    padding: 18px 14px 16px 17px;
    width: 100%;
    height: 67px;
    line-height: 33px;
    font-size: 0;
    background: #ffffff;
  }

  .address-wrapper .address-yes,
  .address-wrapper .address-not {
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    padding-left: 42px;
    padding-right: 28px;
    width: 100%;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: #343434;
  }

  .address-wrapper .address-yes .submitOrder-header {
    margin-bottom: 9px;
    line-height: 14px;
    font-size: 14px;
    font-weight: 600;
    color: #343434;
  }

  .address-wrapper .address-yes .submitOrder-header .name {
    margin-right: 8px;
  }

  .address-wrapper .address-yes .content {
    line-height: 12px;
    font-size: 12px;
    color: #949494;
  }

  .address-wrapper .icon_Location {
    position: absolute;
    display: inline-block;
    margin-right: 22px;
    color: #ff8932;
    font-size: 21px;
  }

  .address-wrapper .btn_right {
    position: absolute;
    right: 14px;
    top: 18px;;
    display: inline-block;
    vertical-align: top;
    color: #d7d7d7;
    font-weight: 700;
    font-size: 14px;
  }

  .serviceTime-wrapper {
    position: relative;
    box-sizing: border-box;
    margin-bottom: 14px;
    padding: 0 14px;
    width: 100%;
    height: 39px;
    line-height: 39px;
    font-size: 0;
    border-left: 5px solid #ff6651;
    background: #ffffff;
  }

  .serviceTime-wrapper .icon_time {
    display: inline-block;
    vertical-align: top;
    margin-right: 16px;
    color: #ff8932;
    font-size: 21px;
  }

  .serviceTime-wrapper .text {
    display: inline-block;
    color: #343434;
    font-size: 14px;
    font-weight: 700;
  }

  .serviceTime-wrapper .soon {
    display: inline-block;
    float: right;
    padding-right: 10px;
    padding-top: 10px;
    color: #ff8923;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
  }

  .serviceTime-wrapper .time-wrapper {
    display: inline-block;
    float: right;
    margin-right: 20px;
    color: #ff8923;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
  }

  .serviceTime-wrapper .time-wrapper .title {
    display: inline-block;
    padding-right: 10px;
    font-size: 14px;
    line-height: 14px;
    border-right: 1px solid #ff8932;
  }

  .serviceTime-wrapper .time-wrapper .time {
    display: inline-block;
    padding-left: 10px;
    font-size: 14px;
  }

  .serviceTime-wrapper .time-wrapper .timeItem {
    letter-spacing: 2px;
  }

  .serviceTime-wrapper .time-select {
    /*display: none;*/
    position: absolute;
    top: 0;
    right: 0px;
    width: 210px;
    height: 39px;
    color: #ff8923;
    font-size: 14px;
    font-weight: 500;
    border: none;
    opacity: 0;
  }

  .serviceTime-wrapper .time-select .select-item {
    text-align: center;
  }

  .serviceTime-wrapper .btn_right {
    display: inline-block;
    vertical-align: top;
    position: absolute;
    right: 14px;
    color: #d7d7d7;
    font-weight: 700;
    font-size: 14px;
  }

  .orderDetail-wrapper {
    margin-bottom: 14px;
    width: 100%;
    min-height: 37px;
    background: #ffffff;
  }

  .orderDetail-wrapper .title {
    padding-left: 17px;
    height: 37px;
    line-height: 37px;
    font-size: 14px;
    font-weight: 700;
    border-bottom: 1px solid #f1f1f1;
  }

  .orderDetail-wrapper .order-list {
    box-sizing: border-box;
    padding-left: 17px;
  }

  .orderDetail-wrapper .order-list .list-content .food_list_item {
    box-sizing: border-box;
    display: flex;
    /*line-height: 37px;*/
    /*padding-right: 14px;*/
    /*height: 50px;*/
    padding: 12px 14px 12px 0;
    width: 100%;
    color: #949494;
    /*border-bottom: 1px solid #f1f1f1;*/
  }

  .orderDetail-wrapper .order-list .list-content .food_list_item .price {
    flex: 0 0 130px;
    padding-left: 12px;
    text-align: right;
    font-size: 13px;
    /*font-weight: 600;*/
    color: #343434;
  }

  .orderDetail-wrapper .order-list .list-content .manJianFeesPrice {
    box-sizing: border-box;
    display: flex;
    line-height: 44px;
    padding-right: 14px;
    height: 44px;
    width: 100%;
    border-bottom: 1px solid #f1f1f1;
  }

  .orderDetail-wrapper .order-list .list-content .manJianFeesPrice .price {
    display: flex;
    flex-direction: column;
    flex: 0 0 130px;
    padding-left: 12px;
    padding-top: 7px;
    text-align: right;
    font-size: 13px;
    /*font-weight: 600;*/
    color: #343434;
  }

  .orderDetail-wrapper .order-list .list-content .manJianFeesPrice .price .price_num {
    /*display: block;*/
    height: 13px;
    line-height: 13px;
    font-size: 13px;
  }

  .orderDetail-wrapper .order-list .list-content .manJianFeesPrice .price .price_desc {
    /*display: block;*/
    margin-top: 3px;
    font-size: 10px;
    line-height: 10px;
    height: 10px;
    color: #949494;
  }

  .orderDetail-wrapper .order-list .list-content .food_list_item .num {
    color: #949494;
  }

  .orderDetail-wrapper .order-list .list-content .food_list_item .name_num {
    width: 100%;
    margin-right: 30px;
    font-size: 13px;
    position: relative;
    width: 100%;
    padding-right: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /*color: #949494;*/
  }

  .orderDetail-wrapper .order-list .list-content .food_list_item .name_num .name {
    width: 100%;
    display: inline-block;
  }

  .orderDetail-wrapper .order-list .list-content .food_list_item .name_num .name .huo {
    margin-right: 4px;
    color: #ff553e;
  }

  .orderDetail-wrapper .order-list .list-content .food_list_item .price .originalPrice {
    margin-right: 7px;
    font-size: 12px;
    color: #9c9c9c;
  }

  .orderDetail-wrapper .order-list .list-content .food_list_item .name_num .specs {
    /*position: absolute;*/
    display: block;
    margin-top: 10px;
    /*top: 10px;*/
    /*left: 0;*/
    font-size: 11px;
    color: #bababa;
  }

  .orderDetail-wrapper .order-list .boonBox,
  .orderDetail-wrapper .order-list .discount {
    height: 37px;
    line-height: 37px;
    font-size: 13px;
  }

  .orderDetail-wrapper .order-list .discount .discount-title {
    padding-left: 25px;
    padding-right: 14px;
    font-size: 14px;
    color: #343434;
    border-bottom: 1px solid #f1f1f1;
    background: url("../../assets/icon_activity_status0.png") no-repeat left center;
    background-size: 15px 15px;
  }

  .orderDetail-wrapper .order-list .boonBox .boonBox-title .boonBox-num,
  .orderDetail-wrapper .order-list .discount .discount-title .discount-num {
    float: right;
    font-size: 14px;
    color: #ff8943;
  }

  .orderDetail-wrapper .order-list .boonBox .boonBox-title {
    padding-left: 25px;
    padding-right: 14px;
    font-size: 14px;
    color: #343434;
    border-bottom: 1px solid #f1f1f1;
    background: url("../../assets/icon_packets.png") no-repeat left center;
    background-size: 11px 14px;
  }

  .orderDetail-wrapper .order-list .totalPrice {
    height: 37px;
    line-height: 37px;
    /*line-height: 13px;*/
    /*padding-top: 7px;*/
    padding-right: 14px;
    text-align: right;
    font-size: 13px;
    color: #2b2a2e;
  }

  .orderDetail-wrapper .order-list .isTotalPrice {
    line-height: 13px;
    padding-top: 7px;
    padding-right: 14px;
    text-align: right;
    font-size: 13px;
    color: #2b2a2e;
  }

  .orderDetail-wrapper .order-list .totalPrice .totaPrice-num {
    color: #ff8932;
  }

  .orderDetail-wrapper .order-list .isTotalPrice .noFessPrice {
    display: block;
    margin-top: 3px;
    margin-left: 4px;
    padding-bottom: 5px;
    font-size: 10px;
    color: #949494;
  }

  .remark-wapper {
    box-sizing: border-box;
    margin-bottom: 14px;
    padding-left: 14px;
    width: 100%;
    min-height: 37px;
    background: #ffffff;
  }

  .remark-wapper .routerLink {
    font-size: 13px;
    font-weight: 700;
    color: #343434;
  }

  .remark-wapper .remark-title {
    box-sizing: border-box;
    padding-right: 14px;
    height: 37px;
    line-height: 37px;
    border-bottom: 1px solid #f1f1f1;
  }

  .remark-wapper .invoicetitle {
    box-sizing: border-box;
    padding-right: 14px;
    height: 37px;
    line-height: 37px;
  }

  .remark-wapper .remark-title .btn_right,
  .remark-wapper .invoicetitle .btn_right {
    display: inline-block;
    vertical-align: top;
    float: right;
    color: #d7d7d7;
    font-weight: 700;
    font-size: 14px;
  }

  .submitOrder-btn {
    display: flex;
    position: fixed;
    z-index: 30;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 49px;
    line-height: 49px;
    color: #ffffff;
    font-size: 16px;
  }

  .submitOrder-btn .price {
    flex: 1;
    padding-left: 15px;
    background: #59595b;
  }

  .submitOrder-btn .price .noFessPrice {
    margin-left: 4px;
    font-size: 10px;
    font-weight: 100;
  }

  .submitOrder-btn .submit-btn {
    flex: 0 0 107px;
    width: 107px;
    text-align: center;
    font-weight: 700;
    background: #ff8932;
    letter-spacing: 1px;
  }

  .time-select {
    width: 100px;
    font-size: 12px;
  }
</style>
