<template>
  <q-form class="row justify-center">
    <q-card class="col-12 col-sm-6 col-md-4">
      <q-card-title class="text-h6 text-blue">Register</q-card-title>
      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="handlePasswordReset">
          <q-input
            v-model="form.email"
            standout
            prefix="Email:"
            autofocus
            filled
            type="email"
            lazy-rules
            :rules="[(val) => !!val || 'Please enter email']"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
          <div class="q-pt-lg q-gutter-y-sm">
            <q-btn
              class="full-width"
              color="primary"
              outline
              rounded
              size="md"
              label="Send reset email"
              type="submit"
            />

            <q-btn
              class="full-width"
              color="dark"
              rounded
              flat
              label="Back"
              :to="{ name: 'loginSupa' }"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-form>
</template>

<script>
import { ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
export default {
  setup() {
    const form = ref({
      email: "",
    });

    const { sendPasswordResetEmail } = useAuthUser();

    const handlePasswordReset = async () => {
      await sendPasswordResetEmail(form.value.email);
      alert(`Password reset email sent to: ${form.value.email}`);
    };

    return {
      form,
      handlePasswordReset,
    };
  },
};
</script>

<style></style>
