import { createRouter,createWebHashHistory } from "vue-router";

const router = createRouter({
  history:createWebHashHistory(),
  routes:[
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/home',
      component:() => import('../views/home/home.vue')
    },
    {
      path:'/login',
      component:() => import('../views/login/login.vue'),
      meta:{
        hideTabBar:true,
      }
    },
    {
      path:'/favor',
      component:() => import('../views/favor/favor.vue'),
      meta:{
        requiresAuth:true // 添加 meta 标记表示该页面需要登录才能访问
      }
    },
    {
      path:'/order',
      component:() => import('../views/order/order.vue'),
      meta:{
        requiresAuth:true // 添加 meta 标记表示该页面需要登录才能访问
      }
    },
    {
      path:'/message',
      component:() => import('../views/message/message.vue'),
      meta:{
        hideTabBar:true,
        requiresAuth:true
      }
    },
    {
      path:'/city',
      component:() => import('../views/city/city.vue'),
      meta:{
        hideTabBar:true
      }
    },
    {
      path:'/search',
      component:() => import('../views/search/search.vue'),
      meta:{
        hideTabBar:true
      }
    },
    {
      path:'/detail/:id',
      component:() => import('../views/detail/detail.vue'),
      meta:{
        hideTabBar:true
      }
    },
    {
      path:'/personal',
      component:() => import('../views/personal/personal.vue'),
      meta:{
        hideTabBar:true,
        requiresAuth:true
      }
    },
  ]
})

function isLoggedIn() {
  // 判断用户是否已登录
  return localStorage.getItem('phone') != null;
}

router.beforeEach((to, from, next) => {
  // console.log(to,from);
  if (to.matched.some(route => route.meta.requiresAuth)) { // 判断目标路由是否需要登录
    if (isLoggedIn()) { // 如果已登录，就继续导航到目标页面
      next();
    } else { // 否则跳转到登录页面
      next({ path: '/login',query:{ redirect:to.fullPath } });
    }
  } else { // 如果不需要登录，直接导航到目标页面
    next();
  }
})





export default router