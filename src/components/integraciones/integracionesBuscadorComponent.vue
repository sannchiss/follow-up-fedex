<template>
  <h3>Integraciones buscador</h3>
  <q-input rounded outlined v-model="integracioneStore.searchIntegration" color="blue" class="search-integration">
    <template v-slot:append>
      <q-avatar>
        <q-icon name="business" size="34px" color="black" />
      </q-avatar>
    </template>
  </q-input>
</template>

<script>

import { useIntegracionesStore } from 'src/stores/integraciones/integraciones-store'

export default {

  setup() {

    const integracioneStore = useIntegracionesStore()

    return {
      integracioneStore
    }



  }
}
</script>

<style lang="scss">
.search-integration {
  max-width: 600px;
  // size of letter
  font-size: 1.2rem;


}
</style>
