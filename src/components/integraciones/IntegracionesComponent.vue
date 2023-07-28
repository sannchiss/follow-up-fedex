<template>
  <div class="q-pa-md" style="width: auto">
    <q-tabs
      v-model="tab"
      dense
      class="bg-grey-2 text-grey-7"
      active-color="primary"
      indicator-color="purple"
      align="justify"
    >
      <q-tab name="integracion_gts" label="Integraciones GTS Online" />
      <q-tab
        name="integraciones_conectores_ecommerce"
        label="Integraciones Conectores Ecommerce"
      />
    </q-tabs>
    <div class="q-pt-md row items-center">
      <div class="col">
        <buscador-integracion />
      </div>

      <div class="col">
        <div class="text-h6">
          Total:
          <q-badge align="middle" class="text-h6">{{
            integraciones.length
          }}</q-badge>
        </div>
      </div>
    </div>

    <q-tab-panels v-model="tab" animated class="bg-white-grey-5 text-black">
      <q-tab-panel name="integracion_gts">
        <!--inicio contenido tab integraciones GTS-->
        <!--add q-list-->
        <q-list bordered separator style="width: auto">
          <q-item v-for="row in integraciones" :key="row.empresa">
            <q-item-section avatar>
              <q-icon color="primary" name="business" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ row.empresa }}</q-item-label>
              <q-item-label caption>{{ row.cuentaTxa }}</q-item-label>
            </q-item-section>

            <q-separator vertical />

            <q-item-section side>
              <span
                class="text-grey-8"
                v-if="row.estado_integracion == 'Pendiente'"
              >
                <q-badge outline color="negative">
                  {{ row.estado_integracion }}
                </q-badge>
              </span>
              <span
                class="text-grey-8"
                v-else-if="row.estado_integracion == 'En Proceso'"
              >
                <q-badge outline color="warning">
                  {{ row.estado_integracion }}
                </q-badge>
              </span>
              <span
                class="text-grey-8"
                v-else-if="row.estado_integracion == 'Finalizado'"
              >
                <q-badge outline color="green">
                  {{ row.estado_integracion }}
                </q-badge>
              </span>

              <span
                class="text-grey-8"
                v-else-if="row.estado_integracion == 'Cancelada'"
              >
                <q-badge outline color="red">
                  {{ row.estado_integracion }}
                </q-badge>
              </span>

              <q-item-section side>
                <span>
                  <q-badge outline color="primary">
                    {{ row.modalidad_negocio }}
                  </q-badge>
                </span>
              </q-item-section>
            </q-item-section>

            <q-item-section side>
              <span>
                <q-badge outline color="primary">
                  {{ row.modalidad_integracion }}
                </q-badge>
              </span>
            </q-item-section>

            <q-item-section side>
              <q-circular-progress
                show-value
                font-size="12px"
                :value="row.porcentaje_integracion"
                size="50px"
                :thickness="0.22"
                color="teal"
                track-color="grey-3"
                class="q-ma-md"
              >
                {{ row.porcentaje_integracion }}%
              </q-circular-progress>
            </q-item-section>

            <q-item-section side>
              <div class="q-pa-md row items-start q-gutter-md">
                <q-expansion-item
                  class="shadow-1 overflow-hidden"
                  style="border-radius: 20px; width: 300px"
                  icon="explore"
                  label="Resumen"
                  header-class="bg-primary text-white"
                  expand-icon-class="text-white"
                  @before-show="getAvanceActual(row)"
                >
                  <q-card>
                    <q-card-section>
                      <q-card class="act-comentario bg-grey-2">
                        <q-card-section>
                          {{ row.avance[0].comentarios }}
                        </q-card-section>
                        <q-separator inset="" />
                        <q-card-section class="text-caption">
                          {{
                            row.avance[0].fecha.from +
                            " al " +
                            row.avance[0].fecha.to
                          }}
                        </q-card-section>
                      </q-card>
                    </q-card-section>
                    <q-card-actions align="left">
                      <q-btn
                        flat
                        round
                        color="red"
                        icon="add_task"
                        @click="avance(row)"
                      />

                      <acciones-avance :row="row" />

                      <acciones-mail />

                      <q-btn
                        flat
                        round
                        dense
                        icon="delete"
                        color="negative"
                        @click="remove(row.id)"
                      />

                      <q-btn
                        flat
                        round
                        dense
                        icon="info"
                        color="primary"
                        @click="info(row)"
                      />
                    </q-card-actions>
                  </q-card>
                </q-expansion-item>
              </div>
            </q-item-section>
          </q-item>

          <q-separator />
        </q-list>

        <avance-dialogo />
        <info-ficha />
        <envio-ficha-dialogo />

        <!--fin de contenido de integraciones GTS-->
      </q-tab-panel>

      <q-tab-panel name="integraciones_conectores_ecommerce">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { useIntegracionesStore } from "src/stores/integraciones/integraciones-store";
import { useQuasar, exportFile } from "quasar";
import { ref } from "vue";

import handleAdvanceCompany from "src/composables/HandleAdvanceCompany";

const { getListAdvanceCompany, deleteCompany } = handleAdvanceCompany();

export default {
  data() {
    const rows = [];
    return {
      rows,
    };
  },

  props: {
    cuentaTxa: {
      type: String,
      required: true,
    },
  },

  setup() {
    //declare integracionesStore global

    const integracionesStore = useIntegracionesStore();

    const $q = useQuasar();

    function openInfo(account_txa) {
      const data = this.integracionesStore.getFichaCliente(account_txa);

      // loop promise
      data.then((res) => {
        console.log("openInfo", res[0]);

        $q.dialog({
          title: "Integración",
          message: res[0].info_client,
          persistent: true,
        });
      });
    }

    const filter = ref("");

    return {
      integracionesStore,
      openInfo,
      tab: ref("integracion_gts"),
    };
  },

  methods: {
    async getListAdvance() {
      const data = await getListAdvanceCompany();
      return data;
    },

    avance(row) {
      // order row.avance.porcentaje_avance descendent
      row.avance.sort((a, b) => {
        return b.porcentaje_avance - a.porcentaje_avance;
      });

      this.integracionesStore.rowAvance = row;

      this.integracionesStore.dialogoAvance = true;
    },

    // tomo el avance actual y lo muestro en la caja resumen de integraciones
    getAvanceActual(row) {
      // order row.avance.porcentaje_avance descendent
      //alert("getAvance");
      row.avance.sort((a, b) => {
        return b.porcentaje_avance - a.porcentaje_avance;
      });
    },

    remove(id) {
      this.$q
        .dialog({
          dark: true,
          title: "Acción requerida",
          message: "ingrese código de seguridad",
          prompt: {
            model: "int5445",
            type: "password", // optional
          },
          cancel: true,
          persistent: true,
        })
        .onOk(async (data) => {
          if (data !== process.env.VALIDATE_CODE) {
            this.$q.notify({
              color: "negative",
              message: "Código de seguridad incorrecto",
              icon: "report_problem",
            });
            return;
          } else {
            this.$q.notify({
              color: "positive",
              message: "Código de seguridad correcto",
              icon: "check_circle",
            });

            // Elimino company en la BD Sopabase
            await deleteCompany(id)
              .then((res) => {
                console.log("res", res);
                this.$q.notify({
                  color: "positive",
                  message: "Empresa eliminada correctamente",
                  icon: "check_circle",
                });
              })
              .catch((err) => {
                console.log("err", err);
                this.$q.notify({
                  color: "negative",
                  message: "Error al eliminar empresa",
                  icon: "report_problem",
                });
              });
            /**************************** */

            // delete row in integraciones
            this.integraciones.splice(
              this.integraciones.findIndex((v) => v.id === id),
              1
            );
          }
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },

    info(row) {
      /// this.integracionesStore.rowInfo = row;
      this.integracionesStore.rowAvance = row;
      this.integracionesStore.dialogoVerFicha = true;
    },
  },

  mounted() {
    this.getListAdvance().then((res) => {
      this.integracionesStore.rows = res;
      //this.integracionesStore.setIntegrations(res);
    });
  },

  computed: {
    integraciones: {
      get() {
        return this.integracionesStore.getItemIntegracion;
      },
    },
  },

  components: {
    /* "accion-boton-integracion":
      require("../shared/accion-boton-integracion.vue").default, */
    "acciones-avance": require("../dialogs/avance-client.vue").default,
    "envio-ficha-dialogo": require("../dialogs/ficha-avance-client.vue")
      .default,
    "info-ficha": require("../dialogs/ver-ficha-cliente.vue").default,
    "buscador-integracion": require("../shared/buscador-integracion.vue")
      .default,

    "acciones-mail": require("../shared/acciones-mail-integraciones.vue")
      .default,
  },
};
</script>

<style lang="scss">
.expand-btn {
  margin-right: 50px;
  // add efect to button
  transition: all 0.3s ease-in-out;
  transform: rotate(0deg);

  &.q-btn--flat {
    background-color: transparent;
  }
}

.act-comentario {
  width: auto;
  max-width: 350px;
}
</style>
