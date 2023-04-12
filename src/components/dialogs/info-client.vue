<template>
  <div class="q-pa-md q-gutter-sm">

    <q-dialog v-model="cuentasStore.showDialogInfo">
      <q-card>
        <q-card-section>
          <div class="text-h6">Información cliente</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          {{ cuentasStore.infoClient }}

          <!--add form-->
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">

            <div class="q-pa-md" style="max-width: 300px">
              <q-input filled v-model="date" mask="date" :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="date">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>


            <q-input filled v-model="cuentasStore.infoClient.name" label="Name" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" />
            <q-input filled v-model="cuentasStore.infoClient.rut" label="Rut" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" />
            <q-input filled v-model="cuentasStore.infoClient.cuentaTxa" label="Cuenta TXA" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" />
            <q-input filled v-model="cuentasStore.infoClient.cuentaGts" label="Cuenta GTS" lazy-rules
              :rules="[val => val && val.length > 0 || 'Please type something']" />
            <q-select v-model="modality" filled autocomplete="off" :options="['B2B', 'B2C', 'B2G']" label="Modalidad" />
            <q-select filled autocomplete="off" v-model="typeIntegration"
              :options="[
                'MANUAL GTS', 'MASIVO GTS', 'API WEB SERVICES', 'ALERETI FILE', 'CONECTOR WOOCOMMERCE', 'CONECTOR SHOPIFY', 'CONECTOR MAGENTO', 'CONECTOR PRESTASHOP', 'CONECTOR BIGCOM']"
              label="Type" />


            <q-input v-model="cuentasStore.infoClient.infoClient" filled autogrow
              :rules="[val => val && val.length > 0 || 'Please type something']" />

          </q-form>


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
import { ref } from 'vue'
import { useCuentasStore } from 'src/stores/cuentas/cuentas-store';

export default {



  setup() {

    const cuentasStore = useCuentasStore();

    // get date today format dd/mm/yyyy
    let date = new Date().toISOString().substr(0, 10);

    return {
      modality: ref(''),
      date,
      typeIntegration: ref(''),
      cuentasStore,

    }
  }
}
</script>
