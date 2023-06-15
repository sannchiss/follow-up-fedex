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
      />
      <q-badge> {{ item.progress + "%" }} </q-badge>
      <!--       <q-btn size="12px" flat dense round icon="more_vert" />
 -->
    </div>
  </q-item-section>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  setup() {
    return {};
  },
};
</script>

<style></style>
