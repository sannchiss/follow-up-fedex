<template>
  <q-dialog v-model="integracionesStore.dialogoAvance" full-width>
    <q-card>
      <q-card-section style="background-color: rgb(31, 111, 185)">
        <div class="text-h6 text-white">
          Integracion avance:
          {{
            this.integracionesStore.rowAvance.cuentaTxa +
            " Empresa: " +
            this.integracionesStore.rowAvance.empresa
          }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pt-none scroll" style="max-height: 70vh">
        <div class="row">
          <div class="col-12 col-md-3">
            <div class="q-pa-md">
              <q-date v-model="model" range />
            </div>
          </div>
          <div class="col-12 col-md-auto">
            <div class="q-pa-md">
              <div class="row">
                <div class="col">
                  <q-select
                    filled
                    v-model="modelOptionsIntegration"
                    use-input
                    use-chips
                    multiple
                    input-debounce="0"
                    @new-value="createValue"
                    :options="filterOptions"
                    @filter="filterFn"
                    style="width: 500px"
                    label="actividades"
                  >
                    <template v-slot:after>
                      <q-btn
                        round
                        dense
                        flat
                        icon="send"
                        @click="comentario()"
                      />
                    </template>
                  </q-select>
                </div>
              </div>
            </div>

            <div class="q-pa-md" style="width: 500px">
              <div class="column" style="height: 450px">
                <div class="col">
                  <q-input
                    v-model="comentarios"
                    filled
                    type="textarea"
                    label="comentarios"
                    clearable
                  />
                </div>
                <div class="col flex flex-center">
                  <q-badge color="secondary">
                    Avance: {{ integracionesStore.maxProgress * 10 }} %
                  </q-badge>

                  <q-slider
                    v-model="integracionesStore.maxProgress"
                    color="deep-orange"
                    markers
                    :marker-labels="fnMarkerLabel"
                    :min="0"
                    :max="10"
                  />
                </div>
                <div class="col flex flex-center">
                  <q-btn
                    color="white"
                    text-color="black"
                    label="Guardar"
                    icon="save"
                    @click="agregarAvance()"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator vertical inset />

          <div class="col-12 col-md-4">
            <historial-integracion
              :listaAvance="this.integracionesStore.rowAvance"
            />
          </div>
        </div>
      </q-card-section>

      <q-separator />
      <q-card-actions align="right" class="bg-primary">
        <q-btn
          flat
          label="Decline"
          class="bg-red"
          color="white"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { useIntegracionesStore } from "src/stores/integraciones/integraciones-store";

const optionsIntegration = [
  "Mail enviado al cliente con el para agendar video llamada",
  "Se agendo video llamada con el cliente",
  "Cliente no contesta llamada",
  "Cliente no contestó video llamada / no se pudo conectar",
  "Cliente integrado, se enviaron las credenciales GTS y la ficha de integración",
  "Cliente integrado por medio de los Web Services",
  "Se activó el servicio de notificaciones E-commerce",
  "Se configuró fichero de carga masiva",
  "Se solicitó el ticket en apoyo para aprobación de usuarios",
  "Se hizo asistencia remota para la instalación de impresora termica",
  "Cliente en proceso de integración por medio de los Web Services",
  "No es integración GTS",
  "Stand by",
  "Cliente por conector Woocommerce",
  "Cliente por conector Shopify",
  "Cliente por conector Magento",
  "Cliente por conector Prestashop",
  "Cliente por conector Bigcommerce",
];

export default {
  props: {
    row: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const integracionesStore = useIntegracionesStore();

    const filterOptions = ref(optionsIntegration);

    // get date of today now

    var today = new Date();

    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = today.getFullYear();

    today = yyyy + "/" + mm + "/" + dd;

    // sumar 1 dia a la fecha de hoy

    var endDay = new Date(today);
    endDay.setDate(endDay.getDate() + 5);

    const dd2 = String(endDay.getDate()).padStart(2, "0");
    const mm2 = String(endDay.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy2 = endDay.getFullYear();

    endDay = yyyy2 + "/" + mm2 + "/" + dd2;

    return {
      integracionesStore,
      modelOptionsIntegration: ref([]),
      filterOptions,
      model: ref({ from: today, to: endDay }),
      dialog: ref(false),
      comentarios: ref(""),
      fnMarkerLabel: (val) => `${10 * val}%`,

      createValue(val, done) {
        // Calling done(var) when new-value-mode is not set or "add", or done(var, "add") adds "var" content to the model
        // and it resets the input textbox to empty string
        // ----
        // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
        // only if is not already set
        // and it resets the input textbox to empty string
        // ----
        // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
        // (adds to model if not already in the model, removes from model if already has it)
        // and it resets the input textbox to empty string
        // ----
        // If "var" content is undefined/null, then it doesn't tampers with the model
        // and only resets the input textbox to empty string

        if (val.length > 2) {
          if (!optionsIntegration.includes(val)) {
            done(val, "add-unique");
          }
        }
      },

      filterFn(val, update) {
        update(() => {
          if (val === "") {
            filterOptions.value = optionsIntegration;
          } else {
            const needle = val.toLowerCase();
            filterOptions.value = optionsIntegration.filter(
              (v) => v.toLowerCase().indexOf(needle) > -1
            );
          }
        });
      },

      comentario() {
        // add to comentarios from modelOptionsIntegration
        this.comentarios = this.modelOptionsIntegration.join(", ");
      },
    };
  },

  methods: {
    agregarAvance() {
      const payload = {
        cuentaTxa: this.integracionesStore.cuentaTxa,
        dates: this.model,
        comment: this.comentarios,
        progress: this.progress,
      };

      this.integracionesStore.addAdvanceIntegration(payload);
    },
  },

  components: {
    "historial-integracion": require("./historial-integracion-client.vue")
      .default,
  },
};
</script>
