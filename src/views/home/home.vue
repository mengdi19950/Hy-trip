<template>
  <div class="home" ref="homeRef">
    <!-- navbar 顶部导航栏 -->
    <van-nav-bar title="弘源旅途">
      <template #right>
        <i class="icon-right-menu" @click="menuClick"></i>
      </template>
    </van-nav-bar>

    <!-- 点击右侧菜单显示的内容 -->
    <transition name="menu">
      <menu-content v-if="onMenu" class="menu" 
                    @close-click="closeClick"
                    @item-click="itemClick"/>
    </transition>
    <van-overlay :show="showOverlay" @click="closeClick" />

    <!-- banner -->
    <div class="banner">
      <img src="https://pic.tujia.com/upload/festatic/publicImages/homebannerdefault.jpg" alt="">
    </div>
    <!-- 定位 城市 -->
    <home-location />
    
    <!-- 房屋类别 -->
    <home-categories />

    <!-- 搜索框 -->
    <div class="search" v-if="scrollTop >= 360">
      <search-bar />
    </div>

    <!-- 热门精选 -->
    <home-content />



  </div>
</template>

<script setup>
import MenuContent from './cpns/menu-content.vue';
import homeLocation from './cpns/home-location.vue';
import homeCategories from './cpns/home-categories.vue';
import homeContent from './cpns/home-content.vue';
import searchBar from '@/components/search-bar/search-bar.vue';

import useHomeStore from '@/stores/modules/home'
import  useScroll  from '@/hooks/useScroll'
import { onActivated, ref, watch } from 'vue';


const homeStore = useHomeStore()
homeStore.fetchHomeSuggestsData()
homeStore.fetchHomeCategoriesData()
homeStore.fetchHouseListData()

const homeRef = ref()

const { isReachBottom,scrollTop } = useScroll(homeRef)

//滚动到底部加载更多
watch(isReachBottom,(newValue) => {
  if(newValue) {
    homeStore.fetchHouseListData()
    isReachBottom.value = false
  }
})

// 保留首页滚动位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top:scrollTop.value
  })
})

const onMenu = ref(false)
const showOverlay = ref(false)
const menuClick = () => {
  onMenu.value = !onMenu.value
  showOverlay.value = true
}
const closeClick = () => {
  onMenu.value = false
  showOverlay.value = false
}
const itemClick = () => {
  onMenu.value = false
  showOverlay.value = false
}






</script>

<style lang='less' scoped>
.home {
  --van-nav-bar-title-text-color:var(--primary-color);
  margin-bottom: 80px;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  background-color: #f7f8fb;
  .icon-right-menu {
    display: inline-block;
    width: 20px;
    height: 15px;
    background-image: url(@/assets/img/home/icon-right-menu.png);
    background-size: 20px 15px;
  }

  .menu {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: #fff;
  }
  .menu-enter-active, .menu-leave-active {
  transition: all 0.5s;
}
  .menu-enter, .menu-leave-to {
    transform: translateX(100%);
  }

  .banner {
    img {
      width: 100%;
    }
  }
  .search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 64px;
    background: #fff;
    padding: 3px;
    z-index: 9;
  }
}
</style>
