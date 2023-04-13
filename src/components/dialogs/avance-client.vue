<template>
  <div class="q-pa-md q-gutter-sm">

    <q-dialog v-model="integracionesStore.dialogoAvance" persistent :maximized="maximizedToggle"
      transition-show="slide-up" transition-hide="slide-down">
      <q-card class="bg-blue-grey-5">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Integracion avance</div>
        </q-card-section>

        <q-card-section class="q-pt-none">

          <div class="row">
            <div class="col">

              <div class="q-pa-md">
                <div class="q-pb-sm">
                  Model: {{ model }}
                </div>

                <q-date v-model="model" range />
              </div>


            </div>
            <div class="col">

              <div class="q-pa-md">
                <q-select filled v-model="modelOptionsIntegration" use-input use-chips multiple input-debounce="0"
                  @new-value="createValue" :options="filterOptions" @filter="filterFn" style="width: 500px" />
              </div>


            </div>
          </div>


        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useIntegracionesStore } from 'src/stores/integraciones/integraciones-store'

const optionsIntegration = [
  'Mail enviado al cliente con el para agendar video llamada',
  'Se agendo video llamada con el cliente',
  'Cliente no contesta llamada',
  'Cliente no contestó video llamada / no se pudo conectar',
  'Cliente integrado, se enviaron las credenciales GTS y la ficha de integración',
  'Cliente integrado por medio de los Web Services',
  'Se activó el servicio de notificaciones E-commerce',
  'Se configuró fichero de carga masiva',
  'Se solicitó el ticket en apoyo para aprobación de usuarios',
  'Se hizo asistencia remota para la instalación de impresora termica',
  'Cliente en proceso de integración por medio de los Web Services',
  'No es integración GTS',
  'Stand by',
  'Cliente por conector Woocommerce',
  'Cliente por conector Shopify',
  'Cliente por conector Magento',
  'Cliente por conector Prestashop',
  'Cliente por conector Bigcommerce',
]

export default {
  setup() {

    const integracionesStore = useIntegracionesStore()

    const filterOptions = ref(optionsIntegration)


    return {
      integracionesStore,
      modelOptionsIntegration: ref([]),
      filterOptions,
      model: ref({ from: '2020/07/08', to: '2020/07/17' }),
      dialog: ref(false),
      maximizedToggle: ref(true),



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
            done(val, 'add-unique')
          }
        }
      },

      filterFn(val, update) {
        update(() => {
          if (val === '') {
            filterOptions.value = optionsIntegration
          }
          else {
            const needle = val.toLowerCase()
            filterOptions.value = optionsIntegration.filter(
              v => v.toLowerCase().indexOf(needle) > -1
            )
          }
        })
      }







    }
  }
}
</script>
