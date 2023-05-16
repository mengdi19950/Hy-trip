<template>
  <div class="map">
    <detail-section title="位置周边" more-text="查看更多周边信息">
      <!-- 进入百度地图开放平台
           登陆 -> 控制台 -> 应用管理 - 我的应用 - 创建应用 - 密钥
           开发文档 - JavaScript API - Hello World/展示地图 -
           - 引用百度地图API文件 - index.html -
           - 展示地图 - 初始化地图逻辑 - 绘制点线面 - 创建标注对象...
      
       -->
       <div class="baidu" ref="mapRef"></div>
    </detail-section>
  </div>
</template>

<script setup>
import DetailSection from '@/components/detail-section/detail-section.vue'
import { onMounted, ref } from 'vue'

const mapRef = ref()
onMounted(() => {
  const map = new BMapGL.Map(mapRef.value); // 创建地图实例 
  const point = new BMapGL.Point(props.position.longitude, props.position.latitude);  // 创建点坐标 
  map.centerAndZoom(point, 15);  // 初始化地图，设置中心点坐标和地图级别
  // map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
  const marker = new BMapGL.Marker(point);  //创建标注对象并添加到地图 
  map.addOverlay(marker); //将标注（红色标志）添加到地图中
})

const props = defineProps({
  position:{
    type:Object,
    default:()=>({})
  }
})

</script>

<style lang='less' scoped>
.baidu {
  height: 250px;
}
</style>
