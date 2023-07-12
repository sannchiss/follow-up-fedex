



const routes = [

  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    name: 'auth',
    children: [
      { path: '', name: 'loginSupa', component: () => import('pages/LoginSupabase.vue') },
      { path: 'login', name: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', name: 'register', component: () => import('pages/RegisterUserPage.vue'), meta: { requiresAuth: false } },
      { path: 'email-confirmation', name: 'email-confirmation', component: () => import('pages/EmailConfirmation.vue') },
      { path: 'forgot-password', name: 'forgot-password', component: () => import('pages/ForgotPasswordPage.vue') },
      { path: 'reset-password', name: 'reset-password', component: () => import('pages/ResetPasswordPage.vue') },

    ]
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    name: 'main',
    children: [
      { path: 'me', name: 'me', component: () => import('pages/MePage.vue') },
      { path: '/dashboard', component: () => import('pages/DashboardPage.vue') },
      { path: '/home', component: () => import('pages/HomePage.vue') },
      { path: '/cuentas', name: 'cuentas', component: () => import('pages/CuentasPage.vue') },
      { path: '/integraciones', component: () => import('pages/IntegracionesPage.vue') },
      { path: '/logout', component: () => import('pages/LogoutPage.vue') },
    ],
    meta: { requiresAuth: true }
  },

  // no forbidden page
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }



]



export default routes
