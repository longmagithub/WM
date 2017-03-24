<template>
  <div class="index">
    <header class="header" ref="header">
      <router-link class="content-wrapper" tag="div" :to="{path:'/shopDetail'}" @click.stop="goSeller">
        <div class="box-content">
          <div class="logo">
            <img :src="seller.logo" alt="" width="48px" height="48px">
          </div>
          <div class="content">
            <div class="title-name">{{seller.name}}</div>
            <!-- 描述 -->
            <div class="description">
              {{seller.dispatching.name}}/{{seller.dispatching.duration}}分钟到达<span
              v-if="seller.dispatching.fees.length">/满{{seller.dispatching.fees[0]
            .price}}{{seller.dispatching.fees[0].fee| fees}}</span>
            </div>
            <div class="bulletin" v-if="seller.notice">公告：{{seller.notice}}</div>
          </div>
          <div class="enter uxwm-iconfont btn_right"></div>
        </div>
        <div class="activity">
          <span class="text">{{seller.dispatching.activity[0].title}}</span>
          <span class="number">{{seller.dispatching.activity.length}}个活动</span>
        </div>
      </router-link>
      <div class="user">
        <div class="user-btn" @click="goUser">我的订单</div>
      </div>
      <div class="background">
        <img :src="seller.logo" alt="" width="100%" height="100%">
      </div>
    </header>
    <div class="tab">
      <div class="tab-item">
        <span class="label">商品</span>
      </div>
    </div>
    <div class="main">
      <goods :seller="seller" :isYingye="isYingye"></goods>
    </div>
    <toast :show="toastShow" :text="'toastText'"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import goods from '../goods/goods.vue'
  import {urlParse} from '../../common/js/util'
  import toast from '../../components/toast.vue'

  const SUCCESS_OK = true
  export default{
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse()
            return queryParam.id
          })()
        },
        shopId: '',
        toastShow: false,
        toastText: '',
        nowTime: new Date(),
        endTime: '',
        deliveryfee: {}, // 配送费
        isYingye: true, // 是否营业
        shopStatus: 0 // 门店状态
      }
    },
    created() {
      // 门店状态
      // this.getShopStatus()

      // 营业时间
      // this.getBusinesshours()

      // 商家信息
      // this.axios.get(`${this.api}/br/shop/detail?shopId=${this.shopId}`).then((res) => {
      // 接口通了  注释下面的 打开上面的
      this.axios.get('./api/seller').then((res) => {
        res = res.data
        if (res.success === SUCCESS_OK) {
          // 排序
          res.data.dispatching.fees = this.PublicJs.bubbleSort(res.data.dispatching.fees,
            res.data.dispatching.fees.price)
          this.seller = Object.assign({}, this.seller, res.data)
          // 设置微信title
          this.PublicJs.changeTitleInWx(this.seller.name.split('（')[0])
        }
      })
    },
    methods: {
      // 营业时间
      getBusinesshours() {
        this.axios.get('/br/shop/businesshours?shopId=' + this.shopId).then((res) => {
          if (res.data.success) {
            res = res.data.data
            let strB = res.beginTime.split('：', 2)
            let strE = res.endTime.split('：', 2)
            let b = new Date()
            let e = new Date()
            b.setHours(strB[0])
            b.setMinutes(strB[1])
            e.setHours(strE[0])
            e.setMinutes(strE[1])
            if (this.nowTime.getTime() - b.getTime() >= 0 && this.nowTime.getTime() - e.getTime() <= 0) {
              this.isYingye = true
              console.log('yes')
            } else {
              this.isYingye = false
              this.toggleToast(true, '没在营业时间内')
              console.log('no')
            }
          }
        })
      },
      // 门店门店状态
      getShopStatus() {
        this.axios.get(`${this.api}/br/shop/status?shopId=${this.shopId}`).then((res) => {
          if (res.success) {
            if (res.data === 1) {
              return
            } else {
              this.toggleToast(res.data, '商家关闭')
              this.isYingye = true
            }
          }
        })
      },
      // toggle toast
      toggleToast(show, text) {
        console.log('qweqweqweqweqweq')
        this.toastText = text
        if (show === true || show === 1) {
          this.toastShow = !this.toastShow
          if (this.toastShow) {
            setTimeout(() => {
              this.toastShow = !this.toastShow
            }, 1000)
          }
        } else {
          return
        }
      },
      // go 商家详情
      goSeller(ele) {
        console.log('去往商家详情')
      },
      // go 订单列表
      goUser(ele) {
        this.$router.push({path: '/orderList'})
      },
      // 配送方式查询
      getDispatching() {
        this.axios.get(`${this.api}/br/shop/dispatching?shopId=${this.shopId}`).then((res) => {
          if (res.success) {
            console.log(res)
          }
        })
      }
    },
    components: {
      goods,
      toast
    }
  }
</script>

<style scoped>
  .header {
    overflow: hidden;
    position: relative;
    padding: 15px 7px 8px 10px;
    height: 92px;
  }

  .header .content-wrapper {
    margin-right: 90px;
    font-size: 0px;
  }

  .header .content-wrapper .box-content {
    position: relative;
    display: flex;
    padding-right: 20px;
  }

  .header .content-wrapper .box-content .logo {
    flex: 0 0 48px;
  }

  .header .content-wrapper .box-content .logo img {
    border-radius: 4px;
  }

  .header .content-wrapper .box-content .content {
    flex: 1;
    margin-left: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
    color: #ffffff;
  }

  .header .content-wrapper .box-content .content .title-name {
    margin-bottom: 5px;
    font-size: 14px;
  }

  .header .content-wrapper .box-content .content .description {
  }

  .header .content-wrapper .box-content .content .bulletin {
    margin-top: 8px;
  }

  .header .content-wrapper .box-content .content .title-name,
  .header .content-wrapper .box-content .content .bulletin,
  .header .content-wrapper .box-content .content .description {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .header .enter {
    position: absolute;
    top: 23px;
    right: 0;
    width: 10px;
    height: 20px;
    font-size: 20px;
    color: #ffffff;
  }

  .header .activity {
    position: relative;
    box-sizing: border-box;
    padding-left: 17px;
    padding-right: 55px;
    margin-top: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
    color: #ffffff;
    background: url("../../assets/icon_activity_status0.png") no-repeat left center;
    background-size: 12px 12px;
  }

  .header .activity .number {
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .header .user {
    position: absolute;
    top: 24px;
    right: 7px;
  }

  .header .user-btn {
    display: block;
    line-height: 19px;
    padding: 11px;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-radius: 5px;
    text-align: center;
    font-size: 12px;
    color: #ffffff;
  }

  .header .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-size: cover;
    /*background-image: url("http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg")*/
    filter: blur(30px);
    opacity: 0.8;
  }

  .tab {
    display: flex;
    width: 100%;
    height: 45px;
    line-height: 45px;
    background: #ffffff;
    border-bottom: 1px solid #f5f5f5;
  }

  .tab-item {
    flex: 1;
    text-align: center;
  }

  .tab-item .label {
    display: block;
    color: #ff6651;
    font-size: 17px;
  }

  .appViem {
    position: relative;
  }
</style>
