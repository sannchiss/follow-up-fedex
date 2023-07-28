<template>
  <div class="q-pa-sm q-gutter-xs">
    <q-dialog v-model="cuentasStore.showDialogInfo">
      <q-card style="width: 500px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Información cliente</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 100vh" class="scroll">
          <!--add form-->
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-sm"
            name="form-info"
          >
            <!--             <div class="row">
              <q-input filled v-model="date" mask="date" :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="date">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div> -->

            <q-input
              filled
              v-model="cuentasStore.infoClient.empresa"
              label="Name"
              lazy-rules
              readonly
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
            <q-input
              filled
              v-model="cuentasStore.infoClient.rut"
              label="Rut"
              lazy-rules
              readonly
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
            <q-input
              filled
              v-model="cuentasStore.infoClient.cuentaTxa"
              label="Cuenta TXA"
              lazy-rules
              readonly
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
            <q-input
              filled
              v-model="cuentasStore.infoClient.cuentaGts"
              label="Cuenta GTS"
              lazy-rules
              readonly
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
            <div class="column" style="max-width: 300px">
              <div class="q-gutter-sm">
                <div class="col-4 col-md-6">
                  <q-select
                    v-model="modality"
                    filled
                    autocomplete="off"
                    :options="['B2B', 'B2C', 'B2G']"
                    label="Modalidad"
                  />
                </div>
                <div class="col-4 col-md-6">
                  <q-select
                    filled
                    autocomplete="off"
                    v-model="typeIntegration"
                    :options="[
                      'MANUAL GTS',
                      'MASIVO GTS',
                      'API WEB SERVICES',
                      'ALERETI FILE',
                      'CONECTOR WOOCOMMERCE',
                      'CONECTOR SHOPIFY',
                      'CONECTOR MAGENTO',
                      'CONECTOR PRESTASHOP',
                      'CONECTOR BIGCOM',
                    ]"
                    label="Type"
                  />
                </div>
              </div>
            </div>

            <q-input
              type="textarea"
              v-model="informacion"
              filled
              clearable
              autogrow
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
              label="Información de contacto"
            />
          </q-form>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            flat
            label="Asignarme"
            color="primary"
            @click="saveInfoClient"
            icon="save"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { useCuentasStore } from "src/stores/cuentas/cuentas-store";

import handleAdvanceCompany from "src/composables/HandleAdvanceCompany";

export default {
  setup() {
    const cuentasStore = useCuentasStore();
    const { insertListAdvanceCompany } = handleAdvanceCompany();

    // get date today format dd/mm/yyyy
    const date = new Date().toISOString().substr(0, 10);

    return {
      insertListAdvanceCompany,
      modality: ref(""),
      date,
      informacion: ref(""),
      typeIntegration: ref(""),
      cuentasStore,
    };
  },
  methods: {
    async saveInfoClient() {
      // VALIDATE FORM
      if (
        this.cuentasStore.infoClient.empresa == "" ||
        this.cuentasStore.infoClient.rut == "" ||
        this.cuentasStore.infoClient.cuentaTxa == "" ||
        this.cuentasStore.infoClient.cuentaGts == "" ||
        this.modality == "" ||
        this.typeIntegration == "" ||
        this.informacion == "" ||
        this.date == ""
      ) {
        this.$q.notify({
          message: "Complete los campos",
          color: "negative",
          position: "top",
          timeout: 2000,
        });
        return;
      } else {
        // get data form

        // separate content textarea informacion by line
        let informacionDesfrag = this.informacion.split("\n");
        0;
        // convert /t to space and convert to array
        informacionDesfrag = informacionDesfrag.map((item) =>
          item.replace(/\t/g, ":")
        );

        // delete item empty
        informacionDesfrag = informacionDesfrag.filter((item) => item != "");

        // save information format json
        informacionDesfrag = informacionDesfrag.map((item) => {
          let data = item.split(":");
          return {
            col_ficha1: data[0],
            col_ficha2: data[1],
          };
        });

        console.log(informacionDesfrag);

        let data = {
          empresa: this.cuentasStore.infoClient.empresa,
          rut: this.cuentasStore.infoClient.rut,
          modalidad_negocio: this.modality,
          modalidad_integracion: this.typeIntegration,
          informacion: informacionDesfrag,
          avance: [
            {
              fecha: "00/00/0000 al 00/00/0000",
              porcentaje_avance: 0,
              estado: "Pendiente, cliente sin avance",
              comentarios: "-",
            },
          ],
          cuentaTxa: this.cuentasStore.infoClient.cuentaTxa,
          cuentaGts: this.cuentasStore.infoClient.cuentaGts.replace(/\r/g, ""),
          porcentaje_integracion: 0,
          estado_integracion: "Pendiente",
          //date: this.date,
        };

        console.log(data);

        // insert data in list advance company
        const handleAsigCompany = async () => {
          try {
            await this.insertListAdvanceCompany(data);
            this.cuentasStore.showDialogInfo = false;

            this.$q.notify({
              message: "Se asigno correctamente",
              color: "positive",
              position: "top",
              timeout: 2000,
            });

            // clear input form
            this.modality = "";
            this.typeIntegration = "";
            this.informacion = "";
          } catch (error) {
            this.$q.notify({
              message: error.message,
              color: "negative",
              position: "top",
              timeout: 4000,
            });
          }
        };

        handleAsigCompany();

        // this.cuentasStore.saveInfoClientStore(data);
      }
    },
  },
};
</script>
