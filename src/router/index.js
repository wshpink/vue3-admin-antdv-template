import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false,
})

import { asyncRoutes } from './asyncRoutes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        title: '首页',
      },
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/fileManage',
      children: [...asyncRoutes],
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        title: '登录页',
      },
      component: () => import('@/views/Login/index.vue'),
    },
  ],
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach((to) => {
  NProgress.done()
  document.title = `${to.meta.title || import.meta.env.VITE_APP_TITLE}`
})

export default router
