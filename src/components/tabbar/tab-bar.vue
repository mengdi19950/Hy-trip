<template>
  <div class="tabbar">
    <van-tabbar v-model="active" active-color="#ff9854" route>
      <template v-for="(item,index) in tabbarData" :key="index">
        <van-tabbar-item :to="item.path">
          <span class="text">{{ item.text }}</span>
          <template #icon>
            <img v-if="active !== index" :src="require('@/assets/img/' + item.image)" alt="">
            <img v-else :src="require('@/assets/img/' + item.activeImage)" alt="">
          </template>
        </van-tabbar-item>
        
      </template>
    </van-tabbar>


    
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import tabbarData from '@/assets/data/tabbarData'
import { useRoute } from 'vue-router';

const active = ref(0)
const route = useRoute()
watch(route,(newRoute) => {
  const index = tabbarData.findIndex(item => item.path === newRoute.path)
  if(index === -1) return
  active.value = index
})



</script>

<style lang='less' scoped>
.tabbar {
  img {
    height: 25px;
  }
}
</style>
