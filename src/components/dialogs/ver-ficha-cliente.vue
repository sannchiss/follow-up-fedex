<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog
      v-model="integracionesStore.dialogoVerFicha"
      transition-show="rotate"
      transition-hide="rotate"
    >
      <q-card>
        <q-card-section>
          <div class="text-h6">INFORMACIÓN EMPRESA</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md bg-grey-9 text-white">
            <q-list dark bordered separator style="max-width: 518px">
              <q-item
                v-for="info in integracionesStore.rowAvance.informacion"
                :key="info.id"
              >
                <q-item-section
                  >{{ info.col_ficha1 }}
                  <q-item-label class="text-red">{{
                    info.col_ficha2
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useIntegracionesStore } from "src/stores/integraciones/integraciones-store";
import handleAdvanceCompany from "src/composables/HandleAdvanceCompany";

const { getInfCompany } = handleAdvanceCompany();

export default {
  setup() {
    const integracionesStore = useIntegracionesStore();

    return {
      integracionesStore,
    };
  },
};
</script>

<style></style>
