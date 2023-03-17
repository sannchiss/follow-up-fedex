<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 400px">
      <cuentas-component />
    </div>
  </div>

  <q-separator inset />

  <div class="q-pa-md">
    <cuentas-table-component />
  </div>
</template>

<script>

import { defineComponent } from 'vue'

export default defineComponent({

  components: {
    'cuentas-component': require('../components/cuentas/CuentasComponents.vue').default,
    'cuentas-table-component': require('../components/cuentas/CuentasTableComponents.vue').default,
  },

})
</script>

<style>

</style>
