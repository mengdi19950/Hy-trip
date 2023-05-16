<template>
  <div class="conditions">
    <van-dropdown-menu>
      <template v-for="(item,index) in conditions" :key="index">

        <!-- 位置 -->
        <van-dropdown-item 
                  v-if="item.gType === 2" 
                  title="位置" 
                  :ref="dropdownItemRefs" 
                  @closed="closeMenu(item.subGroups)">
        <div class="dropdown-content">
          <side-bar :item-data="item.subGroups"
                    @item-click="itemClick"
                    />

          <div class="footer">
            <button :class="['clear',isClear ? '':'notClear']" @click="clearClick(item.subGroups)">清空</button>
            <button class="view" @click="viewClick('位置')">查看房屋(300套以上)</button>
          </div>
        </div>
              
        </van-dropdown-item>
   
        <!-- 价格/人数 -->
        <van-dropdown-item 
                    v-if="item.gType === 1" 
                    title="价格/人数" 
                    @closed="closeMenu2" 
                    :ref="dropdownItemRefs">

          <div class="dropdown-content">
            <human-price :human-price-data="item.subGroups.slice(-5)"
                          @item-click="humanItemClick"
                          ref="childRef"
                          @view-click="viewClick('价格/人数')"/>
          </div>
        </van-dropdown-item>

        <!-- 欢迎度排序 -->
        <van-dropdown-item 
              v-if="item.gType === 4" 
              v-model="value" 
              :options="option" 
              :ref="dropdownItemRefs">
        </van-dropdown-item>

        <!-- 筛选 -->
        <van-dropdown-item 
                  v-if="item.gType === 1" 
                  title="筛选" 
                  :ref="dropdownItemRefs" >
          <div class="dropdown-content">
            <search-filter :filter-data="item.subGroups.slice(0,10)"/>

            <div class="footer">
            <button :class="['clear',isClear ? '':'notClear']" @click="clearClick(item.subGroups)">清空</button>
            <button class="view" @click="viewClick('筛选')">查看房屋(300套以上)</button>
          </div>
          </div>
        </van-dropdown-item>

      </template>
    </van-dropdown-menu>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, toRaw, watch } from "vue";
import SideBar from './side-bar.vue';
import SearchFilter from './search-filter.vue';
import HumanPrice from './human-price.vue';

const dropdownRefs = {};
const dropdownItemRefs = (el) => {
  if (el) {
    dropdownRefs[el.title] = el;
    // console.log(dropdownRefs); {位置:{},价格/人数:{},筛选:{}}
  }
};


defineProps({
  conditions:{
    type:Array,
    default:() => []
  }
})


const value = ref(0);
const isClear = ref(true)

const childRef = ref()

const option = [
  { text: '欢迎度排序', value: 0 },
  { text: '好评优先', value: 1 },
  { text: '点评数多->少', value: 2 },
  { text: '低价优先', value: 3 },
  { text: '高价优先', value: 4 },
];

const itemClick = (item) => {
  // console.log(item);{itemData: Proxy(Array), active: 0, index: 0}
  isClear.value = false
}
const clearClick = (item) => {
  isClear.value = true
  item.forEach((item1)=>{
    if(item1.items.length) {
      item1.items.forEach((item2)=>{
        item2.isSelected = false;
      })
    } else {
        item1.subGroups.forEach((item2)=>{
          item2.items.forEach((item3)=>{
            item3.isSelected = false;
        })
      })
    }
  })
}

const closeMenu = (item) => {
  clearClick(item)
}


const viewClick = (title) => {
  dropdownRefs[title]?.toggle(); //收起下拉菜单
}


const humanItemClick = (item) => {
  // console.log(item);

}

const closeMenu2 = () => {
  //因为子组件是在v-for里，所以要拿到ref的下标才能拿到子组件的方法
  childRef.value[0].clearClick()
}




</script>


<style lang='less' scoped>
:deep(.van-dropdown-menu__title:after) {
  border-color: transparent transparent #666 #666;
}

:global(.van-dropdown-menu .van-dropdown-item__content) {
  overflow-y: hidden;
  max-height: 100%;
}

.conditions {
  -webkit-font-smoothing: antialiased;
  .dropdown-content{
    height: 500px;
    overflow: hidden;
    position: relative;

      .footer {
        height: 60px;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-shadow: 0 -2px 20px 0 rgba(0,0,0,.08);
      
      .clear {
        height: 40px;
        width: 85px;
        border-radius: 20px;
        background-color: #f3f4f6;
        color: #dadada;
        font-size: 15px;
        border: none;
        margin:  0 10px 0 20px;
      }
      .view {
        width: 240px;
        height: 40px;
        border-radius: 20px;
        border: none;
        background-color: var(--primary-color);
        color: #fff;
        font-size: 15px;
      }
    }
    .notClear {
      color: #333 !important;
    }
  }

  

}
</style>
