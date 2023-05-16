import { defineStore } from "pinia";
// import pinia from "../index.js";

const startDate = new Date()
const endDate = new Date()
endDate.setDate(startDate.getDate() + 1)

const useMainStore = defineStore('main',{
  state:() => ({
    startDate:startDate,
    endDate:endDate,
    isLoading:false
  }),
  
})

export default useMainStore