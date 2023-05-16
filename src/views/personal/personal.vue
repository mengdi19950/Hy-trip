<template>
  <div class="personal">
    <div class="title">
      <nav-bar title="个人中心" leftText="旅途"/>
    </div>
    <div class="content">
      <div class="text">如需查看或修改账号信息，请前往弘源旅途APP进行相关操作</div>
      <div class="wrap">
        <div class="section">
          <div class="left">
            <span class="name">旅途APP</span>
            <span class="down">点击下载APP查看账号信息</span>
          </div>
          <button class="right">
            下载APP
          </button>
        </div>
        <div class="section">
          <div class="left">
            <span class="name">旅途公众号</span>
            <span class="down">微信扫码关注公众号查看账号信息</span>
          </div>
          <div class="QRcode">
            二维码
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/nav-bar/nav-bar.vue';
</script>

<style lang='less' scoped>
.personal{
  background-color: #fafafa;
  height: 100vh;
  -webkit-font-smoothing: antialiased;
  .content {
    padding: 20px;
    .text {
      margin-top: 10px;
      text-align: center;
      font-size: 16px;
      line-height: 200%;
    }
    .wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 20px;
      .section {
        background-color: #fff;
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        padding: 30px 20px;
        box-sizing: border-box;
        box-shadow: 0 4px 20px 0 rgba(233,217,217,.5);
        border-radius: 8px;
        .left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .name {
            font-size: 18px;
          }
          .down {
            margin-top: 10px;
            font-size: 12px;
            color: #666;
          }
        }
        .right {
          border: none;
          background:linear-gradient(90deg,#fa8c1d,#fcaf3f);
          color: #fff;
          border-radius: 15px;
          height: 30px;
          width: 75px;
        }
        .QRcode {
          border: 1px solid #000;
          width: 80px;
          height: 80px;
          text-align: center;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>
