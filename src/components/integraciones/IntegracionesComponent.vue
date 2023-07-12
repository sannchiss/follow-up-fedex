<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 1024px">
      <q-card>
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

        <q-tab-panels v-model="tab" animated class="bg-white-grey-5 text-black">
          <q-tab-panel name="integracion_gts">
            <!--inicio contenido tab integraciones GTS-->
            <div class="row">
              <buscador-integracion />
            </div>
            <div class="q-mt-lg q-mr-sm">
              <!--add q-list-->
              <q-list bordered separator>
                <q-item v-for="row in integraciones" :key="row.empresa">
                  <q-item-section avatar>
                    <q-icon color="primary" name="business" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ row.empresa }}</q-item-label>
                    <q-item-label caption>{{ row.cuentaTxa }}</q-item-label>
                  </q-item-section>

                  <q-item-section center>
                    <div class="q-pa-md" style="max-width: 350px">
                      <q-expansion-item
                        class="shadow-1 overflow-hidden"
                        style="border-radius: 30px"
                        icon="explore"
                        label="Resumen"
                        header-class="bg-primary text-white"
                        expand-icon-class="text-white"
                      >
                        <q-card>
                          <q-card-section>
                            <div
                              v-for="content in row.avance"
                              :key="content.id"
                            >
                              {{ content.comentarios }}
                              {{ content.porcentaje_avance }}
                            </div>
                          </q-card-section>
                          <q-card-actions align="right">
                            <q-btn
                              flat
                              round
                              color="red"
                              icon="add_task"
                              @click="avance(row)"
                            />
                            <acciones-avance :row="row" />

                            <acciones-mail />
                            <q-btn flat round color="primary" icon="share" />
                          </q-card-actions>
                        </q-card>
                      </q-expansion-item>
                    </div>
                  </q-item-section>

                  <q-item-section side>
                    <div class="text-grey-8 q-gutter-xs">
                      <q-btn
                        flat
                        round
                        dense
                        icon="edit"
                        @click="edit(row)"
                        class="q-mr-sm"
                      />
                      <q-btn
                        flat
                        round
                        dense
                        icon="delete"
                        @click="remove(row)"
                        class="q-mr-sm"
                      />
                    </div>
                  </q-item-section>
                </q-item>

                <q-separator spaced />
              </q-list>

              <avance-dialogo />
              <envio-ficha-dialogo />
            </div>

            <!--fin de contenido de integraciones GTS-->
          </q-tab-panel>

          <q-tab-panel name="integraciones_conectores_ecommerce">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import { useIntegracionesStore } from "src/stores/integraciones/integraciones-store";
import { useQuasar, exportFile } from "quasar";
import { ref } from "vue";

import handleAdvanceCompany from "src/composables/HandleAdvanceCompany";

const { getListAdvanceCompany } = handleAdvanceCompany();

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
      console.log("row", row);

      //send param row to dialog
      this.integracionesStore.rowAvance = row;

      this.integracionesStore.dialogoAvance = true;
    },
  },

  mounted() {
    ///this.integracionesStore.getIntegrations();

    this.getListAdvance().then((res) => {
      this.integracionesStore.rows = res;

      console.log("res", this.rows);

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
</style>
