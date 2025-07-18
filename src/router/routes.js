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
    path: '/forms',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/Forms.vue') }],
  },
  {
    path: '/FireOnly',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/forms/FireOnly/FireOnly.vue') }],
  },
  {
    path: '/evacuacion',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/EvacuacionPage.vue') }],
  },
  {
    path: '/electronico',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/RiesgoElectronicoPage.vue') }],
  },
  {
    path: '/simulacros',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('../pages/SimulacrosPage.vue') }],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
