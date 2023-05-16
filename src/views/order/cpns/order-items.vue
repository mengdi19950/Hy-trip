<template>
    <div class="items">
      <div class="title">
        <div class="left ellipsis-text-1">
          {{ getFormText(itemData.unitName) }}
        </div>
        <div class="right pend" v-if="itemData.orderStatus !== 5">
          {{ itemData.orderStatusDesc }}
        </div>
        <div class="right cancel" v-if="itemData.orderStatus == 5">
          {{ itemData.orderStatusDesc }}
          <span class="cancelReason">{{ itemData.cancelReasonDesc }}</span>
        </div>
      </div>
      <div class="image">
        <img :src="itemData.unitPicture" alt="">
        <div class="cover">
          <div class="left">
            <span class="date">{{ getFormDate(itemData.checkInDate) }}</span>
            <span class="weektime">
              <span class="week">{{ getFormDate(itemData.checkInDate,true) }}</span>
              {{ itemData.checkInLatestTime }}</span>
          </div>
          <img src="@/assets/img/order/icon_right_orderlist.png" alt="">
          <div class="right">
            <span class="date">{{ getFormDate(itemData.checkOutDate) }}</span>
            <span class="weektime">
              <span class="week">{{ getFormDate(itemData.checkOutDate,true) }}</span>
              {{ itemData.checkOutLatestTime }}</span>
          </div>
          <div class="totalPrice">
            <span class="text">支付总价</span>
            <span class="price">{{ '¥' + itemData.prepayAmount }}</span>
          </div>
        </div>
      </div>
      <div class="bottomInfo">
        <div class="left" v-if="itemData.orderStatus !== 5">
          <van-icon name="clock-o" />
            <!-- <span class="minute">
              {{ remainingTime }}分
            </span> -->
          <van-count-down :time="(itemData.countdown)*1000" format="mm分" class="minute"/>
          <span class="text">
            {{ itemData.summary }}
          </span>
        </div>
        <div class="left" v-if="itemData.orderStatus == 5"></div>
        <div class="right" v-if="itemData.orderStatus !== 5">
          <van-button class="contact">联系房东</van-button>
          <van-button color="#ff9854" class="pay" >去支付</van-button>
        </div>
        <div class="right delete" v-if="itemData.orderStatus == 5">
          <van-button class="contact">删除</van-button>
          <van-button class="pay again" >再次预订</van-button>
        </div>
      </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  itemData:{
    type:Object,
    default:()=>({})
  }
})

const getFormText = (value) => {
  return value.replace(/｛/g,'').replace(/｝/g,'')
}

const getFormDate = computed(() => {
  return (dateString, isWeek = false) => {
    let date = new Date(dateString);
    if (isWeek) {
      return "周" + "日一二三四五六".charAt(date.getDay());
    }
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };
});


// const remainingTime = ref(0);
// const timeId = ref(null);
// let counter = 1;

// const startCountDown = () => {
//   timeId.value = setInterval(() => {
//     remainingTime.value = parseInt((props.itemData.countdown - counter) / 60);
//     counter++;
//     if (remainingTime.value <= 0) {
//       clearInterval(timeId.value);
//       return;
//     }
//   }, 1000);
// };

// onMounted(() => {
//   startCountDown();
// });


</script>

<style lang='less' scoped>
.items {
  margin:10px 0;
  padding: 0 20px;
  background-color: #fff;
  .title {
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      font-size: 12px;
      max-width: 204px;
    }
    .right {
      font-size: 18px;
    }
    .pend {
      color: var(--primary-color);
    }
    .cancel {
      display: flex;
      align-items: center;
      color: #b2b2b2;
    }
    .cancelReason {
      margin-left: -3px;
      font-size: 12px;
    }
  }
  .image{
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
    .cover {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60px;
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: rgba(9, 10, 14, 0.7);
      border-radius: 0 0 6px 6px;
      color: #fff;
      .left,
      .right {
        display: flex;
        flex-direction: column;
        align-items: center;
        .date {
          font-size: 16px;
          margin-bottom: 4px;
        }
        .weektime {
          font-size: 12px;
          color: #ddd;
        }
      }
      img {
        width: 16px;
        height: 12px;
      }
      .left {
        padding: 0 20px;
      }
      .right {
        border-right: 1px solid #ccc;
        padding: 0 10px 0 20px;
      }
      .totalPrice {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 105px;
        .text {
          font-size: 12px;
          color: #ddd;
          margin-left: 50px;
          margin-bottom: 3px;
        }
        .price {
          font-size: 16px;
          color: var(--primary-color);
          margin-left: 50px;
        }
      }
    }
  }
  .bottomInfo {
    padding: 13px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    .left {
      flex: 1;
      display: flex;
      align-items:center;
      .minute {
          color: var(--primary-color);
        }
      .text {
        font-size: 12px;
        color: #666;
        margin-left: 2px;
      }
    }
    .right {
      .contact,.pay {
        height: 34px;
        border-radius: 6px;
      }
      .contact {
        margin-right: 10px;
        width: 75px;
        padding: 0;
      }
      
    }
    .delete {
      .contact {
        width: 75px;
        padding: 0;
      }
      .again {
        color: var(--primary-color);
        border-color: var(--primary-color);
        width: 75px;
        padding: 0;
      }
    }
  }
}

</style>
