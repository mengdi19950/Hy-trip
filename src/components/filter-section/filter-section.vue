<template>
  <div class="filter-section">
    <div :class="['title',titleActive ? 'active':'']">{{ item.label }}</div>
    <template v-for="(item1,index1) in item.subGroups" :key="index1">
      <div class="desc" 
          v-if="item1.label !== item.label">
        {{ item1.label }}
      </div>
      <div class="items">
        <template class="items" v-for="(item2,index2) in item1.items" :key="index2">
          <div class="item-title">
            <i v-if="item2.tips" class="icon">{{item2.tips}}</i>
            {{ item2.label }}
            <span class="item-desc ellipsis-text-3" v-if="item2.label !== item2.labelDesc">
            {{ item2.labelDesc }}
            </span>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup>
defineProps({
  item:{
    type:Object,
    default:() => ({})
  },
  titleActive:{
    type:Boolean,
    default:false
  }
})
</script>

<style lang='less' scoped>
  .filter-section {
    .title {
      font-size: 16px;
      font-weight: 700;
      margin-left: 3px;
      margin-bottom: 10px;

        &.active {
        color: var(--primary-color);
      }
    }
    .desc {
      font-size: 12px;
      color: #999;
      margin:10px 4px 5px 4px;
    }
    .items {
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      font-size: 12px;
      margin-bottom: 25px;
      .item-title {
        width: 80px;
        min-height: 40px;
        margin: 3px;
        border-radius: 5px;
        background-color: #f4f6f9;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
        position: relative;
      }
      .item-desc {
          color: #999;
          line-height: 18px;
      }
      .icon {
        position: absolute;
        top: -1px;
        left: -2px;
        transform: scale(0.8);
        background-color: #ff6666;
        color: #fff;
        padding:1px 3px;
        border-radius: 3px 3px 7px 3px;
        
      }

    }
  }
</style>
