<template>
  <div class="search-result-item" @click="handleResultItemClick">
    <div class="left">
      <div class="name ellipsis-text-1" v-html="highLightWord">
      </div>
      <div class="desc">
        {{ description }}
      </div>
    </div>
    <div class="typeName">
      {{ typeName }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  keyWord:{
    type:String,
    default:''
  },
  name:{
    type:String,
    default:''
  },
  description:{
    type:String,
    default:''
  },
  typeName:{
    type:String,
    default:''
  }
})

const highLightWord = computed(() => {
  let result = props.name
  if(result) {
    const reg = new RegExp(props.keyWord,'ig')
    return result.replace(reg,`<span style="color: #ff9645">${props.keyWord}</span>`)
  }
})

const emit = defineEmits(['resultClick'])
const handleResultItemClick = () => {
  emit('resultClick',{ name: props.name, typeName: props.typeName })
}

</script>

<style lang='less' scoped>
.search-result-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 70px;
  border-bottom: 1px solid #f1f1f1;
  box-sizing: border-box;
  padding: 0 20px;
  .left {
    .name {
      font-size: 13px;
      color: #333;
      padding-bottom: 5px;
    }
    .desc {
      font-size: 12px;
      color: #999;
    }
  }
  .typeName {
    font-size: 13px;
    color: #666;
  }
}
</style>
