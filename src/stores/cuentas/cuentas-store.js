import { defineStore } from 'pinia'
import Localbase from 'localbase'
import { Notify } from 'quasar'
import { dbfirebase } from "/src/firebase/index";

import handleAccountCompany from 'src/composables/HandleAccountCompany';
const { getListCompany, insertListCompany, deleteListCompany } = handleAccountCompany()



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
    listado: [],
    progress: 0,
    showDialogInfo: false,
    infoClient: [],
    infoComplement: '',
    typeIntegration: '',

  }),
  getters: {

    async getListado() {
      await getListCompany().then((res) => {
        return res
      })

    },

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

    async saveFileStore() {

      // obtengo todas las cuentas de supabase
      const list = await getListCompany()

      //const listado2 = []

      // limpio tabla cuentas_gts en supabase
      if (list.length > 0) {
        list.map((item) => {
          console.log('id delete cuentas_gts: ', item.list_account)
          deleteListCompany(item.id)

          // merge list_account
          /// listado.push(...item.list_account)

        })

        //console.log('listado2: ', listado)

      }



      // get total records of cuentas del archivo
      let totalRecords = this.cuentas.length
      console.log('totalRecords: ', totalRecords)

      // total loops and round up
      let totalLoops = totalRecords / 3000
      // round up
      totalLoops = Math.ceil(totalLoops)


      // convert array cuentas to json
      let listado = this.cuentas.map((item) => {
        return {
          cuentaTxa: item[0],
          rut: item[1],
          empresa: item[2],
          cuentaGts: item[3],
          comuna: item[4],
          direccion: item[5],
        }
      })


      // record to save of 5000 records
      let recordToSave = 3000

      // loop to save records 0 to 5000 of 5001 to 10000
      for (let i = 0; i < totalLoops; i++) {

        // extract the first 5000 records
        let arrayExtract = listado.slice((i * recordToSave) + 1, recordToSave * (i + 1))

        let formatCuentas = {
          list_account: arrayExtract
        }

        console.log('result: ', (i * recordToSave) + 1, recordToSave * (i + 1))

        console.log('array1: ', formatCuentas)

        // guardo en tabla cuentas_gts de supabase
        await insertListCompany(formatCuentas)

      }

      // RELOAD PAGE
      window.location.reload()



      console.log('cuentasJson: ', formatCuentas)

      // dividir formatcuentas en 2 arrays
      let array1 = formatCuentas.list_account.slice(0, 20000)


      // extract the last 20000 records
      // formatCuentas.list_account = formatCuentas.list_account.slice(-20000)

      /*       // delete list
            const deleteList = await deleteListCompany(idMax.id)
            if (deleteList) {
              Notify.create({
                message: 'Se eliminaron las cuentas correctamente',
                color: 'positive',
                position: 'top'
              })
            }


            let saveList = await insertListCompany(formatCuentas)
            if (saveList != null) {
              Notify.create({
                message: 'Se guardaron las cuentas correctamente',
                color: 'positive',
                position: 'top'
              })
            }
            else {
              Notify.create({
                message: 'Error al guardar las cuentas',
                color: 'negative',
                position: 'top'
              })
            } */







      /* this.loading = true

       var count = 0

       //  Failed to execute 'setItem' on 'Storage'
       localStorage.setItem('cuentas', JSON.parse(stringify(this.cuentas)))





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


             }) */

      // save in localbase

      /*    if (navigator.storage && navigator.storage.estimate) {
           const quota = await navigator.storage.estimate();
           // quota.usage -> Number of bytes used.
           // quota.quota -> Maximum number of bytes available.
           const percentageUsed = (quota.usage / quota.quota) * 100;
           console.log(`You've used ${percentageUsed}% of the available storage.`);
           const remaining = quota.quota - quota.usage;
           console.log(`You can write up to ${remaining} more bytes.`);
         } */

      // cre



      localStorage.setItem('cuenta123', JSON.stringify(this.listado))

      // add other item in localstorage

      // create collection in localStore






    },

    async saveInfoClientStore(data) {





      /*  try {
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
       } */




    }




  },
})
