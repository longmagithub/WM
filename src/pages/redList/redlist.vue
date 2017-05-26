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
            ￥<span>9{{item.price/100}}</span>
          </div>
        </li>
        <li class="footer">
          <p>没有更多了 ~ </p>
        </li>
      </ul>
      <ul class="old-packet" v-show="showIndex === 1">
        <li class="packet-list" v-for="item in redList.redpackets">
          <div class="redMessage">
            <p class="redName">{{packetNameArr[item.type]}}</p>
            <p class="redTime">{{item.startTime}}至{{item.endTime}}</p>

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
        showIndex: 0,
        shopId: '',
        customerId: '',
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
            this.redList = res.data
            console.log(this.redList)
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
    /*line-height: 25px;*/
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #FF4931;
    letter-spacing: 0;
  }

  .redList section .use-packet .packet-list .redPrice span {
    /*line-height: 30px;*/
    font-family: PingFangSC-Medium;
    font-size: 22px;
    color: #FF4931;
    letter-spacing: 0;
  }

  .redList section .old-packet {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    display: block;
    /*position: absolute;*/
    top: 0;
  }

  .redList section .old-packet .packet-list {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 63px;
    padding-right: 1%;
    padding-top: 20px;
    margin-bottom: 20px;
    background: url('../../assets/Group@2x.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
  }

  .redList section .old-packet .packet-list .redMessage {
    height: 100%;
    padding-right: 2%;
    padding-left: 2%;
  }

  .redList section .old-packet .packet-list .redMessage .redName {
    width: 100%;
    margin-bottom: 10px;
    font-size: 14px;
    color: rgba(108, 108, 108, 1);
  }

  .redList section .old-packet .packet-list .redMessage .redTime {
    width: 100%;
    height: 14px;
    font-size: 4px;
    color: rgba(108, 108, 108, 1);
  }

  .redList section .old-packet .packet-list .redMessage .redInfo {
    width: 204px;
    height: 10px;
    font-size: 9px;
    color: rgba(255, 101, 81, 1);
  }

  .redList section .old-packet .packet-list .redPrice {
    padding-bottom: 18px;
  }

  .redList section .old-packet .packet-list .red-icon {
    width: 32px;
    height: 32px;
    position: absolute;
    top: 0;
    right: 4px;
  }

  .redList section .old-packet .packet-list .redPrice p {
    font-size: 18px;
    color: rgba(108, 108, 108, 1);
  }

  .footer {
    width: 100%;
    text-align: center;
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
