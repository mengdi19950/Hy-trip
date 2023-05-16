<template>
  <div class="loading" 
                  v-if="mainStore.isLoading" 
                  @click="loadingClick"
                  >
    <div class="background">
      <img src="@/assets/img/home/full-screen-loading.gif" alt="">
    </div>
  </div>
</template>

<script setup>
import useMainStore from '@/stores/modules/main';

const mainStore = useMainStore()

const loadingClick = () => {
  mainStore.isLoading = false
}

</script>

<style lang='less' scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.2);
  z-index: 999;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  .background {
    background: url('@/assets/img/home/loading-bg.png') 0 0 / 100% 100%;
    width: 104px;
    height: 104px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 70px;
      height: 70px;
      margin-bottom: 10px;
    }
  }
}
</style>
