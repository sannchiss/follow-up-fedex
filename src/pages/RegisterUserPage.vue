<template>
  <q-page padding>
    <q-form class="row justify-center">
      <q-card class="col-12 col-sm-6 col-md-4">
        <q-card-title class="text-h6 text-blue">Register</q-card-title>
        <q-card-section>
          <q-form class="q-gutter-md" @submit.prevent="handleRegister">
            <q-input
              v-model="form.nombre"
              label="Nombre"
              filled
              type="text"
              lazy-rules
              :rules="[(val) => !!val || 'Please enter nombre']"
            />
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
            <div class="q-pt-lg q-gutter-y-sm">
              <q-btn
                class="full-width"
                color="primary"
                outline
                rounded
                size="md"
                label="Register"
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
  </q-page>
</template>

<script>
import { ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";

export default {
  name: "RegisterUserPage",
  setup() {
    const router = useRouter();

    const { register } = useAuthUser();

    const form = ref({
      nombre: "",
      email: "",
      password: "",
    });

    const handleRegister = async () => {
      try {
        await register(form.value);
        router.push({
          name: "email-confirmation",
          query: { email: form.value.email },
        });
      } catch (error) {
        alert(error.message);
        console.log(error);
      }
    };

    return {
      form,
      handleRegister,
    };
  },
};
</script>

<style></style>
