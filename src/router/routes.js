import Vue from 'vue'
import VueRouter from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'


const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    name: 'main',
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } },
      { path: 'login', name: 'login', component: () => import('pages/LoginPage.vue'), meta: { requiresAuth: false } },
      { path: 'home', name: 'home', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } },
      { path: 'cuentas', component: () => import('pages/CuentasPage.vue'), meta: { requiresAuth: true } },
      { path: 'integraciones', component: () => import('pages/IntegracionesPage.vue'), meta: { requiresAuth: true } },
      { path: 'dashboard', component: () => import('pages/DashboardPage.vue'), meta: { requiresAuth: true } },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]


/* const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (requiresAuth && !user) {
      next('/login')
    } else if (requiresAuth && user) {
      next()
    } else {
      next()
    }
  })
}) */






export default routes
