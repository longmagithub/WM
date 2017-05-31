<template>
  <!--把优惠按钮注释 调整 'content'padding-right: 90px; -->
  <div class="shopList">
    <ul>
      <li class="listbox" v-for="item in shopList">
        <div class="list-item" @click="goIndex(item.shopId)">
          <div class="logo">
            <img v-if="item.logo" :src="item.logo" width="51px" height="51px">
            <img v-else src="../../assets/item_logo.png" width="51px" height="51px">
          </div>
          <div class="content">
            <p class="shopTitle">{{item.shopName}}</p>
            <p class="manjian">
              <span v-for="discountsItem in item.discounts">{{discountsItem.title}}&nbsp;&nbsp;</span>
            </p>
            <div class="contentRight">
              <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
              <p class="tiemBox"><span class="tiem">{{item.duration}}分钟</span></p>
            </div>
          </div>
        </div>
        <div class="contentRight-Hui" v-if="item.showFavorableTips"
             @click="toggleParity(item.discounts, item.thirdDiscounts)"><span>惠</span></div>
      </li>
    </ul>
    <transition name="fade">
      <div class="shopListToast" @click="closeToast" v-show="shopListShow">
        <div class="textConten">
          <span class="logo"></span>
          <div class="uxwm-terrace">
            <div class="label">悠先外卖：</div>
            <div class="manjianText">
              <span v-for="item in duration">{{item.title}}&nbsp;</span>
            </div>
          </div>
          <div class="else-terrace" v-if="thirdDiscounts.length > 0">
            <div class="label">其他平台：</div>
            <div class="elsemanjianText">
              <span v-for="item in thirdDiscounts">{{item.title}}</span>
            </div>
          </div>
          <div class="else-terrace1" v-else>悠先外卖独家优惠</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  //  import {getStore} from '../../common/utils/util'
  //  import {urlParse} from '../../common/utils/util'
  export default {
    data() {
      return {
        customerId: '',
        shopList: [],
        shopListShow: false,
        itemShopList: {},
        thirdDiscounts: [], // 其他平台
        duration: [],  // uxwm平台
        latLon: []
      }
    },
    created() {
      this.customerId = this.$route.query.customerId
      console.log(this.customerId)
//      this.getLocation()
    },
    methods: {
      // 原生获取地理位置
      getLocation() {
//        window.alert('获取地理位置000000')
//        console.log('12311231312434342324243')
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((location) => {
//            window.alert('获取成功')
            let coords = location.coords
            let longitude = coords.longitude // 经度
            let latitude = coords.latitude // 纬度
            this.getShopList(this.customerId, longitude, latitude)
          }, (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
//                window.alert('定位失败,用户拒绝请求地理定位11111')
                break
              case error.POSITION_UNAVAILABLE:
//                window.alert('定位失败,位置信息是不可用22222')
                break
              case error.TIMEOUT:
//                window.alert('定位失败,请求获取用户位置超时33333')
                break
              case error.UNKNOWN_ERROR:
//                window.alert('定位失败,定位系统失效44444')
                break
            }
            this.getShopList(this.customerId, 0, 0)
          })
        } else {
//          window.alert('无法获取到您的地理定位55555')
        }
      },
      // 请求门店列表
      getShopList(id, lon, lat) {
        const data = {
          customerId: id,
          pageSize: 30,
          pageNumber: 1,
          longitude: lon, // 经度
          latitude: lat, // 维度
          discounts: [], // uxwm 满减
          thirdDiscounts: [] // 其他平台满减
        }
        this.axios.get(`/br/shop/list${this.PublicJs.createParams(data)}`).then((res) => {
          res = res.data
          if (res.success) {
            if (res.data.length > 0) {
              if (lon > 0 && lat > 0) { // 经纬度获取成功
                this.goIndex(res.data[0].shopId)
                return
              }
              res.data.forEach((data) => {
                data.discounts = data.discounts.reverse()
                data.thirdDiscounts = data.thirdDiscounts.reverse()
                // 添加 图片分割
                if (data.logo) {
                  data.logo = data.logo + '?x-oss-process=image/resize,m_fill,h_100,w_100'
                }
              })
              this.shopList = res.data
            }
          }
        })
      },
      //  显示比价弹窗
      toggleParity(duration, thirdDiscounts) {
        if (duration.length > 0) {
          this.duration = []
          this.thirdDiscounts = []
          this.duration = duration
          this.thirdDiscounts = thirdDiscounts
          this.shopListShow = true
        } else {
//          console.log('全为空')
          return
        }
      },
      // 关闭 比较 toast
      closeToast() {
        this.shopListShow = false
      },
      // 去首页
      goIndex(id) {
//        window.location.href =
//          'http://newpay.tunnel.qydev.com/VAOrderH5/?#/index?shopId=' + id + '&customerId=' + this.customerId + '&T=' + Date.parse(new Date()) / 1000
        this.$router.push({
          path: '/index',
          query: {
            shopId: id,
            customerId: this.customerId
          }
        })
      }
    }
  }
</script>
<style>
  .shopList {
    background: #fff;
  }

  .shopList .listbox {
    position: relative;
  }

  .shopList .listbox .contentRight-Hui {
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 10px 10px 25px 25px;
  }

  .shopList .listbox .contentRight-Hui span {
    display: block;
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    font-family: STYuanti-TC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    border-radius: 50%;
    background: #FFA74E;
    box-shadow: 0 2px 2px 0 rgba(255, 166, 78, 0.50);
  }

  .shopList .list-item {
    box-sizing: border-box;
    display: flex;
    padding: 8px 12px 10px 8px;
    border-bottom: 5px solid #f5f5f5;
    /*margin-bottom: 15px;*/
  }

  .shopList .listbox:first-child {
    border-top: 10px solid #f5f5f5;
  }

  .shopList .list-item .logo {
    flex: 0 0 51px;
    width: 51px;
    height: 51px;
    margin-right: 16px;
  }

  .shopList .list-item .logo > img {
    border-radius: 7px;
    border: 1px solid #f5f5f5;
  }

  .shopList .list-item .content {
    flex: 1;
    box-sizing: border-box;
    position: relative;
    line-height: 1em;
    /*padding-right: 90px;*/
    padding-right: 50px;
    overflow: hidden;
  }

  .shopList .list-item .content .shopTitle {
    line-height: 20px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .shopList .list-item .content .desc {
    line-height: 20px;
    margin-top: 12px;
    color: #6c6c6c;
  }

  .shopList .list-item .content .manjian {
    box-sizing: border-box;
    width: 100%;
    font-size: 10px;
    color: #8a8888;
    margin-top: 15px;
    padding-left: 17px;
    line-height: 14px;
    background: url("../../assets/icon_activity_status0.png") no-repeat left top;
    background-size: 13px 13px;
  }

  .shopList .list-item .content .contentRight {
    position: absolute;
    top: 0;
    right: 0;
  }

  .shopList .list-item .content .contentRight .tiemBox {
    margin-top: 35px;
    line-height: 14px;
    font-size: 10px;
    color: #ddd;
  }

  .shopList .list-item .content .contentRight .tiemBox .tiem {
    color: #FFA74E;
  }

  .shopList .list-item .content .contentRight .tiemBox .distance {
    color: #a2a2a2;
  }

  .shopList .shopListToast {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    /*backdrop-filter: blur(10px);*/
    opacity: 1;
    background: rgba(0, 0, 0, 0.4);
  }

  .shopList .shopListToast .textConten {
    position: relative;
    top: 35%;
    margin: 0 auto;
    width: 76%;
    padding: 3px;
    border-radius: 20px;
    background: #fff;
  }

  .shopList .shopListToast .textConten .logo {
    display: block;
    position: absolute;
    top: -27px;
    width: 100%;
    height: 36px;
    background: url("../../assets/VS@2x.png") no-repeat center;
    background-size: 56px;
  }

  .shopList .shopListToast .textConten .uxwm-terrace {
    display: flex;
    justify-content: flex-start;
    padding: 18px 18px 12px 18px;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #FA753E;
    line-height: 20px;
    border-bottom: 1px solid #f5f5f5;
  }

  .shopList .shopListToast .textConten .else-terrace1 {
    padding: 11px 18px 12px 18px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #8C8C8C;
    line-height: 20px;
    text-align: center;
  }

  .shopList .shopListToast .textConten .else-terrace {
    display: flex;
    justify-content: flex-start;
    padding: 11px 18px 12px 18px;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #8C8C8C;
    line-height: 20px;
  }

  .shopList .shopListToast .textConten .uxwm-terrace .label,
  .shopList .shopListToast .textConten .else-terrace .label {
    flex: 0 0 65px;
  }

  .shopList .shopListToast .textConten .uxwm-terrace .manjianText {
    flex: 1;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #FA753E;
    line-height: 20px;
  }

  .shopList .shopListToast .textConten .else-terrace .elsemanjianText {
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #8C8C8C;
    line-height: 20px;
  }

  .shopList .shopListToast .textConten .uxwm-terrace .label {
    font-family: PingFangSC-Medium;
    font-size: 13px;
    color: #FA753E;
  }

  .shopList .fade-enter-active, .shopList .fade-leave-active {
    transition: all 0.3s;
  }

  .shopList .fade-enter, .shopList .fade-leave-active {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
</style>
