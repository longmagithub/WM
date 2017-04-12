<template>
  <div class="orderlist-wrap" id="orderlist">
    <div id="orderlist_scroll">
      <ul>
        <li class="bg-white" v-for="item in orderList" @click="viewDetail(item.orderNo, item.id)">
          <p class="bb">
            {{item.orderTime}}
            <!-- <span :class="item.state === 0 ? 'order-status0': item.state === 1 ? 'order-status1' : item.state === 2 || item.state === 3 ? 'order-status2' : item.state === 4 ? 'order-status3' : item.state === 5 ? 'order-status4' : item.state === 6 ? 'order-status5' : 'order-status0'">{{orderStatusText[item.state]}}</span> -->
            <span :class="'order-status' + item.state">{{item.stateMsgC}}</span>
          </p>
          <p class="aa"><span>{{item.shopName}}</span><span>￥{{item.payPrice}}</span></p>
        </li>
      </ul>
      <p class="data-status">{{dataStatus}}</p>
    </div>
    <toast :show="toastShow" :text="toastText"></toast>
  </div>
</template>
<script>
  import Toast from './../components/toast.vue'
  import {getStore} from '../common/js/util'
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
      PublicJs.changeTitleInWx('我的订单')
      this.sessionId = this.$route.query.customerId || getStore('userInfo').customerId
//      this.shopId = this.$route.query.customerId ? this.$route.query.customerId : ''
      this.getOrderList()
    },
    methods: {
      getOrderList () {
        if (this.isAjaxing) return
        this.isAjaxing = true
        this.dataStatus = '加载中...'
        const data = {
          sessionId: this.sessionId,
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
              console.log(this.orderList)
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
  .bb {
    border-bottom: 1px solid #f1f1f1;
  }

  .orderlist-wrap {
    line-height: 1em;
    color: #343434;
    overflow-y: auto;

  ul {
    padding-top: 12px;

  li {
    margin-bottom: 12px;

  p {
    margin-left: 16px;
    padding: 16px 16px 16px 0;

  span {
    float: right;
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

  }

  p:last-child {
    /*text-align: right;*/
    display: flex;
    justify-content: space-between;
  }

  p:after {
    clear: both;
  }

  }
  }

  .data-status {
    padding: 30px 0;
    text-align: center;
  }

  }
</style>
