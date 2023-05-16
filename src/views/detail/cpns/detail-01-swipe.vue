<template>
  <div class="detail-swipe">
    <van-swipe class="swipe" :autoplay="2000">
      <template v-for="(item,index) in swipeData" :key="index">
        <van-swipe-item>
          <img :src="item.url" alt="">
        </van-swipe-item>
      </template>
      <template #indicator="{active,total}">
        <div class="indicator">
            <!-- {{ active + 1 }}/{{ total }} -->
            <template v-for="(value,key,index) in newData" :key="key">
              <span class="item" :class="{ active:swipeData[active]?.enumPictureCategory == key }">
                <span class="text">{{ getName(value[0].title) }}</span>
                <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">
                  {{getCurrentIndex(swipeData[active]) + 1}} / {{ value.length }}
              </span>
              </span>
            </template>
        </div>
      </template>
</van-swipe>
  </div>
</template>

<script setup>
const props = defineProps({
  swipeData:{
    type:Array,
    default:() => []
  }
})

// const obj = {
//   '2':[卧室1,卧室2],
//   '4':[卫生间1,卫生间2],
//   '9':[其他1,其他2],
// }
const newData = { }
//一次循环
for (const item of props.swipeData) {
  // console.log(item.enumPictureCategory);
  let newArray = newData[item.enumPictureCategory]
  if(!newArray) {
    newArray = []
    newData[item.enumPictureCategory] = newArray
  }
  newArray.push(item)
}
//两次循环
// for(const item of props.swipeData){
//   newData[item.enumPictureCategory] = []
// }
// for(const item of props.swipeData){
//   const newArray = newData[item.enumPictureCategory]
//   newArray.push(item)
// }
// console.log(newData);

const getName = (name) => {
  return name.replace('：',"")
}
const getCurrentIndex = (item) => {
  const valueArr = newData[item.enumPictureCategory]
  return valueArr.findIndex(index => index === item)
}




</script>

<style lang='less' scoped>
.detail-swipe {
  .swipe {
    position: relative;
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      line-height: 150px;
      text-align: center;
      background-color: #39a9ed;
    } 

    img {
      width: 100%;
    }
    .indicator {
      position: absolute;
      bottom: 5px;
      right: 5px;
      padding: 2px 5px;
      background-color: rgba(0,0,0,0.4);
      color: #fff;
      // display: flex;

      .item {
        margin: 0 3px;
        &.active {
        color: #000;
        background-color: #fff;
        border-radius: 5px;

      }
      }
    }

    
   
 }

}
</style>
