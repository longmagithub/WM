<template>
  <div class="addlist-wrap">
    <section class="addlist" v-for="item in withinRange">
      <div class="bg-white add add-available">
        <div class="add-inf" :class="item.addressId === nowSelADDId ? 'on' : 'off'" @click="selectAdd(item.addressId)">
          <p class="name-and-phone">{{item.name}} {{item.gender === 1 ? '先生' : item.gender ===2 ? '女士' : ''}}<span>{{item.phoneNumber}}</span>
          </p>
          <p>{{item.houseNum}} {{item.adress}}</p>
        </div>
        <div class="add-edit" v-on:click="addNew(item.addressId)"></div>
      </div>
    </section>
    <p class="add-un-tip" v-show="outofRange.length > 0">以下地址超出配送范围</p>
    <section class="addlist" v-for="item in outofRange">
      <div class="bg-white add add-unusable">
        <div class="add-inf">
          <p class="name-and-phone">{{item.name}} {{item.gender === 1 ? '先生' : item.gender ===2 ? '女士' : ''}}<span>{{item.phoneNumber}}</span>
          </p>
          <p>{{item.houseNum}} {{item.adress}}</p>
        </div>
        <div class="add-edit" @click="addNew(item.addressId)"></div>
      </div>
    </section>
    <div class="bg-white add-new" @click="addNew('')">
      <iconfont :iconname="icon.new"></iconfont>
      新增收货地址
    </div>
  </div>
</template>
<script>
  import {mapState, mapMutations} from 'vuex'
  export default {
    data () {
      return {
        sessionId: null, // 用户标记
        shopId: null, // 商家id
        withinRange: [], // 范围内
        outofRange: [], // 范围外
        icon: {
          new: 'btn_add_normal'
        },
        nowSelADDId: ''
      }
    },
    created() {
      this.sessionId = this.$route.query.customerId ? this.$route.query.customerId : ''
      this.nowSelADDId = this.$route.query.addressId ? this.$route.query.addressId : ''
      this.shopId = this.$route.query.shopId ? this.$route.query.shopId : ''
      // 默认地址
      this.getAddRess()
      // 地址列表
      this.getADDList()
    },
    computed: {
      ...mapState(['addressIndex'])
    },
    methods: {
      ...mapMutations(['CHOOSE_ADDRESS', 'USER_ADDRESSID']),
      // 获取地址列表
      async getADDList () {
        console.log('**地址列表**')
        const data = {
          sessionId: this.sessionId,
          shopId: this.shopId
        }
        console.log(JSON.stringify(data))
        this.axios.get(`/br/customer/address/list${this.PublicJs.createParams(data)}`)
        .then((res) => {
          console.log('**获取地址列表**')
          res = res.data
          console.log(data)
          console.log(res)
          if (res.success) {
            this.withinRange = res.data.withinRange ? res.data.withinRange : []
            this.outofRange = res.data.outOfRange ? res.data.outOfRange : []
          } else {
          }
        })
      },
      // 默认地址
      async getAddRess() {
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
      },
      selectAdd (id) {
        this.USER_ADDRESSID(id)
        this.nowSelADDId = id
        this.$router.replace({
          path: '/submitOrder',
          query: {
            shopId: this.shopId,
            customerId: this.sessionId
          }
        })
      },
      // 新增地址
      addNew (id) {
        if (id) { // 修改
          this.$router.push({
            path: '/addNew',
            query: {
              shopId: this.shopId,
              sessionId: this.sessionId,
              addressId: id
            }
          })
        } else { // 新增
          this.$router.push({
            path: '/addNew',
            query: {
              shopId: this.shopId,
              sessionId: this.sessionId
            }
          })
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
    }
  }
</script>
<style scoped lang="scss">
  .addlist-wrap {
    position: relative;
    line-height: 1em;

  .add-un-tip {
    padding: 7px 16px;
    font-size: 12px;
    color: #707070;
  }

  .add-new {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 49px;
    line-height: 49px;
    color: #ff8932;
    text-align: center;
  }

  section {

  .add {
    padding: 16px 0;
    display: flex;
    display: -webkit-flex;

  .add-inf {
    margin-left: 16px;
    font-size: 12px;
    flex-grow: 1;

  .name-and-phone {
    margin-bottom: 8px;
    font-size: 14px;

  span {
    margin-left: 7px;
  }

  }
  }

  .add-edit {
    flex-shrink: 0;
    width: 46px;
    background: url('../assets/icon_pen.png') no-repeat center center;
    background-size: 18px 18px;
  }

  }
  .add-available {

  .add-inf {
    padding-left: 37px;
    color: #949494;

  .name-and-phone {
    color: #343434;
  }

  }
  }
  .add-inf.on {
    background: url('../assets/btn_right_normal.svg') no-repeat left center;
    background-size: 20px 20px;
  }

  .add-inf.off {
    background: url('../assets/btn_right_disabled.svg') no-repeat left center;
    background-size: 20px 20px;
  }

  .add-unusable {

  .add-inf {
    color: #c5c5c5;

  .name-and-phone {
    color: #c5c5c5;
  }

  }
  }
  }
  }
</style>
