<template>
  <div class="address-wrap">
    <ul class="bg-white">
      <li>
        <div class="left">联系人</div>
        <div class="right">
          <p>
            <input type="text" v-model="addressDetail.name" placeholder="收货人姓名">
          </p>
          <p class="gender-wrap">
            <label class="gender" :class="addressDetail.gender === 1 ? 'on' : 'off'" @click="addressDetail.gender = 1">先生</label>
            <label class="gender" :class="addressDetail.gender === 2 ? 'on' : 'off'" @click="addressDetail.gender = 2">女士</label>
          </p>
        </div>
      </li>
      <li>
        <div class="left">电话</div>
        <div class="right">
          <input type="tel" v-model="addressDetail.phoneNumber" placeholder="收货人电话">
        </div>
      </li>
      <li>
        <div class="left">地址</div>
        <div class="right">
          <p class="rightbox"><span class="city">杭州市</span>
            <!--<input type="text" v-model="addressDetail.address" placeholder="小区/写字楼/学校等">-->
            <!--<span class="addSpan">{{addressDetail.address}}</span>-->
            <select class="citySelect" v-model="addressDetail.address">
              <option class="select-item" v-for="(item, index) in addressARR" :value="item">
                <span class="title">{{item}}</span>
              </option>
            </select>
            <i class="uxwm-iconfont sanjiao"></i>
          </p>
          <p>
            <input type="text" v-model="addressDetail.houseNum" placeholder="详细地址（如门牌号等）">
          </p>
        </div>
      </li>
    </ul>
    <div class="btns">
      <button type="button" class="btn-del" :class="addressId ? 'on' : 'off'" @click="delAdderss()">删除地址</button><!--
      -->
      <button type="button" class="btn-save" @click="saveAddress"
              :class="vaild.name && vaild.phoneNumber && vaild.houseNum ? 'on' : 'off'">
        保存地址
      </button>
    </div>
    <toast :show="toastShow" :text="toastText"></toast>
  </div>
</template>
<script>
  import Toast from '../../components/toast.vue'
  import * as PublicJs from '../../common/utils/public'
  import {getStore} from '../../common/utils/util'
  export default {
    created () {
      this.addressId = this.$route.query.addressId ? this.$route.query.addressId : ''
      this.shopId = this.$route.query.shopId ? this.$route.query.shopId : ''
      this.sessionId = this.$route.query.sessionId ? this.$route.query.sessionId : ''
      if (this.addressId) {
        this.getAddressDetail(this.addressId)
        // 修改 title
        PublicJs.changeTitleInWx('修改地址')
      } else {
        // 修改 title
        PublicJs.changeTitleInWx('新增地址')
      }
      this.seller = getStore('shopInfo')
      this.address = this.seller.address.slice(6, 9)
//      console.log(getStore('shopInfo'))
//      console.log(this.seller.address.slice(6, 9))
    },
    data () {
      return {
        seller: {},
        address: '',
        toastShow: false,
        toastText: '',
        isAjaxing: false,
        shopId: '',
        sessionId: '',
        addressId: '',
        addressARR: ['上城区', '下城区', '江干区', '拱墅区', '西湖区', '滨江区', '萧山区', '余杭区', '富阳区'],
        addressDetail: {
          name: '',
          phoneNumber: '',
          address: '上城区',
//          address: '杭州市滨江区',
          houseNum: '',
          gender: 0
        },
        formValid: 0,
        vaild: {
          name: false,
          phoneNumber: false,
          address: false,
          houseNum: false,
          gender: 0
        }
      }
    },
    components: {
      Toast
    },
    watch: {
      'addressDetail.name': function (newVal, oldVal) {
        if (newVal) {
          this.vaild.name = true
        } else {
          this.vaild.name = false
        }
      },
      'addressDetail.phoneNumber': function (newVal, oldVal) {
        if (newVal && (/^1(3|4|5|7|8)\d{9}$/.test(newVal))) {
          this.vaild.phoneNumber = true
        } else {
          this.vaild.phoneNumber = false
        }
      },
      'addressDetail.address': function (newVal, oldVal) {
        if (newVal) {
          this.vaild.address = true
        } else {
          this.vaild.address = false
        }
      },
      'addressDetail.houseNum': function (newVal, oldVal) {
        if (newVal) {
          this.vaild.houseNum = true
        } else {
          this.vaild.houseNum = false
        }
      },
      'addressDetail.gender': function (newVal, oldVal) {
        if (newVal) {
          this.vaild.gender = true
        } else {
          this.vaild.gender = false
        }
      }
    },
    methods: {
      getAddressDetail (id) {
        const data = {
          sessionId: this.sessionId,
          addressId: id,
          shopId: this.shopId
        }
        this.axios.get(`/br/customer/address${this.PublicJs.createParams(data)}`)
        .then((res) => {
          if (res.data.success) {
            this.addressDetail = res.data.data
            this.addressDetail.address = res.data.data.address.slice(3)
            this.$emit('closeToast')
          }
        })
      },
      saveAddress () {
        if (!this.vaild.name) {
          this.toggleToast(1, '姓名不能为空')
          return
        } else if (!this.vaild.phoneNumber) {
          this.toggleToast(1, '手机格式不对')
          return
        } else if (!this.vaild.houseNum) {
          this.toggleToast(1, '地址不能为空')
          return
        } else if (this.addressDetail.address.indexOf(this.address) < 0) {
          this.toggleToast(1, '地区选择错误请重新选择')
          return
        }
        if (this.isAjaxing) return
        this.isAjaxing = true
        let data = {
          shopId: this.shopId,
          sessionId: this.sessionId,
          name: this.addressDetail.name,
          phoneNumber: this.addressDetail.phoneNumber,
          gender: this.addressDetail.gender,
          address: '杭州市' + this.addressDetail.address,
          houseNum: this.addressDetail.houseNum
        }
//        console.log(data)
        this.sendData(data)
      },
      sendData (data) {
        console.log(data)
        if (this.addressId) { // 修改地址
          data.addressId = this.addressId
          this.axios.put('/br/customer/address', data)
          .then((res) => {
            this.isAjaxing = false
            if (res.data.success) {
              this.$router.replace({
                path: '/addList',
                query: {
                  addressId: this.addressId,
                  shopId: this.shopId,
                  sessionId: this.sessionId
                }
              })
            } else {
              this.toggleToast(1, res.data.message)
              this.$router.replace({
                path: '/addList',
                query: {
                  addressId: this.addressId,
                  shopId: this.shopId,
                  sessionId: this.sessionId
                }
              })
            }
          }, (res) => {
            this.isAjaxing = false
            this.toggleToast(1, '网络异常，请稍候重试')
            this.$router.replace({
              path: '/addList',
              query: {
                addressId: this.addressId,
                shopId: this.shopId,
                sessionId: this.sessionId
              }
            })
          })
        } else {  // 添加地址
          let thas = this
          this.axios.post('/br/customer/address', data)
          .then((res) => {
            res = res.data
            this.isAjaxing = false
            if (res.success) {
              thas.toggleToast(1, res.message)
              this.$router.replace({
                path: '/addList',
                query: {
                  addressId: res.data,
                  shopId: this.shopId,
                  sessionId: this.sessionId
                }
              })
            } else {
              thas.toggleToast(1, res.message)
            }
          }, (res) => {
            this.toggleToast(1, res.data.data.message)
          })
        }
      },
      // 删除地址
      delAdderss () {
        if (!this.addressId) return
        if (this.isAjaxing) return
        this.isAjaxing = true
        const data = {
          addressId: this.addressId,
          sessionId: this.sessionId
        }
        this.axios({
          method: 'delete',
          url: '/br/customer/address',
          data: data
        })
        .then((res) => {
          this.isAjaxing = false
          res = res.data
          if (res.success) {
            this.$router.replace({
              path: '/addList',
              query: {
                shopId: this.shopId,
                sessionId: this.sessionId
              }
            })
          } else {
            this.toggleToast(1, res.message)
          }
        }, (res) => {
          this.toggleToast(1, '网络异常，请稍候重试')
        })
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
      },
      // 关闭 toast
      doCloseToast () {
        this.toastShow = false
      }
    }
  }
</script>
<style scoped lang="scss">
  .address-wrap {
    padding-top: 12px;
    line-height: 1em;
    color: #343434;

  ul {

  li {
    padding-left: 16px;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    display: -webkit-flex;

  input {
    width: 93%;
    height: 38px;
    border: none;
  }

  .left {
    margin-top: 13px;
    width: 62px;
  }

  .right {
    flex-grow: 1;

  .rightbox {
    display: flex;
    position: relative;
    height: 38px;
    line-height: 38px;

  .city {
    flex: 0 0 50px;
    margin-right: 10px;
  }

  .citySelect {
    flex: 1;
    padding-left: 10px;
    background: none;
    border: none;
  }

  .sanjiao {
    position: absolute;
    top: 0;
    left: 140px;
  }

  }
  .gender-wrap {
    margin: 12px 0;
  }

  p {
    border-bottom: 1px solid #f1f1f1;
  }

  p:last-child {
    border: none;
  }

  P .addSpan {
    display: block;
    width: 93%;
    height: 38px;
    line-height: 38px;
    border: none;
  }

  label {
    margin-right: 40px;
    padding-left: 30px;
  }

  .gender.on {
    background: url('../../assets/btn_right_normal.svg') no-repeat left center;
    background-size: 18px 18px;
  }

  .gender.off {
    background: url('../../assets/btn_right_disabled.svg') no-repeat left center;
    background-size: 18px 18px;
  }

  }
  }
  }
  .btns {
    padding: 0 19px;
    padding-top: 27px;

  button {
    padding: 11px 0;
    border: none;
    border-radius: 5px;
    width: 42%;
    border: 1px solid #c1c1c1;
  }

  .btn-del {
    color: #909090;
    background: #fff;
  }

  .btn-del.on {
    color: #ff8932;
    border-color: #ff8932;
  }

  .btn-del.off {
    border-color: #fff;
  }

  .btn-save {
    color: #fff;
    float: right;
  }

  .btn-save.off {
    background: #c1c1c1;
    border-color: #c1c1c1;
  }

  .btn-save.on {
    background: #ff8932;
    border-color: #ff8932;
  }

  }
  }
</style>
