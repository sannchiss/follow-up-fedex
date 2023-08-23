<template>
  <div class="q-pa-md q-gutter-lg">
    <q-dialog
      v-model="integracionesStore.dialogoAdjunto"
      :position="integracionesStore.position"
    >
      <q-card class="card-sheet" style="background-color: rgb(255, 255, 255)">
        <q-linear-progress
          :color="integracionesStore.completado"
          :value="integracionesStore.progresoPorcentaje"
          :buffer="buffer"
          size="30px"
          stripe
        >
          <div class="absolute-full flex flex-center">
            <q-chip v-if="integracionesStore.progresoPorcentaje > 0">
              {{ Math.round(integracionesStore.progresoPorcentaje * 100) }}%
            </q-chip>
          </div>
        </q-linear-progress>

        <q-card-section class="row items-center no-wrap">
          <div class="q-gutter-sm row items-start">
            <q-file
              filled
              bottom-slots
              v-model="integracionesStore.adjunto"
              label="adjuntar archivo"
              counter
              max-files="12"
              @update:model-value="integracionesStore.factory($event)"
              style="width: 400px; max-width: 300px"
            >
              <template v-slot:before>
                <q-avatar>
                  <img src="icons/favicon-32x32.png" />
                </q-avatar>
              </template>

              <template v-slot:append>
                <q-icon
                  v-if="integracionesStore.adjunto !== null"
                  name="close"
                  @click.stop.prevent="
                    (integracionesStore.adjunto = null), resetear()
                  "
                  class="cursor-pointer"
                />
              </template>

              <template v-slot:hint> */ todo archivo </template>

              <template v-slot:after>
                <q-btn
                  round
                  dense
                  flat
                  icon="save"
                  color="primary"
                  outline
                  @click="integracionesStore.bucketsFiles"
                />
              </template>
            </q-file>

            <!--     <q-uploader
              url="http://localhost:8080/upload"
              :factory="integracionesStore.factory"
              dark
            /> -->
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            style="height: 200px; width: auto; max-width: 550px"
          >
            <q-list bordered separator>
              <div
                class="text-center"
                v-if="integracionesStore.listaArchivos.length == 0"
              >
                <q-badge
                  v-if="integracionesStore.listaArchivos.length == 0"
                  outline
                  color="primary"
                  label="sin archivos"
                />
              </div>

              <q-item
                v-for="(item, index) in integracionesStore.listaArchivos"
                :key="index"
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="insert_drive_file" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ item.name }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <div class="flex flex-center">
                    <q-btn
                      flat
                      dense
                      round
                      icon="visibility"
                      color="primary"
                      @click.prevent="viewFileInNavegator(item)"
                    />
                    <q-btn
                      flat
                      dense
                      round
                      icon="delete"
                      color="negative"
                      @click="
                        async () =>
                          await deleteFileInBucket(
                            integracionesStore.sanitizeEmpresa,
                            item.name
                          )
                      "
                    />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useIntegracionesStore } from "src/stores/integraciones/integraciones-store";

import handleBucketsFile from "src/composables/HandleBucketsFiles";

const { deleteFileInBucket } = handleBucketsFile();

export default {
  props: {
    row: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      doc: null,
      deleteFileInBucket,
    };
  },

  setup() {
    const progress = ref(0.01);
    const buffer = ref(0.01);
    const integracionesStore = useIntegracionesStore();

    return {
      progress,
      buffer,
      integracionesStore,
      //bucketsList,
    };
  },

  methods: {
    fileUploaded(file) {
      console.log(file);
    },
    resetear() {
      this.integracionesStore.progresoPorcentaje = 0;
      this.completado = "accent";
    },

    viewFileInNavegator(item) {
      console.log(item.url.data.signedUrl);

      //  const url = URL.createObjectURL(item.url.data.signedUrl);
      window.open(item.url.data.signedUrl, "_blank");
    },
  },
};
</script>

<style lang="scss">
.card-sheet {
  width: 500px;
  max-width: 500px;
  border-radius: 10px;
  box-shadow: 0 0 17px rgba(0, 0, 0, 0.2);
}
</style>
