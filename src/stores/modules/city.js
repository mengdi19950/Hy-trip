import { getCityData } from '@/services/index';
import { defineStore } from 'pinia';

const useCityStore = defineStore('city',{
  state:() => ({
    cities:{},
    currentCity:{
      cityName:'广州',
      cityId:45
    },
  }),
  actions:{
    async fetchCityData(){
       const res = await getCityData()
       this.cities = res.data
    }
    // fetchCityData(){
    //   getCityData().then(res => {
    //     console.log(res.data);
    //     this.cities = res.data
    //   })
    // }
  }
})

export default useCityStore
