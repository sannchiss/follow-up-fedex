<template>
  <q-item-section top side>
    <div class="text-grey-8 q-gutter-xs">
      <q-btn
        class="gt-xs"
        size="12px"
        flat
        dense
        round
        icon="delete"
        color="red"
        @click="deleteAdvance(id)"
      />
    </div>
  </q-item-section>
</template>

<script>
import handleAdvanceCompany from "src/composables/HandleAdvanceCompany";
import { useIntegracionesStore } from "src/stores/integraciones/integraciones-store";

const { updateAdvanceCompany, updatePorcentEstado, getListAdvanceCompany } =
  handleAdvanceCompany();

export default {
  props: {
    id: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const integracionesStore = useIntegracionesStore();

    return {
      integracionesStore,
    };
  },

  methods: {
    async deleteAdvance(id) {
      // consult if delete row with dialog

      this.$q
        .dialog({
          dark: true,
          title: "Confirm",
          message: "Are you sure you want to delete this item?",
          ok: {
            push: true,
          },
          cancel: {
            push: true,
            color: "negative",
          },
          persistent: true,
        })
        .onOk(async () => {
          this.integracionesStore.rowAvance.avance.splice(id.key, 1);

          await updateAdvanceCompany(
            this.integracionesStore.rowAvance.avance,
            id.idIntegracion
          ).then(() => {
            this.$q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Avance eliminado correctamente",
            });
          });

          const realEstado =
            this.integracionesStore.maxProgress * 10 == 100
              ? "Finalizado"
              : "En Proceso";

          try {
            await updatePorcentEstado(
              this.integracionesStore.maxProgress * 10,
              realEstado,
              id.idIntegracion
            ).then(() => {
              this.$q.notify({
                color: "green-4",
                textColor: "white",
                icon: "cloud_done",
                message:
                  "Actualizado en BD:" +
                  realEstado +
                  " " +
                  this.integracionesStore.maxProgress * 10 +
                  "%",
              });
            });
          } catch (error) {
            console.log(error);
          }

          try {
            await getListAdvanceCompany().then((res) => {
              this.integracionesStore.rows = res;
              console.log("rows ABC->", this.integracionesStore.rows);
            });
          } catch (error) {
            console.log(error);
          }
        })
        .onCancel(() => {});
      /*   .onDismiss(() => {
          alert("I am triggered on both OK and Cancel");
        }); */
    },
  },
};
</script>

<style></style>
