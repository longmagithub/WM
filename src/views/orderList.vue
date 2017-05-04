<template>
  <div class="orderlist-wrap" id="orderlist">
    <div id="orderlist_scroll">
      <ul>
        <li class="bg-white" v-for="item in orderList" @click="viewDetail(item.orderNo, item.id)">
          <div class="orderList-logobox">
            <img v-if="item.shopLogo" :src="item.shopLogo" width="42px" height="42px">
            <img v-else src="../assets/item_logo.png" width="42px" height="42px">
            <!--<img src="../assets/logo.png" width="42px" height="42px">-->
          </div>
          <div class="oL-content">
            <div class="aa">
              <div class="orderTitle">{{item.shopName}}&nbsp&nbsp&nbsp<i class="uxwm-iconfont btn_right"></i></div>
              <span class="orderStatus" :class="'order-status' + item.state">{{item.stateMsgC}}</span>
            </div>
            <p class="bb">
              {{item.orderTime}}
              <!-- <span :class="item.state === 0 ? 'order-status0': item.state === 1 ? 'order-status1' : item.state === 2 || item.state === 3 ? 'order-status2' : item.state === 4 ? 'order-status3' : item.state === 5 ? 'order-status4' : item.state === 6 ? 'order-status5' : 'order-status0'">{{orderStatusText[item.state]}}</span> -->
              <!--<span>￥{{item.payPrice}}</span>-->
            </p>
          </div>
        </li>
      </ul>
      <p class="data-status">{{dataStatus}}</p>
    </div>
    <toast :show="toastShow" :text="toastText"></toast>
  </div>
</template>
<script>
  import Toast from './../components/toast.vue'
  import {getStore, setStore, urlParse, removeStore} from '../common/js/util'
  import * as PublicJs from '../utils/public'
  export default {
    mounted () {
      const vue = this
      const wrapper = document.getElementById('orderlist')
      const scroll = document.getElementById('orderlist_scroll')
      wrapper.style.height = `${document.body.clientHeight}px`
      wrapper.onscroll = () => {
        if ((scroll.offsetHeight - wrapper.offsetHeight - wrapper.scrollTop) < 45 && vue.hasMore) {
          vue.getOrderList()
        }
      }
    },
    data () {
      return {
        sessionId: '',
        shopId: '',
        pageIndex: 1,
        pageSize: 20,
        isAjaxing: false,
        hasMore: true,
        toastShow: false,
        toastText: '',
        dataStatus: '',
        orderList: null,
        orderStatusText: ['未付款', '已付款', '已接单', '已接单', '配送中', '已完成', '订单关闭', '已拒单']
      }
    },
    components: {
      Toast
    },
    created() {
      if (getStore('version') === null || getStore('version') !== 2017050402) {
        removeStore('version')
        removeStore('openId')
        removeStore('userInfo')
        removeStore('shopInfo')
        setStore('version', 2017050402)
        this.isCode()
      } else {
        this.isCode()
      }
    },
    methods: {
      // 判断code
      isCode() {
        let url = window.location.href
        if (getStore('openId') === null) {
          if (url.indexOf('code') < 0) {
            console.log('没有授权')
            this.to()
          } else {
            const data = {
              code: urlParse().code,
              type: 1 // 授权类型：1静默授权；2用户授权
            }
            const api = '/mp/authority/customer'
            this.axios.post(api, data).then((res) => {
              res = res.data
              this.customerId = res.data.customerId
              setStore('openId', {
                customerId: res.data.customerId
              })
              this.getOrderList(this.customerId)
            })
          }
        } else if (getStore('openId').customerId === undefined) {
          const data = {
            code: urlParse().code,
            type: 1 // 授权类型：1静默授权；2用户授权
          }
          const api = '/mp/authority/customer'
          this.axios.post(api, data).then((res) => {
            res = res.data
            this.customerId = res.data.customerId
            setStore('openId', {
              customerId: res.data.customerId
            })
            this.getOrderList(this.customerId)
          })
        } else {
          this.customerId = getStore('openId').customerId
          this.getOrderList(this.customerId)
        }
        PublicJs.changeTitleInWx('我的订单')
        this.sessionId = getStore('openId').customerId || this.$route.query.customerId || getStore('userInfo').customerId
//      this.shopId = this.$route.query.customerId ? this.$route.query.customerId : ''
      },
      // 微信授权
      to() {
        const oauthCallbackUrl =
          encodeURIComponent('http://newpay.tunnel.qydev.com/VAOrderH5/?#/orderList')
        const oauthJumpUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx96f6daa5f8a71039&redirect_uri=${oauthCallbackUrl}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
        // 跳转授权 浏览器不保留记录
//        window.location.replace(oauthJumpUrl)
        window.location.href = oauthJumpUrl
      },
      getOrderList (id) {
        if (this.isAjaxing) return
        this.isAjaxing = true
        this.dataStatus = '加载中...'
        const data = {
          sessionId: id,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        }
        this.axios.get(`/br/order/list${this.PublicJs.createParams(data)}`)
        .then((res) => {
          res = res.data
          if (res.success) {
            this.isAjaxing = false
            if (!this.orderList) {
              this.orderList = res.data.lstOrderInfos
            } else {
              for (let i = 0; i < res.data.lstOrderInfos.length; i++) {
                this.orderList.push(res.data[i])
              }
            }
            setTimeout(() => {
              if (res.data.hasMore) {
                this.dataStatus = '加载更多'
              } else {
                this.dataStatus = '没有更多了'
              }
            }, 400)
            this.$nextTick(() => {
              this.pageIndex++
              this.hasMore = res.data.hasMore
            })
          } else {
            this.dataStatus = '加载失败'
            this.toastShow = true
            this.toastText = '网络异常，请稍候再试'
            setTimeout(() => {
              this.toastShow = false
              this.toastText = ''
            }, 1000)
          }
        }, (res) => {
          this.isAjaxing = false
          this.dataStatus = '加载失败'
          this.toastShow = true
          this.toastText = '网络异常，请稍候再试'
          setTimeout(() => {
            this.toastShow = false
            this.toastText = ''
          }, 1000)
        })
      },
      viewDetail (orderNo, id) {
        this.$router.push({
          path: '/orderDetail',
          query: {
            'orderNo': orderNo,
            'orderId': id,
            'sid': this.sessionId,
            'shopId': this.shopId
          }
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  .orderlist-wrap {
    line-height: 1em;
    color: #343434;
    overflow-y: auto;
  }

  ul {
    padding-top: 12px;
  }

  .orderlist-wrap .bg-white {
    display: flex;
    margin-bottom: 12px;
  }

  .orderlist-wrap .bg-white .orderList-logobox {
    flex: 0 0 42px;
    margin: 10px;
    width: 42px;
    height: 42px;
  }

  .orderlist-wrap .bg-white .orderList-logobox img {
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .orderlist-wrap .bg-white .oL-content {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .orderlist-wrap .bg-white .oL-content .aa {
    position: relative;
    box-sizing: border-box;
    padding-top: 10px;
    padding-right: 10px;
    line-height: 20px;
  }

  .orderlist-wrap .bg-white .oL-content .aa .orderTitle {
    display: block;
    box-sizing: border-box;
    padding-right: 65px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .orderlist-wrap .bg-white .oL-content .aa .orderTitle .btn_right {
    display: inline-block;
    vertical-align: top;
    color: #B2B2B2;
    font-size: 10px;
  }

  .orderlist-wrap .bg-white .oL-content .aa .orderStatus {
    position: absolute;
    top: 8px;
    right: 10px;
  }

  .orderlist-wrap .bg-white .oL-content .bb {
    margin-top: 3px;
    line-height: 20px;
    font-size: 10px;
    color: #B2B2B2;
  }

  /*
   * 0: 未付款
   * 1: 已付款，待接单
   * 2: 已接单，待配送
   * 3: 配送中，待收货
   * 4: 配送中，待收货
   * 5: 已完成
   * 6: 订单关闭
   * 7: 商户取消订单
   * 8: 已接单，待配送
   * 9: 已接单，待配送
   * 10: 已取消
   * 11: 已退款
   * 12: 已取消
   * 13: 已接单，待接单
   */
  .order-status0 {
    color: #ff5083;
  }

  .order-status1,
  .order-status2,
  .order-status3,
  .order-status4,
  .order-status8,
  .order-status9,
  .order-status13 {
    color: #ff8932;
  }

  .order-status5,
  .order-status7,
  .order-status10,
  .order-status11,
  .order-status12 {
    color: #343434;
  }

  .order-status6 {
    color: #b3b3b3;
  }

  .orderlist-wrap .data-status {
    padding: 30px 0;
    text-align: center;
  }
</style>
