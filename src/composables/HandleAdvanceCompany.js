import { ref } from 'vue'
import useSupabase from 'src/boot/supabase'

export default function handleAdvanceCompany() {

  const { supabase } = useSupabase()
  const advanceCompany = ref(null)

  const getListAdvanceCompany = async (data) => {
    const { data: company, error } = await supabase
      .from('advance_company')
      .select('*')
    if (error) throw error
    return company
  }

  const getInfCompany = async (id) => {
    const { data: company, error } = await supabase
      .from('advance_company')
      .select('informacion')
      .eq('id', id)
    if (error) throw error
    return company
  }



  const insertListAdvanceCompany = async (data) => {
    const { data: cuentas, error } = await supabase
      .from('advance_company')
      .insert(data)
    if (error) throw error
    return cuentas
  }

  const deleteCompany = async (id) => {
    const { data, error } = await supabase
      .from('advance_company')
      .delete()
      .eq('id', id)
    if (error) throw error
    return data
  }

  const updateAdvanceCompany = async (data, id) => {
    console.log("composable update avance", data, id)
    const { data: avance, error } = await supabase
      .from('advance_company')
      .update({
        avance: data,
      })
      .eq('id', id)
    if (error) throw error
    return avance
  }

  const updatePorcentEstado = async (porcent, estado, id) => {
    console.log("composable update avance", porcent, estado, id)
    const { data: avance, error } = await supabase
      .from('advance_company')
      .update({
        porcentaje_integracion: porcent,
        estado_integracion: estado
      })
      .eq('id', id)
    if (error) throw error
    return avance
  }

  return {
    getListAdvanceCompany,
    getInfCompany,
    insertListAdvanceCompany,
    deleteCompany,
    updateAdvanceCompany,
    updatePorcentEstado
  }




}
