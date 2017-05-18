<template>
  <div class="erweima">
    <div class="imgBack"></div>
    <div class="boonText">客官，看你骨骼清奇，<br>
      不去晒个红包简直就是浪费良辰美景呐~
    </div>
    <div class="boonNum"><span>8.88</span><i class="yuanIcon"></i></div>
    <div class="shareText">客官，看你骨骼清奇，<br>
      不去晒个红包简直就是浪费良辰美景呐~
    </div>
    <div class="wechatImg"><img src="../../assets/WechatIMG22.jpeg" width="120px" height="120px" alt=""></div>
    <div class="bottomText">长按关注 领取红包</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    created() {
      window.alert(window.location.href)
    }
  }
</script>

<style>
  .erweima {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: #FF5544;
  }

  .erweima .imgBack {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 54%;
    background: url("../../assets/shareBack.png") no-repeat center;
    background-size: 100% 100%;
  }

  .erweima .boonText,
  .erweima .boonNum,
  .erweima .shareText,
  .erweima .bottomText {
    position: absolute;
    width: 100%;
    text-align: center;
  }

  .erweima .boonText {
    box-sizing: border-box;
    top: 13%;
    left: 20%;
    padding: 0 10px;
    width: 60%;
    font-family: STYuanti-SC-Regular;
    font-size: 9.69px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 15.87px;
  }

  .erweima .boonNum {
    top: 18%;
    height: 67px;
    line-height: 67px;
    font-family: STYuanti-SC-Bold;
    font-size: 48.49px;
    color: #FA6B4B;
    letter-spacing: 0;
  }

  .erweima .boonNum .yuanIcon {
    display: inline-block;
    margin-left: 4px;
    width: 20px;
    height: 100%;
    background: url("../../assets/yuan@2x.png") no-repeat center;
    background-size: 20px 20px;
    font-size: 15px;
  }

  @media (max-width: 320px) {
    .erweima .boonNum {
      top: 17%;
      height: 66px;
      line-height: 66px;
      font-family: STYuanti-SC-Bold;
      font-size: 40px;
      color: #FA6B4B;
      letter-spacing: 0;
    }
  }
  @media (max-width: 320px) {
    .erweima .boonNum .yuanIcon {
      display: inline-block;
      margin-left: 2px;
      width: 15px;
      height: 100%;
      background: url("../../assets/yuan@2x.png") no-repeat center;
      background-size: 15px 15px;
      font-size: 12px;
    }
  }

  .erweima .shareText {
    box-sizing: border-box;
    top: 57%;
    left: 10%;
    width: 80%;
    font-family: STYuanti-SC-Regular;
    font-size: 13px;
    color: #FFFFFF;
    letter-spacing: 0.37px;
  }

  @media (max-width: 320px) {
    .erweima .shareText {
      box-sizing: border-box;
      top: 54%;
      left: 10%;
      width: 80%;
      font-family: STYuanti-SC-Regular;
      font-size: 13px;
      color: #FFFFFF;
      letter-spacing: 0.37px;
    }
  }

  .erweima .bottomText {
    top: 92%;
    font-family: STYuanti-SC-Bold;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
  }

  @media (max-width: 320px) {
    .erweima .bottomText {
      top: 93%;
      font-family: STYuanti-SC-Bold;
      font-size: 16px;
      color: #FFFFFF;
      letter-spacing: 0;
    }
  }
  .erweima .wechatImg {
    position: absolute;
    top: 68%;
    width: 100%;
    text-align: center;
    height: 120px;
    /*background: url("../../assets/WechatIMG22.jpeg") no-repeat center;*/
    background-size: 120px 120px;
  }
  @media (max-width: 320px) {
    .erweima .wechatImg {
      position: absolute;
      top: 65%;
      width: 100%;
      height: 120px;
      background: url("../../assets/WechatIMG22.jpeg") no-repeat center;
      background-size: 120px 120px;
    }
  }
</style>
