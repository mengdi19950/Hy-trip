<template>
  <div class="search-content">
    <!-- 搜索框 -->
    <div class="search-bar">
      <van-search v-model="value" 
                :placeholder="placeHolder"
                show-action
                shape="round"
                @cancel="onCancel"
                @search="onSearch"
                />
    </div>

    <div class="search-list">
      <!-- 搜索弹出列表 -->
      <div v-if="searchSuggest.length">
        <template v-for="(item, index) in searchSuggest" :key="index"> 
          <div class="1" v-if="item.destinationName === `${$route.query.currentCity}`">
            <search-result-item 
            :key-word="value"
            :name="item.name"
            :type-name="item.itemTypeName"
            :description="item.description"
            @result-click="handleResultClick"
            /> 
          </div> 
        </template>
        <search-result-other 
        :current-city="`${$route.query.currentCity}`"
        class="other-result"
        />
        <template v-for="(item, index) in searchSuggest" :key="index">
          <div class="2" v-if="item.destinationName !== `${$route.query.currentCity}`">
            <search-result-item 
            :key-word="value"
            :name="item.name"
            :type-name="item.itemTypeName"
            :description="item.description"
            @result-click="handleResultClick"
            /> 
          </div>
        </template>
      </div>
      <!-- 搜索历史 热门搜索 景点 商圈 地铁站 房型··· -->
      <div class="hotpick" v-else>
      <search-category
        title="搜索历史"
        item-type="pink"
        :item-datas="searchStore.getSearchHistorys"
        @tag-click="handleTagClick($event,item)"
      >
      <template #more>
        <div class="clear" @click="clearSearchHistory">
          <span class="name">清空</span>
          <van-icon name="delete-o" />
        </div>
      </template>
      </search-category>
      <template v-for="(item,index) in searchTag" :key="index">
        <search-category
        v-if="item.suggests"
        :title="item.name"
        :item-datas="item.suggests"
        :item-type="index === 0 ? 'pink':'gray'"
        @tag-click="handleTagClick($event,item)" />
      </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import useSearchStore from "@/stores/modules/search";
import useCityStore from "@/stores/modules/city";
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import SearchCategory from './search-category.vue';
import { debounce } from "@/utils/common";
import { keywordSearchSuggest } from "@/services";
import SearchResultItem from './search-result-item.vue';
import SearchResultOther from './search-result-other.vue';


const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)
const cityId = currentCity.value.cityId

const searchStore = useSearchStore()

const value = ref('')
const searchSuggest = ref([])

// const str = `搜索${currentCity.value.cityName}的景点、地标、房源`
const placeHolder = ref(`搜索${currentCity.value.cityName}的景点、地标、房源`)

defineProps({
  searchTag:{
    type:Array,
    default:() => []
  }
})


searchStore.initSearchHistory()
watch(value,debounce((newValue) => {
  if(!newValue.trim()){
    return
  }

  keywordSearchSuggest(newValue,cityId).then((res)=>{
    searchSuggest.value = res.data.suggests || []
  })
},1000))

const emit = defineEmits(['cancel','search','tagClick','resultItemClick'])

const onCancel = () => {
  emit('cancel')
}
const onSearch = (value) => {
  // console.log(value);
  emit('search',value)
}

const inputValue = () => {

}

const handleTagClick = (subItem,item) => {
  // console.log(subItem.name,item.name);北京路 热门搜索
  emit('tagClick',{typeName:item.name,keyWord:subItem.name})
}

const clearSearchHistory = () => {
  searchStore.clearSearchHistory()
}

const handleResultClick = (item) => {
  emit('resultItemClick',item)
  // console.log(item);
}

</script>

<style lang='less' scoped>
.search-content {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index:99;
  // -webkit-font-smoothing: antialiased; 字体抗锯齿

  .search-bar {
    --van-search-input-height:34px;
    --van-search-padding:10px 0;
    --van-cell-font-size:13px;
    --van-field-icon-size:25px;
    padding: 0 20px;
  }
  .search-list {
    overflow-y: scroll;
    height: calc(100vh - 100px);
      &::-webkit-scrollbar {
      display: none;
      width: 0;
    }

  .hotpick {
    padding: 0 20px;
    padding-top: 10px;
  }
    .clear {
    .name {
      font-size: 12px;
      color: #333;
      padding-right: 4px;
    }
  }
  }

}
</style>
