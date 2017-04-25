<template>
  <!--把优惠按钮注释 调整 'content'padding-right: 90px; -->
  <div class="shopList">
    <ul>
      <!--<li class="listbox">-->
      <!--<div class="list-item" @click="goIndex('c1c8dafb-0d9e-4722-b7d8-a540d235e30c')">-->
      <!--<div class="logo">-->
      <!--<img-->
      <!--src="http://imagewm.test.u-xian.com/image/shop/7da10ea0-91ea-4db2-852f-b46afb63ada6/1491673784318shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"-->
      <!--width="51px" height="51px">-->
      <!--</div>-->
      <!--<div class="content">-->
      <!--<p class="shopTitle">豆花花</p>-->
      <!--<p class="manjian">满25减2，满45减5，满25减2，满45减5，满25减2，满45减5</p>-->
      <!--<div class="contentRight">-->
      <!--&lt;!&ndash;<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>&ndash;&gt;-->
      <!--<p class="tiemBox"><span class="tiem">30分钟</span></p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="contentRight-Hui" @click="toggleParity"><span>惠</span></div>-->
      <!--</li>-->
      <!--<li class="list-item" @click="goIndex('832c49b2-4ada-47bf-88ff-06dd8cbd26f2')">-->
      <!--<div class="logo">-->
      <!--<img-->
      <!--src="http://imagewm.u-xian.com/image/shop/1491874549394shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"-->
      <!--width="51px" height="51px">-->
      <!--</div>-->
      <!--<div class="content">-->
      <!--<p class="shopTitle">很爱餐厅</p>-->
      <!--<p class="manjian">满20减9，满35减12，满68减20</p>-->
      <!--<div class="contentRight">-->
      <!--&lt;!&ndash;<div class="contentRight-Hui"><span>惠</span></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>&ndash;&gt;-->
      <!--<p class="tiemBox"><span class="tiem">25分钟</span></p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="list-item" @click="goIndex('83cee7db-b211-4e5b-bbc3-06882f86fede')">-->
      <!--<div class="logo">-->
      <!--<img-->
      <!--src="http://imagewm.u-xian.com/image/shop/832c49b2-4ada-47bf-88ff-06dd8cbd26f2/1491890808699shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"-->
      <!--width="51px" height="51px">-->
      <!--</div>-->
      <!--<div class="content">-->
      <!--<p class="shopTitle">炒饭王</p>-->
      <!--<p class="manjian">满25减10，满50减25</p>-->
      <!--<div class="contentRight">-->
      <!--&lt;!&ndash;<div class="contentRight-Hui"><span>惠</span></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>&ndash;&gt;-->
      <!--<p class="tiemBox"><span class="tiem">25分钟</span></p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="list-item" @click="goIndex('27956a86-8261-485d-9bfe-a082e5d2329f')">-->
      <!--<div class="logo">-->
      <!--<img-->
      <!--src="http://imagewm.u-xian.com/image/shop/27956a86-8261-485d-9bfe-a082e5d2329f/1492486146476shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"-->
      <!--width="51px" height="51px">-->
      <!--</div>-->
      <!--<div class="content">-->
      <!--<p class="shopTitle">顺和杂粮煎饼现磨五谷豆浆</p>-->
      <!--<p class="manjian">满25减3，满50减8</p>-->
      <!--<div class="contentRight">-->
      <!--&lt;!&ndash;<div class="contentRight-Hui"><span>惠</span></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>&ndash;&gt;-->
      <!--<p class="tiemBox"><span class="tiem">25分钟</span></p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="list-item" @click="goIndex('8f7dae2f-c258-4f1e-a2e2-89ffef32ad48')">-->
      <!--<div class="logo">-->
      <!--<img-->
      <!--src="http://imagewm.u-xian.com/image/shop/1492750129632.jpg?x-oss-process=image/resize,m_fill,h_100,w_100"-->
      <!--width="51px" height="51px">-->
      <!--</div>-->
      <!--<div class="content">-->
      <!--<p class="shopTitle">上吉铺黄焖鸡米</p>-->
      <!--<p class="manjian">满15减10，满35减14，满50减18</p>-->
      <!--<div class="contentRight">-->
      <!--&lt;!&ndash;<div class="contentRight-Hui"><span>惠</span></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>&ndash;&gt;-->
      <!--<p class="tiemBox"><span class="tiem">26分钟</span></p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="list-item" @click="goIndex('40f97640-c1d1-42df-9049-184ffb94e824')">-->
      <!--<div class="logo">-->
      <!--<img-->
      <!--src="http://imagewm.u-xian.com/image/shop/1492751387180.jpg?x-oss-process=image/resize,m_fill,h_100,w_100"-->
      <!--width="51px" height="51px">-->
      <!--</div>-->
      <!--<div class="content">-->
      <!--<p class="shopTitle">重庆小面</p>-->
      <!--<p class="manjian">满15减6，满25减11，满30减16</p>-->
      <!--<div class="contentRight">-->
      <!--&lt;!&ndash;<div class="contentRight-Hui"><span>惠</span></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>&ndash;&gt;-->
      <!--<p class="tiemBox"><span class="tiem">32分钟</span></p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="list-item" @click="goIndex('b3cf0a19-21a6-4b6b-86ec-4efde9ef1e0b')">-->
      <!--<div class="logo">-->
      <!--<img-->
      <!--src="http://imagewm.u-xian.com/image/shop/1493020794031shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"-->
      <!--width="51px" height="51px">-->
      <!--</div>-->
      <!--<div class="content">-->
      <!--<p class="shopTitle">铜锣湾地下铁餐吧</p>-->
      <!--<p class="manjian">满15减5，满25减7，满39减10</p>-->
      <!--<div class="contentRight">-->
      <!--&lt;!&ndash;<div class="contentRight-Hui"><span>惠</span></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>&ndash;&gt;-->
      <!--<p class="tiemBox"><span class="tiem">27分钟</span></p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="list-item" @click="goIndex('9480c029-a45d-479e-a3c3-74ed9c65d54d')">-->
      <!--<div class="logo">-->
      <!--<img-->
      <!--src="http://imagewm.test.u-xian.com/image/shop/1491686621833shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"-->
      <!--width="51px" height="51px">-->
      <!--</div>-->
      <!--<div class="content">-->
      <!--<p class="shopTitle">黄金烤肉便当</p>-->
      <!--<p class="manjian">满20减18，满50减27，满70减42</p>-->
      <!--<div class="contentRight">-->
      <!--&lt;!&ndash;<div class="contentRight-Hui"><span>惠</span></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>&ndash;&gt;-->
      <!--<p class="tiemBox"><span class="tiem">26分钟</span></p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--&lt;!&ndash;<li class="list-item" @click="goIndex('9314ce9b-cd74-4e2a-aded-423fafe972f7')">&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="logo">&ndash;&gt;-->
      <!--&lt;!&ndash;<img&ndash;&gt;-->
      <!--&lt;!&ndash;src="http://imagewm.u-xian.com/image/shop/b3cf0a19-21a6-4b6b-86ec-4efde9ef1e0b/1493021118691shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"&ndash;&gt;-->
      <!--&lt;!&ndash;width="51px" height="51px">&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="content">&ndash;&gt;-->
      <!--&lt;!&ndash;<p class="shopTitle">大娘饺子联庄店</p>&ndash;&gt;-->
      <!--&lt;!&ndash;<p class="manjian">满15减6，满25减9，满50减15</p>&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="contentRight">&ndash;&gt;-->
      <!--&lt;!&ndash;&lt;!&ndash;<div class="contentRight-Hui"><span>惠</span></div>&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;&lt;!&ndash;<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;<p class="tiemBox"><span class="tiem">25分钟</span></p>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;</li>&ndash;&gt;-->
      <!--<li class="list-item" @click="goIndex('b150dba0-1f9a-44ff-8a7a-40e6c7648777')">-->
      <!--<div class="logo">-->
      <!--<img-->
      <!--src="http://imagewm.u-xian.com/image/shop/1492482942105.jpg?x-oss-process=image/resize,m_fill,h_100,w_100"-->
      <!--width="51px" height="51px">-->
      <!--</div>-->
      <!--<div class="content">-->
      <!--<p class="shopTitle">古法牛杂面</p>-->
      <!--<p class="manjian">满25减6，满35减9，满55减13</p>-->
      <!--<div class="contentRight">-->
      <!--&lt;!&ndash;<div class="contentRight-Hui"><span>惠</span></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>&ndash;&gt;-->
      <!--<p class="tiemBox"><span class="tiem">32分钟</span></p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="list-item" @click="goIndex('cbc7f7c8-1b4d-48be-a0b8-fbe71aba0a7d')">-->
      <!--<div class="logo">-->
      <!--<img-->
      <!--src="http://imagewm.u-xian.com/image/shop/9480c029-a45d-479e-a3c3-74ed9c65d54d/1492071280297shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"-->
      <!--width="51px" height="51px">-->
      <!--</div>-->
      <!--<div class="content">-->
      <!--<p class="shopTitle">北方饺子馆</p>-->
      <!--<p class="manjian">满15减6，满25减10，满50减15</p>-->
      <!--<div class="contentRight">-->
      <!--&lt;!&ndash;<div class="contentRight-Hui"><span>惠</span></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>&ndash;&gt;-->
      <!--<p class="tiemBox"><span class="tiem">30分钟</span></p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="list-item" @click="goIndex('5b96f343-62c1-48ac-a392-f4b697cb3be9')">-->
      <!--<div class="logo">-->
      <!--<img-->
      <!--src="http://imagewm.u-xian.com/image/shop/5b96f343-62c1-48ac-a392-f4b697cb3be9/1491821759529shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"-->
      <!--width="51px" height="51px">-->
      <!--</div>-->
      <!--<div class="content">-->
      <!--<p class="shopTitle">蜜菓联庄店</p>-->
      <!--<p class="manjian">满15减2，满25减8，满50减16</p>-->
      <!--<div class="contentRight">-->
      <!--&lt;!&ndash;<div class="contentRight-Hui"><span>惠</span></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>&ndash;&gt;-->
      <!--<p class="tiemBox"><span class="tiem">28分钟</span></p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="list-item" @click="goIndex('4be9e11a-635b-49e8-9686-12788c097d6a')">-->
      <!--<div class="logo">-->
      <!--<img-->
      <!--src="http://imagewm.u-xian.com/image/shop/1492480358981.jpg?x-oss-process=image/resize,m_fill,h_100,w_100"-->
      <!--width="51px" height="51px">-->
      <!--</div>-->
      <!--<div class="content">-->
      <!--<p class="shopTitle">硬厨小堡</p>-->
      <!--<p class="manjian">满30减12，满40减17</p>-->
      <!--<div class="contentRight">-->
      <!--&lt;!&ndash;<div class="contentRight-Hui"><span>惠</span></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>&ndash;&gt;-->
      <!--<p class="tiemBox"><span class="tiem">25分钟</span></p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="list-item" @click="goIndex('c5e25f9d-b7d4-4da8-8652-1ddfebae7077')">-->
      <!--<div class="logo">-->
      <!--<img-->
      <!--src="http://imagewm.test.u-xian.com/image/shop/c1c8dafb-0d9e-4722-b7d8-a540d235e30c/1491674039775shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100	"-->
      <!--width="51px" height="51px">-->
      <!--</div>-->
      <!--<div class="content">-->
      <!--<p class="shopTitle">馋嘴花甲</p>-->
      <!--<p class="manjian">满20减4，满35减10，满50减15</p>-->
      <!--<div class="contentRight">-->
      <!--&lt;!&ndash;<div class="contentRight-Hui"><span>惠</span></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>&ndash;&gt;-->
      <!--<p class="tiemBox"><span class="tiem">20分钟</span></p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="list-item" @click="goIndex('de74f04c-fb3f-4b04-af59-f74eca53d653')">-->
      <!--<div class="logo">-->
      <!--<img-->
      <!--src="http://imagewm.u-xian.com/image/shop/1491817065330shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"-->
      <!--width="51px" height="51px">-->
      <!--</div>-->
      <!--<div class="content">-->
      <!--<p class="shopTitle">重庆麻辣烫</p>-->
      <!--<p class="manjian">满20减4，满35减7，满50减11</p>-->
      <!--<div class="contentRight">-->
      <!--&lt;!&ndash;<div class="contentRight-Hui"><span>惠</span></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>&ndash;&gt;-->
      <!--<p class="tiemBox"><span class="tiem">30分钟</span></p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="list-item" @click="goIndex('c1a2c562-b2cc-46c2-9e10-47cc8552ca4e')">-->
      <!--<div class="logo">-->
      <!--<img-->
      <!--src="http://imagewm.test.u-xian.com/image/shop/9480c029-a45d-479e-a3c3-74ed9c65d54d/1491686827765shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"-->
      <!--width="51px" height="51px">-->
      <!--</div>-->
      <!--<div class="content">-->
      <!--<p class="shopTitle">这个村民间美食</p>-->
      <!--<p class="manjian">满35减6，满50减12</p>-->
      <!--<div class="contentRight">-->
      <!--&lt;!&ndash;<div class="contentRight-Hui"><span>惠</span></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>&ndash;&gt;-->
      <!--<p class="tiemBox"><span class="tiem">35分钟</span></p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="list-item" @click="goIndex('a72cb664-a2d6-4197-bcfa-3850c039411a')">-->
      <!--<div class="logo">-->
      <!--<img-->
      <!--src="http://imagewm.u-xian.com/image/shop/1492481240956.jpg?x-oss-process=image/resize,m_fill,h_100,w_100"-->
      <!--width="51px" height="51px">-->
      <!--</div>-->
      <!--<div class="content">-->
      <!--<p class="shopTitle">正新鸡排</p>-->
      <!--<p class="manjian">满15减6，满30减10，满50减15</p>-->
      <!--<div class="contentRight">-->
      <!--&lt;!&ndash;<div class="contentRight-Hui"><span>惠</span></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>&ndash;&gt;-->
      <!--<p class="tiemBox"><span class="tiem">27分钟</span></p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="list-item" @click="goIndex('e452573e-69df-4912-ad96-8b3f4ad52d1f')">-->
      <!--<div class="logo">-->
      <!--<img-->
      <!--src="http://imagewm.test.u-xian.com/image/shop/d8438de5-d90d-431d-bd68-0d0a85f4401a/1491718589749shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100	"-->
      <!--width="51px" height="51px">-->
      <!--</div>-->
      <!--<div class="content">-->
      <!--<p class="shopTitle">杯思特KAO肉饭</p>-->
      <!--<p class="manjian">满20减14，满25减15，满50减23，满100减40</p>-->
      <!--<div class="contentRight">-->
      <!--&lt;!&ndash;<div class="contentRight-Hui"><span>惠</span></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>&ndash;&gt;-->
      <!--<p class="tiemBox"><span class="tiem">30分钟</span></p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="list-item" @click="goIndex('af8b7bfa-34b8-4266-accf-1dd64eff580d')">-->
      <!--<div class="logo">-->
      <!--<img-->
      <!--src="http://imagewm.test.u-xian.com/image/shop/8d68095c-4ca8-40d0-b3a0-c40dac778c17/1491674343847shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"-->
      <!--width="51px" height="51px">-->
      <!--</div>-->
      <!--<div class="content">-->
      <!--<p class="shopTitle">徽府香辣馆</p>-->
      <!--<p class="manjian">满28减5，满43减9</p>-->
      <!--<div class="contentRight">-->
      <!--&lt;!&ndash;<div class="contentRight-Hui"><span>惠</span></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>&ndash;&gt;-->
      <!--<p class="tiemBox"><span class="tiem">30分钟</span></p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="list-item" @click="goIndex('8d68095c-4ca8-40d0-b3a0-c40dac778c17')">-->
      <!--<div class="logo">-->
      <!--<img-->
      <!--src="http://imagewm.test.u-xian.com/image/shop/c5e25f9d-b7d4-4da8-8652-1ddfebae7077/1491674174626shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"-->
      <!--width="51px" height="51px">-->
      <!--</div>-->
      <!--<div class="content">-->
      <!--<p class="shopTitle">味美土菜馆</p>-->
      <!--<p class="manjian">满15减5，满25减8，满50减12</p>-->
      <!--<div class="contentRight">-->
      <!--&lt;!&ndash;<div class="contentRight-Hui"><span>惠</span></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>&ndash;&gt;-->
      <!--<p class="tiemBox"><span class="tiem">40分钟</span></p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li class="list-item" @click="goIndex('4637cede-37aa-4648-94f5-2799f93508c9')">-->
      <!--<div class="logo">-->
      <!--<img-->
      <!--src="http://imagewm.test.u-xian.com/image/shop/ca2939cf-f42f-402f-8b75-53283431ee68/1491718060215shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100"-->
      <!--width="51px" height="51px">-->
      <!--</div>-->
      <!--<div class="content">-->
      <!--<p class="shopTitle">小巷子农家菜</p>-->
      <!--<p class="manjian">满30减22，满55减32，满100减45</p>-->
      <!--<div class="contentRight">-->
      <!--&lt;!&ndash;<div class="contentRight-Hui"><span>惠</span></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>&ndash;&gt;-->
      <!--<p class="tiemBox"><span class="tiem">30分钟</span></p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</li>-->
      <li class="listbox" v-for="item in shopList">
        <div class="list-item" @click="goIndex(item.shopId)">
          <div class="logo">
            <img :src="item.logo" width="51px" height="51px">
          </div>
          <div class="content">
            <p class="shopTitle">豆花花</p>
            <p class="manjian">满25减2，满45减5，满25减2，满45减5，满25减2，满45减5</p>
            <div class="contentRight">
              <!--<p class="tiemBox"><span class="distance">1.15KM</span>丨<span class="tiem">30分钟</span></p>-->
              <p class="tiemBox"><span class="tiem">30分钟</span></p>
            </div>
          </div>
        </div>
        <div class="contentRight-Hui" @click="toggleParity"><span>惠</span></div>
      </li>
    </ul>
    <transition name="fade">
      <div class="shopListToast" @click="closeToast" v-show="shopListShow">
        <div class="textConten">
          <span class="logo"></span>
          <div class="uxwm-terrace">
            <div class="label">悠先外卖：</div>
            <div class="manjianText">
              <span v-for="item in itemShopList.discounts">{{item.title}}</span>
            </div>
          </div>
          <div class="else-terrace">
            <div class="label">其他平台：</div>
            <div class="manjianText">
              <span v-for="item in itemShopList.thirdDiscounts">{{item.title}}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getStore, urlParse, setStore} from '../common/js/util'
  export default {
    data() {
      return {
        customerId: '',
        shopList: [],
        shopListShow: false,
        itemShopList: {}
      }
    },
    created() {
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
      this.getShopList()
    },
    mounted() {
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
      // 获取列表
      getShopList() {
        const data = {
          customerId: 'dcfae6aa-83af-484d-bbb6-8e0096d16272',
          pageSize: 30,
          pageNumber: 1,
          longitude: 0, // 经度
          latitude: 0 // 维度
        }
        this.axios.get(`/br/shop/list${this.PublicJs.createParams(data)}`).then((res) => {
          res = res.data
          if (res.success) {
            this.shopList = res.data
            console.log(res.data)
          }
        })
      },
      //  显示比价弹窗
      toggleParity() {
        console.log(123)
        this.shopListShow = true
      },
      // 关闭 比较 toast
      closeToast() {
        this.shopListShow = false
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

  .shopList .listbox {
    position: relative;
  }

  .shopList .listbox .contentRight-Hui {
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 20px 10px 25px 25px;
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

  .shopList .list-item:first-child {
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
    background: url("../assets/icon_activity_status0.png") no-repeat left top;
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
    background: url("../assets/VS@2x.png") no-repeat center;
    background-size: 56px;
  }

  .shopList .shopListToast .textConten .uxwm-terrace {
    display: flex;
    justify-content: space-between;
    padding: 18px 18px 12px 18px;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #FA753E;
    line-height: 20px;
    border-bottom: 1px solid #f5f5f5;
  }

  .shopList .shopListToast .textConten .else-terrace {
    display: flex;
    justify-content: space-between;
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

  .shopList .shopListToast .textConten .uxwm-terrace .manjianText,
  .shopList .shopListToast .textConten .else-terrace .manjianText {
    flex: 1;
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
