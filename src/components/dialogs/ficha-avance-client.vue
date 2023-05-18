<template>
  <div class="q-pa-md q-gutter-sm">

    <q-dialog v-model="integracionesStore.dialogoFichaCliente">
      <q-card>
        <q-card-section>
          <div class="text-h6">Envío de mail ficha</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <p v-for="n in 15" :key="n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit
            voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem
            aut, natus minima, porro labore.</p>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>

import { useIntegracionesStore } from 'src/stores/integraciones/integraciones-store'


export default {

  setup() {
    const integracionesStore = useIntegracionesStore()

    return {
      integracionesStore
    }


  },




}
</script>

<style></style>
