<template>
  <q-page padding>
    <p class="text-body1">Thanks for registering!</p>
    <p class="text-body1">
      Please confirm your email to complete your registration.
      <strong> {{ $route.query.email }} </strong>
    </p>

    <q-btn
      class="full-width"
      color="primary"
      outline
      rounded
      size="md"
      label="Login"
      to="/"
    />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageEmailConfirmation",
});
</script>
