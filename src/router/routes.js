
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
      { path: '/home', name: 'home', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } },
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

// check auth
const checkAuth = async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const currentUser = await getCurrentUser()

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('home')
  else next()
}

// getcurrentuser
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}


// router
/* Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
}) */

/* const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
})


router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const currentUser = await getCurrentUser()
  if (requiresAuth && !currentUser) next('loging')
  else if (!requiresAuth && currentUser) next('home')
  else next()
})
 */


export default routes
