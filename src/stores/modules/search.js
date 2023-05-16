import { getSearchConditions,getSearchHouse,getGuessulike,keywordSearchSuggest } from '@/services/index'
import { defineStore, storeToRefs } from 'pinia'
import localCache from '@/utils/cache';
import useCityStore from './city'

const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)

const cache_search_history = 'cache_search_history'

const useSearchStore = defineStore('search',{
  state:() => ({
    searchHistorys:[],
    searchConditions:[],
    searchHouse:[],
    guessulike:[],
    cityId:currentCity.value.cityId
  }),
  getters:{
    getSearchHistorys:(state) => {
      let historys = state.searchHistorys || []
      if(historys.length) {
        historys = localCache.getCache(cache_search_history) || []
      }
      historys = historys.reverse();
      // console.log(historys);
      return historys.map((item) => {
        return {
          typeName:'搜索历史',
          name:item
        }
      })
    }
  },
  actions:{
    addSearchHistory(keyWord){
      if(!this.searchHistorys.includes(keyWord)) {
        this.searchHistorys.push(keyWord)
      } else {
        //有搜索记录，删除之前的旧记录，将新搜索值重新push进去
        let i = this.searchHistorys.indexOf(keyWord)
        this.searchHistorys.splice(i,1)
        this.searchHistorys.push(keyWord)
      }
      //只缓存10条历史记录
      let length = this.searchHistorys.length
      if(length >= 10) {
        this.searchHistorys = this.searchHistorys.slice(length - 10,length)
      }
      //存储到本地
      localCache.setCache(cache_search_history,this.searchHistorys)
    },
    initSearchHistory() {
      this.searchHistorys = localCache.getCache(cache_search_history) || []
    },
    clearSearchHistory() {
      this.searchHistorys = []
      localCache.deleteCache(cache_search_history)
    },


    async fetchSearchConditions(){
      const res = await getSearchConditions()
      this.searchConditions = res.data.data.allConditions
      // console.log(res.data.data.allConditions);
    },
    async fetchSearchHouse(){
      const res = await getSearchHouse()
      this.searchHouse = res.data.data
      // console.log(res.data.data);
    },
    async fetchGuessulike(){
      const res = await getGuessulike(this.cityId)
      this.guessulike = res.data
      // console.log(res.data);
    }
  }
})

export default useSearchStore