import { showToast } from 'vant'
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home/index.vue')
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('../views/mine/index.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/cart/index.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/order/index.vue'),
      meta:{
        isAuth:true
      }
      
    },
    {
      path: '/store',
      name: 'store',
      component: () => import('../views/store/index.vue')
    },
    {
      path:'/createorder',
      name:'createorder',
      component:()=> import('../views/createOrder/index.vue'),
      meta:{
        isAuth:true
      }
    },
    {
      path:'/address',
      name:'address',
      component:()=>import('../views/address/index.vue'),
      meta:{
        isAuth:true
      }
    },
    {
      path:'/addressedit',
      name:'addressedit',
      component:()=>import('../views/addressEdit/index.vue'),
      meta:{
        isAuth:true
      }
    },
    {
      path:'/userinfoedit',
      name:'userinfoedit',
      component:()=>import('../views/userinfoedit/index.vue'),
      meta:{
        isAuth:true
      }
    },
    {
      path:'/login',
      name:'login',
      component:()=>import('../views/login/index.vue')
    },    {
      path:'/register',
      name:'register',
      component:()=>import('../views/register/index.vue')
    }
  ]
})

router.beforeEach((to,from,next)=>{
if(to.meta.isAuth){
  //一会登录了以后，会在localstorage里面 存储一个标识
  if(localStorage.isLogin === 'login'){
    next()
  } else {
    next('/login')
    showToast('请先去登录')
  }
} else {
  next()
}
})
export default router
