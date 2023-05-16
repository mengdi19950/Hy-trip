<template>
  <div class="search-box">
    <!-- 位置定位选择 -->
    <div class="location">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="getPosition">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>

    <!-- 入住时间选择 -->
    <div class="date-range" @click="show = true">
      <div class="checkin">
        <span class="text">入住</span>
        <span class="startDate">{{ startDateStr }}</span>
      </div>
      <div class="stay">共{{ convertNumberToWords(stay) }}晚</div>
      <div class="checkout">
        <span class="text">离店</span>
        <span class="endDate">{{ endDateStr }}</span>
      </div>
    </div>
    <!-- 日历展示 -->
    <van-calendar v-model:show="show" type="range" @confirm="onConfirm" color="#ff9854" :formatter="formatter"/>
    <div class="limit">
      <span class="left">价格不限</span>
      <span class="right">人数不限</span>
    </div>
    <div class="other">
        关键字/位置/民宿名
    </div>

    <!-- 热门建议 -->
    <div class="hot-suggests">
      <template v-for="(item,index) in hotSuggests" :key="index">
        <div class="item" :style={color:item.tagText.color,background:item.tagText.background.color}>
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <!-- 开始搜索 -->
    <div class="search-btn">
      <div class="btn" @click="searchBtnClick">
        开始搜索
      </div>
    </div>
</div>
</template>

<script setup>
import router from '@/router';
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { formatMonthDay,getDiffDays } from '@/utils/format_date'
import { convertNumberToWords } from '@/utils/convert_number'
import useHomeStore from '@/stores/modules/home'
import useMainStore from '@/stores/modules/main';


const getPosition = () => {
  navigator.geolocation.getCurrentPosition(res => {
    console.log('success',res);
  },err => {
    console.log('failure',err);
  },{
    enableHighAccuracy:true,
    timeout:1000,
    maximumAge:0
  }) 
}

const cityClick = () => {
  router.push('/city')
}

const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)

//不显示日历
const show = ref(false)

// const now = new Date()
// const newDate = new Date()
// newDate.setDate(now.getDate() + 1)
const mainStore = useMainStore()
const { startDate,endDate } = storeToRefs(mainStore)

const startDateStr = computed(() => formatMonthDay(startDate.value))
const endDateStr = computed(() => formatMonthDay(endDate.value))
const stay = computed(() => getDiffDays(startDate.value,endDate.value))

const onConfirm = (values) => {
  const start = values[0]
  const end = values[1]
  mainStore.startDate = start
  mainStore.endDate = end
  // stay = getDiffDays(start,end)

  //关闭日历
  show.value = false;
}

const formatter = (day) => {
  const month = day.date.getMonth() + 1;
  const date = day.date.getDate();

  if (day.type === 'start') {
    day.bottomInfo = '入住';
  } else if (day.type === 'end') {
    day.bottomInfo = '离店';
  }
  return day
}

const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)
//尽量在父组件中发送网络请求fetch

const searchBtnClick = () => {
  router.push({
    path:'/search',
    query:{
      startDate:startDateStr.value,
      endDate:endDateStr.value,
      currentCity:currentCity.value.cityName,
      cityId:currentCity.value.cityId
      //search里也可以导入store，从store里拿currentCity数据
    }
  })
}





</script>

<style lang='less' scoped>

  .search-box{
    --van-calendar-popup-height:100%;
    // 让日历铺满屏幕

  .location {
    display: flex;
    align-items: center;
    height: 44px;
    .city {
      flex: 1;
      padding-left: 20px;
      font-size: 15px;
      color: #666;
    }
    .position {
      padding-right: 20px;
      font-size: 14px;
      display: flex;
      align-items: center;

      .text {
        color: #666;
        margin-right: 8px;
        font-size: 12px;
      }
      
      img {
        width: 20px;
      }
    }
  }

  .date-range {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 8px 20px 0px -14px;

    .checkin,
    .checkout {
      display: flex;
      flex-direction: column;
      .text {
        color: #999;
        padding-bottom: 3px;
        font-size: 12px;
      }
      .startDate,.endDate {
        color: #555;
        font-size: 15px;
      }
    }
    .stay {
      color: #555;
      font-size: 12px;
    }
  }
  .limit {
    display: flex;
    margin-left: 20px;
    margin-top: 20px;
    font-size: 14px;
    .left,.right {
      flex: 1;
      color: #999;
    }
    .right {
      padding-left: 120px;
    }
  }

  .other {
    margin: 30px 20px 20px 20px;
    color: #999;
    font-size: 14px;
  }

  .hot-suggests {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 10px;
    color: #999;
    height: 44px;
    margin: 0 0 10px 10px;
    height: auto;
  .item {
    padding: 4px 8px;
    border-radius: 14px;
    margin: 4px;
    font-size: 12px;
    line-height: 1;
  }
  }

  .search-btn {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;
    .btn {
      width: 342px;
      height: 38px;
      max-height: 50px;
      font-weight: 500;
      font-size: 18px;
      line-height: 38px;
      text-align: center;
      border-radius: 20px;
      color:#fff;
      background-image: var(
        --tjc-theme-linear-gradient,
        linear-gradient(90deg, #fa8c1d, #fcaf3f)
      );
    }
  }
}
</style>
