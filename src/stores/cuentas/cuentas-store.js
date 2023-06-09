import { defineStore } from 'pinia'
import Localbase from 'localbase'
import { Notify } from 'quasar'
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
  getDoc
} from "firebase/firestore";



//let dblocal = new Localbase("db");

export const useCuentasStore = defineStore('cuentas', {
  state: () => ({
    file: '',
    cuentas: [],
    loading: false,
    listado: [
      {
        name: 'Cuenta 1',
        cuentaTxa: '123456',
        cuentaGts: '123456',
        rut: '12345678-9',
        comuna: 'Santiago',
        direccion: 'Av. Providencia 123',

      }



    ],
    progress: 0,
    showDialogInfo: false,
    infoClient: [],
    infoComplement: '',
    typeIntegration: '',

  }),
  getters: {


    /*  async getCuentas() {

       try {

         let cuentasList = await dblocal.collection('cuentas')
           .orderBy('empresa')
           .get()


         cuentasList.forEach(element => {
           //console.log(element)
           this.listado.push({
             empresa: element.empresa,
             cuentaTxa: element.cuentaTxa,
             cuentaGts: element.cuentaGts,
             rut: element.rut
           })
         }
         )

         return this.listado

       } catch (error) {
         console.log(error)
       }


     } */
  },
  actions: {
    uploadFileStore() {

      const reader = new FileReader()
      reader.readAsText(this.file, 'ISO-8859-1')

      // get name file
      this.nameFile = this.file.name


      reader.onload = (evt) => {
        const fileString = evt.target.result
        const fileArray = fileString.split('\n')
        this.cuentas = fileArray.map((item) => item.split(';'))


        // save file in localbase
        this.saveFileStore()

      }




    },

    saveFileStore() {


      this.loading = true

      var count = 0

      // delete db localStorage
      localStorage.removeItem('cuentas')

      // clear listado
      this.listado = []

      let accountLoad = JSON.parse(JSON.stringify(this.cuentas))


      accountLoad.forEach(element => {

        this.listado.push({
          name: element[2],
          cuentaTxa: element[0],
          cuentaGts: element[3],
          rut: element[1],
          comuna: element[4],
          direccion: element[5],
        })

        count++

        // redondear a 2 decimales
        this.progress = Math.round((count / this.cuentas.length * 100) * 100) / 100

        if (count === this.cuentas.length) {
          console.log('cargado')
          this.loading = false
          count = 0
          this.progress = 0

          Notify.create({
            message: 'Se guardaron las cuentas correctamente',
            color: 'positive',
            position: 'top'
          })

        }


      })

      localStorage.setItem('cuentas', JSON.stringify(this.listado))



    },

    async saveInfoClientStore(data) {

      try {
        const response = await addDoc(collection(dbfirebase, "client_file_gts"), data)
        console.log("Document written with ID: ", response.id);
        // show notification
        Notify.create({
          message: 'Se guardo la información correctamente',
          color: 'positive',
          position: 'top'
        })

      }
      catch (error) {
        console.log('error: ', error)
        Notify.create({
          message: 'Error al guardar la información' + error,
          color: 'negative',
          position: 'top'
        })
      }




    }




  },
})
