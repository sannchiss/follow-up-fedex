import useSupabase from 'src/boot/supabase'
import { Notify } from "quasar";
import { Dialog } from 'quasar';

import { useIntegracionesStore } from "src/stores/integraciones/integraciones-store";



export default function handleBucketsFiles() {

  const { supabase } = useSupabase()

  const createBucket = async (bucketName) => {

    const { data, error } = await supabase
      .storage
      .createBucket(bucketName)

    if (error) {
      Notify.create({
        type: 'negative',
        color: 'negative',
        message: 'Error al crear el bucket: ' + error,
        position: 'top',
        icon: 'report_problem'
      })
      console.log(error)
      return error
    }

    Notify.create({
      type: 'positive',
      color: 'positive',
      message: 'Se ha creado el bucket correctamente',
      position: 'top',
      icon: 'check'
    })
    console.log("data success", data)

    return data

  }

  const deleteBucket = async (bucketName) => {

    const { data, error } = await supabase
      .storage
      .deleteBucket(bucketName)

    if (error) {
      Notify.create({
        type: 'negative',
        color: 'negative',
        message: 'Error al eliminar el bucket: ' + error,
        position: 'top',
        icon: 'report_problem'
      })
      console.log(error)
      return error
    }

    Notify.create({
      type: 'positive',
      color: 'positive',
      message: 'Se ha eliminado el bucket correctamente: ' + data,
      position: 'top',
      icon: 'check'
    })
    console.log("data success", data)

  }


  const uploadFile = async (bucketName, file) => {

    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .upload('public_' + ((file?.name).normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toLowerCase(), file, {
        cacheControl: '3600',
        upsert: false
      })


    if (error) {
      Notify.create({
        type: 'negative',
        color: 'negative',
        message: 'Error al subir el archivo: ' + '[' + error.error + '] ' + error.message,
        position: 'top',
        icon: 'report_problem'
      })
      console.log(error)
      return error
    }

    Notify.create({
      type: 'positive',
      color: 'positive',
      message: 'Se ha subido el archivo correctamente: ' + data.path,
      position: 'top',
      icon: 'check'
    })
    console.log("data success", data.path)

    return data

  }

  const getFilesInBuckets = async (bucketName) => {

    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .list('', {
        limit: 100,
        offset: 0,
        sortBy: {
          column: 'name',
          order: 'asc',
        },
      })

    if (error) {
      console.log(error)

      Notify.create({
        type: 'negative',
        color: 'negative',
        message: 'Error al obtener el archivo: ' + error,
        position: 'top',
        icon: 'report_problem'
      })

      return error
    }


    // aign url to file
    data.forEach(async (element) => {
      element.url = await supabase.storage.from(bucketName).createSignedUrl(element.name, 60)
    })



    Notify.create({
      type: 'positive',
      color: 'positive',
      message: 'Se ha actulizado el listado de archivos correctamente',
      position: 'top',
      icon: 'check'
    })

    return data

  }



  const getListBucketFiles = async () => {

    const { data, error } = await supabase
      .storage
      .listBuckets()

    if (error) {
      console.log(error)
      return error
    }

    return data

  }


  const deleteFileInBucket = async (bucketName, fileName) => {

    const integracionesStore = useIntegracionesStore();

    Dialog.create({
      title: 'Eliminar archivo',
      dark: true,
      message: '¿Está seguro que desea eliminar el archivo?',
      cancel: true,
      persistent: true
    }).onOk(async () => {


      // delete filename in arrar listaArchivos
      integracionesStore.listaArchivos = integracionesStore.listaArchivos.filter((item) => {
        return item.name != fileName
      })

      // Notify condition


      const { data, error } = await supabase
        .storage
        .from(bucketName)
        .remove([fileName])

      if (error) {
        console.log(error)
        return error
      }

      Notify.create({
        type: 'positive',
        color: 'positive',
        message: 'Se ha eliminado el archivo correctamente: ' + data[0].name,
        position: 'top',
        icon: 'check'
      })


      console.log("data success eliminado", data[0].name)

      // actulizo listado archivos llamando a la funcion getFilesInBuckets
      await getFilesInBuckets(bucketName).then((res) => {
        console.log("getFilesInBuckets", res)
      })


      return data




    }).onCancel(() => {
      // console.log('Cancel')
    }).onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    })


  }







  return {
    createBucket,
    deleteBucket,
    uploadFile,
    getFilesInBuckets,
    deleteFileInBucket,
    getListBucketFiles

  }

}
