import { ref,onMounted,onUnmounted } from "vue"
import { throttle } from "underscore"

export default function useScroll(elRef) {
  //改善功能，使其能监听Dom元素和window滚动
  let el = window

  //页面是否滚动到底部
  const isReachBottom = ref(false)
  //页面窗口的位置
  const clientHeight = ref(0)
  //窗口滚动的距离
  const scrollTop = ref(0)
  //窗口可滚动的总高度
  const scrollHeight = ref(0)

  const scrollListener = throttle(() => {

    if(el === window) {
      clientHeight.value = document.documentElement.clientHeight,
      scrollTop.value = document.documentElement.scrollTop,
      scrollHeight.value = document.documentElement.scrollHeight
    } else {
      clientHeight.value = el.clientHeight,
      scrollTop.value = el.scrollTop,
      scrollHeight.value = el.scrollHeight
    }

    if(clientHeight.value + scrollTop.value >= scrollHeight.value) {
      isReachBottom.value = true
    }
  },100)

  //页面挂载添加监听
  onMounted(() => {
    if(elRef) el = elRef.value
    el.addEventListener("scroll", scrollListener);
  });

  // 离开页面取消监听
  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListener);
  })

  return { isReachBottom,scrollTop }
}