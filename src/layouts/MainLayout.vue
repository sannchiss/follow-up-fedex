<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Seguimiento de Cuentas
        </q-toolbar-title>

        <q-space />

        <q-btn-dropdown flat color="white" icon="person">
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <!-- drawer content -->
      <q-list>
        <q-item-label header>
          <div class="text-h6">Menu</div>
        </q-item-label>

        <q-item
          clickable
          v-ripple
          v-for="link in linksList"
          :key="link.id"
          :to="link.to"
        >
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

    <q-footer reveal elevated class="bg-blue-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div></div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from "vue";

import { useRouter, useRoute } from "vue-router";
import userAuthUser from "src/composables/UseAuthUser";
import { useQuasar } from "quasar";
import { Dialog } from "quasar";

import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithCredential,
  signInWithPopup,
} from "@firebase/auth";

const router = useRouter();

const linksList = [
  {
    id: 1,
    title: "DashBoard",
    caption: "dashboard.dev",
    icon: "dashboard",
    to: "/dashboard",
  },
  {
    id: 2,
    title: "Cuentas",
    caption: "cuentas.dev",
    icon: "account_balance",
    to: "/cuentas",
  },
  {
    id: 3,
    title: "Integraciones",
    caption: "integraciones.dev",
    icon: "integration_instructions",
    to: "/integraciones",
  },
  {
    id: 4,
    title: "Configuraciones",
    caption: "configuraciones.dev",
    icon: "settings",
    to: "/configuraciones",
  },
];

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    const router = useRouter();
    const { logout } = userAuthUser();

    const handleLogout = async () => {
      $q.dialog({
        title: "Confirmar",
        message: "¿Está seguro que desea cerrar sesión?",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        await logout();
        router.replace({
          name: "loginSupa",
        });
      });
    };

    const $q = useQuasar();

    return {
      leftDrawerOpen,
      linksList,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      handleLogout,
    };
  },
};
</script>
