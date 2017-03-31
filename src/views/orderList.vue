<template>
  <div class="orderlist-wrap" id="orderlist">
    <div id="orderlist_scroll">
      <ul>
        <li class="bg-white" v-for="item in orderList" @click="viewDetail(item.id)">
          <p class="bb">
            {{item.orderTime}}
            <!-- <span :class="item.state === 0 ? 'order-status0': item.state === 1 ? 'order-status1' : item.state === 2 || item.state === 3 ? 'order-status2' : item.state === 4 ? 'order-status3' : item.state === 5 ? 'order-status4' : item.state === 6 ? 'order-status5' : 'order-status0'">{{orderStatusText[item.state]}}</span> -->
            <span v-if="item.state === 0" class="order-status0">{{orderStatusText[item.state]}}</span>
            <span v-else-if="item.state === 1" class="order-status1">{{orderStatusText[item.state]}}</span>
            <span v-else-if="item.state === 2 || item.state === 3"
                  class="order-status2">{{orderStatusText[item.state]}}</span>
            <span v-else-if="item.state === 4" class="order-status3">{{orderStatusText[item.state]}}</span>
            <span v-else-if="item.state === 5" class="order-status4">{{orderStatusText[item.state]}}</span>
            <span v-else-if="item.state === 6" class="order-status5">{{orderStatusText[item.state]}}</span>
            <span v-else class='order-status0'>{{orderStatusText[item.state]}}</span>
          </p>
          <p>￥{{item.payPrice}}</p>
        </li>
      </ul>
      <p class="data-status">{{dataStatus}}</p>
    </div>
    <toast :show="toastShow" :text="toastText"></toast>
  </div>
</template>
<script>
  import Toast from './../components/toast.vue'
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
      this.sessionId = this.$route.query.shopId
      this.getOrderList()
    },
    data () {
      return {
        sessionId: '',
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
          console.log('** 订单列表 **')
          console.log(JSON.stringify(data))
          console.log(res)
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
      viewDetail (id) {
        this.$router.push({
          path: '/orderDetail',
          query: {
            'id': id,
            'sid': this.sessionId
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
   * 1: 已付款
   * 2: 已接单
   * 3: 配送中
   * 4: 已完成
   * 5: 订单关闭
   */
  .order-status0 {
    color: #ff5083;
  }

  .order-status1,
  .order-status2,
  .order-status3 {
    color: #ff8932;
  }

  .order-status4 {
    color: #343434;
  }

  .order-status5 {
    color: #b3b3b3;
  }

  }

  p:last-child {
    text-align: right;
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
