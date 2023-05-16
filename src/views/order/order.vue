<template>
  <div class="order">
    <van-sticky>
      <nav-bar title="订单列表" class="navbar"/>
        <van-tabs v-model:active="active" class="orderbar">
          <van-tab v-for="(item,index) in titles" :key="index" :title="item"/>
        </van-tabs>
    </van-sticky>
    <div class="content" ref="orderRef">
      <template v-for="(item,index) in orderAll" :key="index">
        <order-items v-if="active === 0" :item-data="item"/>
      </template>
      <template v-for="(item,index) in recentOrder" :key="index">
        <order-items v-if="active === 1" :item-data="item"/>
      </template>
      <template v-for="(item,index) in pendOrder" :key="index">
        <order-items v-if="active === 2" :item-data="item"/>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import NavBar from '@/components/nav-bar/nav-bar.vue';
import OrderItems from './cpns/order-items.vue';
import useOrderStore from '@/stores/modules/order'
import { storeToRefs } from 'pinia';
import useScroll from '@/hooks/useScroll';


const active = ref(0)
const titles = ['全部订单','近期订单','待支付']

const orderStore = useOrderStore()
orderStore.fetchOrderAllData()
orderStore.fetchOrderRecentData()
orderStore.fetchOrderPendData()
const { orderAll,recentOrder,pendOrder } = storeToRefs(orderStore)

const orderRef = ref()
const { scrollTop } = useScroll(orderRef)


watch(active,(newValue) => {
  // console.log(newValue);
  orderRef.value.scrollTop = 0
  
})



</script>

<style lang='less' scoped>
.order {
  --van-tabs-line-height:40px;
  height: 100vh;
  padding-bottom: 50px;
  .content {
    height: calc(100vh - 86px);
    overflow-y: scroll;
  }
}
</style>
