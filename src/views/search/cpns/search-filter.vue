<template>
  <div class="filter">
    <div class="nav-bar" ref="navbarRef">
      <template v-for="(item,index) in filterData" :key="index">
        <div class="nav-bar-item"
             :class="{ active: index === currentIndex }"
             @click="navClick(index)"
             >
             <span class="select" v-show="isShow"></span>
          {{ item.label }}
        </div>
      </template>
    </div>

    <div class="section" ref="sectionRef">
      <template v-for="(item,index) in filterData">
        <div class="content">
          <div class="title" 
               :class="{active: index === currentIndex}" 
               :ref="getTitleRef">
               {{ item.label }}
          </div>
          <template v-for="(item1,index1) in item.subGroups" :key="index1">
            <div class="desc" 
              v-if="item1.label !== item.label">
                {{ item1.label }}
            </div>
            <div class="items">
              <template class="items" v-for="(item2,index2) in item1.items" :key="index2">
                <div :class="['item-content', item2.isSelect? 'selected':'']" @click="itemClick(item2,index)">
                  <van-icon name="success" class="yes" color="#fff" v-if="item2.isSelect"/>
                  <i v-if="item2.tips" class="icon">{{item2.tips}}</i>
                    {{ item2.label }}
                  <span class="item-desc ellipsis-text-3" v-if="item2.label !== item2.labelDesc">
                    {{ item2.labelDesc }}
                  </span>
              </div>
            </template>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import useScroll from "@/hooks/useScroll";


const props = defineProps({
  filterData:{
    type:Array,
    default:() => []
  }
})

const sectionRef = ref()
const navbarRef = ref()
const currentIndex = ref(0)
const isShow = ref(false)

let els = []
const getTitleRef = (value) => {
  if(!value) return
  els.push(value)
}

//解决导航栏快速滚动时跟着跳动的问题，根据需求选择添加
let isClick = false
let currentDistance = -1

//点击左侧导航栏
const navClick = (index) => {
  currentIndex.value = index;
  const el = els.map(item => item.offsetTop - 15)
  const distance = el[index]

  isClick = true
  currentDistance = distance

  sectionRef.value.scrollTo({
    top:distance,
    behavior:'smooth'
  })
}

//监听右侧内容滚动
const { scrollTop } = useScroll(sectionRef)
watch(scrollTop,(newValue) => {
  if(newValue === currentDistance){
    isClick = false
  }
  if(isClick) return

  const el = els.map(item => item.offsetTop - 15)
  //el = [0, 164, 566, 665, 1057, 1298, 1405, 1505, 1742, 2023]
  let index = el.length - 1
  for (let i = 1; i < el.length; i++) {
    if(el[i] > newValue + 15){
      index = i - 1
      break
    }
  }
  currentIndex.value = index;

  //右边内容滚动到最上面时，navbar也滚回顶部
  if(newValue === 0) {
    navbarRef.value.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }
})


const itemClick = (item,index) => {
  // console.log(item,index);index是左侧导航的index
  item.isSelect = !item.isSelect
  // console.log(item.isSelect);
  // if(item.isSelect){
    // isShow.value = true
  // }
  // const navbar = document.getElementsByClassName('nav-bar-item')[index];
  // console.log(navbar);
  // navbar[index].classList.add('select')
  // for (const item of props.filterData) {
  //   for (const item1 of item.subGroups) {
  //     for (const item2 of item1.items) {
          // console.log(item2); 免费取消到民宿的全部item
          
    //     } 
    //   }
    // }

  // props.filterData[index].subGroups.forEach(item => {
  // for (const item1 of item.items) {
    // if(!item1.isSelect)
    //   navbar[index].classList.remove('select')
    //  console.log(item1.isSelect);
    //  if(item1.isSelect = false) {
    //   navbar[index].classList.remove('select')
    //  }
  //   }
  // })
}





</script>

<style lang='less' scoped>
.filter {
  position: relative;
  display: flex;
  flex-direction: row;
  overflow-y: auto;
  overflow: hidden;
  height: calc(500px - 60px);

  //隐藏滚动条
  &::-webkit-scrollbar{ 
    display:none
  }

  :deep(.van-sidebar-item) {
    height: 50px;
    width: 92px;
    padding: 15px;
    margin-right: 0;
  }
  :deep(.van-sidebar) {
    width: 92px;
  }
  :deep(.van-sidebar-item--select:before){
    width: 3px;
    height: 13px;
    border-radius: 0;
    margin-left: 0;
  }

  .nav-bar {
    flex: 0 0 auto;
    width: 92px;
    height: calc(500px - 60px);
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar{ 
    display:none
  }
    .nav-bar-item {
      height: 50px;
      display: flex;
      align-items: center;
      background-color: #f4f6f9;
      padding-left: 20px;
      box-sizing: border-box;
      font-size: 12px;
      color: #666;
      position: relative;

      .select {
        width: 4px !important;
        height: 4px !important;
        border-radius: 50%;
        background-color: var(--primary-color);
        position: absolute;
        left: 12px !important;
        top: 45%;
      }


      &.active {
        background-color: #fff;
        color: var(--primary-color);
        font-weight: 700;
      }
      &.active:before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -7px;
        display: inline-block;
        width: 3px;
        height: 14px;
        vertical-align: middle;
        background-color: var(--primary-color);
      }
      
    }

  }
  .section {
    flex: 1 1 auto;
    margin: 15px 5px 10px 10px;
    height: calc(500px - 60px);
    overflow-y: scroll;
    overflow-x: hidden;
      &::-webkit-scrollbar{ 
      display:none
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      margin-left: 3px;
      margin-bottom: 10px;

        &.active {
        color: var(--primary-color);
      }
    }
    .desc {
      font-size: 12px;
      color: #999;
      margin:10px 4px 5px 4px;
    }
    .items {
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      font-size: 12px;
      margin-bottom: 25px;
      .item-content {
        width: 80px;
        min-height: 40px;
        margin: 3px;
        border-radius: 5px;
        background-color: #f4f6f9;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
        position: relative;
      }
      .item-desc {
          color: #999;
          line-height: 18px;
      }
      .icon {
        position: absolute;
        top: -1px;
        left: -2px;
        transform: scale(0.8);
        background-color: #ff6666;
        color: #fff;
        padding:1px 3px;
        border-radius: 3px 3px 7px 3px;
      }
      .selected {
        border: 0.6px solid var(--primary-color);
        color: var(--primary-color);
        background-color: #fff7f1;
      }
      .yes {
        position: absolute;
        bottom: 0;
        right: 0;
        background-color: var(--primary-color);
        border-radius: 8px 0px 3px 0px;
        height: 10px;
        width: 12px;
      }
    }

  }

}
</style>
