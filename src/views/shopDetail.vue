<template>
<div class="shop-detail-wrap">
  <section class="bg-white shop-ad" v-if="shopDetail.notice">
    <div class="title shop-ad-title bb"><iconfont class="title-icon title-icon-ad" :iconname="icons.ad"></iconfont>商家公告</div>
    <div class="content shop-ad-content bb">{{shopDetail.notice}}</div>
  </section>
  <section class="bg-white shop-activity" v-if="shopDetail.activity">
    <div class="title shop-activity-title bb"><iconfont class="title-icon title-icon-activity" :iconname="icons.activity"></iconfont>优惠活动</div>
    <div class="content shop-activity-content">
      <p class="shop-activity-item activity-status0" v-for="item in shopDetail.activity">{{item.title}}</p>
    </div>
  </section>
  <section class="bg-white shop-info">
    <div class="title shop-info-title bb"><iconfont class="title-icon title-icon-inf" :iconname="icons.info"></iconfont>商家信息</div>
    <ul>
      <li class="bt">营业时间：
        <span style="margin-right: 5px" v-for="item in shopDetail.hours">{{item.beginTime}}-{{item.endTime}}</span></li>
      <li class="bt">地址：{{shopDetail.address}}</li>
      <li class="bt">电话：{{shopDetail.phone}}</li>
      <li class="bt" v-if="shopDetail.invoice"><label class="bill">商家支持开发票，请在下单时填写好发票抬头</label></li>
    </ul>
  </section>
  <toast :show="toastShow" :text="toastText"></toast>
</div>
</template>
<script>
import Toast from './../components/toast.vue'
import * as PublicJs from '../utils/public'
export default {
  data () {
    return {
      toastShow: false,
      toastText: '',
      shopId: '',
      customerId: '',
      icons: {
        ad: 'icon_Notice',
        activity: 'icon_activity',
        info: 'icon_business'
      },
      shopDetail: {},
      discountList: {}
    }
  },
  created () {
    // 设置页面 title
    PublicJs.changeTitleInWx('商家详情')
    this.shopId = this.$route.query.shopId || ''
    this.customerId = this.$route.query.customerId || ''
    this.getShopInfo()
    // 优惠列表
//    this.getDiscountList()
  },
  components: {
    Toast
  },
  methods: {
    getShopInfo () {
      const data = {
        shopId: this.shopId,
        customerId: this.customerId
      }
      this.axios.get(`/br/shop/detail${this.PublicJs.createParams(data)}`)
      .then((res) => {
        res = res.data
        if (res.success) {
          this.shopDetail = res.data
        } else {
          this.toastShow = true
          this.toastText = '网络异常，请稍候再试'
        }
      }, (res) => {
        this.toastShow = true
        this.toastText = '网络异常，请稍候再试'
      })
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
        if (res.success) {
          this.discountList = res.data.discountList[0]
        } else {
          this.allNum = this.allPrice + this.feesPrice
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  $iconAdColor: #e85352;
  $iconActivityColor: #ff8932;
  $iconInfColor: #32a1ff;
  // icon_subtract

  .bb {
    border-bottom: 1px solid #f1f1f1;
  }

  .bt {
    border-top: 1px solid #f1f1f1;
  }

  .shop-detail-wrap {
    padding-top: 12px;
    line-height: 1em;

    section {
      color: #747474;
      .title {
        padding: 16px;
        color: #343434;
        font-size: 15px;

        .title-icon {
          margin-right: 10px;
          font-size: 18px;
        }
        .title-icon-ad {
          color: $iconAdColor;
        }
        .title-icon-activity {
          color: $iconActivityColor;
        }
        .title-icon-inf {
          color: $iconInfColor;
        }
      }

      .content {
        padding: 0 16px;
      }

      .shop-ad-content {
        padding-top: 10px;
        padding-bottom: 10px;
        line-height: 1.77em;
      }

      .shop-activity-content {
        padding-top: 13px;
        padding-bottom: 13px;

        p {
          padding: 7px 0;
        }

        .activity-status0 {
          padding-left: 20px;
          background: url('./../assets/icon_activity_status0.png') no-repeat left center;
          background-size: 13px 13px;
        }
      }
    }

    section.shop-info {
      margin-top: 12px;

      ul {
        li {
          margin-left: 16px;
          padding: 13px 16px 13px 8px;

          .bill {
            padding-left: 20px;
            background: url('./../assets/icon_bill.png') no-repeat left center;
            background-size: 13px 13px;
          }
        }

        li:first-child {
          border: none;
        }
      }
    }
  }
</style>
