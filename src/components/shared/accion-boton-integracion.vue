<template>
  <div class="q-pa-md example-row-equal-width">

    <div class="row">
      <div class="col">

        <q-item>
          <q-item-section>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn class="gt-xs" flat dense round v-for="(item, i) in botons" :key="i" :icon="item.icon"
                @click="handlerClick(i, account_txa)" />

              <q-btn-dropdown split push glossy no-caps icon="send" @click="onMainClick">
                <q-list>
                  <q-item clickable v-close-popup v-for="(item, i) in opcEmail" :key="i" @click="onItemClick">
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


      </div>
      <div class="col">
        ....
      </div>
    </div>
  </div>

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
          // integracionesStore.dialogoAvance = true
        }
      }
    ]

    const opcEmail = [
      {
        label: 'Ficha Avance',
        icon: 'add_circle_outline',
        click: () => {
          integracionesStore.dialogoAvance = true
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

    }
  },

  components: {
  }

}
</script>

<style></style>
