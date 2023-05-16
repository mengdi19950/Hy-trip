<template>
  <div class="search-category">
    <div class="title">
      <span class="name">{{ title }}</span>
      <div class="more" @click="moreClick">
        <slot name="more">
          <span class="text">展开</span>
          <van-icon name="arrow-down" v-if="iconShrink"/>
          <van-icon name="arrow-up" v-else/>
        </slot>
      </div>
    </div>
    <div :class="['content',iconShrink ? 'hidden':'']">
      <template v-for="item in itemDatas">
        <tab-select-item 
          :type="itemType"
          :title="item.name"
          border-width="0px"
          @tag-click="handleTagClick(item)"
          />
      </template>
    </div>
  </div>
</template>

<script setup>
import TabSelectItem from '@/components/tab-select-item/tab-select-item.vue';
import { ref } from 'vue';
defineProps({
  title:{
    type:String,
    default:'热门搜索'
  },
  itemDatas:{
    type:Array,
    default:() => ([])
  },
  itemType:{
    type:String,
    default:''
  }
})

const iconShrink = ref(true)
const moreClick = () => {
  iconShrink.value = !iconShrink.value
  // console.log(iconShrink.value);
}

const emit = defineEmits(['tagClick'])
const handleTagClick = (item) => {
  emit('tagClick',item)
  // console.log(item.name);
}

</script>

<style lang='less' scoped>
.search-category {
  // margin-bottom: 20px;
  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    // margin-bottom:10px;
    .name {
      font-size: 16px;
      position: relative;
      padding-left: 10px;
    }
    .name::before {
      content: "";
      position: absolute;
      top: 1px;
      left: 0;
      width: 3px;
      height: 15px;
      background-color: var(--primary-color);
    }

    .more {
      font-size: 12px;
      color: #666;
      .text {
        padding-right: 3px;
      }
    }
  }
  .content {
    margin-top: 7px;
    margin-bottom: 22px;
  }
  .hidden {
    max-height:60px;
    overflow-y: hidden;
  }
}
</style>
