<template>
  <div class="q-pa-md q-gutter-md">

    <integraciones-buscador />

    <q-list bordered class="rounded-borders" style="max-width: 600px">
      <q-item-label header>Integraciones FedEx - GTS</q-item-label>

      <q-item v-for="empresa in integracionesStore.integrationsFilter" :key="empresa.id">

        <q-item-section avatar top>
          <q-icon name="account_tree" color="black" size="34px" />
        </q-item-section>

        <q-item-section top class="col-2 gt-sm">
          <q-item-label class="q-mt-sm">{{ empresa.service_type }}</q-item-label>
        </q-item-section>

        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">[{{ empresa.company }}]</span>
            <span class="text-grey-8"> - GitHub repository</span>
          </q-item-label>
          <q-item-label caption lines="1">
            @rstoenescu in #3: > Generic type parameter for props
          </q-item-label>
          <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
            <span class="cursor-pointer" @click="openInfo(empresa.account_txa)">Open info</span>
          </q-item-label>
        </q-item-section>

        <q-item-section top side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
            <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
            <q-btn size="12px" flat dense round icon="more_vert" />
          </div>
        </q-item-section>



      </q-item>

      <q-separator inset />


    </q-list>
  </div>
</template>

<script>

import { useIntegracionesStore } from 'src/stores/integraciones/integraciones-store'
import { useQuasar } from 'quasar'

export default {

  setup() {

    const integracionesStore = useIntegracionesStore()
    const $q = useQuasar()

    function openInfo(account_txa) {

      const data = this.integracionesStore.getFichaCliente(account_txa)

      // loop promise
      data.then((res) => {
        console.log('openInfo', res[0])

        $q.dialog({
          title: 'Integración',
          message: res[0].info_client,
          persistent: true
        })


      })


    }




    return {
      integracionesStore,
      openInfo

    }
  },

  data() {
    return {

      empresas: [{

        nombre: 'Empresa 1',
        ruc: '123456789',
        direccion: 'Av. Siempre Viva 123',
        telefono: '123456789',
        email: 'sannchiss@gmail.com'
      },
      {
        nombre: 'Empresa 2',
        ruc: '123456789',
        direccion: 'Av. Siempre Viva 123',
        telefono: '123456789',
        email: 'sannchisskill@gmail.com'
      }
      ]
    }


  },

  mounted() {
    this.integracionesStore.getIntegrations()
  },
  components: {

    'integraciones-buscador': require('./integracionesBuscadorComponent.vue').default,

  }


}
</script>

<style></style>
