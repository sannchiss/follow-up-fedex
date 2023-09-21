<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog
      v-model="integracionesStore.dialogoVerFicha"
      transition-show="rotate"
      transition-hide="rotate"
      @hide="(editar = false), (integracionesStore.informacionCliente = '')"
    >
      <q-card>
        <q-card-section>
          <div class="text-h6">INFORMACIÓN EMPRESA</div>
        </q-card-section>

        <div v-if="editar == false">
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
        </div>
        <div v-else style="width: 400px; height: fit-content; max-width: 518px">
          <q-input
            rows="20"
            autofocus
            type="textarea"
            v-model="integracionesStore.informacionCliente"
            filled
            label="Pega la Información"
          />
        </div>

        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
          <q-btn
            flat
            :label="editar == false ? 'Editar' : 'Guardar'"
            color="secondary"
            @click="
              (editar = !editar), editar == false ? updateInfoCompany() : ''
            "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useIntegracionesStore } from "src/stores/integraciones/integraciones-store";
import handleAdvanceCompany from "src/composables/HandleAdvanceCompany";

const { getListAdvanceCompany, updateInfoCompany } = handleAdvanceCompany();

export default {
  data() {
    return {
      editar: false,
      infoEdit: "",
    };
  },

  setup() {
    const integracionesStore = useIntegracionesStore();

    function getInfoCompany() {
      // add json info to info

      const contenido = {};

      integracionesStore.rowAvance.informacion.forEach((element) => {
        contenido[element.col_ficha1] = element.col_ficha2;
        console.log("este es el contenido", element);
      });

      // convert array to json
      const contenido2 = JSON.stringify(contenido);

      // convert contenido2 to string

      const contenido3 = JSON.parse(contenido2);

      return contenido2;
    }

    return {
      integracionesStore,
      getInfoCompany,
    };
  },

  methods: {
    async updateInfoCompany() {
      // if informacionCliente is not empty
      if (this.integracionesStore.informacionCliente != "") {
        const infoEdit = this.integracionesStore.separateTextarea;

        // add infoEdit to info
        const editInfo = await updateInfoCompany(
          this.integracionesStore.rowAvance.id,
          infoEdit
        ).then(() => {
          this.$q.notify({
            message: "Información actualizada",
            color: "positive",
            position: "top",
            timeout: 2000,
          });

          this.integracionesStore.rowAvance.informacion = infoEdit;
        });
      } else {
        this.$q.notify({
          message: "Complete el campo",
          color: "negative",
          position: "top",
          timeout: 2000,
        });

        this.editar = true;

        return;
      }

      console.log(this.integracionesStore.rowAvance.id);
    },

    mounted() {
      // add json info to info
    },
  },
};
</script>

<style></style>
