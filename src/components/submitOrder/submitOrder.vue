<template>
  <div class="submitOrder">
    <div class="submitOrder-wrapper" ref="submitOrderWrapper">
      <ul>
        <section class="address-wrapper" @click="gotoAddList">
          <i class="uxwm-iconfont icon_Location"></i>
          <div class="address-yes" v-if="addRess">
            <p class="header"><span class="name">{{addRess.name}}</span><span
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
                <li class="food_list_item" v-for="item in newShopCart" v-if="item.num > 0">
                  <div
                    class="name_num"><span class="name">{{item
                    .name}}<span class="specs" v-if="item.specs">({{item.specs}})</span></span><span
                    class="num">×{{item
                    .num}}</span></div>
                  <div class="price">￥{{item.num * item.price | toFixedFil}}</div>
                </li>
                <li class="food_list_item">
                  <div
                    class="name_num"><span class="name">餐盒费</span></div>
                  <div class="price">￥{{packPrice}}</div>
                </li>
                <li class="food_list_item">
                  <div
                    class="name_num"><span class="name">配送费</span></div>
                  <div class="price">￥{{feesPrice}}</div>
                </li>
              </ul>
            </div>
            <div class="discount" v-if="isDiscount">
              <div class="list-content"></div>
              <p class="discount-title">{{discountList.title}}
                <span class="discount-num">-￥{{discountList.reductionAmount}}</span>
              </p>
            </div>
            <div class="totalPrice">总计：<span class="totaPrice-num">￥{{allNum | toFixedFil}}</span>
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
      <div class="price">待支付￥{{allPrice + feesPrice | toFixedFil}}</div>
      <div class="submit-btn" @click="submitOrder">确认下单</div>
    </div>
    <toast :show="toastShow" :text="toastText"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import {formatDate} from '../../common/js/date'
  import {getStore, setStore} from '../../common/js/util'
  import * as PublicJs from '../../utils/public'
  import toast from '../toast.vue'
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
        endTime: new Date(), // 结束时间
        orderId: '', // 订单id
        orderDish: [], // 订单菜品
        isJinKuai: false, // 是否尽快送达
        isDiscount: false // 是否可以优惠
//        isAddressId: false // 是否有地址id
      }
    },
    created() {
      // 修改 title
      PublicJs.changeTitleInWx('确认订单')
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
      this.feesPrice = parseFloat(getStore('userPrice')[1].toFixed(2))
      this.allPrice = parseFloat(getStore('userPrice')[2].toFixed(2))
      // 默认地址
      this.getAddRess(this.addressId)
      // 优惠列表
      this.getDiscountList()
      // 默认时间 当前时间 + 出餐时间 + 配送时间
      this.estimateTime = new Date(new Date().setMinutes(new Date().getMinutes() + this.shopInfo.makingTime +
        this.shopInfo.dispatching.duration))
      // 结束时间
      let endTimeHours = parseFloat(this.shopInfo.hours[this.shopInfo.hours.length - 1].endTime.split(':')[0])
      let endTimeMinte = parseFloat(this.shopInfo.hours[this.shopInfo.hours.length - 1].endTime.split(':')[1]) - 15
      this.endTime = new Date(this.endTime).setHours(endTimeHours)
      this.endTime = new Date(this.endTime).setMinutes(endTimeMinte)
      this.endTime = new Date(this.endTime).setSeconds(0, 0)

      this.options.push(Date.parse(this.estimateTime))
      // 默认时间 当前时间 + 出餐时间 + 5
      let orderTaP = new Date().setMinutes(new Date().getMinutes() + this.shopInfo.makingTime +
        this.shopInfo.dispatching.duration + 15)
      let onceTime = new Date(new Date().setMinutes(new Date().getMinutes() + this.shopInfo.makingTime +
        this.shopInfo.dispatching.duration + 15))
      console.log(onceTime)
      console.log(onceTime.getMinutes())
      // 预计默认时间
      if (orderTaP > this.endTime) {
        this.isJinKuai = true
      } else {
        this.isJinKuai = false
        this.estimateTime = orderTaP > this.endTime ? this.endTime : orderTaP
        // 开始第一次时间
        let oneTimeIndex = Math.floor(onceTime.getMinutes() / 15)
        console.log(onceTime)
        if (oneTimeIndex === 0) {
          this.options.push(new Date(orderTaP).setMinutes(15))
        } else if (oneTimeIndex === 1) {
          this.options.push(new Date(orderTaP).setMinutes(30))
        } else if (oneTimeIndex === 2) {
          this.options.push(new Date(orderTaP).setMinutes(45))
        } else if (oneTimeIndex === 3) {
          new Date(new Date(orderTaP).setUTCMinutes(0)).setHours(new Date(orderTaP).getHours() + 1)
          this.options.push(new Date(new Date(orderTaP).setUTCMinutes(0)).setHours(new Date(orderTaP).getHours() + 1))
        }
        let oncTime = this.options[1]
        while (oncTime < this.endTime) {
          this.options.push(oncTime += 900000)
        }
      }
    },
    mounted() {
      console.log(this.options)
      this.initData()
    },
    computed: {
      ...mapState(['cartList', 'remarkText', 'inputText', 'invoice', 'userAddressId'])
    },
    methods: {
      ...mapMutations(['INIT_BUYCART', 'SAVE_SHOPID']),
      // 优惠列表查询
      async getDiscountList() {
        const data = {
          customerId: this.customerId,
          shopId: this.shopId,
          pageIndex: 1,
          pageSize: 10
        }
        this.axios.get(`/br/shop/discount/list${this.PublicJs.createParams(data)}`).then((res) => {
          res = res.data
          if (res.success) {
            this.discountList = res.data.discountList[0]
            this._isDiscount(res.data.discountList[0])
          }
        })
      },
      // 默认地址
      async getAddRess(id) {
        if (id) { // 改变地址
          const data = {
            sessionId: this.customerId,
            addressId: id
          }
          this.axios.get(`/br/customer/address${this.PublicJs.createParams(data)}`).then((res) => {
            res = res.data
            if (res.success) {
              this.addRess = res.data
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
            }
          })
        }
      },
      // 异步初始化获取数据
      async initData() {
        // 先将当前商品的购物车数据进行处理，每个商品的信息作为一个对象放入数组中
        this.newShopCart = []
        this.orderDish = []
        Object.values(this.shopCart).forEach(categoryItem => {
          Object.values(categoryItem).forEach(itemValue => {
            Object.values(itemValue).forEach(item => {
              // this.packPrice += item.num * item.packingFee
              this.newShopCart.push({
                id: item.id,
                name: item.name,
                num: item.num,
                packingFee: item.packingFee,
                price: item.price,
                specs: item.specs
              })
              this.orderDish.push({
                specificationId: item.id,
                count: item.num,
                price: item.price
              })
            })
          })
        })
      },
      // 提交订单
      submitOrder() {
        if (this.addRess) {
          const data = {
            shopId: this.shopId,
            customerId: this.customerId,
            originalPrice: this.allPrice + this.feesPrice, // 订单原价
            packPrice: this.packPrice, // 订单餐盒费用
            dispatchPrice: this.feesPrice, // 订单配送费
            discountPrice: this.isDiscount ? this.discountList.reductionAmount : 0, // 订单优惠金额
            shopDiscountId: this.isDiscount ? this.discountList.id : '', // 所参加优惠活动ID
            paidPrice: this.allNum, // 支付金额
            addressId: this.addRess.addressId,  // 用户收货ID
            receivingAddress: `${this.addRess.address}${this.addRess.houseNum}`, // 用户收货地址
            expectTime: this.options[this.selected] / 1000,  // 期望送达时间
            invoiceTitle: this.invoice, // 发票抬头
            remark: `${this.remarkText}${this.inputText}`,  // 订单备注
            orderDish: this.orderDish // 菜品规格
          }
          console.log('**提交数据**')
          console.log(this.isDiscount)
          console.log(data)
          setStore('userOrderIofo', data)
          const api = '/br/order'
          this.axios.post(api, data).then((res) => {
            res = res.data
            if (res.success === SUCCESS_OK) {
              this.orderId = res.data.orderId
              this.gotoPay()
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
        this.$router.push({
          path: '/submitPay',
          query: {
            orderId: this.orderId
          }
        })
      },
      // 去地址列表
      gotoAddList() {
        console.log(this.addRess)
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
      _isDiscount(data) {
        console.log('**是否可以优惠**')
        let allFeesPrice = this.allPrice + this.feesPrice
        let newTime = Date.parse(new Date()) / 1000
        console.log(allFeesPrice)
        let beginTime = Date.parse(new Date(data.beginTime)) / 1000
        let endTime = Date.parse(new Date(data.endTime)) / 1000
        if (beginTime <= newTime <= endTime) {
          if (allFeesPrice >= parseFloat(data.conditionAmount.toFixed(2))) {
            this.isDiscount = true
            if (allFeesPrice - data.reductionAmount > 0) {
              this.allNum = allFeesPrice - data.reductionAmount
            } else {
              this.allNum = 0
            }
          } else {
            this.isDiscount = false
            this.allNum = allFeesPrice
          }
        } else {
          this.allNum = allFeesPrice
          this.isDiscount = false
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
          }, 1000)
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

<style scoped>
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

  .address-wrapper .address-yes .header {
    margin-bottom: 9px;
    line-height: 14px;
    font-size: 14px;
    font-weight: 600;
    color: #343434;
  }

  .address-wrapper .address-yes .header .name {
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
    line-height: 37px;
    padding-right: 14px;
    height: 37px;
    width: 100%;
    border-bottom: 1px solid #f1f1f1;
  }

  .orderDetail-wrapper .order-list .list-content .food_list_item .price {
    flex: 0 0 40px;
    text-align: right;
    font-size: 12px;
    font-weight: 600;
    color: #343434;
  }

  .orderDetail-wrapper .order-list .list-content .food_list_item .name_num {
    flex: 1;
    display: flex;
    justify-content: space-between;
    margin-right: 30px;
    font-size: 13px;
    color: #949494;
  }

  .orderDetail-wrapper .order-list .list-content .food_list_item .name_num .name .specs {
    margin-left: 5px;
    font-size: 11px;
  }

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

  .orderDetail-wrapper .order-list .discount .discount-title .discount-num {
    float: right;
    font-size: 14px;
    color: #ff8943;
  }

  .orderDetail-wrapper .order-list .totalPrice {
    height: 37px;
    line-height: 37px;
    padding-right: 14px;
    text-align: right;
    font-size: 13px;
    color: #2b2a2e;
  }

  .orderDetail-wrapper .order-list .totalPrice .totaPrice-num {
    color: #ff8932;
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
    padding-left: 17px;
    background: #59595b;
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
