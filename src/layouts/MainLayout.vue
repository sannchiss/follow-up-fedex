<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Follow up
        </q-item-label>

        <q-item clickable v-for="link in linksList" :key="link.title" :to="link.to">
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {
  defineComponent,
  ref
} from 'vue'

const linksList = [{
  title: 'DashBoard',
  caption: 'dashboard.dev',
  icon: 'dashboard',
  to: '/dashboard'
},
{
  title: 'Cuentas',
  caption: 'cuentas.dev',
  icon: 'account_balance',
  to: '/cuentas'
},
{
  title: 'Integraciones',
  caption: 'integraciones.dev',
  icon: 'integration_instructions',
  to: '/integraciones'
},
{
  title: 'Login',
  caption: 'login.dev',
  icon: 'login',
  to: '/login'
}

]

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      linksList,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
