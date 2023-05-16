<template>
  <div class="houselist">
    <div class="item">
      <div class="cover">
        <img :src="itemData.image.url" alt="">
      </div>
      <div class="info">
        <div class="summary">{{ itemData.summaryText }}</div>
        <div class="name">{{ itemData.houseName }}</div>
        <div class="price">
          <van-rate :model-value="score" readonly allow-half color="#fff" :size="15" gutter="0" />
          <span class="finalPrice">
            {{'¥' + itemData.finalPrice }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue"


const props = defineProps({
  itemData:{
    type:Object,
    default:() => ({})
  }
})

const score = computed(() => {
  return Number(props.itemData.commentScore)
})






</script>

<style lang='less' scoped>
.houselist {
  width: 50%;
  .item {
    position: relative;
    margin: 5px;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
    .cover {

      img {
        width: 100%;
      }

    }

    .info {
      position: absolute;
      bottom: 0;
      padding: 8px 10px;
      color: #fff;
      .summary {
        font-size: 12px;
      }
      .name {
        margin: 5px 0;
        overflow: hidden;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }

      .finalPrice {
        position: absolute;
        right: 10px;
      }
    }

  }
}

</style>
