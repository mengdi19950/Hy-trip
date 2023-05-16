<template>
  <ul class="menu-content">
    <van-icon name="cross" class="close-icon" size="24" color="#666" @click="handleCloseClick"/>
    <li class="home" @click="homeClick">
        <van-icon name="wap-home-o" class="icon" size="18"/>
        <span class="text">首页</span>
    </li>
    <div class="un-login" v-if="notLogin">
      <li class="login" @click="handleItemClick('/login')">
        <van-icon name="friends-o" class="icon" size="18"/>
        <span class="text">登录/注册</span>
      </li>
    </div>
    <div class="user-infos" v-else>
      <div class="item" @click="handleItemClick('/personal')">
        <van-icon name="user-o" class="icon" size="18" />
        <span class="text">我的</span>
      </div>
      <div class="item" @click="handleItemClick('/order')">
        <van-icon name="balance-list-o" class="icon" size="18" />
        <span class="text">订单</span>
      </div>
      <div class="item" @click="handleItemClick('/favor')">
        <van-icon name="like-o" class="icon" size="18" />
        <span class="text">收藏</span>
      </div>
      <div class="item" @click="handleItemClick('/message')">
        <van-icon name="comment-o" class="icon" size="18" />
        <span class="text">消息</span>
      </div>
      <div class="item" @click="handleExitClick">
        <van-icon name="revoke" class="icon" size="18" />
        <span class="text">退出登录</span>
      </div>
    </div>
  </ul>
</template>

<script setup>
import { computed, ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const phone = ref(localStorage.getItem('phone'))

const emit = defineEmits(['closeClick','loginClick','itemClick'])

const notLogin = computed(() => {
  return !phone.value
})

const handleCloseClick = () => {
  emit('closeClick')
}

const homeClick = () => {
  router.go(0) //刷新当前页面，用push /home不会刷新
}
const handleLoginClick = () => {
  emit('loginClick')
}

const handleItemClick = (item) => {
  router.push(item)
  emit('itemClick')
}

const handleExitClick = () => {
  phone.value = null
  localStorage.removeItem('phone')
  router.go(0)
}







</script>

<style lang='less' scoped>
.menu-content{
  width: 148px;
  font-size: 14px;
  color: #333;
  padding:10px 30px 30px;
  position: relative;
  .close-icon {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  li {
    padding: 25px 5px;
    border-bottom: 1px solid #eee;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .icon {
    margin-right: 15px;
  }
  .home {
    margin-top: 15px;
  }

  .user-infos {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    .item {
      padding: 13px 5px;
    }
  }
}
</style>
