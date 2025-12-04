import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/DashboardPage.vue') }],
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('../pages/LoginPage.vue') }],
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/DashboardPage.vue') }],
  },
  {
    path: '/FireOnly',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/forms/FireOnly/FireOnly.vue') }],
  },
]

const router = createRouter({
  history: createWebHashHistory(), // <-- hash mode para evitar 404 en deploy
  routes,
})

export default router
