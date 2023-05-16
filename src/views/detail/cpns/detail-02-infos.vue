<template>
  <div class="detail-infos">
    <div class="title">
      {{ detailInfo.houseName }}
    </div>
    <div class="tags">
      <template v-for="(item,index) in detailInfo.houseTags">
      <span class="item" :style="{color:item.tagText?.color,background:item.tagText?.background.color}">
        {{ item.tagText?.text }}
      </span>
    </template>
    </div>
    <div class="comment common">
      <div class="left">
        <span class="overall">{{ detailInfo.commentBrief.overall }}</span>
        <span class="scoreTitle">{{ detailInfo.commentBrief.scoreTitle }}</span>
        <span class="commentBrief">{{ detailInfo.commentBrief.commentBrief }}</span>
      </div>
      <div class="right">
        <span class="totalCount">
          {{ detailInfo.commentBrief.totalCount }}条评论
        </span>
        <span class="arrow">
          <van-icon name="arrow" />
        </span>
      </div>
    </div>
    <div class="address common">
      <div class="position">
        {{ detailInfo.nearByPosition.address }}
      </div>
      <span class="right">
        地图·周边
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  detailInfo:{
    type:Object,
    default:() => ({})
  }
})

</script>

<style lang='less' scoped>
.detail-infos {
  padding: 16px;
  background-color: #fff;
  .title {
    font-weight: 700;
    font-size: 20px;
    color: #333;
    text-align: justify;
    line-height: 24px;
    overflow: hidden;
    margin-bottom: 6px;
  }
  .tags {
    margin: 10px 0;
      .item {
      font-size: 12px;
      margin: 0 2px;
      padding: 0 2px;
    }
  }
  .common {
    background-color:#f5f7fa;
    padding: 8px 12px;
    margin: 12px 0;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .comment {
    .left {
      .overall {
        font-size: 20px;
        font-weight: 700;
      }
      .scoreTitle {
        font-size: 14px;
        padding: 0 3px;
        font-weight: 700;
        color: #333;
      }
      .commentBrief {
        font-size: 14px;
        color: #666;
      }
    }
    .right {
      color: var(--primary-color);
      font-size: 14px;
    }
  }
  .address {
    .position {
      font-size: 14px;
    }
    .right {
      font-size: 14px;
      font-weight: 700;
    }
  }
}
</style>
