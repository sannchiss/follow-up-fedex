



const routes = [

  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    name: 'auth',
    children: [
      { path: '/', component: () => import('pages/LoginPage.vue'), meta: { requiresAuth: false } },
    ]
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    name: 'main',
    children: [
      { path: '/dashboard', component: () => import('pages/DashboardPage.vue'), meta: { requiresAuth: true } },
      { path: '/home', component: () => import('pages/HomePage.vue'), meta: { requiresAuth: true } },
      { path: '/cuentas', component: () => import('pages/CuentasPage.vue'), meta: { requiresAuth: true } },
      { path: '/integraciones', component: () => import('pages/IntegracionesPage.vue'), meta: { requiresAuth: true } },
      { path: '/logout', component: () => import('pages/LogoutPage.vue'), meta: { requiresAuth: true } },
    ]
  }
]








export default routes
