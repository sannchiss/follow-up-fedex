<template>
  <q-page padding>
    <q-form class="row justify-center">
      <q-card class="col-12 col-sm-6 col-md-4">
        <q-card-section>
          <q-img
            src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg"
            style="width: 100px"
          />
          <q-form class="q-gutter-md" @submit.prevent="handleLogin">
            <q-input
              v-model="form.email"
              label="Email"
              filled
              type="email"
              lazy-rules
              :rules="[(val) => !!val || 'Please enter email']"
            />
            <q-input
              v-model="form.password"
              label="Password"
              filled
              type="password"
              lazy-rules
              :rules="[(val) => !!val || 'Please enter password']"
            />

            <div class="q-mt-md">
              <q-btn
                class="full-width"
                color="primary"
                outline
                rounded
                size="md"
                label="Login"
                type="submit"
              />
            </div>
            <div class="q-mt-md q-gutter-y-md">
              <q-btn
                class="full-width"
                color="primary"
                flat
                label="Register"
                to="/register"
                size="sm"
              />

              <q-btn
                class="full-width"
                color="primary"
                flat
                label="Forgot Password"
                :to="{ name: 'forgot-password' }"
                size="sm"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const { login } = useAuthUser();

    const form = ref({
      email: "sannchiss@gmail.com",
      password: "123456789",
    });

    const handleLogin = async () => {
      try {
        await login(form.value);
        router.push({ name: "me" });
      } catch (error) {
        alert(error.message);
      }
    };

    return {
      form,
      handleLogin,
    };
  },
};
</script>

<style></style>
