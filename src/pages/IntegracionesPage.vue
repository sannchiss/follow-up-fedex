<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 1500px">
      <integraciones-component />
    </div>
  </div>

  <q-separator inset />

  <div class="q-pa-md">
    <cuentas-table-component />
  </div>
</template>

<script>
export default {
  components: {
    /*     CuentasComponent: () => import('components/cuentas/CuentasComponent.vue'),
        CuentasTableComponent: () => import('components/cuentas/CuentasTableComponent.vue') */

    "integraciones-component":
      require("components/integraciones/IntegracionesComponent.vue").default,
  },
};
</script>

<style></style>
