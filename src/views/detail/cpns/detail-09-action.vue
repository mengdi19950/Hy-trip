<template>
  <div class="action">
    <van-action-bar class="actionBar">
      <van-action-bar-icon icon="chat-o" text="聊天" class="chat"/>
      <van-action-bar-icon class="text">
        <span class="new">
          {{ '¥' + price.product.finalPrice }}
        </span>
        <span>/晚</span>
        <span class="old">
          {{ '¥' + price.product.productPrice }}
        </span>
      </van-action-bar-icon>
      <i class="icon"></i>
      <van-action-bar-button type="danger" text="预订当前房源" class="order"/>
    </van-action-bar>
  </div>
</template>

<script setup>
defineProps({
  price:{
    type:Object,
    default:() => ({})
  }
})



</script>

<style lang='less' scoped>
.action {
  position: fixed;
  bottom: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  .actionBar {
    height: 60px;
    .chat {
      border-right: 1px solid #ddd;
      width: 50px;
      height: 35px;
    }
    .text {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 20px;
      .new {
        font-size: 16px;
        color: var(--primary-color);
        font-weight: 700;
        padding-right: 5px;
      }
      .old {
        padding-left: 5px;
        text-decoration: line-through;
      }
      
    }
    .order ::before {
      display: block;
      width: 14px;
      height: 17px;
      background: url('@/assets/img/detail/icon_order.png') 0 0 / 100% 100%;
      margin-right: 5px;
    }
    .order {
      width: 150px;
      height: 100%;
      position: absolute;
      right: 0;
      bottom: 0;
      border-radius: 0;
      --van-action-bar-button-danger-color:linear-gradient(90deg, #fa8c1d, #fcaf3f);
      font-size: 18px;
      font-weight: 400;
      margin-right: -1px;
    }
  }
}
</style>
