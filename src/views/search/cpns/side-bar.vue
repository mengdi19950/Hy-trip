<template>
  <div class="side-bar">
    <div class="side-menu">
      <van-sidebar v-model="active" @change="onChange" >
        <template v-for="(item,index) in itemData" :key="index">
          <van-sidebar-item :title="item.label"/>
        </template>
      </van-sidebar>
    </div>

    <div class="content" ref="contentRef">
      <slot name="content">
        <template 
                v-if="itemData[active].items"
                v-for="(item,index) in itemData[active].items" :key="index">
          <div :class="['items',item.isSelected ? 'active':'']"               
               @click="currentItemClick(active,index)">

            <div class="name ellipsis-text-1">{{ item.label }}</div>
            <div class="desc" v-if="item.percentageUser">
              {{ item.percentageUser }}
            </div>
          </div>
        </template>

        <!-- 二级列表 -->
        <template v-if="itemData[active].subGroups.length">
          <div class="sub-side">
            <div class="sub-side-bar">
              <van-sidebar v-model="active2" @change="onSubChange">
                <template v-for="(item2,index2) in itemData[active].subGroups" :key="index2">
                  <van-sidebar-item :title="item2.label"/>
                </template>
              </van-sidebar>
            </div>

            <div class="sub-content">
              <template v-for="(item,index) in itemData[active].subGroups[active2].items" :key="index">
                <div :class="['items',item.isSelected ? 'active':'']"           @click="currentSubItemClick(active2,index)">
                  <div class="name ellipsis-text-1">{{ item.label }}</div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </slot>
    </div>
  </div>
</template>

<script setup>
import useScroll from "@/hooks/useScroll"
import { ref, watch, } from "vue"

const props = defineProps({
  itemData:{
    type:Array,
    default:() => []
  },
  active:{
    type:String,
    default:''
  }
})


const emit = defineEmits(['itemClick','navChange'])

const active = ref(0)
const active2 = ref(0)


const onChange = (index) => {
  emit('navChange',index)
  // console.log(index);
}


const onSubChange = (index) => {
  
}

const removeSelect = () => {
  for (const item of props.itemData) {
    for (const item1 of item.items) {
      item1.isSelected = false
    }
    for (const item2 of item.subGroups) {
      for (const item3 of item2.items) {
        item3.isSelected = false
      }
    }
  }
}


const currentItemClick = (active,index) => {
  removeSelect()
  //清除子列表tag选中
  active2.value = 0

  if(props.itemData[active]) {
  let infos = props.itemData[active].items || []
  infos.forEach((item,index2) => {
    item.isSelected = index2 === index
  })

  emit('itemClick',{
    itemData:props.itemData,
    active,
    index
    })
  }
}
const currentSubItemClick = (active2,index) => {
  removeSelect()
  if(props.itemData[active.value]) {
    let subinfos = props.itemData[active.value].subGroups || []
    let infos = subinfos[active2].items || []
    infos.forEach((item,index2) => {
      item.isSelected = index2 === index
    })

  emit('itemClick',{
    itemData:props.itemData,
    active,
    active2,
    index
    })
  }
}





//清除上一个滚动条记录
const contentRef = ref()
const { scrollTop } = useScroll(contentRef)
watch(active,(newValue) => {
  contentRef.value.scrollTop = 0
})
watch(active2,(newValue) => {
  contentRef.value.scrollTop = 0
})


</script>

<style lang='less' scoped>

  :deep(.van-sidebar) {
      height: calc(500px - 60px);
    }
      :deep(.van-sidebar-item--select:before){
      border-radius: 50%;
    }
    .van-sidebar-item {
      height: 55px;
      padding:17px 0 14px 20px;
    }
    .van-sidebar-item--select:before {
      margin-left: 8px;
      width: 5px;
      height: 5px;
    }

.side-bar {
  display: flex;
  flex-direction: row;

  
  .content {
    flex: 1;
    overflow-y: auto;
    height: calc(500px - 60px);
    &::-webkit-scrollbar{ 
    display:none
  }
    // background-color: #fff;
    .items {
      position: relative;
      height: 55px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding:0 20px 0 10px;
      margin: 0 20px 0 12px;
      box-sizing: border-box;
      font-size: 14px;

      .desc {
        font-size: 12px;
        color: #999;
        padding-top: 5px;
      }
    }
  }
  .active {
    background-color: #fffcf5;
    .name {
      color: var(--primary-color);
    }
  }

  .sub-side {
    display: flex;
    flex-direction: row;
    .sub-side-bar {
      border-right: 1px solid #f8f8f8;
    }
    :deep(.van-sidebar) {
      .van-sidebar-item {
        background-color: white !important;
        height: 55px;
        width: 81px;
      }
    }
    .sub-content {
      flex: 1;
      overflow-x: hidden;
      overflow-y: scroll;
      height: calc(500px - 60px);
      &::-webkit-scrollbar{ 
        display:none
      }
    }
  }
}
</style>
