<template>
<nav-bar title="消息中心" />
  <div class="message">
    <img src="@/assets/img/message/icon_message.png" alt="">
    <div class="text">
      暂无聊天消息
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/nav-bar/nav-bar.vue';




</script>

<style lang='less' scoped>
.message {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
    img {
      width: 88%; 
    }
  
}
</style>
