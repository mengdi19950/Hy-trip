<template>
  <div class="city">
    <div class="top">
          <!-- 搜索框 -->
    <van-search  placeholder="城市/区域/位置"
                 show-action
                 @cancel="onCancel"
                 shape="round" />
    <!-- tab切换栏 -->
    <van-tabs v-model:active="tabActive">
      <template v-for="(value,key,index) in cities" :key="key">
        <van-tab :title="value.title" :name="key">
          <div class="content">
            <van-index-bar :sticky="false" :index-list="indexList">
              <van-index-anchor index="#">热门</van-index-anchor>
                <div class="hot">
                  <template v-for="(item,index2) in value.hotCities" :key="index2">
                    <div class="hotCities" @click="cityClick(item)">
                      {{ item.cityName }}
                    </div>
                  </template>
                </div>

                  <div class="list" v-show="tabActive === key">
                  <template v-for="(item,index2) in currentGroup?.cities" :key="index2">
                    <van-index-anchor :index="item.group" />
                    <template v-for="(city,id) in item.cities" :key="id">
                        <van-cell :title="city.cityName" @click="cityClick(city)"/>
                    </template>
                  </template>
                  </div>
            </van-index-bar>
          </div>
        </van-tab>
      </template>
    </van-tabs>

    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { storeToRefs } from 'pinia';

import router from '@/router';
import useCityStore from '@/stores/modules/city'

const tabActive = ref()

const onCancel = () => {
  router.back()
}

const cityStore = useCityStore()
cityStore.fetchCityData()
const { cities } = storeToRefs(cityStore)

const currentGroup = computed(() => cities?.value[tabActive.value])

//currentGroup是响应式数据，所以要拿value
const indexList = computed(() => {
  const list = currentGroup?.value.cities.map(item => item.group)
  list.unshift('#')
  return list
})

const cityClick = (item) => {
  // console.log(item);
  cityStore.currentCity = item
  router.back()
}


</script>

<style lang='less' scoped>
.city {
  .top {
    position: relative;
    z-index: 9;
    :deep(.van-search__field .van-field__left-icon) {
      color: var(--primary-color);
    }

    :deep(.van-tabs__line) {
      background: var(--primary-color);
    }

  }

  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
    :deep(.van-hairline--bottom:after) {
      border: none;
    }
    :deep(.van-index-anchor--sticky){
      color: #666;
    }
    .hot {
      display: flex;
      justify-content: space-around;
      padding: 10px;
      padding-right: 25px;
      flex-wrap: wrap;
        .hotCities {
          width: 70px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          border-radius: 14px;
          background-color: #fff4ec;
          font-size: 12px;
          color: #000;
          margin: 10px 0;
      }
    }
  }


}
</style>
