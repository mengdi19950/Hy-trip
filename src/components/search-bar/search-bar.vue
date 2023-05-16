<template>
<div class="search-bar">
  <van-search  placeholder="关键字/位置/民宿" right-icon="search" left-icon="" >
  <template #label>
    <div class="select-time" @click="show = true">
      <div class="item start">
        <div class="name">住</div>
        <div class="date">{{ startDateStr }}</div>
      </div>
      <div class="item end">
        <div class="name">离</div>
        <div class="date">{{ endDateStr }}</div>
      </div>
    </div>
    <van-calendar v-model:show="show" type="range" @confirm="onConfirm" color="#ff9854"/>
  </template>
  </van-search>
</div>
</template>

<script setup>
import useMainStore from '@/stores/modules/main'
import { formatMonthDay } from '@/utils/format_date'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'



const mainStore = useMainStore()
const { startDate,endDate } = storeToRefs(mainStore)

const startDateStr = computed(() => formatMonthDay(startDate.value,'MM.DD'))
const endDateStr = computed(() => formatMonthDay(endDate.value,'MM.DD'))

const show = ref(false)

const onConfirm = (values) => {
  const start = values[0]
  const end = values[1]
  mainStore.startDate = start
  mainStore.endDate = end
  //关闭日历
  show.value = false;
}




</script>

<style lang='less' scoped>
.search-bar {
  --van-search-input-height:45px;
  --van-field-placeholder-text-color: #aaa;
  --van-cell-font-size:14px;
  :deep(.van-field__right-icon .van-icon){
    font-size: 22px;
    font-weight: 700;
  }
  .left {
    // max-width: 80px;

    font-weight: 500;
    min-width: 30px;
    font-size: 14px;
    padding-right: 6px;
    margin-right: 5px;
    border-right: 1px solid #fff;
    color: #333;
    white-space: nowrap;
  }
  .select-time {
    display: flex;
    flex-direction: column;
    margin-top: 6px;
    margin-left: -5px;
    font-size: 10px;
    .item {
      display: flex;
      flex-direction: row;
      align-items: center;
      line-height: normal;
      .name {
        color: #888;
      }

      .date {
        position: relative;
        color: #666;
        margin: 0 10px 0 3px;
        font-weight: 500;
      }
    }

    .end .date::after {
      content: " ";
      width: 0;
      height: 0;
      border: 4px solid #666;
      border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #666;
      -webkit-border-radius: 3px;
      border-radius: 3px;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      position: absolute;
      bottom: -1px;
      right: -12px;
    }
  }
}
</style>
