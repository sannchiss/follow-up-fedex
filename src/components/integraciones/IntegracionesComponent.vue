<template>
  <!--     <integraciones-buscador />

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


    </q-list> -->

  <avance-dialogo />

  <div class="q-mt-lg q-mr-sm">
    <q-table flat bordered title="Integraciones" :rows="integracionesStore.integrations" :columns="columns"
      row-key="company" :filter="filter">

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>


      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'" class="expand-btn" />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="q-pa-md example-row-equal-width">

              <div class="row">
                <div class="col">

                  <q-btn-group push>
                    <q-btn push label="Avance" color="blue" icon="add_circle_outline"
                      @click="integracionesStore.dialogoAvance = true" />
                    <q-btn push label="Ficha" color="blue" icon="visibility" />

                    <q-btn-dropdown split color="orange" push glossy no-caps icon="folder" label="Envío Email"
                      @click="onMainClick">
                      <q-list>
                        <q-item clickable v-close-popup @click="onItemClick">
                          <q-item-section avatar>
                            <q-avatar icon="folder" color="primary" text-color="white" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>Photos</q-item-label>
                            <q-item-label caption>February 22, 2016</q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-icon name="info" color="amber" />
                          </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup @click="onItemClick">
                          <q-item-section avatar>
                            <q-avatar icon="assignment" color="secondary" text-color="white" />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>Vacation</q-item-label>
                            <q-item-label caption>February 22, 2016</q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-icon name="info" color="amber" />
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-btn-dropdown>



                  </q-btn-group>

                </div>
                <div class="col">
                  .col
                </div>
              </div>
            </div>

            <!--             <div class="text-left">This is expand slot for row above: {{ props.row.company }}.</div>
 -->
          </q-td>
        </q-tr>
      </template>

    </q-table>
  </div>
</template>

<script>

import { useIntegracionesStore } from 'src/stores/integraciones/integraciones-store'
import { useQuasar } from 'quasar'
import { ref } from 'vue'



const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nombre Empresa',
    align: 'left',
    field: row => row.company,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'Cuenta GTS', align: 'center', label: 'Cuenta GTS', field: 'account_gts', sortable: true },
  { name: 'Cuenta TXA', label: 'Cuenta TXA', field: 'account_txa', sortable: true },
  { name: 'Estatus', label: 'Estatus', field: 'estatus' },
]

const rows = []




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

    const filter = ref('')




    return {

      columns,
      rows,
      filter,
      integracionesStore,
      openInfo

    }
  },

  data() {
    return {


    }


  },

  mounted() {
    this.integracionesStore.getIntegrations()

    console.log('integracionesStore', this.integracionesStore.getIntegrations)

  },
  components: {

    'avance-dialogo': require('../dialogs/avance-client.vue').default,

    //'integraciones-buscador': require('./integracionesBuscadorComponent.vue').default,

  }


}
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
