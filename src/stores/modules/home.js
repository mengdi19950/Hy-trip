import { getHomeSuggestsData,getHomeCategoriesData,getHouseListData } from "@/services/index";
import { defineStore } from "pinia";

const useHomeStore = defineStore('home',{
  state:() => ({
    hotSuggests:[],
    categories:[],
    houselists:[],
    currentPage:1
  }),
  actions:{
    async fetchHomeSuggestsData(){
      const res = await getHomeSuggestsData()
      this.hotSuggests = res.data
    },
    async fetchHomeCategoriesData(){
      const res = await getHomeCategoriesData()
      this.categories = res.data
    },
    async fetchHouseListData(currentPage){
      const res = await getHouseListData(this.currentPage)
      this.houselists.push(...res.data)
      this.currentPage++
      // console.log(res.data);
    },
  }
})

export default useHomeStore