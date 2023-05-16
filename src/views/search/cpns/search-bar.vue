<template>
  <div class="search-bar">
      <!--{{ $route.query.currentCity }} -->
    <div class="left">
      {{ currentCity.cityName }}
    </div>
    <div class="select-time" @click="showCalendar = true">
      <div class="item start">
        <div class="name">住</div>
        <div class="date">{{ startDateStr }}</div>
      </div>
      <div class="item end">
        <div class="name">离</div>
        <div class="date">{{ endDateStr }}</div>
      </div>
    </div>
    <div class="content ellipsis-text-1" @click="handleSearchClick">
      <span class="key-word">
        {{ keyWord }}
      </span>
      <i
          class="icon-cancel"
          v-if="cancelIcon"
          @click.stop="handleCancelClick"
        ></i>
    </div>
    <van-calendar v-model:show="showCalendar" type="range" @confirm="onConfirm" color="#ff9854"/>
  </div>
</template>

<script setup>
import useCityStore from '@/stores/modules/city';
import useMainStore from '@/stores/modules/main'
import { formatMonthDay } from '@/utils/format_date'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

defineProps({
  keyWord:{
    type:String,
    default:''
  },
  cancelIcon: {
    type: Boolean,
    default: false,
  }
})


const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)

const mainStore = useMainStore()
const { startDate,endDate } = storeToRefs(mainStore)
const startDateStr = computed(() => formatMonthDay(startDate.value,'MM.DD'))
const endDateStr = computed(() => formatMonthDay(endDate.value,'MM.DD'))

const showCalendar = ref(false)
const onConfirm = (values) => {
  const start = values[0]
  const end = values[1]
  mainStore.startDate = start
  mainStore.endDate = end
  //关闭日历
  showCalendar.value = false;
}

const emit = defineEmits(['searchClick','canceliconClick'])
const handleSearchClick = () => {
  emit('searchClick')
}
const handleCancelClick = () => {
  emit('canceliconClick')
}

</script>

<style lang='less' scoped>
.search-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  height: 35px;
  width: 274px;
  background-color: #f2f4f6;
  border-radius: 6px;
  position: relative;

  .left {
    // max-width: 80px;
    font-weight: 700;
    min-width: 30px;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    padding-right: 6px;
    margin-right: 5px;
    border-right: 1px solid #fff;
    color: #666;
    white-space: nowrap;
  }
  .select-time {
    display: flex;
    flex-direction: column;
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
  .content {
    position: relative;
    flex: 1;
    padding: 0 6px;
    // box-sizing: border-box;
    text-align: left;
    height: 35px;
    line-height: 35px;
    border-left: 1px solid #fff;
    // white-space: nowrap;
    max-width: 155px;
    color: #888 !important;
    .key-word {
      font-size:12px;
    }
    .icon-cancel {
      position: absolute;
      top: 30%;
      right: 0;
      display: inline-block;
      background-image: url(@/assets/img/sprite.png);
      background-position: -92px -58.5px;
      width: 14.5px;
      height: 15px;
      background-size: 125px 110px;
    }
  }
}

</style>

