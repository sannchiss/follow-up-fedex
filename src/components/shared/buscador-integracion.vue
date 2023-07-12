<template>
  <div class="q-pa-md">
    <q-input
      v-model="integracionesStore.search"
      @focus="searchClose = false"
      @blur="searchClose = true"
      flat
      filled
      clearable
      label="Search"
      type="search"
      style="width: 500px; margin: 0 auto"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
</template>

<script>
import { ref } from "vue";
import { useIntegracionesStore } from "src/stores/integraciones/integraciones-store";

export default {
  setup() {
    const integracionesStore = useIntegracionesStore();
    const searchClose = ref(true);

    return {
      integracionesStore,
      searchClose,
    };
  },
};
</script>

<style></style>
