<template>
  <q-layout view="hHh lpR fFf">

    <h1>Logout</h1>

  </q-layout>
</template>

<script>

import { auth } from 'src/firebase/index'

export default {
  name: 'AuthLayout',


  mounted() {
    // this.$q.localStorage.remove('token')
    this.$router.push('/')

    // close session current user google
    auth.signOut().then((res) => {
      // Sign-out successful.
      console.log('Sign-out successful.', res)
    }).catch((error) => {
      // An error happened.
      console.log('An error happened.')
    })


  },



}
</script>

<style></style>
