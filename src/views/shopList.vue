<template>
  <!--把优惠按钮注释 调整 'content'padding-right: 90px; -->
  <div class="shopList">
    <ul>
      <li class="list-item" @click="goIndex('c1c8dafb-0d9e-4722-b7d8-a540d235e30c')">
        <div class="logo">
          <img
            src="http://imagewm.test.u-xian.com/image/shop/7da10ea0-91ea-4db2-852f-b46afb63ada6/1491673784318shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"
            width="51px" height="51px">
        </div>
        <div class="content">
          <p class="shopTitle">豆花花</p>
          <p class="manjian">满25减2，满45减5</p>
          <div class="contentRight">
            <!--<div class="contentRight-Hui"><span>惠</span></div>-->
            <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
            <p class="tiemBox"><span class="tiem">30分钟</span></p>
          </div>
        </div>
      </li>
      <li class="list-item" @click="goIndex('832c49b2-4ada-47bf-88ff-06dd8cbd26f2')">
        <div class="logo">
          <img
            src="http://imagewm.u-xian.com/image/shop/1491874549394shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"
            width="51px" height="51px">
        </div>
        <div class="content">
          <p class="shopTitle">很爱餐厅</p>
          <p class="manjian">满20减9，满35减12，满68减20</p>
          <div class="contentRight">
            <!--<div class="contentRight-Hui"><span>惠</span></div>-->
            <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
            <p class="tiemBox"><span class="tiem">25分钟</span></p>
          </div>
        </div>
      </li>
      <li class="list-item" @click="goIndex('a72cb664-a2d6-4197-bcfa-3850c039411a')">
        <div class="logo">
          <img
            src="http://imagewm.u-xian.com/image/shop/1492481240956.jpg?x-oss-process=image/resize,m_fill,h_100,w_100"
            width="51px" height="51px">
        </div>
        <div class="content">
          <p class="shopTitle">正新鸡排</p>
          <p class="manjian">满15减6，满30减10，满50减15</p>
          <div class="contentRight">
            <!--<div class="contentRight-Hui"><span>惠</span></div>-->
            <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
            <p class="tiemBox"><span class="tiem">27分钟</span></p>
          </div>
        </div>
      </li>
      <li class="list-item" @click="goIndex('83cee7db-b211-4e5b-bbc3-06882f86fede')">
        <div class="logo">
          <img
            src="http://imagewm.u-xian.com/image/shop/832c49b2-4ada-47bf-88ff-06dd8cbd26f2/1491890808699shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"
            width="51px" height="51px">
        </div>
        <div class="content">
          <p class="shopTitle">炒饭王</p>
          <p class="manjian">满25减10，满50减25</p>
          <div class="contentRight">
            <!--<div class="contentRight-Hui"><span>惠</span></div>-->
            <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
            <p class="tiemBox"><span class="tiem">25分钟</span></p>
          </div>
        </div>
      </li>
      <li class="list-item" @click="goIndex('27956a86-8261-485d-9bfe-a082e5d2329f')">
        <div class="logo">
          <img
            src="http://imagewm.u-xian.com/image/shop/27956a86-8261-485d-9bfe-a082e5d2329f/1492486146476shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"
            width="51px" height="51px">
        </div>
        <div class="content">
          <p class="shopTitle">顺和杂粮煎饼现磨五谷豆浆</p>
          <p class="manjian">满25减3，满50减8</p>
          <div class="contentRight">
            <!--<div class="contentRight-Hui"><span>惠</span></div>-->
            <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
            <p class="tiemBox"><span class="tiem">25分钟</span></p>
          </div>
        </div>
      </li>
      <li class="list-item" @click="goIndex('cbc7f7c8-1b4d-48be-a0b8-fbe71aba0a7d')">
        <div class="logo">
          <img
            src="http://imagewm.u-xian.com/image/shop/9480c029-a45d-479e-a3c3-74ed9c65d54d/1492071280297shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"
            width="51px" height="51px">
        </div>
        <div class="content">
          <p class="shopTitle">北方饺子馆</p>
          <p class="manjian">满15减6，满25减10，满50减15</p>
          <div class="contentRight">
            <!--<div class="contentRight-Hui"><span>惠</span></div>-->
            <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
            <p class="tiemBox"><span class="tiem">30分钟</span></p>
          </div>
        </div>
      </li>
      <li class="list-item" @click="goIndex('5b96f343-62c1-48ac-a392-f4b697cb3be9')">
        <div class="logo">
          <img
            src="http://imagewm.u-xian.com/image/shop/5b96f343-62c1-48ac-a392-f4b697cb3be9/1491821759529shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"
            width="51px" height="51px">
        </div>
        <div class="content">
          <p class="shopTitle">蜜菓联庄店</p>
          <p class="manjian">满15减2，满25减8，满50减16</p>
          <div class="contentRight">
            <!--<div class="contentRight-Hui"><span>惠</span></div>-->
            <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
            <p class="tiemBox"><span class="tiem">28分钟</span></p>
          </div>
        </div>
      </li>
      <li class="list-item" @click="goIndex('b150dba0-1f9a-44ff-8a7a-40e6c7648777')">
        <div class="logo">
          <img
            src="http://imagewm.u-xian.com/image/shop/1492482942105.jpg?x-oss-process=image/resize,m_fill,h_100,w_100"
            width="51px" height="51px">
        </div>
        <div class="content">
          <p class="shopTitle">古法牛杂面</p>
          <p class="manjian">满25减6，满35减9，满55减13</p>
          <div class="contentRight">
            <!--<div class="contentRight-Hui"><span>惠</span></div>-->
            <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
            <p class="tiemBox"><span class="tiem">32分钟</span></p>
          </div>
        </div>
      </li>
      <li class="list-item" @click="goIndex('4be9e11a-635b-49e8-9686-12788c097d6a')">
        <div class="logo">
          <img
            src="http://imagewm.u-xian.com/image/shop/1492480358981.jpg?x-oss-process=image/resize,m_fill,h_100,w_100"
            width="51px" height="51px">
        </div>
        <div class="content">
          <p class="shopTitle">硬厨小堡</p>
          <p class="manjian">满30减12，满40减17</p>
          <div class="contentRight">
            <!--<div class="contentRight-Hui"><span>惠</span></div>-->
            <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
            <p class="tiemBox"><span class="tiem">25分钟</span></p>
          </div>
        </div>
      </li>
      <li class="list-item" @click="goIndex('c5e25f9d-b7d4-4da8-8652-1ddfebae7077')">
        <div class="logo">
          <img
            src="http://imagewm.test.u-xian.com/image/shop/c1c8dafb-0d9e-4722-b7d8-a540d235e30c/1491674039775shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100	"
            width="51px" height="51px">
        </div>
        <div class="content">
          <p class="shopTitle">馋嘴花甲</p>
          <p class="manjian">满20减4，满35减10，满50减15</p>
          <div class="contentRight">
            <!--<div class="contentRight-Hui"><span>惠</span></div>-->
            <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
            <p class="tiemBox"><span class="tiem">20分钟</span></p>
          </div>
        </div>
      </li>
      <li class="list-item" @click="goIndex('de74f04c-fb3f-4b04-af59-f74eca53d653')">
        <div class="logo">
          <img
            src="http://imagewm.u-xian.com/image/shop/1491817065330shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"
            width="51px" height="51px">
        </div>
        <div class="content">
          <p class="shopTitle">重庆麻辣烫</p>
          <p class="manjian">满20减4，满35减7，满50减11</p>
          <div class="contentRight">
            <!--<div class="contentRight-Hui"><span>惠</span></div>-->
            <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
            <p class="tiemBox"><span class="tiem">30分钟</span></p>
          </div>
        </div>
      </li>
      <li class="list-item" @click="goIndex('c1a2c562-b2cc-46c2-9e10-47cc8552ca4e')">
        <div class="logo">
          <img
            src="http://imagewm.test.u-xian.com/image/shop/9480c029-a45d-479e-a3c3-74ed9c65d54d/1491686827765shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"
            width="51px" height="51px">
        </div>
        <div class="content">
          <p class="shopTitle">这个村民间美食</p>
          <p class="manjian">满35减6，满50减12</p>
          <div class="contentRight">
            <!--<div class="contentRight-Hui"><span>惠</span></div>-->
            <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
            <p class="tiemBox"><span class="tiem">35分钟</span></p>
          </div>
        </div>
      </li>
      <li class="list-item" @click="goIndex('9480c029-a45d-479e-a3c3-74ed9c65d54d')">
        <div class="logo">
          <img
            src="http://imagewm.test.u-xian.com/image/shop/1491686621833shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"
            width="51px" height="51px">
        </div>
        <div class="content">
          <p class="shopTitle">黄金烤肉便当</p>
          <p class="manjian">满20减18，满50减27，满70减42</p>
          <div class="contentRight">
            <!--<div class="contentRight-Hui"><span>惠</span></div>-->
            <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
            <p class="tiemBox"><span class="tiem">26分钟</span></p>
          </div>
        </div>
      </li>
      <li class="list-item" @click="goIndex('e452573e-69df-4912-ad96-8b3f4ad52d1f')">
        <div class="logo">
          <img
            src="http://imagewm.test.u-xian.com/image/shop/d8438de5-d90d-431d-bd68-0d0a85f4401a/1491718589749shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100	"
            width="51px" height="51px">
        </div>
        <div class="content">
          <p class="shopTitle">杯思特KAO肉饭</p>
          <p class="manjian">满20减14，满25减15，满50减23，满100减40</p>
          <div class="contentRight">
            <!--<div class="contentRight-Hui"><span>惠</span></div>-->
            <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
            <p class="tiemBox"><span class="tiem">30分钟</span></p>
          </div>
        </div>
      </li>
      <li class="list-item" @click="goIndex('af8b7bfa-34b8-4266-accf-1dd64eff580d')">
        <div class="logo">
          <img
            src="http://imagewm.test.u-xian.com/image/shop/8d68095c-4ca8-40d0-b3a0-c40dac778c17/1491674343847shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"
            width="51px" height="51px">
        </div>
        <div class="content">
          <p class="shopTitle">徽府香辣馆</p>
          <p class="manjian">满28减5，满43减9</p>
          <div class="contentRight">
            <!--<div class="contentRight-Hui"><span>惠</span></div>-->
            <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
            <p class="tiemBox"><span class="tiem">30分钟</span></p>
          </div>
        </div>
      </li>
      <li class="list-item" @click="goIndex('8d68095c-4ca8-40d0-b3a0-c40dac778c17')">
        <div class="logo">
          <img
            src="http://imagewm.test.u-xian.com/image/shop/c5e25f9d-b7d4-4da8-8652-1ddfebae7077/1491674174626shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"
            width="51px" height="51px">
        </div>
        <div class="content">
          <p class="shopTitle">味美土菜馆</p>
          <p class="manjian">满15减5，满25减8，满50减12</p>
          <div class="contentRight">
            <!--<div class="contentRight-Hui"><span>惠</span></div>-->
            <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
            <p class="tiemBox"><span class="tiem">40分钟</span></p>
          </div>
        </div>
      </li>
      <li class="list-item" @click="goIndex('4637cede-37aa-4648-94f5-2799f93508c9')">
        <div class="logo">
          <img
            src="http://imagewm.test.u-xian.com/image/shop/ca2939cf-f42f-402f-8b75-53283431ee68/1491718060215shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"
            width="51px" height="51px">
        </div>
        <div class="content">
          <p class="shopTitle">小巷子农家菜</p>
          <p class="manjian">满30减22，满55减32，满100减45</p>
          <div class="contentRight">
            <!--<div class="contentRight-Hui"><span>惠</span></div>-->
            <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
            <p class="tiemBox"><span class="tiem">30分钟</span></p>
          </div>
        </div>
      </li>
      <li class="list-item" @click="goIndex('8f7dae2f-c258-4f1e-a2e2-89ffef32ad48')">
        <div class="logo">
          <img
            src="http://imagewm.u-xian.com/image/shop/1492750129632.jpg?x-oss-process=image/resize,m_fill,h_100,w_100"
            width="51px" height="51px">
        </div>
        <div class="content">
          <p class="shopTitle">上吉铺黄焖鸡米</p>
          <p class="manjian">满30减22，满55减32，满100减45</p>
          <div class="contentRight">
            <!--<div class="contentRight-Hui"><span>惠</span></div>-->
            <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
            <p class="tiemBox"><span class="tiem">30分钟</span></p>
          </div>
        </div>
      </li>
      <li class="list-item" @click="goIndex('40f97640-c1d1-42df-9049-184ffb94e824')">
        <div class="logo">
          <img
            src="http://imagewm.u-xian.com/image/shop/1492751387180.jpg?x-oss-process=image/resize,m_fill,h_100,w_100"
            width="51px" height="51px">
        </div>
        <div class="content">
          <p class="shopTitle">重庆小面</p>
          <p class="manjian">满30减22，满55减32，满100减45</p>
          <div class="contentRight">
            <!--<div class="contentRight-Hui"><span>惠</span></div>-->
            <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
            <p class="tiemBox"><span class="tiem">30分钟</span></p>
          </div>
        </div>
      </li>
      <li class="list-item" @click="goIndex('b3cf0a19-21a6-4b6b-86ec-4efde9ef1e0b')">
        <div class="logo">
          <img
            src="http://imagewm.u-xian.com/image/shop/1493020794031shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"
            width="51px" height="51px">
        </div>
        <div class="content">
          <p class="shopTitle">铜锣烧地下铁</p>
          <p class="manjian">满30减22，满55减32，满100减45</p>
          <div class="contentRight">
            <!--<div class="contentRight-Hui"><span>惠</span></div>-->
            <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
            <p class="tiemBox"><span class="tiem">30分钟</span></p>
          </div>
        </div>
      </li>
      <li class="list-item" @click="goIndex('9314ce9b-cd74-4e2a-aded-423fafe972f7')">
        <div class="logo">
          <img
            src="http://imagewm.u-xian.com/image/shop/b3cf0a19-21a6-4b6b-86ec-4efde9ef1e0b/1493021118691shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"
            width="51px" height="51px">
        </div>
        <div class="content">
          <p class="shopTitle">大娘饺子联庄店</p>
          <p class="manjian">满30减22，满55减32，满100减45</p>
          <div class="contentRight">
            <!--<div class="contentRight-Hui"><span>惠</span></div>-->
            <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
            <p class="tiemBox"><span class="tiem">30分钟</span></p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getStore, urlParse, setStore} from '../common/js/util'
  export default {
    data() {
      return {
        customerId: ''
      }
    },
    mounted() {
      let url = window.location.href
      if (getStore('openId') === null) {
        if (url.indexOf('code') < 0) {
//          console.log('没有授权')
          this.to()
        } else {
          const data = {
            code: urlParse().code,
            type: 1 // 授权类型：1静默授权；2用户授权
          }
          const api = '/mp/authority/customer'
          this.axios.post(api, data).then((res) => {
            res = res.data
            this.customerId = res.data.customerId
            setStore('openId', {
              customerId: res.data.customerId
            })
          })
        }
      } else if (getStore('openId').customerId === undefined) {
        const data = {
          code: urlParse().code,
          type: 1 // 授权类型：1静默授权；2用户授权
        }
        const api = '/mp/authority/customer'
        this.axios.post(api, data).then((res) => {
          res = res.data
          this.customerId = res.data.customerId
          setStore('openId', {
            customerId: res.data.customerId
          })
        })
      } else {
        this.customerId = getStore('openId').customerId
      }
    },
    methods: {
      to() {
        const oauthCallbackUrl =
          encodeURIComponent('http://newpay.tunnel.qydev.com/VAOrderH5/?')
        const oauthJumpUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx96f6daa5f8a71039&redirect_uri=${oauthCallbackUrl}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
        // 跳转授权 浏览器不保留记录
        window.location.replace(oauthJumpUrl)
//        window.location.href = oauthJumpUrl
      },
      goIndex(id) {
        setStore('userInfo', {
          'customerId': this.customerId,
          'shopId': id
        })
        window.location.href = 'http://newpay.tunnel.qydev.com/VAOrderH5/?#/index?T=' + Date.parse(new Date()) / 1000
//        this.$router.push({
//          path: '/index',
//          query: {
//            shopId: id,
//            customerId: this.customerId
//          }
//        })
      }
    }
  }
</script>

<style>
  .shopList {
    background: #fff;
  }

  .shopList .list-item {
    box-sizing: border-box;
    display: flex;
    padding: 8px 12px 10px 8px;
    border-bottom: 5px solid #f5f5f5;
    /*margin-bottom: 15px;*/
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
    background: url("../assets/icon_activity_status0.png") no-repeat left top;
    background-size: 13px 13px;
  }

  .shopList .list-item .content .contentRight {
    position: absolute;
    top: 0;
    right: 0;
  }

  .shopList .list-item .content .contentRight .contentRight-Hui {
    position: absolute;
    top: -10px;
    right: -10px;
    padding: 10px;
  }

  .shopList .list-item .content .contentRight .contentRight-Hui span {
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
</style>
