import { getOrderAllData,getOrderRecentData,getOrderPendData } from "@/services";
import { defineStore } from "pinia";

const useOrderStore = defineStore('order',{
  state:() => ({
    orderAll:{},
    recentOrder:{},
    pendOrder:{}
  }),
  actions:{
    async fetchOrderAllData(){
      const res = await getOrderAllData()
      this.orderAll = res.data.data.orders
    },
    async fetchOrderRecentData(){
      const res = await getOrderRecentData()
      this.recentOrder = res.data.data.orders
    },
    async fetchOrderPendData(){
      const res = await getOrderPendData()
      this.pendOrder = res.data.data.orders
    },
  }
})
export default useOrderStore