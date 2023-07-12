<template>
  <q-page class="flex -flex-center">
    <div v-if="user">
      <div class="text-h6">Bienvenido {{ user.email }}</div>
    </div>
  </q-page>
</template>

<script>
import useAuthUser from "src/composables/UseAuthUser";
export default {
  setup() {
    const { user } = useAuthUser();
    return { user };
  },
};
</script>

<style></style>
