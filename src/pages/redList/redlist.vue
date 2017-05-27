<template>
  <div class="redList">
    <header class="redlist-header">
      <div class="red-tab"><span class="red-name" :class="{'finish': showIndex === 0}" @click="getShow(0)">可用红包</span>
      </div>
      <div class="red-tab"><span class="red-name" :class="{'finish': showIndex === 1}" @click="getShow(1)">过期红包</span>
      </div>
    </header>
    <section>
      <ul class="use-packet" v-show="showIndex === 0">
        <li class="packet-list" v-for :class="{'finish': showIndex === 1}" v-for="item in redList.redpackets">
          <div class="redMessage">
            <p class="redName">{{packetNameArr[item.type]}}</p>
            <p class="redTime">{{item.startTime}}<br>{{item.endTime}}</p>
          </div>
          <div class="redPrice">
            ￥<span>{{item.price/100}}</span>
          </div>
        </li>
        <li class="footer">
          <p>没有更多了 ~ </p>
        </li>
      </ul>
      <ul class="old-packet" v-show="showIndex === 1">
        <li class="packet-list" v-for="item in oldRedList.redpackets">
          <div class="redMessage">
            <p class="redName">{{packetNameArr[item.type]}}</p>
            <p class="redTime">{{item.startTime}}<br>{{item.endTime}}</p>
            <p class="redInfo">{{useInfoArr[item.state]}}</p>
          </div>
          <div class="redPrice">
            ￥<span>{{item.price/100}}</span>
          </div>
          <div class="red-icon" :class="'status' + item.state"></div>
        </li>
        <li class="footer">
          <p>没有更多了 ~ </p>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        redList: [],
        oldRedList: [],
        showIndex: 0,
        shopId: '',
        customerId: '',
        useInfoArr: ['', '', '被占用,取消未付款订单后可用'],
        packetNameArr: ['用户红包', '新人红包', '邀请红包']
      }
    },
    created() {
      this.shopId = this.$route.query.shopId ? this.$route.query.shopId : ''
      this.customerId = this.$route.query.customerId ? this.$route.query.customerId : ''
      this.getRedList()
      this.getRedOldList()
    },
    methods: {
      // 控制红包页面切换
      getShow(i) {
        this.showIndex = i
      },
      // 获取全部红包列表
      getRedList() {
        const data = {
          shopId: this.shopId,
          customerId: this.customerId,
          state: 1,
          type: 0
        }
        this.axios.get(`/br/shop/redpacket/list${this.PublicJs.createParams(data)}`).then((res) => {
          res = res.data
          if (res.success) {
            this.redList = res.data
            console.log(this.redList)
          }
        })
      },
      // 无效红包
      getRedOldList() {
        const data = {
          shopId: this.shopId,
          customerId: this.customerId,
          state: 0,
          type: 0
        }
        this.axios.get(`/br/shop/redpacket/list${this.PublicJs.createParams(data)}`).then((res) => {
          res = res.data
          if (res.success) {
            this.oldRedList = res.data
            console.log(this.oldRedList)
          }
        })
      }
    }
  }
</script>
<style>
  .finish {
    color: red !important;
    border-bottom: 3px solid rgba(255, 101, 81, 1);
    border-radius: 10%;
  }

  .redlist-header {
    display: flex;
    width: 100%;
    height: 43px;
    line-height: 43px;
    background: #fff;
  }

  .redlist-header .red-tab {
    flex: 1;
    text-align: center;
    font-size: 13px;
    text-align: center;
  }

  .redlist-header .red-tab .red-name {
    display: inline-block;
    width: 58px;
    height: 20px;
    line-height: 18px;
    color: #ccc;
  }

  .redList section {
    background: rgba(244, 244, 244, 1);
    position: relative;
  }

  .redList section .use-packet {
    box-sizing: border-box;
    width: 100%;
    padding: 18px;
    display: block;
  }

  .redList section .use-packet .packet-list {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 5px;
    padding: 12px 23px;
    line-height: 64px;
    background: url('../../assets/Group@2x.png') no-repeat center;
    background-size: 100% 100%;
  }

  .redList section .use-packet .packet-list .redMessage {
    flex: 1;
    padding: 3px 0px 8px 0px;
  }

  .redList section .use-packet .packet-list .redMessage .redName {
    line-height: 20px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #343434;
    letter-spacing: 0.26px;
  }

  .redList section .use-packet .packet-list .redMessage .redTime {
    margin-top: 5px;
    line-height: 14px;
    font-family: PingFangSC-Regular;
    font-size: 10px;
    color: #6C6C6C;
    letter-spacing: 0.19px;
  }

  .redList section .use-packet .packet-list .redPrice {
    flex: 0 0 86px;
    text-align: center;
    border-left: 2px solid #ebebeb;
    padding-left: 5px;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #FF4931;
    letter-spacing: 0;
  }

  .redList section .use-packet .packet-list .redPrice span {
    font-family: PingFangSC-Medium;
    font-size: 22px;
    color: #FF4931;
    letter-spacing: 0;
  }

  .redList section .old-packet {
    box-sizing: border-box;
    width: 100%;
    padding: 18px;
    display: block;
    top: 0;
  }

  .redList section .old-packet .packet-list {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    margin-top: 5px;
    padding: 12px 23px;
    line-height: 64px;
    background: url('../../assets/Group@2x.png') no-repeat center;
    background-size: 100% 100%;
    position: relative;
  }

  .redList section .old-packet .packet-list .redMessage {
    flex: 1;
    padding: 3px 0px 10px 0px;
  }

  .redList section .old-packet .packet-list .redMessage .redName {
    line-height: 20px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: rgba(201,201,201,1);
    letter-spacing: 0.26px;
  }

  .redList section .old-packet .packet-list .redMessage .redTime {
    margin-top: 5px;
    line-height: 14px;
    font-family: PingFangSC-Regular;
    font-size: 10px;
    color: rgba(201,201,201,1);
    letter-spacing: 0.19px;
  }

  .redList section .old-packet .packet-list .redMessage .redInfo {
    line-height: 13px;
    font-size: 9px;
    color: rgba(255, 101, 81, 1);
    letter-spacing: 0.12px;
  }

  .redList section .old-packet .packet-list .redPrice {
    flex: 0 0 86px;
    text-align: center;
    border-left: 2px solid #ebebeb;
    padding-left: 5px;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: rgba(201,201,201,1);
    letter-spacing: 0;
  }

  .redList section .old-packet .packet-list .red-icon {
    width: 32px;
    height: 32px;
    position: absolute;
    top: 0;
    right: 4px;
  }

  .redList section .old-packet .packet-list .redPrice span {
    font-family: PingFangSC-Medium;
    font-size: 22px;
    color: rgba(201,201,201,1);
    letter-spacing: 0;
  }

  .footer {
    width: 100%;
    text-align: center;
    margin-top: 12px;
  }

  .footer p {
    color: rgba(119, 119, 119, 1);
  }

  .status1 {
    background: url('../../assets/icon_yiguoqi_normal@2x.png');
    background-size: 32px 32px;
  }

  .status2 {
    background: url('../../assets/icon_yishiyong_normal@2x.png');
    background-size: 32px 32px;
  }

  .status3 {
    background: url('../../assets/icon_beizanyong_normal@2x.png');
    background-size: 32px 32px;
  }
</style>
