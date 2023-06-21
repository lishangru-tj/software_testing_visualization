
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Login from '@/views/login/'
import Triangle from '@/views/triangle'

import Unit from '@/views/unit/'
import Inte from '@/views/inte/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/triangle',
        name: 'triangle',
        component: Triangle
      },
      {
        path: '/calendar',
        name: 'calendar',
        component: () => import("@/views/calendar")
      },
      {
        path: '/problem03',
        name: 'problem03',
        component: () => import("@/views/problem03")
      },
      {
        path: '/problem04',
        name: 'problem04',
        component: () => import("@/views/problem04")
      },
      {
        path: '/problem05',
        name: 'problem05',
        component: () => import("@/views/problem05")
      },
      {
        path: '/problem07',
        name: 'problem07',
        component: () => import("@/views/problem07")
      },
      {
        path: '/problem08',
        name: 'problem08',
        component: () => import("@/views/problem08")
      },
      {
        path: '/problem12',
        name: 'problem12',
        component: () => import("@/views/problem12")
      },
      {
        path: '/problem13',
        name: 'problem13',
        component: () => import("@/views/problem13")
      },
      {
        path: '/problem14',
        name: 'problem14',
        component: () => import("@/views/problem14")
      },
      {
        path: '/problem15',
        name: 'problem15',
        component: () => import("@/views/problem15")
      },
      {
        path: '/problem16',
        name: 'problem16',
        component: () => import("@/views/problem16")
      },
      {
        path: '/problem17',
        name: 'problem17',
        component: () => import("@/views/problem17")
      },
      {
        path: '/unit',
        name: 'unit',
        component: Unit
      },
      {
        path: '/inte',
        name: 'inte',
        component: Inte
      }

    ]
  }
]

const router = new VueRouter({
  routes
})

const user = JSON.parse(window.localStorage.getItem('user'));
//导航守卫
// router.beforeEach((to,_,next) =>{
//   //校验非登录页面的登录状态
//   if(to.path !== '/login'){
//     if(user){
//       next();
//     }else{
//       next('./login');
//     }
//   }else{
//     //登录页面正常允许通过
//     next()
//   }
// })

export default router
