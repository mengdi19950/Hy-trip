<template>
  <ul class="human-price">
    <li class="total-people">
      <template v-for="(item,index) in humanPriceData.slice(0,1)" :key="index">
        <div class="title">
          <h2 class="text">总人数</h2>
          <div class="more" @click="morebtnClick">
            <span class="more-text">展开</span>
            <span class="icon">
              <i class="iconfont icon-xiangxia2" v-if="itemShrink"></i>
              <i class="iconfont icon-xiangshang2" v-else></i>
            </span>
          </div>
      </div>
      <div :class="['items',itemShrink ? 'shrink':'']">
       <div v-for="(people,index1) in item.items.slice(0,8)" :key="index1"
       :class="['people-item',people.selected ? 'click':'']"
       @click="peopleClick(people,index1)">

          {{ people.label }}
     
      </div>
    </div>
    </template>
   </li>

   <!-- 床铺数 -->
    <li class="beds">
      <template v-for="(item,index) in humanPriceData.slice(1,2)" :key="index">
      <div class="operate">
        <div class="text">
          {{ item.label }}
        </div>

        <div class="count">
          <i class="iconfont icon-yx_minus_circle"
            :class="{ active: count > 0 }"
            @click="reduceClick"
            :style="[{pointerEvents: count == 0 ? 'none':''}]"
            ></i>

          <span class="number">{{ count }}</span>

          <i class="iconfont icon-yx_plus_circle" @click="addClick"></i>
        </div>
      </div>
      </template>
    </li>
    <!-- 居室数 -->
    <li class="rooms">
      <template v-for="(item,index) in humanPriceData.slice(2,3)" :key="index">
      <div class="operate">
        <div class="text">
          {{ item.label }}
        </div>

        <div class="count">
          <i class="iconfont icon-yx_minus_circle" 
            :class="{ active: count2 > 0 }"
            @click="reduce2Click"
            :style="[{pointerEvents: count2 == 0 ? 'none':''}]"></i>

          <span class="number">{{ count2 }}</span>

          <i class="iconfont icon-yx_plus_circle" @click="add2Click"></i>
        </div>
      </div>
      </template>
    </li>

    <!-- 价格区间 -->
    <li class="price">
      <template v-for="(item,index) in humanPriceData.slice(3,4)" :key="index">
        <div class="operate">
          <div class="text">
            {{ item.label }}
            <span class="range" v-if="value[1] === 2000">{{ '¥' + value[0] }}～不限</span>
            <span class="range" v-else>{{ '¥' + value[0] }}～{{ '¥' + value[1] }}</span>

          </div>

          <div class="slider">
            <van-slider v-model="value" range  @change="onChange" :step="50" :min="0" :max="2000" bar-height="4px" button-size="30px" />
          </div>

          <div class="items">
            <div v-for="(price,index2) in item.items.slice(0,8)" :key="index2" @click="priceClick(price,index2)" 
            :class="['price-item',price.selected ? 'click':'']">

                {{ price.label }}

            </div>
          </div>
        </div>
      </template>
    </li>
  </ul>
  <div class="footer">
      <button :class="['clear',isClear ? '':'notClear']" @click="clearClick">清空</button>
      <button class="view" @click="handleViewClick">查看房屋(300套以上)</button>
  </div>
</template>

<script setup>
import { ref } from "vue"


const props = defineProps({
  humanPriceData:{
    type:Array,
    default:() => []
  }
})

const itemShrink = ref(true)


const count = ref(0)
const count2 = ref(0)
const value = ref([0, 2000]);

const isClear = ref(true)

const emit = defineEmits(['itemClick','viewClick'])

//滑动条
const onChange = (value) => {
  //如果slider条滑动了，清空按钮亮起
  isClear.value = false
  emit('itemClick',value)
};

//展开收起
const morebtnClick = () => {
  itemShrink.value = !itemShrink.value
}

//人数选择
const peopleClick = (people) => {
  const selected = people.selected
  props.humanPriceData.slice(0,1).forEach(item => {
    item.items.slice(0,8).forEach(item2 => {
      if(item2.selected){
        item2.selected = false
      }
    })
  })
  if(selected){
    people.selected = false
  } else {
    people.selected = true
  }

  updateIsClear()


  emit('itemClick',people)
  
}

//价格选择
const priceClick = (price) => {
  const selected = price.selected
  props.humanPriceData.slice(3,4).forEach(item => {
    item.items.slice(0,8).forEach(item2 => {
      if(item2.selected){
        item2.selected = false
      }
    })
  })
  if(selected){
    price.selected = false
    value.value = [0,2000] //如果取消选中，slider条显示为0-不限
  } else {
    price.selected = true;

    value.value = price.value.split(',').map(Number) //split(',') 把后端返回的数据转换为数组
    if(price.value === '2000,100000'){
      value.value = [2000,2000]  // 如果选择2000以上，slider条显示为2000到2000
    } 
  }

  updateIsClear()

  emit('itemClick',price)
}

const reduceClick = () => {
  count.value--
  updateIsClear()

  emit('itemClick',count.value)
}
const addClick = () => {
  count.value++
  updateIsClear()

  emit('itemClick',count.value)
}
const reduce2Click = () => {
  count2.value--
  updateIsClear()

  emit('itemClick',count2.value)
}
const add2Click = () => {
  count2.value++
  updateIsClear()

  emit('itemClick',count2.value)
}

//检查当前状态是否清空
const updateIsClear = () => {
  let isAllClear = true;
  props.humanPriceData.slice(0,4).forEach(item => {
    item.items.forEach(option => {
      if (option.selected || count.value !== 0 || count2.value !== 0) {
        isAllClear = false;
      }
    });
  });
  isClear.value = isAllClear;
}


const clearClick = () => {
  isClear.value = true

  for (const item1 of props.humanPriceData.slice(0,4)) {
    for (const item2 of item1.items) {
      item2.selected = false
    }
  }
  count.value = 0
  count2.value = 0
  value.value = [0,2000]

}

const handleViewClick = () => {
  emit('viewClick')
}

defineExpose({
  clearClick
})

</script>

<style lang='less' scoped>
.human-price{
  height: calc(500px - 60px);
  overflow-y: scroll;

  li {
    padding: 20px;
  }

  .total-people{
    display: flex;
    flex-direction: column;
    .title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 10px;
      .text {
        font-size: 14px;
      }
      .more {
        .more-text {
          font-size: 12px;
          color: #999;
        }
        .icon {
            .icon-xiangxia2:before {
            content:'\e66b';
            color: #999;
            font-size: 12px;
          }
          .icon-xiangshang2:before {
            content:'\e66a';
            color: #999;
            font-size: 12px;
          }

        }
      }
    }
    .items {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      font-size: 12px;
      .people-item {
        margin-right:8px;
        margin-bottom: 12px;
        height: 28px;
        line-height: 28px;
        width: 77px;
        text-align: center;
        background-color: #f8f8f8;
        border-radius: 15px;

        &.click {
            border: 0.6px solid var(--primary-color);
            color: var(--primary-color);
            background-color: #fff7f1;
            box-sizing: border-box;
          }
      }
      .people-item:nth-child(4),
      .people-item:last-child {
          margin-right: 0;
      }
    }
    .shrink {
      height: 28px;
      overflow: hidden;
    }
  }

  .beds,.rooms{
    .operate {
      background-color: #f6f8fa;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      height: 52px;
      padding: 0 12px;

        .count{
          display: flex;
          align-items: center;
        .icon-yx_minus_circle {
          color: #dadada;
          font-size: 22px;
        }
        .icon-yx_plus_circle{
          color:var(--primary-color);
          font-size: 22px;
        }
        .active {
          color: var(--primary-color);
        }

        .number {
          margin: 0 13px;
        }
      }
    }

  }

  .price {
    .operate {
      overflow-x: hidden;
      .text {
        font-weight: 600;
        .range {
          margin-left: 5px;
        }
      }
      .slider {
        margin: 30px;
        
        
        :deep(.van-slider__button)::after{
          content:'';
          display: inline-block;
          position: absolute;
          top: 3px;
          left: 2.5px;
          width: 25px;
          height: 25px;
          background:url(https://pic.tujia.com/upload/festatic/publicImages/icon-drag-tujia.png) no-repeat 100% ; 
          background-size: 100%;
        }
      }
      .items {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        font-size: 12px;
        margin-top: 45px;
        .price-item {
          margin-right:8px;
          margin-bottom: 12px;
          height: 28px;
          line-height: 28px;
          width: 77px;
          text-align: center;
          background-color: #f8f8f8;
          border-radius: 15px;

          &.click {
            border: 0.6px solid var(--primary-color);
            color: var(--primary-color);
            background-color: #fff7f1;
            box-sizing: border-box;
          }
        }
        .price-item:nth-child(4),
        .price-item:last-child {
            margin-right: 0;
        }
        
      }
    }
  }
}

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
</style>
