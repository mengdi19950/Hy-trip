<template>
  <div class="search-result-other">
    <!-- <div class="notFound">
      当前城市未找到“{{ keyword }}”
    </div> -->
    <div class="other-result">
      “{{ currentCity }}”城市以外的查询结果
    </div>
  </div>
</template>

<script setup>

defineProps({
  keyword:{
    type:String,
    default:''
  },
  currentCity:{
    type:String,
    default:''
  },
  item:{
    type:Array,
    default:() => []
  }
})
</script>

<style lang='less' scoped>
.search-result-other {
  
  .other-result {
    width: 100%;
    background-color: #f7f9fb;
    font-size: 13px;
    height: 46px;
    line-height: 46px;
    color: #666;
    padding: 0 20px;
  }
}
</style>
