<template>
  <div class="houselist">
    <div class="item">
      <div class="cover">
        <img :src="itemData.image.url" alt="">
      </div>
      <div class="info">
        <div class="location">
          <img src="@/assets/img/home/location.png" alt="">
          <span class="text">{{ itemData.location }}</span>
        </div>
        <div class="name">{{ itemData.houseName }}</div>
        <div class="summary">{{ itemData.summaryText }}</div>
        <div class="price">
          <span class="finalPrice">
            {{'¥' + itemData.finalPrice }}
          </span>
          <span class="oldPrice">{{ itemData.productPrice }}</span>
          <span class="sales">{{ itemData?.priceTipBadge?.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  itemData:{
    type:Object,
    default:() => ({})
  }
})



</script>

<style lang='less' scoped>
.houselist {
  width: 50%;
  .item {
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
      color: #666;
      font-size: 12px;
      .location {
        padding-top: 8px;
        display: flex;
        align-items: center;
        
        img {
          width: 12px;
          height: 12px;
        }
      }

      .name {
        margin: 5px 0;
        font-size: 14px;
        color: #333;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .price {
        margin: 8px 0;
      .finalPrice {
        color: #ff9645;
        font-size: 14px;
      }

      .oldPrice {
        margin: 0 3px;
        color: #999;
        font-size: 12px;
        text-decoration: line-through;
      }

      .sales {
        background-image: linear-gradient(270deg,#f66,#ff9f9f);
        color: #fff;
        padding: 0 6px;
        border-radius: 8px;
      }
    }
    }

  }

}

</style>
