<template>
  <div class="hot-tags">
    <template v-for="(item,index) in itemData" :key="index">
      <van-dropdown-menu v-if="item.subFilterItems && item.subFilterItems.length">
        <van-dropdown-item :title="item.label" :ref="dropdownItemRefs" @closed="closeMenu">
          <div class="drop-content">
            <tab-select-item
              class="drop-item"
              borderColor="#999"
              borderActiveColor="#ff9645"
              v-for="(subItem, index2) in item.subFilterItems"
              :active="subItem.isSelect"
              :title="subItem.label"
              @tag-click="handleSubTagClick(subItem)"
            ></tab-select-item>
          </div>
          <div class="footer">
            <button :class="['clear',isClear ? '':'notClear']" @click="clearClick">清空</button>
            <button class="view" @click="viewClick(item.label)">查看房屋(300套以上)</button>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>

      <tab-select-item
        v-else
        :title="item.label"
        :active="item.isSelect"
        border-width="0px"
        @tag-click="handleTagClick(item)"
      ></tab-select-item>
    </template>
  </div>
</template>

<script setup>
import TabSelectItem from '@/components/tab-select-item/tab-select-item.vue';
import { ref, watch } from 'vue';

const props = defineProps({
  itemData:{
    type:Array,
    default:() => []
  }
})

// const hotFilters = ref([])
// watch(
//   () => props.itemData,
//   newValue => {
//     hotFilters.value = newValue;
//   }
// );

const isClear = ref(true)

const dropdownRefs = {};
const dropdownItemRefs = (el) => {
  if (el) {
    dropdownRefs[el.title] = el;
  }
};

const viewClick = (title) => {
  dropdownRefs[title]?.toggle();
}

//主tag选中
const handleTagClick = (item) => {
  item.isSelect = !item.isSelect
};
//子tag选中
const handleSubTagClick = (subItem) => {
  subItem.isSelect = !subItem.isSelect
  updateIsClear()
};

//检查是否有选中，没有则清空按钮变灰，有则变亮
const updateIsClear = () => {
  let isAllClear = true;
  props.itemData[0]?.subFilterItems?.forEach(item => {
    if(item.isSelect) {
      isAllClear = false
    }
  })
  isClear.value = isAllClear;
}

//清除选中状态
const clearClick = () => {
  isClear.value = true
  props.itemData[0]?.subFilterItems?.forEach(item => {
    item.isSelect = false
  })
}

//收起子tag后清除内部选中状态
const closeMenu = () => {
  clearClick()
}


</script>

<style lang='less' scoped>
.btn-style {
  height: 25px;
  line-height: 25px;
  border-radius: 13px;
  border: 1px solid rgba(0, 0, 0, 0);
  padding: 0 3px;
  background-color: white;
}
:global(.hot-tags .van-dropdown-menu) {
  display: inline-block;
}
:global(.hot-tags .van-dropdown-menu .van-dropdown-item--down) {
  top: 140px !important;
}
:global(.hot-tags .van-dropdown-menu .van-dropdown-item__content) {
  background-color: #f7f8fb;
  padding-top: 0px;
}
:global(.hot-tags .van-dropdown-menu .van-dropdown-menu__bar) {
  .btn-style();
  box-shadow: none;
}
:global(.hot-tags .van-dropdown-menu__title) {
  padding-right: 20px;
  font-size: 12px;
  color: #666;
}
:global(.hot-tags .van-dropdown-menu__title::after) {
  right: 8px;
}

:deep(.tab-select-item){
  box-shadow: 0 2px 14px 0 rgba(0,2,4,.08);
}

:deep(.van-overlay) {
  top:25%
}
.hot-tags {
  height: 29px;
  // 水平滚动
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
    width: 0;
  }

  .drop-content {
    margin-top: 5px;
    margin-left: 10px;
    display: flex;
    flex-wrap: wrap;

    .drop-item {
      margin-bottom: 10px;
    }
  }

  .footer {
        height: 60px;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-shadow: 0 -2px 20px 0 rgba(0,0,0,.08);
      
      .clear {
        height: 40px;
        width: 85px;
        border-radius: 20px;
        background-color: #f3f4f6;
        color: #dadada;
        font-size: 15px;
        border: none;
        margin:  0 10px 0 20px;
      }
      .view {
        width: 240px;
        height: 40px;
        border-radius: 20px;
        border: none;
        background-color: var(--primary-color);
        color: #fff;
        font-size: 15px;
      }
    }
    .notClear {
      color: #333 !important;
    }
}




</style>
