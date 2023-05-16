import { getFavorlistData,getFavorHistoryData } from '@/services/index'
import { defineStore } from 'pinia'

const useFavorStore = defineStore('favor',{
  state:() => ({
    favorlists:{},
    favorHistory:{}
  }),
  actions:{
    async fetchFavorlistData(){
      const res = await getFavorlistData()
      this.favorlists = res.data.data.items
    },
    async fetchFavorHistoryData(){
      const res = await getFavorHistoryData()
      this.favorHistory = res.data.data.items
    }

  }
})
export default useFavorStore