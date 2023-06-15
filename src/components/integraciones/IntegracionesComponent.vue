<template>
  <div class="q-mt-lg q-mr-sm">
    <q-table
      flat
      bordered
      title="Integraciones"
      v-model:pagination="pagination"
      :rows="integracionesStore.integrations"
      :columns="columns"
      row-key="company"
      :filter="filter"
    >
      <template v-slot:top-left>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTableToExcel"
        />
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="accent"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'"
              class="expand-btn"
            />
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
                  <accion-boton-integracion
                    :account_txa="props.row.account_txa"
                    @openInfo="openInfo"
                  />
                </div>
                <div class="col"></div>
              </div>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <avance-dialogo />
    <envio-ficha-dialogo />
  </div>
</template>

<script>
import { useIntegracionesStore } from "src/stores/integraciones/integraciones-store";
import { useQuasar, exportFile } from "quasar";
import { ref } from "vue";

const columns = [
  {
    name: "name",
    required: true,
    label: "Nombre Empresa",
    align: "left",
    field: (row) => row.company,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "Cuenta GTS",
    align: "center",
    label: "Cuenta GTS",
    field: "account_gts",
    sortable: true,
  },
  {
    name: "Cuenta TXA",
    label: "Cuenta TXA",
    field: "account_txa",
    sortable: true,
  },
  { name: "Estatus", label: "Estatus", field: "estatus" },
];

const rows = [];

export default {
  props: {
    account_txa: {
      type: String,
      required: true,
    },
  },

  setup() {
    //declare integracionesStore global

    const integracionesStore = useIntegracionesStore();

    const $q = useQuasar();

    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 2,
      rowsPerPage: 10,
      // rowsNumber: xx if getting data from a server
      // export to excel
      all: "Todas",
    });

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

    function exportTableToExcel() {
      const data = this.integracionesStore.integrations;

      const columns = [
        { label: "Nombre Empresa", value: "company" },
        { label: "Cuenta GTS", value: "account_gts" },
        { label: "Cuenta TXA", value: "account_txa" },
        { label: "Estatus", value: "estatus" },
      ];

      const exportTable = () => {
        exportFile(columns, data, "integraciones", {
          // only for .xlsx
          sheetName: "My custom name",
          documentProperties: {
            title: "My title",
            subject: "My subject",
            // 'Created Date' is available but optional
            createdDate: new Date(2017, 0, 1),
          },
        });
      };

      exportTable();
    }

    return {
      exportTableToExcel,
      pagination,
      columns,
      rows,
      filter,
      integracionesStore,
      openInfo,
    };
  },

  data() {
    return {};
  },

  mounted() {
    this.integracionesStore.getIntegrations();
  },
  components: {
    "accion-boton-integracion":
      require("../shared/accion-boton-integracion.vue").default,
    "avance-dialogo": require("../dialogs/avance-client.vue").default,
    "envio-ficha-dialogo": require("../dialogs/ficha-avance-client.vue")
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
