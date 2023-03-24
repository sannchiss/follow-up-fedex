<template>
  <div v-if="cuentasStore.progress != 0">
    {{ cuentasStore.progress + '%' }}
  </div>

  <div class="q-mt-md">
    Selected: {{ JSON.stringify(selected) }}
  </div>
  <div class="q-pa-sm">
    <q-table v-model:selected="selected" virtual-scroll flat :virtual-scroll-sticky-size-start="48" :columns="columns"
      :filter="filter" :grid="$q.screen.xs" :loading="cuentasStore.loading" :rows="cuentasStore.listado" row-key="name"
      selection="multiple" title="Tabla de cuentas" bordered>

      <template v-slot:header-selection="scope">
        <q-toggle v-model="scope.selected" @update:model-value="accountCopy" icon="content_copy" />

      </template>

      <template v-slot:body-selection="scope">
        <q-toggle v-model="scope.selected" @update:model-value="accountCopy" icon="content_copy" />

        <!--boton check para copiar-->
        <q-btn v-model="scope.selected" rounded dense color="primary" size="xs" icon="check" @click="copyInfo()" />


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

    addInfo() {

      // add data selected to dblocal

      if (this.selected.length > 0) {
        this.selected.forEach(({
          name,
          cuentaGts,
          cuentaTxa
        }) => {
          dblocal.collection('cuentas').add({
            name,
            cuentaGts,
            cuentaTxa
          })
        })

        Notify.create({
          message: 'Data added to dblocal',
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
    }

  },

  mounted() {

    this.cuentasStore.listado = []

    dblocal.collection('cuentas').get().then(cuentas => {
      this.cuentasStore.listado = cuentas
    })
  }

}
</script>
