<template>
  <div class="detail" ref="detailRef">

    <tab-control 
              class="tabControl"
              @tabItemClick="tabClick"
              v-show="showTab"
              ref="tabControlRef"
              :titles="names"/>

    <div class="nav-bar">
      <van-nav-bar title="房屋详情"
                   left-text="旅途"
                   left-arrow
                   @click="backClick" />
    </div>

    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-01-swipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
      <detail-02-infos name="描述" :ref="getThisRef" :detail-info="mainPart.topModule"/>
      <detail-03-facility name="设施" :ref="getThisRef" :facility="dynamicModule.facilityModule.houseFacility"/>
      <detail-04-landlord name="房东" :ref="getThisRef" :landlord="dynamicModule.landlordModule"/>
      <detail-05-comment name="评论" :ref="getThisRef" :comment="dynamicModule.commentModule"/>
      <detail-06-notice name="须知" :ref="getThisRef" :order-rules="dynamicModule.rulesModule.orderRules"/>
      <detail-07-map name="周边" :ref="getThisRef" :position="dynamicModule.positionModule"/>
      <detail-08-intro :price-intro="mainPart.introductionModule"/>
      <detail-09-action :price="details.pricePart.priceModule"/>
    </div>

    <div v-else class="noData">
      暂无数据，可至首页查看热门精选详情数据
      <div class="line">
        去 <a href="">首页</a>
      </div>
    </div>

    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import useScroll from "@/hooks/useScroll"
import router from "@/router"
import useDetailStore from '@/stores/modules/detail'
import { storeToRefs } from "pinia"
import { computed, ref, watch } from "vue"
import { useRoute } from "vue-router"

import Detail01Swipe from './cpns/detail-01-swipe'
import Detail02Infos from './cpns/detail-02-infos.vue';
import Detail03Facility from "./cpns/detail-03-facility.vue"
import Detail04Landlord from "./cpns/detail-04-landlord.vue"
import Detail05Comment from './cpns/detail-05-comment.vue'
import Detail06Notice from './cpns/detail-06-notice.vue'
import Detail07Map from './cpns/detail-07-map.vue';
import Detail08Intro from './cpns/detail-08-intro.vue'
import Detail09Action from "./cpns/detail-09-action.vue"
import TabControl from '@/components/tab-control/tab-control.vue'


const route = useRoute()
const houseId = route.params.id


const detailStore = useDetailStore()
const { details } = storeToRefs(detailStore)

detailStore.fetchDetailData(houseId)

const mainPart = computed(() => details.value?.mainPart)
const dynamicModule = computed(() => details.value?.mainPart?.dynamicModule)

const backClick = () => {
  router.go(-1)
}

const detailRef = ref()

const { scrollTop } = useScroll(detailRef)

const showTab = computed(() => {
  return scrollTop.value >= 300
})

const tabControlRef = ref()

const elements = ref({})
const names = []
const getThisRef = (value) => {
  // console.log(value.$el);
  if(!value) return
  const name = value.$el.getAttribute('name')
  elements.value[name] = value?.$el
  if(names.indexOf(name) == -1)
  names.push(name)
}
let isClick = false
let currentDistance = -1

//elements -> {'描述':div.infos,'设施':div.facility,... }
//点击导航匹配滚动位置
const tabClick = (index) => {
  const els = Object.values(elements.value)
  const values = els.map(el => el.offsetTop)
  let distance = values[index]
  if(index !== 0) {
    distance = distance - 44
  }

  isClick = true
  currentDistance = distance

  detailRef.value.scrollTo({
    top:distance,
    behavior:'smooth'
  })
}

//监听滚动位置 匹配导航栏
watch(scrollTop,(newValue)=> {
  if(newValue === currentDistance){
    isClick = false
  }

  if(isClick) return
  // console.log(newValue);
  const values = Object.values(elements.value).map(el => el.offsetTop)
  // console.log(values); [296, 548, 916, 1257, 1667, 1930]
  let index = values.length - 1
  for (let i = 0; i < values.length; i++) {
    if(values[i] > newValue + 44) {
      index = i - 1
      break
    }
  }
  tabControlRef.value.setCurrentIndex(index)

})







</script>

<style lang='less' scoped>
.detail {
  height: calc(100vh - 60px);
  overflow-y: auto;
  .tabControl {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    right: 0;
  }
  .nav-bar {
    --van-nav-bar-text-color:var(--primary-color);
    --van-nav-bar-title-text-color:var(--primary-color);
    --van-nav-bar-icon-color:var(--primary-color);

    :deep(.van-nav-bar__text){
      font-size: 16px;
    }
  }

  .noData {
    text-align: center;
    margin-top: 30px;
    font-size: 16px;
    color:var(--primary-color);

    .line {
      margin-top: 20px;
      
      a {
        color:rgb(135, 162, 235);
      }
    }
  }
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;

    img {
      width: 123px;
    }

    .text {
      margin-top: 12px;
      font-size: 12px;
      color: #7688a7;
    }
  }
}



</style>
