<template>
  <q-form class="row justify-center">
    <q-card class="col-12 col-sm-6 col-md-4">
      <q-card-title class="text-h6 text-blue">Confirm Password</q-card-title>
      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="handleResetPassword">
          <q-input
            v-model="form.password"
            label="New Password"
            filled
            type="password"
            lazy-rules
            :rules="[(val) => !!val || 'Please enter password']"
          />
          <q-input
            v-model="form.password1"
            label="Confirm Password"
            filled
            type="password"
            lazy-rules
            :rules="[(val) => !!val || 'Please enter password']"
          />
          <div class="q-pt-lg q-gutter-y-sm">
            <q-btn
              class="full-width"
              color="primary"
              outline
              rounded
              size="md"
              label="Confirm Password"
              type="submit"
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
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    const { resetPassword } = useAuthUser();

    const form = ref({
      password: "",
      password1: "",
    });

    const route = useRoute();
    const router = useRouter();
    const token = route.query.token;

    const handleResetPassword = async () => {
      console.log("Param: ", token);
      const { password, password1 } = form.value;
      if (password !== password1) {
        alert("Passwords do not match");
        return;
      }
      const response = await resetPassword(password);
      if (response.error) {
        alert(response.error.message);
        return;
      }
      router.push({ name: "loginSupa" });
    };

    return {
      form,
      handleResetPassword,
    };
  },
};
</script>

<style></style>
