<template>
  <div class="redList">
    <header class="redlist-header">
      <div class="red-tab"><span class="red-name" :class="{'finish': showIndex === 0}" @click="getShow(0)">可用红包</span>
      </div>
      <div class="red-tab"><span class="red-name" :class="{'finish': showIndex === 1}" @click="getShow(1)">过期红包</span>
      </div>
    </header><!-- /header -->
    <section>
      <ul class="use-packet" v-show="showIndex === 0">
        <li class="packet-list" v-fo :class="{'finish': showIndex === 1}" v-for="item in redList.redpackets">
          <div class="redMessage">
            <p class="redName">{{item.name}}</p>
            <p class="redTime">{{item.useTime}}</p>
          </div>
          <div class="redPrice">
            <p>￥{{item.price/100}}</p>
          </div>
        </li>
        <li class="red-footer">
          <p>没有更多了 ~ </p>
        </li>
      </ul>
      <ul class="old-packet" v-show="showIndex === 1">
        <li class="packet-list" v-for="item in redList.redpackets">
          <div class="redMessage">
            <p class="redName">{{item.name}}</p>
            <p class="redTime">{{item.useTime}}</p>
            <p class="redInfo"></p>
          </div>
          <div class="redPrice">
            <p>￥{{item.price/100}}</p>
          </div>
        </li>
        <li class="red-footer">
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
        customerId: ''
      }
    },
    created() {
      this.shopId = this.$route.query.shopId ? this.$route.query.shopId : ''
      this.customerId = this.$route.query.customerId ? this.$route.query.customerId : ''
      this.getRedList()
    },
    methods: {
      // 控制红包页面切换
      getShow(i) {
        this.showIndex = i
      },
      getRedList() {
        const data = {
          shopId: this.shopId,
          sessionId: this.customerId,
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
    display: flex;
    margin-top: 22px;
    background: rgba(244, 244, 244, 1);
    padding: 0 20px;
    position: relative;
  }

  .redList section .use-packet {
    width: 336px;
    justify-content: center;
    align-content: center;
    display: block;
  }

  .redList section .use-packet .packet-list {
    width: 302px;
    height: 63px;
    padding-top: 20px;
    padding-left: 26px;
    padding-right: 10px;
    margin-bottom: 22px;
    background: url('Group@2x.png') no-repeat;
    background-size: 336px 83px;
  }

  .redList section .use-packet .packet-list .redMessage {
    width: 220px;
    height: 50px;
    float: left;
  }

  .redList section .use-packet .packet-list .redMessage .redName {
    width: 100px;
    height: 20px;
    margin-bottom: 2px;
    font-size: 14px;
    color: rgba(52, 52, 52, 1);
  }

  .redList section .use-packet .packet-list .redMessage .redTime {
    width: 204px;
    height: 14px;
    font-size: 10px;
    color: rgba(108, 108, 108, 1);
  }

  .redList section .use-packet .packet-list .redPrice {
    width: 34px;
    height: 35px;
    float: left;
    padding-top: 6px;
  }

  .redList section .use-packet .packet-list .redPrice p {
    font-size: 20px;
    color: red;
  }

  .redList section .old-packet {
    width: 336px;
    justify-content: center;
    align-content: center;
    position: absolute;
    left: 20px;
    top: 0;
  }

  .redList section .old-packet .packet-list {
    width: 302px;
    height: 63px;
    padding-top: 12px;
    padding-left: 26px;
    padding-right: 10px;
    padding-bottom: 11px;
    margin-bottom: 22px;
    background: url('Group@2x.png') no-repeat;
    background-size: 336px 83px;
  }

  .redList section .old-packet .packet-list .redMessage {
    width: 220px;
    height: 50px;
    float: left;
    border-right: 1px solid rgba(235, 235, 235, 1);
  }

  .redList section .old-packet .packet-list .redMessage .redName {
    width: 100px;
    height: 20px;
    margin-bottom: 2px;
    font-size: 14px;
    color: rgba(201, 201, 201, 1);
  }

  .redList section .old-packet .packet-list .redMessage .redTime {
    width: 204px;
    height: 14px;
    font-size: 10px;
    color: rgba(201, 201, 201, 1);
  }

  .redList section .old-packet .packet-list .redMessage .redInfo {
    width: 204px;
    height: 10px;
    font-size: 9px;
    color: rgba(255, 101, 81, 1);
  }

  .redList section .old-packet .packet-list .redPrice {
    width: 45px;
    height: 45px;
    float: left;
    padding-top: 16px;
    margin-left: 4px;
  }

  .redList section .old-packet .packet-list .redPrice p {
    font-size: 20px;
    color: rgba(201, 201, 201, 1);
  }

  /*.redList section .old-packet .packet-list .packet-list .redMessage{
        width:240px;
        height:50px;
        float:left;
        background:orange;
    }
    .redList section .old-packet .packet-list .redMessage .redName{
        width:59px;
        height:20px;
        margin-bottom:2px;
        font-size:14px;
        color:rgba(52,52,52,1);
    }
    .redList section .old-packet .packet-list .redMessage .redTime{
        width:204px;
        height:14px;
        font-size:10px;
        color:rgba(108,108,108,1);
    }
    .redList section .old-packet .packet-list .redMessage .redInfo{
        width:204px;
        height:10px;
        font-size:9px;
        background:red;
        color:rgba(255,101,81,1);
    }
    .redList section .use-packet .packet-list .redPrice{
        width:30px;
        height:35px;
        float:left;
        padding-top:6px;
    }*/
  .red-footer {
    width: 100%;
    text-align: center;
  }

  .red-footer p {
    color: rgba(119, 119, 119, 1);
  }
</style>


