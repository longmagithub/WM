import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state ={
  shop_info: {
    shop_detail: {},
    shop_id: '',
    dispatch: {},
    weather_info: {}
  },
  dish_info: [
    {
      type_id: '',
      // isHot: false,
      dish: {
        dish_id: '',
        name: '',
        imageUrl: '',
        desc: '',
        sales: '',
        specification: [
        {
          specificationId:'',
          specificationName: '',
          dishPrice: 0,
          packPrice: 0,
          price: 0,
          taste: [
            {
              id: '',
              name: '',
              index: 0
            }
          ]
        }]
      }
    }  
  ],
  hot_rec:{
    hot: {
      imageUrl:'',
      saleCount:0,
      allCount:100,
      activityName:'',
      originalPrice:20.8,
      // specificationId:'',
      // specificationName:'',
      dishSpecifications:{
        dishSpecificationId:'',
        name:'',
        price:10,
        taste: [
            {
              id: '',
              name: '',
              index: 0
            }
          ]
      }，
      price:9.9,
      limitCount:0
    },
    rec: [{
      recommendDishId:"",
      imageUrl:'',
      saleCount:10,
      dishName:'',
      description:'',
      dishSpecifications:{
        dishSpecificationId:'',
        name:'',
        price:10
      }
    }]
  }
  cart: [
    {
      shop_id: '',
      dishes: [
        {
          dish_id:'',         //菜品ID
          name: '',           //名称
          count: 0,           //数量
          type: 0,            //是否爆款
          price: 0,           //价格（原价）
          pack_price: 0,      //打包费
          specification:{
            id: '',
            name: ''  //规格
          },              
          tasteId: {
            id: '',
            name: ''        //口味
          },
          hot_config: {
            originalPrice: 0,
            saleCount:0,
            allCount:100,
            limitCount:0    //爆款信息
          }
        }
      ]
    }
  ],
  user_info: {
    user_id: '',
    nickname: '',
    img_url: '',
    icode: ''
  }
}