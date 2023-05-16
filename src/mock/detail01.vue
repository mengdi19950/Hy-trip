<!-- <template>
  <div class="detail" ref="detailRef">
    <tab-control 
                class="tabControl"
                v-if="showTab"
                :titles="names"
                @tabItemClick="tabClick"
                ref="tabControlRef"/>
    <div class="nav-bar">
      <van-nav-bar title="房屋详情"
                   left-text="旅途"
                   left-arrow
                   @click="backClick" />
    </div>

    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-01-swipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
      <detail-02-infos name="描述" :ref="getThisRef" :detail-info="mainPart.topModule"/>
      <detail-03-facility name="设施" :ref="getThisRef" :facility="mainPart.dynamicModule.facilityModule.houseFacility"/>
      <detail-04-landlord name="房东" :ref="getThisRef" :landlord="mainPart.dynamicModule.landlordModule"/>
      <detail-05-comment name="评论" :ref="getThisRef" :comment="mainPart.dynamicModule.commentModule"/>
      <detail-06-notice name="须知" :ref="getThisRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
      <detail-07-map name="周边" :ref="getThisRef" :position="mainPart.dynamicModule.positionModule"/>
      <detail-08-intro :price-intro="mainPart.introductionModule"/>
      <detail-09-action :price="details.pricePart.priceModule"/>
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
import Detail02Infos from '../views/detail/cpns/detail-02-infos.vue';
import Detail03Facility from "../views/detail/cpns/detail-03-facility.vue"
import Detail04Landlord from "../views/detail/cpns/detail-04-landlord.vue"
import Detail05Comment from '../views/detail/cpns/detail-05-comment.vue'
import Detail06Notice from '../views/detail/cpns/detail-06-notice.vue'
import Detail07Map from '../views/detail/cpns/detail-07-map.vue';
import Detail08Intro from '../views/detail/cpns/detail-08-intro.vue'
import Detail09Action from "../views/detail/cpns/detail-09-action.vue"
import TabControl from '@/components/tab-control/tab-control.vue'



const route = useRoute()
const houseId = route.params.id

const detailStore = useDetailStore()
detailStore.fetchDetailData(houseId)
const { details } = storeToRefs(detailStore)
const mainPart = computed(() => details.value.mainPart)

const backClick = () => {
  router.back()
}

const detailRef = ref()

const { scrollTop } = useScroll(detailRef)

const showTab = computed(() => {
  return scrollTop.value >= 300
})

const elements = ref({})
const names = []
const getThisRef = (value) => {
  // console.log(value.$el);
  if(!value) return
  const name = value.$el.getAttribute('name')
  elements.value[name] = value?.$el
  names.push(name)
}

let isClick = false
let currentDistance = -1

//点击滚动到tab对应内容的位置
const tabClick = (index) => {
  const key = Object.keys(elements.value)[index]
  const els = elements.value[key]
  // console.log(els);
  let distance = els.offsetTop
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

const tabControlRef = ref()


//监听滚动，使滚动匹配对应的tab标签
watch(scrollTop,(newValue) => {
  //点击完之后，要停止点击状态，继续监听
  if(newValue === currentDistance) {
    isClick = false
  }
  //如果是点击tab，就不用监听滚动匹配了
  if(isClick) return

  const els2 = Object.values(elements.value)
  const values = els2.map(el => el.offsetTop)
  // values = [296, 548, 916, 1257, 1667, 1930]
  // console.log(newValue);
  let index = values.length - 1
  for (let i = 0; i < values.length; i++) {
    if(values[i] > newValue + 44) {
      index = i - 1
      break
    }
  }
  // if(index !== currentIndex) {
    tabControlRef.value?.setCurrentIndex(index)
  // }

})








</script>

<style lang='less' scoped>
.detail {
  height: 100vh;
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



</style> -->
