<template>
<div class="shop-detail-wrap">
  <section class="bg-white shop-ad">
    <div class="title shop-ad-title bb"><iconfont class="title-icon title-icon-ad" :iconname="icons.ad"></iconfont>商家公告</div>
    <div class="content shop-ad-content bb">{{shopDetail.notice}}</div>
  </section>
  <section class="bg-white shop-activity">
    <div class="title shop-activity-title bb"><iconfont class="title-icon title-icon-activity" :iconname="icons.activity"></iconfont>优惠活动</div>
    <div class="content shop-activity-content">
      <p class="shop-activity-item activity-status0" v-for="item in shopDetail.activity">{{item.title}}</p>
    </div>
  </section>
  <section class="bg-white shop-info">
    <div class="title shop-info-title bb"><iconfont class="title-icon title-icon-inf" :iconname="icons.info"></iconfont>商家信息</div>
    <ul>
      <li class="bt">营业时间：{{shopDetail.dispatching}}</li>
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
export default {
  mounted () {
    // 设置页面 title
    this.PublicJs.changeTitleInWx('商家详情')
    this.merchantId = this.$route.query.id || ''
    this.getShopInfo()
  },
  data () {
    return {
      toastShow: false,
      toastText: '',
      merchantId: '',
      icons: {
        ad: 'icon_Notice',
        activity: 'icon_activity',
        info: 'icon_business'
      },
      shopDetail: {}
    }
  },
  components: {
    Toast
  },
  methods: {
    getShopInfo () {
      this.axios.get(`/br/shop/detail?merchantId=${this.merchantId}`)
      .then((res) => {
        if (res.data.success) {
          this.shopDetail = res.data.data
        } else {
          this.toastShow = true
          this.toastText = '网络异常，请稍候再试'
        }
      }, (res) => {
        this.toastShow = true
        this.toastText = '网络异常，请稍候再试'
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
