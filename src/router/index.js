import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index')
  },
  {
    path: '/',
    name: 'course',
    component: () => import(/* webpackChunkName: 'course' */'@/views/course/index')
  },
  {
    path: '/course-info/:courseId/',
    name: 'course-info',
    component: () => import(/* webpackChunkName: 'course-info' */'@/views/course-info/index'),
    props: true
  },
  {
    path: '/lesson-video/:lessonId/',
    name: 'lesson-video',
    component: () => import(/* webpackChunkName: 'lesson-video' */'@/views/course-info/video'),
    props: true
  },
  {
    path: '/learn',
    name: 'learn',
    component: () => import(/* webpackChunkName: 'learn' */'@/views/learn/index'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: 'user' */'@/views/user/index'),
    meta: { requiresAuth: true }
  },
  {
    path: '/*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'error-page' */'@/views/error-page/index')
  },
  {
    path: '/pay/:courseId',
    name: 'pay',
    component: () => import(/* webpackChunkName: 'pay' */'@/views/pay/index'),
    meta: { requiresAuth: true },
    props: true
  }
]

const router = new VueRouter({
  routes
})

// 前置导航守卫进行登录检测和跳转
router.beforeEach((to, from, next) => {
  // 验证 to 路由是否需要进行身份验证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 验证 store 中的用户信息是否存在
    if (!store.state.user) {
      // 未登录，跳转到登录页面
      return next({
        name: 'login',
        query: {
          // 将本次路由的 fullPath 传递给 Login 页面
          redirect: to.fullPath
        }
      })
    }
    // 已经登录，允许通过
    next()
  } else {
    // 不需要身份验证，允许通过
    next()
  }
})

export default router
