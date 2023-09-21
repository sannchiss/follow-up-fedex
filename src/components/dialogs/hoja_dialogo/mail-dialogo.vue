<template>
  <div class="q-pa-lg">
    <q-dialog
      v-model="integracionesStore.dialogoCorreo"
      position="bottom"
      @hide="() => erase()"
    >
      <q-card style="width: 600px; height: 580px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ integracionesStore.rowAvance.empresa }}</div>
          <div class="text-subtitle2">
            {{
              "Cuenta Txa: " +
              integracionesStore.rowAvance.cuentaTxa +
              " / " +
              "Cuenta Gts: " +
              integracionesStore.rowAvance.cuentaGts
            }}
          </div>
        </q-card-section>

        <q-card-section>
          <!--add form for email-->
          <q-form @submit="sendMail">
            <div class="q-pa-md">
              <div class="q-gutter-y-md">
                <div class="col-6">
                  <q-input
                    v-model="integracionesStore.payload.para"
                    type="email"
                    input-class="text-right"
                    label="Para:"
                    clearable
                  >
                    <template v-slot:before>
                      <q-icon name="mail" />
                    </template>
                  </q-input>

                  <q-input
                    v-model="integracionesStore.payload.con_copia_a"
                    type="email"
                    input-class="text-right"
                    label="Copia:"
                    clearable
                  >
                    <template v-slot:before>
                      <q-icon name="mail" />
                    </template>
                  </q-input>
                </div>

                <q-separator />

                <div class="q-gutter-x-sm">
                  <div class="row">
                    <div class="col-6">
                      <q-input
                        filled
                        v-model="integracionesStore.payload.fecha"
                        mask="date"
                        :rules="['date']"
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date
                                v-model="integracionesStore.payload.fecha"
                              >
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

                        <template v-slot:before>
                          <q-icon name="label_important" />
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>

                <q-separator />

                <div class="q-gutter-x-sm">
                  <div class="row">
                    <div class="col-4">
                      <q-input
                        v-model="integracionesStore.payload.id_project"
                        type="number"
                        label="ID PROYECTO"
                      >
                        <template v-slot:before>
                          <q-icon name="label_important" />
                        </template>
                      </q-input>
                    </div>
                    <div class="col-4">
                      <q-select
                        v-model="
                          integracionesStore.payload.modalidad_de_negocio
                        "
                        type="text"
                        label="T. MODALIDAD"
                        :options="t_servicios"
                      >
                        <template v-slot:before>
                          <q-icon name="label_important" />
                        </template>
                      </q-select>
                    </div>
                    <div class="col-4">
                      <q-select
                        v-model="
                          integracionesStore.payload.modalidad_de_integracion
                        "
                        :options="t_integracion"
                        use-chips
                        multiple
                        type="text"
                        label="T. INTEGRACION"
                      >
                        <template v-slot:before>
                          <q-icon name="label_important" />
                        </template>
                      </q-select>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-4">
                      <q-select
                        v-model="integracionesStore.payload.tipo_de_impresion"
                        :options="['PDF', 'PDF2', 'ZPL', 'EPL']"
                        type="text"
                        label="T. IMPRESION"
                      >
                        <template v-slot:before>
                          <q-icon name="label_important" />
                        </template>
                      </q-select>
                    </div>
                    <div class="col-4">
                      <q-select
                        v-model="
                          integracionesStore.payload.propiedad_de_impresora
                        "
                        :options="['FedEx', 'Cliente']"
                        label="P. IMPRESORA"
                        type="text"
                      >
                        <template v-slot:before>
                          <q-icon name="label_important" />
                        </template>
                      </q-select>
                    </div>

                    <div class="col-4">
                      <q-select
                        v-model="
                          integracionesStore.payload.devolucion_de_documentos
                        "
                        :options="['Si', 'No']"
                        label="D. DOCUMENTOS"
                        type="text"
                      >
                        <template v-slot:before>
                          <q-icon name="label_important" />
                        </template>
                      </q-select>
                    </div>
                  </div>

                  <div class="row q-pt-lg">
                    <div class="col-12">
                      <q-input
                        v-model="
                          integracionesStore.payload.usuarios_capacitados
                        "
                        type="textarea"
                        rows="5"
                        filled
                        clearable
                        color="green-8"
                        label="Usuarios Entrenados"
                        :shadow-text="Usuarios"
                      />
                    </div>
                  </div>
                </div>

                <q-separator />

                <div class="q-gutter-x-lg">
                  <!--bottom save center -->
                  <div class="row justify-center">
                    <div class="col-4">
                      <q-btn
                        flat
                        color="primary"
                        icon="save"
                        label="Enviar"
                        @click="sendMail"
                      />
                    </div>
                    <div class="col-4">
                      <q-btn
                        flat
                        color="primary"
                        icon="close"
                        label="Cancelar"
                        @click="
                          (integracionesStore.dialogoCorreo = false), erase()
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useIntegracionesStore } from "src/stores/integraciones/integraciones-store";
import { useQuasar } from "quasar";
import emailjs from "@emailjs/browser";

import { ref } from "vue";

export default {
  props: {
    row: {
      type: Array,
      default: () => [],
    },
  },

  setup() {
    const integracionesStore = useIntegracionesStore();

    const $q = useQuasar();

    const emailFor = "ricardosilva@fedex.com";
    const emailCC = "sannchiss.perez@fede.com";
    const emailSubject = "Prueba de correo";

    return {
      integracionesStore,
      t_servicios: ["B2B", "B2C", "B2B2C"],
      t_integracion: [
        "MANUAL INGRESO GTS",
        "MASIVO GTS",
        "API GTS",
        "CONECTOR PRESTASHOP",
        "CONECTOR MAGENTO",
        "CONECTOR WOOCOMMERCE",
        "CONECTOR SHOPIFY",
        "ARCHIVO PLANO ALERETTI",
      ],

      $q,

      sendMail() {
        // get phase of day
        integracionesStore.payload.fase_del_dia =
          integracionesStore.getPhaseOfDay;

        integracionesStore.payload.empresa =
          integracionesStore.rowAvance.empresa;

        integracionesStore.payload.modalidad_de_integracion = JSON.stringify(
          integracionesStore.payload.modalidad_de_integracion
        )
          .replace(/"/g, "")
          .replace("[", "")
          .replace("]", "");

        // parse lines in json

        // json for send email
        const templateParams = {
          para: integracionesStore.payload.para,
          con_copia_a: integracionesStore.payload.con_copia_a,
          fecha: integracionesStore.payload.fecha,
          id_project: integracionesStore.payload.id_project,
          modalidad_negocio: integracionesStore.payload.modalidad_de_negocio,
          modalidad_integracion:
            integracionesStore.payload.modalidad_de_integracion,
          tipo_de_impresion: integracionesStore.payload.tipo_de_impresion,
          propiedad_de_impresora:
            integracionesStore.payload.propiedad_de_impresora,
          propiedad_pc: integracionesStore.payload.propiedad_pc,
          retorno_documento:
            integracionesStore.payload.devolucion_de_documentos,
          usuarios_capacitados: integracionesStore.payload.usuarios_capacitados,
          fase_del_dia: integracionesStore.payload.fase_del_dia,
          empresa: integracionesStore.payload.empresa,
        };

        // question about send email
        $q.dialog({
          dark: true,
          title: "Enviar correo",
          message: "¿Desea enviar el correo?",
          cancel: "Cancelar",
          persistent: true,
          ok: "Enviar",
        })
          .onOk(() => {
            emailjs
              .send(
                "service_oghzm3i",
                "template_gvdmscx",
                templateParams,
                "8y6vymIBpdZEdKKoL"
              )
              .then(
                function (response) {
                  $q.dialog({
                    dark: true,
                    title: "Correo enviado",
                    message:
                      "El correo se envio correctamente:" +
                      " " +
                      response.status +
                      " " +
                      response.text,
                    ok: "Ok",
                  });

                  console.log("SUCCESS!", response.status, response.text);
                },
                function (error) {
                  console.log("FAILED...", error);
                }
              );
          })
          .onCancel(() => {
            console.log("cancel");
          })
          .onDismiss(() => {
            console.log("I am triggered on both OK and Cancel");
          });

        /* emailjs
          .sendForm(
            "service_oghzm3i",
            "template_gvdmscx",
            {
              fase_del_dia: "dia",
              empresa: "NS2.COM INTERNET S.A.",
              modalidad_de_negocio: "B2C",
              modalidad_de_integracion: "MANUAL",
              id_project: "145",
              fecha: "2023-09-11",
              tipo_de_impresion: "PDF",
              usuarios_capacitados: "SANNCHISS",
              propiedad_de_impresora: "CLIENTE",
              para: "sannchiss@gmail.com",
            },
            "8y6vymIBpdZEdKKoL"
          )
          .then(
            (result) => {
              console.log("SUCCESS!", result.text);
            },
            (error) => {
              console.log("FAILED...", error.text);
            }
          ); */
      },

      erase() {
        // reset form

        integracionesStore.payload.id_project = "";
        integracionesStore.payload.modalidad_de_negocio = "";
        integracionesStore.payload.modalidad_de_integracion = ref([]);
        integracionesStore.payload.tipo_de_impresion = "";
        integracionesStore.payload.propiedad_de_impresora = "";
        integracionesStore.payload.propiedad_pc = "";
        integracionesStore.payload.devolucion_de_documentos = "No";
        integracionesStore.payload.usuarios_capacitados = "";

        //   this.editor = "";
      },
    };
  },

  mounted() {
    // this.$refs.editor.focus();
  },
};
</script>

<style lang="scss">
.card-sheet {
  width: 500px;
  max-width: 500px;
  border-radius: 10px;
  box-shadow: 0 0 17px rgba(0, 0, 0, 0.2);
}
</style>
