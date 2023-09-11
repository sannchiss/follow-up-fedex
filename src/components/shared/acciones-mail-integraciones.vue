<template>
  <q-btn flat round color="teal" icon="email">
    <q-menu>
      <q-list style="min-width: 100px">
        <q-item
          v-for="item in menu_mail"
          :key="item.opcion"
          clickable
          v-close-popup
          @click="item.click(row)"
        >
          <q-item-section :icon="item.icon">{{ item.opcion }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import { useIntegracionesStore } from "src/stores/integraciones/integraciones-store";

export default {
  props: {
    row: {
      type: Array,
      default: () => [],
    },
  },

  setup() {
    const integracionesStore = useIntegracionesStore();

    const menu_mail = [
      {
        opcion: "Mail integracion",
        icon: "mail",
        click: (row) => {
          integracionesStore.dialogoCorreo = true;
          integracionesStore.rowAvance = row;

          console.log("row", integracionesStore.rowAvance);
        },
      },
      {
        opcion: "Mail Capacitacion",
        icon: "mail",
        click: () => {
          console.log("mail capacitacion");
        },
      },
    ];
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      menu_mail,
    };
  },

  methods: {},
};
</script>

<style></style>
