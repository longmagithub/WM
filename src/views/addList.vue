<template>
  <div class="addlist-wrap">
    <section class="addlist" v-for="item in withinRange">
      <div class="bg-white add add-available">
        <div class="add-inf" :class="item.addressId === nowSelADDId ? 'on' : 'off'" @click="selectAdd(item.addressId)">
          <p class="name-and-phone">{{item.name}} {{item.gender === 1 ? '先生' : item.gender ===2 ? '女士' : ''}}<span>{{item.phoneNumber}}</span></p>
          <p>{{item.houseNum}} {{item.adress}}</p>
        </div>
        <div class="add-edit" v-on:click="addNew(item.addressId)"></div>
      </div>
    </section>
    <p class="add-un-tip" v-show="outofRange.length > 0">以下地址超出配送范围</p>
    <section class="addlist" v-for="item in outofRange">
      <div class="bg-white add add-unusable">
        <div class="add-inf">
          <p class="name-and-phone">{{item.name}} {{item.gender === 1 ? '先生' : item.gender ===2 ? '女士' : ''}}<span>{{item.phoneNumber}}</span></p>
          <p>{{item.houseNum}} {{item.adress}}</p>
        </div>
        <div class="add-edit" @click="addNew(item.addressId)"></div>
      </div>
    </section>
    <div class="bg-white add-new" @click="addNew">
      <iconfont :iconname="icon.new"></iconfont>
      新增收货地址
    </div>
  </div>
</template>
<script>
  export default {
    mounted () {
      this.sessionId = this.$route.query.sid ? this.$route.query.sid : ''
      this.shopId = this.$route.query.id ? this.$route.query.id : ''
      this.nowSelADDId = this.$route.query.addressId ? this.$route.query.addressId : ''
      this.getADDList()
    },
    data () {
      return {
        sessionId: '',
        shopId: '',
        withinRange: [],
        outofRange: [],
        icon: {
          new: 'btn_add_normal'
        },
        nowSelADDId: ''
      }
    },
    methods: {
      // 获取地址列表
      getADDList () {
        const data = {
          sessionId: this.sessionId,
          shopId: this.shopId
        }
        this.axios.get(`/br/customer/address/list${this.PublicJs.createParams(data)}`)
        .then((res) => {
          if (res.data.success) {
            this.withinRange = res.data.data.withinRange ? res.data.data.withinRange : []
            this.outofRange = res.data.data.outOfRange ? res.data.data.outOfRange : []
          } else {}
        })
      },
      selectAdd (id) {
        this.nowSelADDId = id
        this.$router.replace({
          path: '/submitOrder',
          query: {
            addressI: id,
            shopId: this.shopId
          }
        })
      },
      // 新增地址
      addNew (id) {
        if (id) {
          this.$router.push({
            path: '/addNew',
            query: {
              addressId: id,
              shopId: this.shopId,
              sessionId: this.sessionId
            }
          })
        } else {
          this.$router.push({
            path: '/addNew',
            query: {
              shopId: this.shopId,
              sessionId: this.sessionId
            }
          })
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
