import { defineStore } from "pinia";
import { getDetailData } from '@/services/index';
import { Vue } from 'vue';

const useDetailStore = defineStore('detail',{
  state:() => ({
    details:{},
  }),
  actions:{
    async fetchDetailData(houseId){
      const res = await getDetailData(houseId)
      this.details = res.data
    },
  }
})

export default useDetailStore