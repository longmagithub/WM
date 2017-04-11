<template>
  <div class="shopList">
    <ul>
      <li class="list-item" @click="goIndex('4637cede-37aa-4648-94f5-2799f93508c9')">
        <div class="logo">
          <img
            src="http://imagewm.test.u-xian.com/image/shop/ca2939cf-f42f-402f-8b75-53283431ee68/1491718060215shopImage.JPEG"
            width="48px" height="48px">
        </div>
        <div class="content">
          <p class="shopTitle">小巷子农家菜</p>
          <p class="desc">￥20元起送 /&nbsp配送费￥3起</p>
          <p class="manjian">满100减45，满55减32，满30减22</p>
          <span class="tiem">30分钟</span>
        </div>
      </li>
      <li class="list-item" @click="goIndex('631af368-3da3-4278-8f1c-42f55d856e6d')">
        <div class="logo">
          <img
            src="http://imagewm.test.u-xian.com/image/shop/e452573e-69df-4912-ad96-8b3f4ad52d1f/1491718758273shopImage.JPEG"
            width="48px" height="48px">
        </div>
        <div class="content">
          <p class="shopTitle">乐速面疙瘩</p>
          <p class="desc">￥20元起送 /&nbsp配送费￥3起</p>
          <p class="manjian">满55减21，满15减13</p>
          <span class="tiem">28分钟</span>
        </div>
      </li>
      <li class="list-item" @click="goIndex('8a124c47-eff3-4bbc-8053-c01f72174005')">
        <div class="logo">
          <img
            src="http://imagewm.test.u-xian.com/image/shop/af8b7bfa-34b8-4266-accf-1dd64eff580d/1491674516791shopImage.JPEG"
            width="48px" height="48px">
        </div>
        <div class="content">
          <p class="shopTitle">阿云饭馆</p>
          <p class="desc">￥20元起送 /&nbsp配送费￥3起</p>
          <p class="manjian">满15减10</p>
          <span class="tiem">28分钟</span>
        </div>
      </li>
      <li class="list-item" @click="goIndex('8d68095c-4ca8-40d0-b3a0-c40dac778c17')">
        <div class="logo">
          <img
            src="http://imagewm.test.u-xian.com/image/shop/c5e25f9d-b7d4-4da8-8652-1ddfebae7077/1491674174626shopImage.JPEG"
            width="48px" height="48px">
        </div>
        <div class="content">
          <p class="shopTitle">味美土菜馆</p>
          <p class="desc">￥30元起送 /&nbsp配送费￥3起</p>
          <p class="manjian">满80减8，满50减5，满30减3</p>
          <span class="tiem">22分钟</span>
        </div>
      </li>
      <li class="list-item" @click="goIndex('9480c029-a45d-479e-a3c3-74ed9c65d54d')">
        <div class="logo">
          <img src="http://imagewm.test.u-xian.com/image/shop/1491686621833shopImage.JPEG" width="48px" height="48px">
        </div>
        <div class="content">
          <p class="shopTitle">黄金烤肉便当</p>
          <p class="desc">￥20元起送 /&nbsp配送费￥3起</p>
          <p class="manjian">满70减42，满50减27，满20减18</p>
          <span class="tiem">32分钟</span>
        </div>
      </li>
      <li class="list-item" @click="goIndex('af8b7bfa-34b8-4266-accf-1dd64eff580d')">
        <div class="logo">
          <img
            src="http://imagewm.test.u-xian.com/image/shop/8d68095c-4ca8-40d0-b3a0-c40dac778c17/1491674343847shopImage.JPEG"
            width="48px" height="48px">
        </div>
        <div class="content">
          <p class="shopTitle">徽府香辣馆</p>
          <p class="desc">￥20元起送 /&nbsp配送费￥3起</p>
          <p class="manjian">满43减9，满28减5</p>
          <span class="tiem">30分钟</span>
        </div>
      </li>
      <li class="list-item" @click="goIndex('c1a2c562-b2cc-46c2-9e10-47cc8552ca4e')">
        <div class="logo">
          <img
            src="http://imagewm.test.u-xian.com/image/shop/9480c029-a45d-479e-a3c3-74ed9c65d54d/1491686827765shopImage.JPEG"
            width="48px" height="48px">
        </div>
        <div class="content">
          <p class="shopTitle">这个村民间美食</p>
          <p class="desc">￥0元起送 /&nbsp配送费￥3起</p>
          <p class="manjian">满50减10，满35减10</p>
          <span class="tiem">23分钟</span>
        </div>
      </li>
      <li class="list-item" @click="goIndex('c1c8dafb-0d9e-4722-b7d8-a540d235e30c')">
        <div class="logo">
          <img
            src="http://imagewm.test.u-xian.com/image/shop/7da10ea0-91ea-4db2-852f-b46afb63ada6/1491673784318shopImage.JPEG"
            width="48px" height="48px">
        </div>
        <div class="content">
          <p class="shopTitle">豆花花</p>
          <p class="desc">￥20元起送 /&nbsp配送费￥3起</p>
          <p class="manjian">满45减8</p>
          <span class="tiem">34分钟</span>
        </div>
      </li>
      <li class="list-item" @click="goIndex('c5e25f9d-b7d4-4da8-8652-1ddfebae7077')">
        <div class="logo">
          <img
            src="http://imagewm.test.u-xian.com/image/shop/c1c8dafb-0d9e-4722-b7d8-a540d235e30c/1491674039775shopImage.JPEG	"
            width="48px" height="48px">
        </div>
        <div class="content">
          <p class="shopTitle">馋嘴花甲</p>
          <p class="desc">￥20元起送 /&nbsp配送费￥3起</p>
          <p class="manjian">满50减15，满35减10，满20减4</p>
          <span class="tiem">38分钟</span>
        </div>
      </li>
      <li class="list-item" @click="goIndex('d8438de5-d90d-431d-bd68-0d0a85f4401a')">
        <div class="logo">
          <img
            src="http://imagewm.test.u-xian.com/image/shop/4637cede-37aa-4648-94f5-2799f93508c9/1491718406275shopImage.JPEG	"
            width="48px" height="48px">
        </div>
        <div class="content">
          <p class="shopTitle">有家土菜馆</p>
          <p class="desc">￥20元起送 /&nbsp配送费￥3起</p>
          <p class="manjian">满200减67，满120减47，满80减36，满45减25，满30减20</p>
          <span class="tiem">35分钟</span>
        </div>
      </li>
      <li class="list-item" @click="goIndex('de74f04c-fb3f-4b04-af59-f74eca53d653')">
        <div class="logo">
          <img src="http://imagewm.u-xian.com/image/shop/1491817065330shopImage.JPEG" width="48px" height="48px">
        </div>
        <div class="content">
          <p class="shopTitle">重庆麻辣烫</p>
          <p class="desc">￥20元起送 /&nbsp配送费￥3起</p>
          <p class="manjian">满50减11，满35减7，满20减4</p>
          <span class="tiem">28分钟</span>
        </div>
      </li>
      <li class="list-item" @click="goIndex('e452573e-69df-4912-ad96-8b3f4ad52d1f')">
        <div class="logo">
          <img
            src="http://imagewm.test.u-xian.com/image/shop/d8438de5-d90d-431d-bd68-0d0a85f4401a/1491718589749shopImage.JPEG	"
            width="48px" height="48px">
        </div>
        <div class="content">
          <p class="shopTitle">杯思特KAO肉饭</p>
          <p class="desc">￥20元起送 /&nbsp配送费￥3起</p>
          <p class="manjian">满40减21，满20减14</p>
          <span class="tiem">30分钟</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {urlParse} from '../common/js/util'
  export default {
    data() {
      return {
        customerId: ''
      }
    },
    created() {
      this.customerId = urlParse().customerId
    },
    methods: {
      goIndex(id) {
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
    padding: 10px 15px;
  }

  .shopList .list-item {
    display: flex;
    padding-bottom: 30px;
  }

  .shopList .list-item .logo {
    flex: 0 0 48px;
    width: 48px;
    margin-right: 15px;
  }

  .shopList .list-item .logo > img {
    border-radius: 7px;
  }

  .shopList .list-item .content {
    flex: 1;
    position: relative;
    line-height: 1em;
  }

  .shopList .list-item .content .shopTitle {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
    color: #333;
  }

  .shopList .list-item .content .desc {
    height: 20px;
    line-height: 20px;
    margin-bottom: 5px;
    color: #6c6c6c;
  }

  .shopList .list-item .content .manjian {
    box-sizing: border-box;
    font-size: 11px;
    color: #8a8888;
    padding-left: 17px;
    padding-right: 50px;
    height: 20px;
    line-height: 20px;
    margin-bottom: 5px;
    background: url("../assets/icon_activity_status0.png") no-repeat left center;
    background-size: 12px 12px;
  }

  .shopList .list-item .content .tiem {
    position: absolute;
    top: 40%;
    right: 10px;
    color: #4fa5ff;
  }
</style>
