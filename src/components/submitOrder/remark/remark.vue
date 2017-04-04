<template>
  <div class="remark">
    <section class="orderRemark">
      <div class="orderTitle">
        订单备注
      </div>
      <div class="orderContent">
        <div class="acquiesce">
          <span class="acquiesce-orderItem" v-for="(item,index) in initremark"
                :class="{'selectClass': index === remarkIndex}"
                @click="selectRemark(index)">{{item}}
          </span>
        </div>
        <!--<span class="orderItem" :class="{'selectClass': userSelect}" @click="selectRemark">不要</span>-->
        <!--<span class="orderItem" :class="{'selectClass': userSelect}" @click="selectRemark">香菜香菜</span>-->
        <!--<span class="orderItem" :class="{'selectClass': userSelect}" @click="selectRemark">多香香菜</span>-->
        <!--<span class="orderItem" :class="{'selectClass': userSelect}" @click="selectRemark">德玛</span>-->
      </div>
    </section>
    <section class="elseRemark">
      <div class="elseTitle">
        其他备注
      </div>
      <div class="elseContent">
        <textarea class="elseText"
                  v-model="elseText"
                  maxlength="50" cols="50" rows="3"
                  placeholder="请输入备注内容（可不填）"></textarea>
        <div class="length"><span class="lengthNum">{{elseText.length}}</span>/50</div>
      </div>
    </section>
    <div class="submit">
      <div class="submitBtn" @click="goSubmitOrder">确定</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'
  export default {
    data() {
      return {
        elseText: '',
        selectClass: false,
        userSelect: false,
        initremark: ['不要辣', '少要辣', '多要辣'],
        remarkIndex: 0
      }
    },
    created() {
      this.PublicJs.changeTitleInWx('订单备注')
    },
    methods: {
      ...mapMutations(['CONFIRM_REMARK']),
      selectRemark(index) {
        this.remarkIndex = index
      },
      goSubmitOrder() {
        this.CONFIRM_REMARK({remarkText: this.initremark[this.remarkIndex], inputText: this.elseText})
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .remark {
    padding-top: 19px;
    font-size: 14px;
    font-weight: 700;
    color: #343434;
  }

  .remark .orderRemark {
    margin-bottom: 14px;
    padding: 13px 8px 5px 17px;
    background: #ffffff;
  }

  .remark .orderRemark .orderContent {
    font-size: 0px;
    font-weight: 500;
    color: #565656;
  }

  .remark .orderRemark .orderContent .acquiesce {
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    margin: 7px 0;
    margin-right: 6px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ff8932;
    border-radius: 5px;

  }

  .remark .orderRemark .orderContent .acquiesce .acquiesce-orderItem {
    display: inline-block;
    padding: 0px 7px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    border-right: 1px solid #ff8932;
  }

  .remark .orderRemark .orderContent .acquiesce .acquiesce-orderItem:last-child {
    border-right: none;
  }

  .remark .orderRemark .orderContent .orderItem {
    box-sizing: border-box;
    display: inline-block;
    margin: 7px 0;
    margin-right: 6px;
    padding: 0 7px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    font-size: 12px;
    border: 1px solid #ff8932;
    border-radius: 5px;
  }

  .remark .orderRemark .orderContent .acquiesce .selectClass,
  .remark .orderRemark .orderContent .selectClass {
    color: #ffffff;
    background: #ff8932;
  }

  .remark .elseRemark {
    box-sizing: border-box;
    padding: 13px 14px 20px 10px;
    background: #ffffff;
  }

  .remark .elseRemark .elseTitle {
    box-sizing: border-box;
    padding: 0px 0px 13px 7px;
  }

  .remark .elseRemark .elseContent {
    position: relative;
  }

  .remark .elseRemark .elseContent .elseText {
    box-sizing: border-box;
    padding: 12px 10px;
    resize: none;
    overflow: hidden;
    width: 100%;
    height: 70px;
    color: #343434;
    font-size: 12px;
    border-radius: 7px;
    border: 1px solid #e0e0e0;
    background: #f5f5f5;
  }

  .remark .elseRemark .elseContent .elseText::-webkit-input-placeholder {
    font-size: 12px;
    color: #b3b3b3;
  }

  .remark .elseRemark .elseContent .length {
    position: absolute;
    right: 10px;
    bottom: 7px;
    letter-spacing: 1px;
    font-size: 11px;
    color: #b3b3b3;
  }

  .remark .elseRemark .elseContent .length .lengthNum {
    color: #343434;
  }

  .remark .submit {
    box-sizing: border-box;
    padding: 0 17px;
    padding-bottom: 30px;
    background: #ffffff;
  }

  .remark .submit .submitBtn {
    width: 100%;
    height: 42px;
    line-height: 42px;
    text-align: center;
    border-radius: 5px;
    letter-spacing: 2px;
    font-size: 16px;
    color: #ffffff;
    background: #ff8932;
  }
</style>
