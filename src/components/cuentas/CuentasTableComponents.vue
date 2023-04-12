<template>
  <div v-if="cuentasStore.progress != 0">
    {{ cuentasStore.progress + '%' + 'DB' }}
  </div>

  <DialogInfoClient />


  <div class="q-mt-md">

  </div>
  <div class="q-pa-sm">
    <q-table v-model:selected="selected" dense :pagination="initialPagination" virtual-scroll flat
      :virtual-scroll-sticky-size-start="48" :columns="columns" :filter="filter" :grid="$q.screen.xs"
      :loading="cuentasStore.loading" :rows="cuentasStore.listado" row-key="cuentaTxa" selection="single"
      title="Tabla de cuentas" bordered>

      <template v-slot:body-selection="scope">
        <q-toggle v-model="scope.selected" @update:model-value="accountCopy" icon="content_copy" />

        <q-btn v-model="scope.selected" rounded dense color="primary" size="xs" icon="recent_actors"
          @click="onRowClick(scope.row)" />


      </template>

      <template v-slot:body-cell="props">
        <q-td :props="props">
          <q-badge color="white" text-color="black" :label="props.value" />
        </q-td>
      </template>

      <template v-slot:top-right>

        <q-input bottom-slots v-model="filter" label="Shearch">

          <template v-slot:append>
            <q-icon v-if="filter !== ''" name="close" @click="filter = ''" class="cursor-pointer" />
            <q-icon name="search" />
          </template>
        </q-input>

      </template>
    </q-table>
  </div>
</template>

<script>
import {
  ref
} from 'vue'
import {
  useCuentasStore
} from 'src/stores/cuentas/cuentas-store'
import Localbase from 'localbase'
import {
  Notify
} from 'quasar'

let dblocal = new Localbase("db");

const columns = [{
  name: 'name',
  required: true,
  label: 'Nombre Empresa',
  align: 'left',
  field: row => row.name,
  format: val => `${val}`,
  sortable: true,
  style: 'width: 100px',
  color: 'primary'


},
{
  name: 'Cuenta GTS',
  align: 'center',
  label: 'Cuenta GTS',
  field: 'cuentaGts',
  sortable: true
},
{
  name: 'Cuenta TXA',
  align: 'center',
  label: 'Cuenta TXA',
  field: 'cuentaTxa',
  sortable: true
},
{
  name: 'RUT',
  label: 'Rut',
  field: 'rut',
  sortable: true
},
]

const rows = []

export default {
  setup() {

    const cuentasStore = useCuentasStore()


    return {

      onRowClick: (row) => {
        cuentasStore.showDialogInfo = true
        cuentasStore.infoClient = row
        // alert(`${row.rut} clicked`)

      },


      initialPagination: {
        title: 'Cuentas',
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 10
      },

      cuentasStore,
      selected: ref([]),
      filter: ref(''),
      columns,
      rows

    }
  },

  methods: {

    accountCopy() {
      // copy data selected name and cuentaGts
      navigator.clipboard.writeText(this.selected.map(({
        name,
        cuentaGts,
        cuentaTxa
      }) => `Empresa: ${name} Cuenta GTS: ${cuentaGts} Cuenta TXA: ${cuentaTxa}`).join('\n')).then(() => {
        console.log('Copied to clipboard')

        console.log(this.selected[0].name)
        // if copy data to clipboard show notification

        // show notify if data selected
        if (this.selected.length > 0) {
          Notify.create({
            message: 'Copied ' + this.selected[0].name + '' + this.selected[0].cuentaGts + '' + this.selected[0].cuentaTxa + ' to clipboard',
            color: 'positive',
            position: 'top'
          })
        } else {
          Notify.create({
            message: 'No data selected',
            color: 'negative',
            position: 'top'
          })
        }



      }, () => {
        console.log('Failed to copy to clipboard')
      })

    },

    copyInfo() {

      // copy data selected name and cuentaGts
      navigator.clipboard.writeText(this.selected.map(({
        name,
        cuentaGts,
        cuentaTxa
      }) => `Empresa: ${name} Cuenta GTS: ${cuentaGts} Cuenta TXA: ${cuentaTxa}`).join('\n')).then(() => {
        console.log('Copied to clipboard')

        // if copy data to clipboard show notification

        if (this.selected.length > 0) {
          Notify.create({
            message: 'Copied to clipboard',
            color: 'positive',
            position: 'top'
          })
        } else {
          Notify.create({
            message: 'No data selected',
            color: 'negative',
            position: 'top'
          })
        }

      }, () => {
        console.log('Failed to copy to clipboard')
      })

    },


  },

  mounted() {

    this.cuentasStore.listado = []

    dblocal.collection('cuentas').get().then(cuentas => {
      this.cuentasStore.listado = cuentas
    })
  },

  components: {

    'DialogInfoClient': require('src/components/dialogs/info-client.vue').default


  }



}
</script>
