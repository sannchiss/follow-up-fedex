import { defineStore } from "pinia";
import { dbfirebase } from "/src/firebase/index";
import { Notify, date } from "quasar";
import { ref } from "vue";



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

import handleBucketsFile from "src/composables/HandleBucketsFiles";

const { createBucket, deleteBucket, uploadFile, getListBucketFiles, getFilesInBuckets } = handleBucketsFile();

import useSupabase from 'src/boot/supabase'

const { supabase } = useSupabase()


export const useIntegracionesStore = defineStore("integraciones", {
  state: () => ({
    rowAvance: [],
    integrations: [],
    searchIntegration: "",
    historyIntegration: [],
    dialogoAvance: false,
    dialogoFichaCliente: false,
    dialogoVerFicha: false,
    account_txa: "",
    spinnerComment: true,
    progress: [],
    porcentAdvance: 0,

    // variables Buscador
    search: "",
    rows: [],
    progress: 0,

    // variables modal adjuntos
    dialogoAdjunto: false,
    position: "bottom",

    file: null,
    adjunto: null,
    enableUpload: false,
    progresoPorcentaje: 0,
    completado: 'accent',
    listaArchivos: [],

    // variables modal correo
    dialogoCorreo: false,
    email: '',

    payload: {
      fecha: ref('2023-09-11'),
      fase_del_dia: ref(''),
      id_project: "",
      empresa: "",
      modalidad_de_negocio: "",
      modalidad_de_integracion: ref(null),
      tipo_de_impresion: "",
      usuarios_capacitados: "",
      propiedad_de_impresora: "",
      propiedad_pc: "Cliente",
      devolucion_de_documentos: "No",
      para: "ricardosilva@fedex.com",
      con_copia_a: "sannchiss.perez@fedex.com",

    }

  }),



  getters: {
    /*   doubleCount (state) {
        return state.counter * 2
      } */

    // get history of integrations
    getItemIntegracion(state) {

      if (state.search == '' || state.search == null) {
        return state.rows
      }
      else {
        return state.rows.filter((row) => {
          return row.empresa.toLowerCase().includes(state.search.toLowerCase()) ||
            row.cuentaTxa.toLowerCase().includes(state.search.toLowerCase()) ||
            row.cuentaGts.toLowerCase().includes(state.search.toLowerCase()) ||
            row.rut.toLowerCase().includes(state.search.toLowerCase()) ||
            row.estado_integracion.toLowerCase().includes(state.search.toLowerCase()) ||
            row.modalidad_negocio.toLowerCase().includes(state.search.toLowerCase()) ||
            row.modalidad_integracion.toLowerCase().includes(state.search.toLowerCase())

        }
        )
      }



    },

    ordenarPorProgreso: (state) => {
      return state.historyIntegration.sort((a, b) => {
        return b.progress - a.progress;
      });
    },

    // max progress
    maxProgress: (state) => {
      // get porcent max state.rowAvance.avance.porcentaje_avance


      const lista = []
      state.rowAvance.avance.map((item) => {
        lista.push(item.porcentaje_avance)
        //console.log("lista", lista)
      }
      )

      // returnar el maximo de la lista
      state.progress = Math.max.apply(
        Math,
        lista.map(function (o) {
          return o / 10;
        }
        )
      );

      return state.progress




    },

    // sanitize rowAvance delete spaces, points, accent mark and lowercase and add _
    sanitizeEmpresa(state) {
      return state.rowAvance.empresa.replace(/\s+/g, '_').replace(/\./g, '').toLowerCase()
    },


    getPhaseOfDay: () => {
      const date = new Date();
      const hour = date.getHours();

      if (hour >= 0 && hour <= 12) {
        return "Mañana";
      } else if (hour >= 13 && hour <= 18) {
        return "Tarde";
      } else if (hour >= 19 && hour <= 23) {
        return "Noche";
      }


    },


    editorMail: (state) => {

      console.log("json", json)

      // capture getter getPhaseOfDay
      const phaseOfDay = state.getPhaseOfDay

      const payload = {
        company: state.rowAvance.empresa,
        phase_of_day: phaseOfDay,
        service_type: state.rowAvance.modalidad_negocio,
        id_project: "",
        integration_type: state.rowAvance.modalidad_integracion,
        print_type: "",
        trained_user: "",
        property_print: "",
        property_pc: "",
        return_document: "",
        email: "ricardosilva@fedex.com",
        reply_to: "sannchiss.perez@fedex.com",
      };

      return "para: " +
        payload.email +
        "</br>" +
        "con_copia_a: " +
        payload.reply_to +
        "</br>" +
        "empresa: " +
        payload.company +
        "</br>" +
        "id_proyecto: " +
        payload.id_project +
        "</br>" +
        "----------------------------------------------------------------------------------" +
        "</br>" +
        "fase_del_dia: " +
        payload.phase_of_day +
        "</br>" +
        "modalidad_de_negocio: " +
        payload.service_type +
        "</br>" +
        "modalidad_de_integracion: " +
        payload.integration_type +
        "</br>" +
        "tipo_de_impresion: " +
        payload.print_type +
        "</br>" +
        "usuarios_capacitados: " +
        payload.trained_user +
        "</br>" +
        "propiedad_de_impresora: " +
        payload.property_print +
        "</br>"
        +
        "propiedad_de_pc: " +
        payload.property_pc +
        "</br>" +
        "devolucion_de_documentos: " +
        payload.return_document +
        "</br>"


    }



  },

  actions: {

    async factory(file) {

      const listaBucket = await getListBucketFiles().then((res) => {
        return res
      })

      // comprobar si existe el nombre del bucket this.rowAvance
      const bucketsExist = listaBucket.find((item) => {
        return item.name == this.sanitizeEmpresa
      }
      )

      console.log("bucketsExist", bucketsExist)

      if (bucketsExist == undefined) {
        // create bucket
        await createBucket(this.sanitizeEmpresa).then((res) => {
          console.log("res", res)
        })



      }
      else {

        Notify.create({
          type: 'negative',
          color: 'negative',
          message: 'El bucket ya existe',
          position: 'top',
          icon: 'report_problem'
        })

      }

      this.file = file

      /************************************ */


    },

    async bucketsFiles() {

      await uploadFile(this.sanitizeEmpresa, this.file).then((res) => {

        // if success
        if (res.path != undefined) {

          this.completado = 'secondary'
          this.progresoPorcentaje = 1

          // clear listaArchivos
          this.listaArchivos = []


          setTimeout(() => {
            this.completado = 'accent'
            this.progresoPorcentaje = 0
            this.adjunto = null
          }, 2000);


          this.getFilesInBuckets()

          console.log("res", res)

        }
        else if (res.error != undefined) {
          // if error
          console.log("aqui entre")
          this.completado = 'negative'
          this.progresoPorcentaje = 0.5
        }



      }
      )


    },

    async getFilesInBuckets() {

      console.log("this.sanitizeEmpresa", this.sanitizeEmpresa)

      await getFilesInBuckets(this.sanitizeEmpresa).then((res) => {

        this.listaArchivos = res

        if (this.listaArchivos.length == 0) {

          console.log("es alli", res)

        }


      }
      )



    },






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

      //console.log("account_txa", account_txaNow);

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
    }




  },
});
