<template>
  <div class="search" ref="searchRef">
    <!-- 顶部三个导航条 -->
    <div class="search-head">
      <div class="nav-bar">
        <nav-bar>
          <template #title>
            <search-bar 
              :key-word="keyWord"
              @searchClick="searchClick" 
              :cancel-icon="showCancelIcon"
              @cancelicon-click="cancelIconClick"/>
          </template>
        </nav-bar>
      </div>

      <div class="nav-sub-bar" v-if="scrollTop <= 65">
        <!-- 位置 - 价格/人数 - 欢迎度排序 - 筛选 -->
        <div class="search-condition">
          <search-condition :conditions="searchConditions"/>
        </div>

        <!-- 优惠 - 多人入驻 - …… -->
        <div class="hot-tags">
          <hot-tags :item-data="searchHouse.hotFilters"/>
        </div>
      </div>
    </div>
    <!-- 点击搜索弹出的页面 -->
    <search-content
        v-if="showContent" 
        @cancel="cancelClick" 
        :search-tag="guessulike.groups"
        @tag-click="tagClick"
        @result-item-click="resultItemClick"
        @search="searchValue"
      >
    </search-content>

        <!-- 搜索结果展示 -->
    <div class="result-list"  >
      <template v-for="(item, index) in searchHouse.items">
        <search-list-item :item-data="item" @click="itemClick(item)"></search-list-item>
      </template>
    </div>


  </div>
</template>

<script setup>
import NavBar from '@/components/nav-bar/nav-bar.vue';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import SearchBar from './cpns/search-bar.vue';
import SearchCondition from './cpns/search-condition.vue';
import SearchContent from './cpns/search-content.vue';
import useSearchStore from '@/stores/modules/search';
import HotTags from './cpns/hot-tags.vue';
import SearchListItem from '@/components/search-list-item/index.vue';

import useScroll from '@/hooks/useScroll';
import router from '@/router';



const searchStore = useSearchStore()
searchStore.fetchSearchConditions()
searchStore.fetchSearchHouse()
searchStore.fetchGuessulike()
const { searchConditions,searchHouse,guessulike,searchHistorys } = storeToRefs(searchStore)

const showContent = ref(false) 
const placeholder = '搜索此地的景点、地标、房源'
const keyWord = ref(placeholder)
const showCancelIcon = ref(false)



const searchClick = () => {
  showContent.value = true
  
  
}
const cancelClick = () => {
  keyWord.value = placeholder
  showContent.value = false
}
// const searchClick2 = (value) => {
//   showContent.value = false
//   keyWord.value = value
// }

const cancelIconClick = () => {
  keyWord.value = placeholder
  showCancelIcon.value = false
}


const tagClick = (value) => {
  // console.log(value); {typeName: '热门搜索', keyWord: '北京路'}
  showContent.value = false;
  if(value.keyWord) {
    showCancelIcon.value = true
    keyWord.value = value.keyWord
  } else {
    showCancelIcon.value = false;
  }
  //点击哪个tag 就加入到搜索历史
  searchStore.addSearchHistory(value.keyWord)
}



const resultItemClick = (item) => {
 // console.log(item);//{name:北京路步行街,typeName:景点}
  tagClick({
    keyWord:item.name
  })
  searchStore.addSearchHistory(item.name)
}

const searchValue = (value) => {
  // console.log(value); 北京路
  showContent.value = false;
  showCancelIcon.value = true
  keyWord.value = value

  searchStore.addSearchHistory(value)
}

const searchRef = ref()
const { scrollTop } = useScroll(searchRef)

const itemClick = (item) => {
  // console.log(item.preloadHouse.houseId);
  router.push({
    path:'/detail/'+ item.preloadHouse.houseId
  })
}




</script>


<style lang='less' scoped>
.search {
  overflow: hidden;
  width: 100%;
  height: 100vh;
  overflow-y: auto;

  &::-webkit-scrollbar{ 
    display:none
  }
  .search-head {
    // .nav-bar {
      position: fixed;
      width: 100%;
      z-index: 9;
    // }

    :deep(.van-nav-bar__title){
      max-width: 100%;
    }
    :deep(.van-sticky--fixed .guide-login) {
      margin-left: 0;
      margin-right: 0;
    }

    // .search-condition {
    //   padding-top: 44px;
    // }
    .hot-tags{
      padding: 5px 0 5px 10px;
      background-color: #f7f8fb;
    }

  }
  .result-list {
    padding: 141px 20px 0 20px;
    // z-index: -1;
    position: relative;
  }

}
</style>
