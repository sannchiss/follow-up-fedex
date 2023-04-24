<template>
  <div class="q-pa-md q-gutter-sm">


    <q-dialog v-model="cuentasStore.showDialogInfo">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Información cliente</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
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


            <q-input filled v-model="cuentasStore.infoClient.name" label="Name" lazy-rules readonly
              :rules="[val => val && val.length > 0 || 'Please type something']" />
            <q-input filled v-model="cuentasStore.infoClient.rut" label="Rut" lazy-rules readonly
              :rules="[val => val && val.length > 0 || 'Please type something']" />
            <q-input filled v-model="cuentasStore.infoClient.cuentaTxa" label="Cuenta TXA" lazy-rules readonly
              :rules="[val => val && val.length > 0 || 'Please type something']" />
            <q-input filled v-model="cuentasStore.infoClient.cuentaGts" label="Cuenta GTS" lazy-rules readonly
              :rules="[val => val && val.length > 0 || 'Please type something']" />
            <q-select v-model="modality" filled autocomplete="off" :options="['B2B', 'B2C', 'B2G']" label="Modalidad" />
            <q-select filled autocomplete="off" v-model="typeIntegration"
              :options="[
                'MANUAL GTS', 'MASIVO GTS', 'API WEB SERVICES', 'ALERETI FILE', 'CONECTOR WOOCOMMERCE', 'CONECTOR SHOPIFY', 'CONECTOR MAGENTO', 'CONECTOR PRESTASHOP', 'CONECTOR BIGCOM']"
              label="Type" />


            <q-input type="textarea" v-model="contact" filled clearable autogrow
              :rules="[val => val && val.length > 0 || 'Please type something']" label="Info Contact" />

          </q-form>


        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" @click="saveInfoClient" />
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
      contact: ref(''),
      typeIntegration: ref(''),
      cuentasStore,

    }
  },
  methods: {

    saveInfoClient() {

      // VALIDATE FORM
      if (this.cuentasStore.infoClient.name == '' ||
        this.cuentasStore.infoClient.rut == '' ||
        this.cuentasStore.infoClient.cuentaTxa == '' ||
        this.cuentasStore.infoClient.cuentaGts == '' ||
        this.modality == '' || this.typeIntegration == '' || this.contact == '' || this.date == ''
      ) {
        this.$q.notify({
          message: 'Complete los campos',
          color: 'negative',
          position: 'top',
          timeout: 2000
        });
        return;
      }
      else {
        this.cuentasStore.showDialogInfo = false;

        // get data form
        let data = {

          account_txa: this.cuentasStore.infoClient.cuentaTxa,
          rut: this.cuentasStore.infoClient.rut,
          company: this.cuentasStore.infoClient.name,
          account_gts: this.cuentasStore.infoClient.cuentaGts.replace(/\r/g, ""),
          service_type: this.modality,
          integration_type: this.typeIntegration,
          info_client: this.contact,
          date: this.date,

        }

        this.cuentasStore.saveInfoClientStore(data);
      }

    },


  },
}
</script>
