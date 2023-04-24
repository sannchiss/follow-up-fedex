<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-list bordered padding>
      <q-item>
        <q-item-section>
          <q-item-label overline>OVERLINE</q-item-label>
          <q-item-label>Single line item</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
            elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Lista avance</q-item-label>

      <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" style="height: 300px; max-width: 400px;">

        <div v-if="integracionesStore.spinnerComment" class="absolute-center">
          <q-spinner-comment color="secondary" size="5em" />
        </div>

        <q-item v-for="item in integracionesStore.ordenarPorProgreso" :key="item.id">
          <q-item-section top avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.dates.from + " / " + item.dates.to }}</q-item-label>
            <q-item-label caption>{{ item.comment }}</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-badge> {{ item.progress + "%" }} </q-badge>
          </q-item-section>

        </q-item>

      </q-scroll-area>

      <q-separator spaced inset="item" />

    </q-list>
  </div>
</template>

<script>
import { useIntegracionesStore } from 'src/stores/integraciones/integraciones-store'

export default {

  setup() {

    const integracionesStore = useIntegracionesStore()

    return {
      integracionesStore,

      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      },

      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0.2
      }
    }
  },


  beforeCreate() {

    this.integracionesStore.getHistoryIntegrations()


  }


}
</script>

<style></style>
