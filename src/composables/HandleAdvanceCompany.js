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

  const insertListAdvanceCompany = async (data) => {
    const { data: cuentas, error } = await supabase
      .from('advance_company')
      .insert(data)
    if (error) throw error
    return cuentas


  }

  return {
    getListAdvanceCompany,
    insertListAdvanceCompany
  }




}
