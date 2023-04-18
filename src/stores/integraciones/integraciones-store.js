import { defineStore } from 'pinia';

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  orderBy,
  getDoc
} from "firebase/firestore";
import { dbfirebase, auth } from "src/firebase/index";

export const useIntegracionesStore = defineStore('integraciones', {
  state: () => ({

    integrations: [],
    searchIntegration: '',
    dialogoAvance: false,
    account_txa: '',

  }),

  getters: {
    /*   doubleCount (state) {
        return state.counter * 2
      } */

    integrationsFilter(state) {

      if (this.searchIntegration == '') {
        return state.integrations
      }

      else {

        return state.integrations.filter((integration) => {
          //console.log(integration.company.toLowerCase().includes(this.searchIntegration.toLowerCase()))
          return integration.company.toLowerCase().includes(this.searchIntegration.toLowerCase())
        })

      }

    }


  },

  actions: {

    async getIntegrations() {

      this.integrations = []

      // get data from firebase
      const querySnapshot = await getDocs(collection(dbfirebase, "client_file_gts"));
      querySnapshot.forEach((doc) => {
        //console.log("La data", doc.data());
        this.integrations.push(doc.data());
      });



    },

    async getFichaCliente(id) {

      const data = []

      const q = query(collection(dbfirebase, "client_file_gts"), where("account_txa", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {



        data.push(doc.data())
      }
      )

      return data



    }

  }
})
