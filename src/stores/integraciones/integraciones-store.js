import { defineStore } from "pinia";
import { dbfirebase } from "/src/firebase/index";

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  orderBy,
  getDoc,
} from "firebase/firestore";

export const useIntegracionesStore = defineStore("integraciones", {
  state: () => ({
    integrations: [],
    searchIntegration: "",
    historyIntegration: [],
    dialogoAvance: false,
    dialogoFichaCliente: false,
    account_txa: "",
    spinnerComment: true,
    progress: [],
    porcentAdvance: 0,
  }),

  getters: {
    /*   doubleCount (state) {
        return state.counter * 2
      } */

    // get history of integrations
    getItemIntegracion: (state) => {
      return state.integrations.filter((integration) => {
        return integration.account_txa == state.account_txa;
      });
    },

    ordenarPorProgreso: (state) => {
      return state.historyIntegration.sort((a, b) => {
        return b.progress - a.progress;
      });
    },

    // max progress
    maxProgress: (state) => {
      return Math.max(...state.progress) / 10;
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
      this.integrations = [];
      this.historyIntegration = [];

      // get data from firebase
      const querySnapshot = await getDocs(
        collection(dbfirebase, "client_file_gts")
      );

      // join with integrations
      querySnapshot.forEach((doc) => {
        this.integrations.push(doc.data());

        // get data from integrations
        /*         const colRef = collection(dbfirebase, "client_file_gts/" + doc.id + "/integrations")

                getDocs(colRef).then((querySnapshot) => {

                  querySnapshot.forEach((doc) => {

                    this.historyIntegration.push(
                      {
                        id: doc.id,
                        account_txa: doc.data().account_txa,
                        dates: doc.data().dates,
                        comment: doc.data().comment,
                        progress: doc.data().progress,
                      }
                    )

                  })

                }
                ) */
      });
    },

    getProgress(account_txa) {
      //return state.progress

      this.porcentAdvance = 10;
    },

    async getFichaCliente(id) {
      const data = [];

      const q = query(
        collection(dbfirebase, "client_file_gts"),
        where("account_txa", "==", id)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });

      return data;
    },

    async getHistoryIntegrations(account_txa) {
      const account_txaNow =
        this.account_txa == "" ? account_txa : this.account_txa;

      console.log("account_txa", account_txaNow);

      this.historyIntegration = [];
      this.progress = [];
      this.spinnerComment = true;

      const q = query(
        collection(dbfirebase, "client_file_gts"),
        where("account_txa", "==", account_txaNow)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        /* console.log(doc.id, " => ", doc.data());
        this.integrations.push(doc.data()) */

        const colRef = collection(
          dbfirebase,
          "client_file_gts/" + doc.id + "/integrations"
        );

        getDocs(colRef).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.historyIntegration.push({
              id: doc.id,
              account_txa: this.account_txa,
              dates: doc.data().dates,
              comment: doc.data().comment,
              progress: doc.data().progress,
            });

            this.progress.push(doc.data().progress);
          });
        });
      });

      setTimeout(() => {
        this.spinnerComment = false;
      }, 100);

      /* // value max progress in historyIntegration
      this.progress = []
      this.historyIntegration.forEach((item) => {
        console.log("item", item.progress)
        this.progress.push(item.progress)
      }
      ) */

      console.log("this.progress", this.progress);
    },

    async addAdvanceIntegration(data) {
      this.historyIntegration.splice(0, this.historyIntegration.length);

      const q = query(
        collection(dbfirebase, "client_file_gts"),
        where("account_txa", "==", this.account_txa)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const colRef = collection(
          dbfirebase,
          "client_file_gts/" + doc.id + "/integrations"
        );

        addDoc(colRef, {
          dates: data.dates,
          comment: data.comment,
          progress: data.progress * 10,
        })
          .then((response) => {
            console.log("Se ha agregado correctamente", response);
          })
          .catch((error) => {
            console.log("There was an error, do something else.");
          });

        // actualizo la lista de integraciones
        getDocs(colRef).then((response) => {
          response.forEach((doc) => {
            // get data from doc
            this.historyIntegration.push({
              id: doc.id,
              account_txa: this.account_txa,
              dates: doc.data().dates,
              comment: doc.data().comment,
              progress: doc.data().progress,
            });
          });
        });
      });
    },
  },
});
