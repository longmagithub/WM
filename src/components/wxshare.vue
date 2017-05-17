<template>
</template>
<script>
  import {getStore, setStore} from '../common/utils/util'
  export default {
    data() {
      return {
        latLon: '',
        shopListArr: getStore('shopList')
//        shopListArr: [{
//          'discounts': [],
//          'duration': 20,
//          'latitudeB': 30.1854,
//          'latitudeG': 30.1796,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/1429f4c6-cdda-4888-884d-926be8f55f2c/1493792732841shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.162,
//          'longitudeG': 120.156,
//          'makingTime': 0,
//          'shopId': '1429f4c6-cdda-4888-884d-926be8f55f2c',
//          'shopName': '甜品一号店',
//          'showFavorableTips': null,
//          'sort': 2,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [{
//            'description': 'æ»¡100.00å20.00',
//            'id': '52b6863c-e56f-4a11-bd04-f0bb7ab7b5a1',
//            'lowerThanUs': null,
//            'title': '100减20',
//            'type': null
//          }, {
//            'description': 'æ»¡50.00å9.00',
//            'id': 'd6f1f2ab-7db3-47b3-b264-460393897cae',
//            'lowerThanUs': null,
//            'title': '50减9',
//            'type': null
//          }, {
//            'description': 'æ»¡20.00å3.00',
//            'id': 'e666539a-79c2-431f-ae3c-dc4154a8506a',
//            'lowerThanUs': null,
//            'title': '20减3',
//            'type': null
//          }],
//          'duration': 20,
//          'latitudeB': 30.1854,
//          'latitudeG': 30.1796,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/c8bebc56-4fdb-4ec3-b956-e4de8b34080e/1494569004329shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.162,
//          'longitudeG': 120.156,
//          'makingTime': 0,
//          'shopId': '5d25f4cb-5454-41ad-9911-208d2ff59702',
//          'shopName': '谢谢的新店',
//          'showFavorableTips': null,
//          'sort': 2,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [{
//            'description': 'æ»¡40.00å21.00',
//            'id': '713ddd96-816f-45c7-b189-d9b0bc363536',
//            'lowerThanUs': null,
//            'title': '满40减21',
//            'type': null
//          }, {
//            'description': 'æ»¡20.00å14.00',
//            'id': '9e8bd4ef-000b-497b-95e2-d095bebe3b22',
//            'lowerThanUs': null,
//            'title': '满20减14',
//            'type': null
//          }],
//          'duration': 20,
//          'latitudeB': 30.1874,
//          'latitudeG': 30.1814,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/d8438de5-d90d-431d-bd68-0d0a85f4401a/1491718589749shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.16,
//          'longitudeG': 120.153,
//          'makingTime': 0,
//          'shopId': 'e452573e-69df-4912-ad96-8b3f4ad52d1f',
//          'shopName': '杯思特KAO肉饭',
//          'showFavorableTips': null,
//          'sort': 2,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [],
//          'duration': 20,
//          'latitudeB': 30.1835,
//          'latitudeG': 30.1774,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/2af5e536-27c2-469f-9657-43211512e6f8/1493867654274shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.174,
//          'longitudeG': 120.183,
//          'makingTime': 0,
//          'shopId': '960f59c8-1403-4271-82d0-3d5653d7a51c',
//          'shopName': '奶茶',
//          'showFavorableTips': null,
//          'sort': 2,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [{
//            'description': 'æ»¡200.00å67.00',
//            'id': '4b9fb7b1-c53a-4be2-b6c5-3001f23bc112',
//            'lowerThanUs': null,
//            'title': '满200减67',
//            'type': null
//          }, {
//            'description': 'æ»¡120.00å47.00',
//            'id': 'c40e288c-d66f-460b-ad2a-55935d4a72da',
//            'lowerThanUs': null,
//            'title': '满120减47',
//            'type': null
//          }, {
//            'description': 'æ»¡80.00å36.00',
//            'id': '948bfaaa-e977-44cd-b111-36d56e8d546a',
//            'lowerThanUs': null,
//            'title': '满80减36',
//            'type': null
//          }, {
//            'description': 'æ»¡45.00å25.00',
//            'id': '2b669bd2-7176-445d-b021-4c57ff4ab436',
//            'lowerThanUs': null,
//            'title': '满45减25',
//            'type': null
//          }, {
//            'description': 'æ»¡30.00å20.00',
//            'id': 'f2d6c671-a417-4d32-a5a1-ff9d6d45b4ae',
//            'lowerThanUs': null,
//            'title': '满30减20',
//            'type': null
//          }],
//          'duration': 20,
//          'latitudeB': 30.1877,
//          'latitudeG': 30.1813,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/4637cede-37aa-4648-94f5-2799f93508c9/1491718406275shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.16,
//          'longitudeG': 120.154,
//          'makingTime': 0,
//          'shopId': 'd8438de5-d90d-431d-bd68-0d0a85f4401a',
//          'shopName': '有家土菜馆',
//          'showFavorableTips': null,
//          'sort': 3,
//          'thirdDiscounts': [{
//            'description': 'æ»¡50å10',
//            'id': 'd8438de5-d90d-431d-bd68-0d0a85f4401a',
//            'lowerThanUs': true,
//            'title': '满50减12',
//            'type': 1
//          }]
//        }, {
//          'discounts': [{
//            'description': 'æ»¡100.00å20.00',
//            'id': '340fd106-d8b5-4a66-acbb-f6c8b996b1ba',
//            'lowerThanUs': null,
//            'title': '100减20',
//            'type': null
//          }, {
//            'description': 'æ»¡20.00å2.00',
//            'id': '5a4046b6-249f-48f7-8bf9-ea15fe56fa37',
//            'lowerThanUs': null,
//            'title': '20减2',
//            'type': null
//          }],
//          'duration': 20,
//          'latitudeB': 30.1854,
//          'latitudeG': 30.1796,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/960f59c8-1403-4271-82d0-3d5653d7a51c/1493962206157shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.162,
//          'longitudeG': 120.156,
//          'makingTime': 0,
//          'shopId': '167be848-e98f-4b2b-9d34-e93bf76225c0',
//          'shopName': '芭比馒头',
//          'showFavorableTips': null,
//          'sort': 3,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [{
//            'description': 'æ»¡50.00å9.00',
//            'id': '4716c965-1f36-4239-90a6-c38af1827be8',
//            'lowerThanUs': null,
//            'title': '满50减9',
//            'type': null
//          }],
//          'duration': 20,
//          'latitudeB': 30.1876,
//          'latitudeG': 30.1826,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/1493963664127.jpg?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.143,
//          'longitudeG': 120.136,
//          'makingTime': 0,
//          'shopId': 'c8bebc56-4fdb-4ec3-b956-e4de8b34080e',
//          'shopName': '哈哈哈哈',
//          'showFavorableTips': null,
//          'sort': 3,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [{
//            'description': 'æ»¡45.00å8.00',
//            'id': '36de74b8-ccf7-4ab5-ad6b-a67b1bac7820',
//            'lowerThanUs': null,
//            'title': '满45减8',
//            'type': null
//          }],
//          'duration': 20,
//          'latitudeB': 30.185,
//          'latitudeG': 30.1791,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/7da10ea0-91ea-4db2-852f-b46afb63ada6/1491673784318shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.161,
//          'longitudeG': 120.155,
//          'makingTime': 0,
//          'shopId': 'c1c8dafb-0d9e-4722-b7d8-a540d235e30c',
//          'shopName': '豆花花',
//          'showFavorableTips': null,
//          'sort': 5,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [{
//            'description': 'æ»¡43.00å9.00',
//            'id': '65159eb4-9c3e-49c1-b2aa-35b94f93015d',
//            'lowerThanUs': null,
//            'title': '满43减9',
//            'type': null
//          }, {
//            'description': 'æ»¡28.00å5.00',
//            'id': 'fccc9856-ee88-4e02-b173-554ae83c03c1',
//            'lowerThanUs': null,
//            'title': '满28减5',
//            'type': null
//          }],
//          'duration': 20,
//          'latitudeB': 30.1874,
//          'latitudeG': 30.1814,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/8d68095c-4ca8-40d0-b3a0-c40dac778c17/1491674343847shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.16,
//          'longitudeG': 120.154,
//          'makingTime': 0,
//          'shopId': 'af8b7bfa-34b8-4266-accf-1dd64eff580d',
//          'shopName': '徽府香辣馆',
//          'showFavorableTips': null,
//          'sort': 8,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [{
//            'description': 'æ»¡100.00å99.00',
//            'id': '51369ec9-d7a0-4a62-a0bf-00e82c3c9e97',
//            'lowerThanUs': null,
//            'title': '满100减99',
//            'type': null
//          }, {
//            'description': 'æ»¡50.00å9.00',
//            'id': 'c9c2f455-b9da-4238-b7a6-401a6ee99764',
//            'lowerThanUs': null,
//            'title': '满50减9',
//            'type': null
//          }, {
//            'description': 'æ»¡20.00å3.00',
//            'id': 'e8d3bb69-85a5-4d53-a959-471aee92fbfe',
//            'lowerThanUs': null,
//            'title': '20减3',
//            'type': null
//          }],
//          'duration': 20,
//          'latitudeB': 30.1854,
//          'latitudeG': 30.1796,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/e3e616f2-dee1-49d8-8dff-08ba9a203dd4/1493359693205shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.162,
//          'longitudeG': 120.156,
//          'makingTime': 0,
//          'shopId': 'e3e616f2-dee1-49d8-8dff-08ba9a203dd4',
//          'shopName': '麻辣小面连庄店',
//          'showFavorableTips': null,
//          'sort': 10,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [],
//          'duration': 20,
//          'latitudeB': 30.1854,
//          'latitudeG': 30.1796,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/e3e616f2-dee1-49d8-8dff-08ba9a203dd4/1493370661485shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.162,
//          'longitudeG': 120.156,
//          'makingTime': 0,
//          'shopId': 'c152d16f-59f1-426e-bedc-79520c3b832d',
//          'shopName': '周萱萱的店',
//          'showFavorableTips': null,
//          'sort': 10,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [],
//          'duration': 20,
//          'latitudeB': 30.1854,
//          'latitudeG': 30.1796,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/1493348557305shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.162,
//          'longitudeG': 120.156,
//          'makingTime': 0,
//          'shopId': 'd6f3aa17-1589-4c38-a4de-1cf633961c49',
//          'shopName': '麻辣小面',
//          'showFavorableTips': null,
//          'sort': 10,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [{
//            'description': 'æ»¡100.00å45.00',
//            'id': '89ded191-ff16-4742-a9d2-387b833c6e3f',
//            'lowerThanUs': null,
//            'title': '满100减45',
//            'type': null
//          }, {
//            'description': 'æ»¡55.00å32.00',
//            'id': '49339c79-b97c-4a8f-94ae-3d45e3c39fbc',
//            'lowerThanUs': null,
//            'title': '满55减32',
//            'type': null
//          }, {
//            'description': 'æ»¡30.00å22.00',
//            'id': '70c26feb-0a05-4107-9ea0-5eec10553848',
//            'lowerThanUs': null,
//            'title': '满30减22',
//            'type': null
//          }],
//          'duration': 20,
//          'latitudeB': 30.1874,
//          'latitudeG': 30.1816,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/ca2939cf-f42f-402f-8b75-53283431ee68/1491718060215shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.16,
//          'longitudeG': 120.154,
//          'makingTime': 0,
//          'shopId': '4637cede-37aa-4648-94f5-2799f93508c9',
//          'shopName': '小巷子农家菜',
//          'showFavorableTips': null,
//          'sort': 11,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [],
//          'duration': 20,
//          'latitudeB': 30.1857,
//          'latitudeG': 30.1798,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/44e64b83-ccff-4ff2-a230-fe41857233dd/1492591252541.jpg?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.163,
//          'longitudeG': 120.157,
//          'makingTime': 0,
//          'shopId': '44e64b83-ccff-4ff2-a230-fe41857233dd',
//          'shopName': '烧鸡公',
//          'showFavorableTips': null,
//          'sort': 11,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [{
//            'description': 'æ»¡30.00å1.00',
//            'id': '91c52633-8d9c-40f3-aa14-e9356f5ef7c1',
//            'lowerThanUs': null,
//            'title': '来咯我啦咯啦咯',
//            'type': null
//          }, {
//            'description': 'æ»¡22.00å20.00',
//            'id': 'f9de05f3-0ac8-4644-977d-a965ff3d6840',
//            'lowerThanUs': null,
//            'title': '222',
//            'type': null
//          }, {
//            'description': 'æ»¡22.00å20.00',
//            'id': 'ccd79815-61df-4d93-8e97-541d78aeefa5',
//            'lowerThanUs': null,
//            'title': '卡通',
//            'type': null
//          }, {
//            'description': 'æ»¡20.00å19.00',
//            'id': 'f4382794-ad83-409c-9822-f20819fd93cf',
//            'lowerThanUs': null,
//            'title': '满',
//            'type': null
//          }, {
//            'description': 'æ»¡10.00å5.00',
//            'id': 'e61e3aa1-b214-428d-b7de-737f2bc3b201',
//            'lowerThanUs': null,
//            'title': '满10减5',
//            'type': null
//          }, {
//            'description': 'æ»¡10.00å1.00',
//            'id': '97f3bfe2-be8f-4543-aafe-cfb2da729a58',
//            'lowerThanUs': null,
//            'title': '满10减1',
//            'type': null
//          }, {
//            'description': 'æ»¡2.00å1.00',
//            'id': '98f1954e-ee41-4e05-ac82-e8ea5da4274a',
//            'lowerThanUs': null,
//            'title': '好多',
//            'type': null
//          }],
//          'duration': 20,
//          'latitudeB': 30.1879,
//          'latitudeG': 30.1818,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/9480c029-a45d-479e-a3c3-74ed9c65d54d/1492594871864.jpg?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.159,
//          'longitudeG': 120.153,
//          'makingTime': 0,
//          'shopId': '9480c029-a45d-479e-a3c3-74ed9c65d54d',
//          'shopName': '黄金烤肉便当',
//          'showFavorableTips': null,
//          'sort': 11,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [{
//            'description': 'æ»¡50.00å49.00',
//            'id': '52057563-db47-4f0b-8b50-c186aeb6e8eb',
//            'lowerThanUs': null,
//            'title': '满50减49',
//            'type': null
//          }, {
//            'description': 'æ»¡25.00å10.00',
//            'id': '7368e2ef-00d4-476d-9103-9bb5351b8bcd',
//            'lowerThanUs': null,
//            'title': '满25减10',
//            'type': null
//          }],
//          'duration': 20,
//          'latitudeB': 30.1854,
//          'latitudeG': 30.1796,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/189dd957-d6d8-460f-b729-84418cd56995/1492582744911shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.162,
//          'longitudeG': 120.156,
//          'makingTime': 0,
//          'shopId': '189dd957-d6d8-460f-b729-84418cd56995',
//          'shopName': '软糖测试店',
//          'showFavorableTips': null,
//          'sort': 11,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [],
//          'duration': 20,
//          'latitudeB': 30.1876,
//          'latitudeG': 30.2086,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/8c8d785b-ea25-4962-aa5f-e1cba3b1871d/1493880471331.jpg?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.192,
//          'longitudeG': 120.212,
//          'makingTime': 0,
//          'shopId': '8c8d785b-ea25-4962-aa5f-e1cba3b1871d',
//          'shopName': 'mm',
//          'showFavorableTips': null,
//          'sort': 23,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [],
//          'duration': 20,
//          'latitudeB': 30.1854,
//          'latitudeG': 30.1796,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/1492600825682.jpg?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.162,
//          'longitudeG': 120.156,
//          'makingTime': 0,
//          'shopId': 'f3893599-cf51-4bb3-931d-b6be08d96bea',
//          'shopName': '鹅鹅鹅',
//          'showFavorableTips': null,
//          'sort': 1,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [],
//          'duration': 20,
//          'latitudeB': 30.1854,
//          'latitudeG': 30.1796,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/1493866988715shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.162,
//          'longitudeG': 120.156,
//          'makingTime': 0,
//          'shopId': '2af5e536-27c2-469f-9657-43211512e6f8',
//          'shopName': '奶茶店',
//          'showFavorableTips': null,
//          'sort': 2,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [{
//            'description': 'æ»¡50.00å15.00',
//            'id': '3217fd2c-e481-4a25-9365-44f74390971a',
//            'lowerThanUs': null,
//            'title': '满50减15',
//            'type': null
//          }, {
//            'description': 'æ»¡35.00å10.00',
//            'id': '7a48aa51-f0f2-4716-9a21-470a5c475a1a',
//            'lowerThanUs': null,
//            'title': '满35减10',
//            'type': null
//          }, {
//            'description': 'æ»¡20.00å4.00',
//            'id': 'b0e94bdb-3746-4b9d-9a4c-abe81a65c097',
//            'lowerThanUs': null,
//            'title': '满20减4',
//            'type': null
//          }],
//          'duration': 20,
//          'latitudeB': 30.1857,
//          'latitudeG': 30.1806,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/c1c8dafb-0d9e-4722-b7d8-a540d235e30c/1491674039775shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.161,
//          'longitudeG': 120.154,
//          'makingTime': 0,
//          'shopId': 'c5e25f9d-b7d4-4da8-8652-1ddfebae7077',
//          'shopName': '馋嘴花甲',
//          'showFavorableTips': null,
//          'sort': 4,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [{
//            'description': 'æ»¡50.00å10.00',
//            'id': 'ad62a5be-13d0-4b6b-9aa6-e7bd797a98c1',
//            'lowerThanUs': null,
//            'title': '满50减10',
//            'type': null
//          }, {
//            'description': 'æ»¡35.00å5.00',
//            'id': '448faa08-821a-4382-a9cc-f72000a79965',
//            'lowerThanUs': null,
//            'title': '满35减5',
//            'type': null
//          }],
//          'duration': 20,
//          'latitudeB': 30.1868,
//          'latitudeG': 30.181,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/9480c029-a45d-479e-a3c3-74ed9c65d54d/1491686827765shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.16,
//          'longitudeG': 120.154,
//          'makingTime': 0,
//          'shopId': 'c1a2c562-b2cc-46c2-9e10-47cc8552ca4e',
//          'shopName': '这个村民间美食',
//          'showFavorableTips': null,
//          'sort': 6,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [],
//          'duration': 20,
//          'latitudeB': 30.1876,
//          'latitudeG': 30.2086,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/1492421229563.jpg?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.192,
//          'longitudeG': 120.212,
//          'makingTime': 0,
//          'shopId': 'b4615518-404e-49e6-b75b-e161186bf2d9',
//          'shopName': '小花花',
//          'showFavorableTips': null,
//          'sort': 7,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [{
//            'description': 'æ»¡30.00å5.00',
//            'id': '239edb65-06e4-468f-a39f-baeb79211c08',
//            'lowerThanUs': null,
//            'title': '大减',
//            'type': null
//          }, {
//            'description': 'æ»¡20.00å3.00',
//            'id': 'bcfc9dc7-4d0a-4b69-9050-ac83674269ce',
//            'lowerThanUs': null,
//            'title': '小减',
//            'type': null
//          }, {
//            'description': 'æ»¡10.00å3.00',
//            'id': '9b74ac49-e2eb-48a2-ac8f-a83f259eef44',
//            'lowerThanUs': null,
//            'title': '满10减3',
//            'type': null
//          }],
//          'duration': 20,
//          'latitudeB': 30.1835,
//          'latitudeG': 30.1774,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/9eaa7532-8a10-41cb-918c-037d01765a23/1491809179315shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.174,
//          'longitudeG': 120.183,
//          'makingTime': 0,
//          'shopId': '9eaa7532-8a10-41cb-918c-037d01765a23',
//          'shopName': '小胖子',
//          'showFavorableTips': null,
//          'sort': 9,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [],
//          'duration': 20,
//          'latitudeB': 30.1849,
//          'latitudeG': 30.1801,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/1492591893049.jpg?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.162,
//          'longitudeG': 120.157,
//          'makingTime': 0,
//          'shopId': '3912a968-6d48-4d55-9ded-a9667b16331a',
//          'shopName': '烧鸭肉夹馍',
//          'showFavorableTips': null,
//          'sort': 11,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [],
//          'duration': 20,
//          'latitudeB': 30.1835,
//          'latitudeG': 30.1774,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/9480c029-a45d-479e-a3c3-74ed9c65d54d/1492425662543shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.174,
//          'longitudeG': 120.183,
//          'makingTime': 0,
//          'shopId': '42cd2073-2901-4e17-b906-95c3383764c9',
//          'shopName': '小胖子餐馆',
//          'showFavorableTips': null,
//          'sort': 11,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [{
//            'description': 'æ»¡80.00å8.00',
//            'id': 'f30ba97e-0272-4fd5-b338-e74ebd8e2831',
//            'lowerThanUs': null,
//            'title': '满80减8',
//            'type': null
//          }, {
//            'description': 'æ»¡50.00å5.00',
//            'id': '022c7d01-b659-4a78-92c1-775284aca387',
//            'lowerThanUs': null,
//            'title': '满50减5',
//            'type': null
//          }, {
//            'description': 'æ»¡30.00å3.00',
//            'id': '9d8e3c9b-7f0d-44ab-b5c5-5bf1e77f494a',
//            'lowerThanUs': null,
//            'title': '满30减3',
//            'type': null
//          }],
//          'duration': 20,
//          'latitudeB': 30.1864,
//          'latitudeG': 30.1805,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/c5e25f9d-b7d4-4da8-8652-1ddfebae7077/1491674174626shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.16,
//          'longitudeG': 120.154,
//          'makingTime': 0,
//          'shopId': '8d68095c-4ca8-40d0-b3a0-c40dac778c17',
//          'shopName': '味美土菜馆',
//          'showFavorableTips': null,
//          'sort': 11,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [],
//          'duration': 20,
//          'latitudeB': 30.1854,
//          'latitudeG': 30.1796,
//          'logo': 'whateverurl?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.162,
//          'longitudeG': 120.156,
//          'makingTime': 0,
//          'shopId': '10dba5ef-bae2-44c9-8b4e-2507b7f95571',
//          'shopName': '软糖测试1363',
//          'showFavorableTips': null,
//          'sort': 100,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [],
//          'duration': 20,
//          'latitudeB': 30.1854,
//          'latitudeG': 30.1796,
//          'logo': 'whateverurl?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.162,
//          'longitudeG': 120.156,
//          'makingTime': 0,
//          'shopId': '039193fb-9f5d-47a9-ab69-4ebfd90fc3d8',
//          'shopName': '软糖测试1361',
//          'showFavorableTips': null,
//          'sort': 100,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [{
//            'description': 'æ»¡100.00å99.00',
//            'id': 'e0cec89c-bd5a-41b6-9050-a8781840ddfa',
//            'lowerThanUs': null,
//            'title': '满100减99',
//            'type': null
//          }],
//          'duration': 20,
//          'latitudeB': 30.1854,
//          'latitudeG': 30.1796,
//          'logo': 'whateverurl?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.162,
//          'longitudeG': 120.156,
//          'makingTime': 0,
//          'shopId': '219582f8-d6a1-4c84-b2e6-6eb81e1a3929',
//          'shopName': '软糖测试1360',
//          'showFavorableTips': null,
//          'sort': 100,
//          'thirdDiscounts': []
//        }, {
//          'discounts': [],
//          'duration': 20,
//          'latitudeB': 30.1854,
//          'latitudeG': 30.1796,
//          'logo': 'http://imagewm.test.u-xian.com/image/shop/1493349155142shopImage.JPEG?x-oss-process=image/resize,m_fill,h_100,w_100',
//          'longitudeB': 120.162,
//          'longitudeG': 120.156,
//          'makingTime': 0,
//          'shopId': '398a4349-c615-4ff4-b73d-0f2dcf383f6f',
//          'shopName': '麻辣小面连庄店',
//          'showFavorableTips': null,
//          'sort': 100,
//          'thirdDiscounts': []
//        }]
      }
    },
    mounted () {
      this.setShareConfig()
      this.getBaiDuMap()
    },
    methods: {
      setShareConfig() {
        let that = this
        let url = window.location.href.split('#')[0]
        this.axios.get(`/mp/jsapi/sign?url=${encodeURIComponent(url)}`).then((res) => {
          res = res.data
          if (res.success) {
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.appId, // 必填，公众号的唯一标识
              timestamp: res.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
              signature: res.data.signature, // 必填，签名，见附录1
              jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'getLocation']
            })
            wx.ready(() => {
              wx.onMenuShareTimeline({
                title: '我在Thank u mom得到一个大红包，快来~快来~这里还有呐!', // 分享标题
                link: `http://newpay.tunnel.qydev.com/VAOrderH5/?#/erweima?${encodeURIComponent('price=6.66&desc=你好')}`, // 分享链接
                imgUrl: '../../assets/item_logo.png', // 分享图标
                success: function () {
                  // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                }
              })
              wx.onMenuShareAppMessage({
                title: '我在Thank u mom得到一个大红包，快来~快来~这里还有呐', // 分享标题
                desc: '微信点外卖-更便宜，更快捷。', // 分享描述
                link: `http://newpay.tunnel.qydev.com/VAOrderH5/?#/erweima?${encodeURIComponent('price=6.66&desc=你好')}`, // 分享链接
                imgUrl: '../../assets/item_logo.png', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                  // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                }
              })
              wx.getLocation({
                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                  if (res.errMsg === 'getLocation:ok') {
                    that.getBaiDuMap(res)
                  } else if (res.errMsg === 'getLocation:cancel') {
                  }
                }
              })
            })
          }
        })
      },
      // 百度地址算位置
      getBaiDuMap(res) {
        let location = []
        this.shopListArr.forEach((item, index) => {
          this.latLon += item.latitudeB + ',' + item.longitudeB + '|'
        })
        this.latLon = this.latLon.slice(0, -1)
//        console.log(this.latLon)
        window.alert('________----------___________------______-------__')
//        getStore('shopList')[this.customerId]
        const data = {
          ak: 'S4x3MzgMib0wWD5knazuh8mIDatI9QMW', // 用户访问权限
          output: 'json', // 输出的数据类型
//          origins: res.latitude + ',' + res.longitude, // 起点：维度，经度
          origins: '30.274085' + ',' + '120.15507', // 起点：维度，经度
          destinations: this.latLon, // 终点：维度，经度|维度，经度  多个用 | 分开
          coord_type: 'gcj02' // 坐标类型
        }
        this.$http.jsonp(`http://api.map.baidu.com/routematrix/v2/riding${this.PublicJs.createParams(data)}`).then((res) => {
          res = res.data
          res.result.forEach((item, index) => {
            item.flag = index
            this.shopListArr[index].location = item
            location.push(item)
          })
          for (let i = 0; i < this.shopListArr.length; i++) {
            for (let j = i; j < this.shopListArr.length; j++) {
              if (this.shopListArr[i].location.distance.value > this.shopListArr[j].location.distance.value) {
                let temp = this.shopListArr[i]
                this.shopListArr[i] = this.shopListArr[j]
                this.shopListArr[j] = temp
              }
            }
          }
          setStore('shopList', this.shopListArr)
//          console.log(JSON.stringify(this.shopListArr))
        })
      }
    }
  }
</script>
<style>
</style>
