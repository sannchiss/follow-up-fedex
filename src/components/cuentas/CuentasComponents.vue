<template>
  <q-file
    v-model="cuentasStore.file"
    @update:model-value="cuentasStore.uploadFileStore($event)"
    label=".txt"
    max-files="12"
    bottom-slots
    counter
    filled
    accept=".txt"
  >
    <template v-slot:before>
      <q-icon name="folder_open" />
    </template>

    <template v-slot:hint> Archivo de cuentas </template>

    <template v-slot:append>
      <q-btn
        round
        dense
        flat
        icon="add"
        @click.prevent="cuentasStore.uploadFileStore"
      />
    </template>
  </q-file>
</template>

<script>
import { ref } from "vue";
import { useCuentasStore } from "src/stores/cuentas/cuentas-store";


export default {
  setup() {
    const cuentasStore = useCuentasStore();

    return {
      model: ref(null),
      cuentasStore,
    };
  },
  methods: {
    uploadFileStore(file) {
      console.log("uploadFileStore", file);
    },
  },
};
</script>

<style></style>
