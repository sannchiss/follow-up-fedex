<template>
  <div v-if="cuentasStore.progress != 0">
    {{ cuentasStore.progress + "%" + "DB" }}
  </div>

  <DialogInfoClient />

  <div class="q-pa-sm">
    <q-table
      v-model:selected="selected"
      dense
      :pagination="initialPagination"
      virtual-scroll
      flat
      :virtual-scroll-sticky-size-start="48"
      :columns="columns"
      :filter="filter"
      :grid="$q.screen.xs"
      :loading="cuentasStore.loading"
      :rows="rows ?? []"
      row-key="cuentaTxa"
      selection="single"
      title="Tabla de cuentas"
      bordered
    >
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span> Well this is sad... {{ message }} </span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
      </template>

      <template v-slot:body-selection="scope">
        <q-toggle
          v-model="scope.selected"
          @update:model-value="accountCopy"
          icon="content_copy"
        />

        <q-btn
          v-model="scope.selected"
          rounded
          dense
          color="primary"
          size="xs"
          icon="recent_actors"
          @click="onRowClick(scope.row)"
        />
      </template>

      <template v-slot:body-cell-empresa="props">
        <q-td :props="props">
          <div>
            <q-badge color="primary" text-color="white" :label="props.value" />
            <!--  <q-badge color="purple" :label="props.value" /> -->
            <q-btn
              round
              color="blue"
              flat
              icon="content_copy"
              @click="copyOne(props.value)"
            />
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-CuentaGTS="props">
        <q-td :props="props">
          <div>
            <q-badge color="primary" text-color="white" :label="props.value" />
            <!--  <q-badge color="purple" :label="props.value" /> -->
            <q-btn
              round
              color="blue"
              flat
              icon="content_copy"
              @click="copyOne(props.value)"
            />
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-CuentaTXA="props">
        <q-td :props="props">
          <div>
            <q-badge color="primary" text-color="white" :label="props.value" />
            <!--  <q-badge color="purple" :label="props.value" /> -->
            <q-btn
              round
              color="blue"
              flat
              icon="content_copy"
              @click="copyOne(props.value)"
            />
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell="props">
        <q-td :props="props">
          <q-badge color="white" text-color="black" :label="props.value" />
        </q-td>
      </template>

      <template v-slot:top-right>
        <q-input bottom-slots v-model="filter" label="Shearch">
          <template v-slot:append>
            <q-icon
              v-if="filter !== ''"
              name="close"
              @click="filter = ''"
              class="cursor-pointer"
            />
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";
import { useCuentasStore } from "src/stores/cuentas/cuentas-store";
import handleAccountCompany from "src/composables/HandleAccountCompany";
import { Notify } from "quasar";

const { getListCompany } = handleAccountCompany();

const columns = [
  {
    name: "empresa",
    label: "Nombre Empresa",
    align: "left",
    field: "empresa",
    format: (val) => `${val}`,
    sortable: true,
    style: "width: 100px",
    color: "primary",
  },
  {
    name: "CuentaGTS",
    align: "center",
    label: "Cuenta GTS",
    field: "cuentaGts",
    sortable: true,
  },
  {
    name: "CuentaTXA",
    align: "center",
    label: "Cuenta TXA",
    field: "cuentaTxa",
    sortable: true,
  },
  {
    name: "RUT",
    label: "Rut",
    field: "rut",
    sortable: true,
  },
  {
    name: "Comuna",
    label: "Comuna",
    field: "comuna",
    sortable: true,
  },
  {
    name: "Direccion",
    label: "Direccion",
    field: "direccion",
    sortable: true,
  },
];

export default {
  data() {
    const rows = [];

    return {
      rows,
    };
  },

  setup() {
    const cuentasStore = useCuentasStore();

    return {
      onRowClick: (row) => {
        cuentasStore.showDialogInfo = true;
        cuentasStore.infoClient = row;
        // alert(`${row.rut} clicked`)
      },

      initialPagination: {
        title: "Cuentas",
        sortBy: "empresa",
        descending: false,
        page: 1,
        rowsPerPage: 20,
      },

      cuentasStore,
      selected: ref([]),
      filter: ref(""),
      columns,
    };
  },

  methods: {
    accountCopy() {
      // copy data selected name and cuentaGts
      navigator.clipboard
        .writeText(
          this.selected
            .map(
              ({ empresa, cuentaGts, cuentaTxa, comuna, direccion }) =>
                // add salto de linea
                `-Empresa:   ${empresa} \n-Cuenta GTS: ${cuentaGts} \n-Cuenta TXA: ${cuentaTxa} \n-Comuna:     ${comuna} \n-Dirección:  ${direccion}`
            )
            .join("\n")
        )
        .then(
          () => {
            console.log("Copied to clipboard");

            console.log(this.selected[0].empresa);
            // if copy data to clipboard show notification

            // show notify if data selected
            if (this.selected.length > 0) {
              Notify.create({
                message:
                  "Copied " +
                  this.selected[0].empresa +
                  "" +
                  this.selected[0].cuentaGts +
                  "" +
                  this.selected[0].cuentaTxa +
                  " to clipboard",
                color: "positive",
                position: "top",
              });
            } else {
              Notify.create({
                message: "No data selected",
                color: "negative",
                position: "top",
              });
            }
          },
          () => {
            console.log("Failed to copy to clipboard");
          }
        );
    },

    copyInfo() {
      // copy data selected name and cuentaGts
      navigator.clipboard
        .writeText(
          this.selected
            .map(
              ({ empresa, cuentaGts, cuentaTxa }) =>
                `Empresa: ${empresa} Cuenta GTS: ${cuentaGts} Cuenta TXA: ${cuentaTxa}`
            )
            .join("\n")
        )
        .then(
          () => {
            console.log("Copied to clipboard");

            // if copy data to clipboard show notification

            if (this.selected.length > 0) {
              Notify.create({
                message: "Copied to clipboard",
                color: "positive",
                position: "top",
              });
            } else {
              Notify.create({
                message: "No data selected",
                color: "negative",
                position: "top",
              });
            }
          },
          () => {
            console.log("Failed to copy to clipboard");
          }
        );
    },

    copyOne(value) {
      console.log(value);

      // copy data selected name and cuentaGts
      navigator.clipboard.writeText(value).then(
        () => {
          Notify.create({
            message: "Copied to clipboard",
            color: "positive",
            position: "top",
          });
        },
        () => {
          console.log("Failed to copy to clipboard");
        }
      );
    },

    async getListado() {
      const list = await getListCompany();
      return list;
    },
  },

  mounted() {
    this.cuentasStore.listado = [];

    // get getListCompany
    this.getListado().then((res) => {
      res.map((item) => {
        //deleteListCompany(item.id)

        // merge list_account to listado
        this.rows.push(...item.list_account);
      });
    });

    // get items localstorage
    this.cuentasStore.listado = localStorage.getItem("cuentas");
    // convert to json
    this.cuentasStore.listado = JSON.parse(this.cuentasStore.listado);
  },

  components: {
    DialogInfoClient: require("src/components/dialogs/info-client.vue").default,
  },
};
</script>
