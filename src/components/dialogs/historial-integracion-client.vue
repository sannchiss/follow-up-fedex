<template>
  <div class="q-pa-md" style="width: 550px; max-width: 700px">
    <q-list bordered padding>
      <q-item-label header>Lista avance</q-item-label>

      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="height: 500px; width: auto; max-width: 550px"
      >
        <!-- <div v-if="integracionesStore.spinnerComment" class="absolute-center">
          <q-spinner-comment color="secondary" size="5em" />
        </div> -->

        <q-list bordered separator>
          <q-item
            v-for="(item, key) in this.integracionesStore.rowAvance.avance"
            :key="key"
          >
            <q-item-section top avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-caption">
                <q-badge color="orange" text-color="black">
                  {{ item.fecha }}</q-badge
                >
              </q-item-label>
              <q-item-label class="text-overline text-justify">{{
                item.comentarios
              }}</q-item-label>
            </q-item-section>
            <accion-boton-lista-avance
              :id="{
                idIntegracion: integracionesStore.rowAvance.id,
                key: key,
              }"
            />
            <q-item-section side top>
              <q-badge> {{ item.porcentaje_avance + "%" }} </q-badge>
              <q-icon name="star" color="yellow" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-list>
  </div>
</template>

<script>
import { useIntegracionesStore } from "src/stores/integraciones/integraciones-store";

export default {
  props: {
    listaAvance: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const integracionesStore = useIntegracionesStore();

    return {
      integracionesStore,

      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75,
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2,
      },
    };
  },

  beforeCreate() {
    this.integracionesStore.getHistoryIntegrations();
  },

  /*   computed: {
    maxProgress() {
      return Math.max(
        ...this.integracionesStore.rowAdvance.avance.porcentaje_avance
      );
    },
  }, */

  getters: {
    // order ascendent this.integracionesStore.rowAvance.avance by porcentaje_avance
    orderDesc() {
      return this.integracionesStore.rowAvance.avance.sort(
        (a, b) => a.porcentaje_avance - b.porcentaje_avance
      );
    },
  },

  components: {
    "accion-boton-lista-avance":
      require("src/components/shared/accion-boton-lista-avance.vue").default,
  },
};
</script>

<style></style>
