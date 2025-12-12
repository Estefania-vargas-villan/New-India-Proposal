const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('../pages/LoginPage.vue') },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('../pages/DashboardPage.vue') },
    ],
  },
  {
    path: '/FireOnly',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('../pages/forms/FireOnly/FireOnly.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
