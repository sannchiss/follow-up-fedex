import { ref } from 'vue'
import useSupabase from 'src/boot/supabase'

export default function handleAccountCompany() {

  const { supabase } = useSupabase()
  const accountCompany = ref(null)

  const getListCompany = async (data) => {
    const { data: cuentas, error } = await supabase
      .from('cuentas_gts')
      .select('*')
    if (error) throw error
    return cuentas

  }

  const insertListCompany = async (data) => {
    const { data: cuentas, error } = await supabase
      .from('cuentas_gts')
      .insert(data)
    if (error) throw error
    return cuentas

  }

  const deleteListCompany = async (id) => {
    const { data: cuentas, error } = await supabase
      .from('cuentas_gts')
      .delete()
      .eq('id', id)
    if (error) throw error
    return cuentas

  }

  const setAccountCompany = (accountCompany) => {
    accountCompany.value = accountCompany
  }

  const getAccountCompany = () => {
    return accountCompany.value
  }

  return {
    getListCompany,
    insertListCompany,
    deleteListCompany,
    setAccountCompany,
    getAccountCompany
  }
}
