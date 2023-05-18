<template>
  <q-item>
    <q-item-section>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn class="gt-xs" flat dense round v-for="(item, i) in botons" :key="i" :icon="item.icon"
          @click="handlerClick(i, account_txa)" />

        <q-btn-dropdown split no-caps icon="send">
          <q-list>
            <q-item clickable v-close-popup v-for="(item, i) in opcEmail" :key="i"
              @click="handlerClickMail(i, account_txa)">
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>{{ item.label }}</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </q-item-section>
  </q-item>




  <div v-for="(item, i) in botons" :key="i">

    {{ item.opcEmail }}

  </div>
</template>

<script>

import { useIntegracionesStore } from 'src/stores/integraciones/integraciones-store'




export default {

  props: {
    account_txa: {
      type: String,
      required: true
    }
  },

  setup() {
    const integracionesStore = useIntegracionesStore()


    const botons = [
      {
        label: 'Avance',
        icon: 'add_circle_outline',
        click: () => {
          integracionesStore.dialogoAvance = true



        }
      },
      {
        label: 'Ficha',
        icon: 'visibility',
        click: () => {
          //integracionesStore.dialogoFichaCliente = true

        }
      }
    ]

    const opcEmail = [
      {
        label: 'Ficha cliente',
        icon: 'add_circle_outline',
        click: () => {
          console.log('click')
          integracionesStore.dialogoFichaCliente = true
        }
      },
      {
        label: 'Ficha',
        icon: 'visibility',
        click: () => {
          // integracionesStore.dialogoAvance = true
        }
      }
    ]

    return {
      botons,
      opcEmail,
      integracionesStore,

      /* onItemClick,
      onMainClick */
    }
  },

  methods: {
    handlerClick(index, account_txa) {
      // send variables to dialog
      this.integracionesStore.account_txa = account_txa
      this.botons[index].click()

    },

    handlerClickMail(index, account_txa) {
      // send variables to dialog
      this.integracionesStore.account_txa = account_txa
      this.opcEmail[index].click()

    }
  },

  components: {
  }

}
</script>

<style></style>
