<template>
    <div class="content">
      <h2>热门精选</h2>
      <div class="houselist">
      <template v-for="(item,index) in houselists" :key="item.data.houseId">
          <houselist-tp9 v-if="item.discoveryContentType === 9"
                        :item-data="item.data"
                        @click="itemClick(item.data)"/>
          <houselist-tp3 v-else-if="item.discoveryContentType === 3"
                        :item-data="item.data"
                        @click="itemClick(item.data)"/>
      </template>
    </div>
  </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home'
import { storeToRefs } from "pinia";
import houselistTp9 from "@/components/houselist/houselist-tp9.vue";
import houselistTp3 from "@/components/houselist/houselist-tp3.vue";
import router from "@/router";

const homeStore = useHomeStore()
const { houselists } = storeToRefs(homeStore)


const itemClick = (item) => {
  // console.log(item.houseId);
  router.push({
    path:'/detail/'+ item.houseId
  })
}




</script>

<style lang='less' scoped>
  .content {
    padding: 0px 8px;

    h2 {
      margin-left: 10px;
      font-size: 22px;
    }
    .houselist {
      display: flex;
      margin-top: 5px;
      flex-wrap: wrap;
    }
  }
</style>
