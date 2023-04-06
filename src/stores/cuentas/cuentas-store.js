import { defineStore } from 'pinia'
import Localbase from 'localbase'
import { Notify } from 'quasar'


let dblocal = new Localbase("db");

export const useCuentasStore = defineStore('cuentas', {
  state: () => ({
    file: '',
    cuentas: [],
    loading: false,
    listado: [],
    progress: 0,
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

      //delete bd cuentas
      dblocal.collection('cuentas').delete()

      // create bd cuentas


      // clear listado
      this.listado = []


      /*  this.cuentas.forEach(element => {
         console.log('cargando', element)
       }) */

      this.cuentas.forEach(element => {

        //console.log('cargando', count, '/', this.cuentas.length)
        dblocal.collection('cuentas').add({
          name: element[2],
          cuentaTxa: element[0],
          cuentaGts: element[3],
          rut: element[1],
        }).then(() => {

          count++
          // redondear a 2 decimales
          this.progress = Math.round((count / this.cuentas.length * 100) * 100) / 100


          this.listado.push({
            name: element[2],
            cuentaTxa: element[0],
            cuentaGts: element[3],
            rut: element[1],
          })

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

      })


    }

  },
})
