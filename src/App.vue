<template>
  <div class="app">
    <!-- 将 props 绑定在模板上，这里的 props 包含了组件实例、参数等信息。而 keep-alive 组件是用来缓存组件实例的，使得在切换路由时可以不重新渲染组件，提高性能。在这里，keep-alive 组件的属性 include 设置为 "home" ，表示对路由地址中包含字符串 "home" 的组件进行缓存。最后通过动态组件的方式，将当前路由地址对应的组件动态地渲染在 keep-alive 组件中。切换路由时，如果下一个路由地址中包含字符串"home"，则从缓存中取出对应的组件并展示；否则重新渲染新的组件。 -->
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>
    <!-- <tab-bar v-if="!$route.meta.hideTabBar" /> 不引入route -->
    <tab-bar v-show="!route.meta.hideTabBar" />
    <loading />

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import TabBar from './components/tabbar/tab-bar.vue'
import Loading from './components/loading/loading.vue'

const route = useRoute()



</script>

<style lang='less' scoped>

</style>
