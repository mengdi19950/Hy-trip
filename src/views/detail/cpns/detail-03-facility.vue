<template>
  <div class="detail-facility">
    <detail-section :title="'房屋设施'" :more-text="'查看全部内容'">
      <div class="facilities">
        <template v-for="(item,index) in facility.houseFacilitys" :key="index">
          <div class="item" v-if="facility?.facilitySort?.includes(index)">
            <div class="groupName">
              <img :src="item.icon" alt="">
              <div class="text">{{ item.groupName }}</div>
            </div>
            <div class="list">
              <template v-for="(item2,index2) in item.facilitys.slice(0,4)" :key="index2">
                <div class="item2">
                  <van-icon name="certificate" class="icon"/>
                  <span class="text">{{item2.name}}</span>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </detail-section>
  </div>
</template>

<script setup>
import detailSection from '@/components/detail-section/detail-section.vue';

const props = defineProps({
  facility:{
    type:Object,
    default:() => ({})
  }
})

// const arr1 = [1,2,4]
// const arr2 = [{0:1},{1:2},{2:3},{3:4},{4:5}]
// let arr3 = []
// arr1.forEach(item => {
//   // console.log(arr2[item]);
//   arr3.push(arr2[item])
  
// })
// console.log(arr3);

// const facilityData = []
// props.facility.facilitySort.forEach(item => {
//   // console.log(item);//1,2,4
//   // console.log(props.facility.houseFacilitys[item]);
//   facilityData.push(props.facility.houseFacilitys[item])
// })
// // console.log(facilityData);





</script>

<style lang='less' scoped>
.detail-facility {
  .facilities {
    padding: 5px 0;
    border-radius: 6px;
    font-size: 12px;
    background-color: #f7f9fb;
    .item {
      display: flex;
      margin: 25px 0;
      .groupName {
        width: 90px;
        text-align: center;
      
        img {
          width: 20px;
          height: 20px;
        }
        .text {
          margin-top: 5px;
          color: #000;
        }
      }
      .list {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-left: 30px;

        .item2 {
          display: flex;
          align-items: center;
          box-sizing: border-box;
          width: 50%;
          margin: 4px 0;

          .icon {
            margin: 0 6px;
          }

          .text {
            color: #666;
          }
        }
      }
    }
  }
}
</style>
