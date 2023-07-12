import { createClient } from '@supabase/supabase-js'
import useAuthUser from 'src/composables/UseAuthUser'

const supabaseUrl = 'https://pbqmsolkrdoyapxeltnu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBicW1zb2xrcmRveWFweGVsdG51Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NzI2NzcxMSwiZXhwIjoyMDAyODQzNzExfQ.jMqb5CSI0Ox_YRj-5SpFuYGllmDg5rRxFYSnzyW5BMg'
const supabase = createClient(supabaseUrl, supabaseKey)

supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase event: ', event)
  console.log('Supabase session: ', session)

  if (event === 'SIGNED_IN') {
    console.log('SIGNED_IN')
    const { user } = useAuthUser()

    // verificamos si el usuario esta logueado
    user.value = session?.user || null

    console.log('user.value: ', user.value)

  }
  if (event === 'SIGNED_OUT') {
    console.log('SIGNED_OUT')
  }
})

export default function () {
  return {
    supabase
  }
}

