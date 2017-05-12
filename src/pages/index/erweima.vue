<template>
  <div class="erweima">
    <div class="imgBack">
      <div class="boonText">客官，看你骨骼清奇，<br>
        不去晒个红包简直就是浪费良辰美景呐~
      </div>
      <div class="boonNum"><span>8.88</span><i class="yuanIcon"></i></div>
      <div class="shareText">客官，看你骨骼清奇，<br>
        不去晒个红包简直就是浪费良辰美景呐~
      </div>
      <div class="bottomText">长按关注 领取红包</div>
    </div>
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
    width: 100%;
    height: 365px;
    background: url("../../assets/shareBack.png") no-repeat center;
    background-size: 100% 365px;
  }

  .erweima .imgBack .boonText,
  .erweima .imgBack .boonNum,
  .erweima .imgBack .shareText,
  .erweima .imgBack .bottomText {
    position: absolute;
    width: 100%;
    text-align: center;
  }

  .erweima .imgBack .boonText {
    box-sizing: border-box;
    top: 92px;
    left: 20%;
    padding: 0 10px;
    width: 60%;
    font-family: STYuanti-SC-Regular;
    font-size: 9.69px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 15.87px;
  }

  .erweima .imgBack .boonNum {
    position: relative;
    top: 142px;
    height: 67px;
    line-height: 67px;
    font-family: STYuanti-SC-Bold;
    font-size: 48.49px;
    color: #FA6B4B;
    letter-spacing: 0;
  }
  .erweima .imgBack .boonNum .yuanIcon {
    display: inline-block;
    margin-left: 4px;
    width: 20px;
    height: 100%;
    background: url("../../assets/yuan@2x.png") no-repeat center;
    background-size: 20px 20px;
    font-size: 15px;
  }

  .erweima .imgBack .shareText {
    box-sizing: border-box;
    top: 385px;
    left: 10%;
    width: 80%;
    font-family: STYuanti-SC-Regular;
    font-size: 13px;
    color: #FFFFFF;
    letter-spacing: 0.37px;
  }

  .erweima .imgBack .bottomText {
    top: 554px;
    font-family: STYuanti-SC-Bold;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
  }
</style>
