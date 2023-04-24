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
    historyIntegration: [],
    dialogoAvance: false,
    account_txa: '',
    spinnerComment: true,

  }),

  getters: {
    /*   doubleCount (state) {
        return state.counter * 2
      } */

    // get history of integrations
    getItemIntegracion: (state) => {

      return state.integrations.filter((integration) => {
        return integration.account_txa == state.account_txa
      })

    },


    ordenarPorProgreso: (state) => {

      if (state.historyIntegration.length == 0) {
        return state.historyIntegration
      }
      else {


        return state.historyIntegration.sort((a, b) => {
          state.spinnerComment = false
          return b.progress - a.progress
        })

      }

    },



    /* integrationsFilter(state) {

      if (this.searchIntegration == '') {
        return state.integrations
      }

      else {

        return state.integrations.filter((integration) => {
          //console.log(integration.company.toLowerCase().includes(this.searchIntegration.toLowerCase()))
          return integration.company.toLowerCase().includes(this.searchIntegration.toLowerCase())
        })

      }

    } */


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

    },



    async getHistoryIntegrations() {

      /*  return this.integrations.filter((integration) => {
         return integration.account_txa == this.account_txa
       }) */

      this.historyIntegration = []
      this.spinnerComment = true


      const q = query(collection(dbfirebase, "client_file_gts"), where("account_txa", "==", this.account_txa));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        /* console.log(doc.id, " => ", doc.data());
        this.integrations.push(doc.data()) */

        const colRef = collection(dbfirebase, "client_file_gts/" + doc.id + "/integrations")

        getDocs(colRef).then((querySnapshot) => {

          querySnapshot.forEach((doc) => {

            this.historyIntegration.push(
              {
                id: doc.id,
                account_txa: this.account_txa,
                dates: doc.data().dates,
                comment: doc.data().comment,
                progress: doc.data().progress,
              }
            )

          })

        }
        )

      })



    },

    async addAdvanceIntegration(data) {

      this.historyIntegration.splice(0, this.historyIntegration.length)

      console.log("data123", this.account_txa)

      const q = query(collection(dbfirebase, "client_file_gts"), where("account_txa", "==", this.account_txa));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {

        const colRef = collection(dbfirebase, "client_file_gts/" + doc.id + "/integrations")

        addDoc(colRef, {
          dates: data.dates,
          comment: data.comment,
          progress: data.progress * 10,
        }).then(response => {

          console.log('Se ha agregado correctamente', response)



        })
          .catch(error => {
            console.log('There was an error, do something else.')
          })

        // actualizo la lista de integraciones
        getDocs(colRef).then(response => {
          response.forEach((doc) => {

            // get data from doc
            this.historyIntegration.push({
              id: doc.id,
              account_txa: this.account_txa,
              dates: doc.data().dates,
              comment: doc.data().comment,
              progress: doc.data().progress,

            })

          })
        }
        )




      })


    }











  }
})
