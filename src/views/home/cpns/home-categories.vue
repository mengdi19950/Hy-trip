<template>
  <div class="categories">
    <template v-for="(item,index) in categories" :key="index">
      <div class="item">
        <img :src="item.pictureUrl" alt="">
        <div class="bottom-info">
            {{ item.title }}
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home'
import { storeToRefs } from 'pinia'

const homeStore = useHomeStore()
const { categories } = storeToRefs(homeStore)



</script>

<style lang='less' scoped>
.categories {
  display: flex;
  overflow-x: auto;
  margin-bottom: 20px;
  background-color: #fff;
  margin-top: 15px;
  border-radius: 8px;

  &::-webkit-scrollbar{ 
    display:none
  }

  .item {
    width: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex-shrink: 0;
    

    img {
      width: 32px;
      height: 32px;
    }

    .bottom-info {
      font-size: 12px;
      margin-top: 6px;
    }
  }
}
</style>
