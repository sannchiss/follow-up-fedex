<template>
  <div class="q-pa-lg  fixed-center">

    <q-card class="my-card" flat bordered>
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <!--add image login-->

      <q-card-section>
        <div class="text-h5 q-mt-sm q-mb-xs">LOGIN USER/REGISTER</div>
        <div class="text-caption text-grey">
          Acceso OAUTH
        </div>

        <div class="q-pa-md">
          <div class="q-gutter-y-md column" style="max-width: 600px">
            <q-input filled v-model="email" type="email" suffix="@gmail.com">
              <template v-slot:before>
                <q-icon name="mail" />
              </template>
            </q-input>

            <q-input filled v-model="password" type="password" suffix="password">
              <template v-slot:before>
                <q-icon name="lock" />
              </template>
            </q-input>
          </div>
        </div>



      </q-card-section>

      <q-card-actions>

        <q-btn square color="red" label="Google" @click="signInWithGoogle" />
        <!--         <q-btn square color="primary" label="Login register" @click="register" />
 -->

        <q-space />

        <!--  <q-btn color="grey" round flat dense :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="expanded = !expanded" /> -->
      </q-card-actions>

      <!--     <q-slide-transition>
          <div v-show="expanded">
            <q-separator />
            <q-card-section class="text-subitle2">
              {{ lorem }}
            </q-card-section>
          </div>
        </q-slide-transition> -->
    </q-card>






  </div>
</template>

<script setup>
import auth from '../firebase/index'
import { ref } from 'vue'
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from '@firebase/auth'

import routes from 'src/router/routes'



const email = ref('sannchiss')
const password = ref('16961225')
const errMsg = ref('') // Error Message

/* const register = async () => {
  const auth = getAuth()
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Signed in: ", auth.currentUser)

        // call router here
        router.push({ name: 'home' })

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("Error: ", error.code)

        switch (errorCode) {
          case 'auth/invalid-email':
            errMsg.value = 'Email is not valid'
            break;
          case 'auth/user-disabled':
            errMsg.value = 'User is disabled'
            break;
          case 'auth/user-not-found':
            errMsg.value = 'User not found'
            break;
          case 'auth/wrong-password':
            errMsg.value = 'Wrong password'
            break;
          default:
            errMsg.value = errorMessage
            break;
          case 'auth/too-many-requests':
            errMsg.value = 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later'
            break;
        }

      });



  } catch (error) {
    console.log(error)
  }
} */

// sign With Google
const signInWithGoogle = async () => {

  console.log("signInWithGoogle")

  const auth = getAuth()

  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {

      console.log("signInWithGoogle sannchiss: ", result)

      // go to url
      window.location.href = 'http://localhost:8080/#/home'



      // recorrer las rutas
      /* router.forEach((route) => {
        console.log("route: ", route)
      }) */

      // go children route
      //router.children.push({ name: 'home' })






      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      /* const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error); */
      // ...
    });
}

</script>


<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>

