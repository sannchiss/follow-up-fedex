import { ref } from 'vue'
import useSupabase from 'boot/supabase'

const user = ref(null)

export default function useAuthUser() {

  const { supabase } = useSupabase()

  const login = async ({ email, password }) => {

    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    return user

  }

  const loginWithProvider = async (provider) => {
    try {
      let { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github'
      })
      if (error) throw error
      return { user, session }
    } catch (error) {
      return { error: error.message }
    }
  }

  // login with firebase
  const loginWithFirebase = async (provider) => {
    try {
      const { user, session, error } = await supabase.auth.signIn({
        provider: 'github'
      })
      if (error) throw error
      return { user, session }
    } catch (error) {
      return { error: error.message }
    }
  }


  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    try {
      if (error) throw error
      return { success: true }
    }
    catch (error) {
      return { error: error.message }
    }

  }

  // esta conectado?
  const isLoggedIn = () => {
    return !!user.value
  }


  const register = async ({ email, password, ...meta }) => {

    console.log(email, password, meta)

    const { user, session, error } = await supabase.auth.signUp({
      'email': email,
      'password': password,
    },
      {
        data: meta,
        redirectTo: `${window.location.origin}/main/me?fromEmail=registrationConfirmation`
      }
    )

    if (error) throw error
    return { user, session }




  }

  const updated = async (data) => {

    const { user, session, error } = await supabase.auth.update(data)
    if (error) throw error
    return { user, session }

  }


  const sendPasswordResetEmail = async (email) => {
    const { user, error } = await supabase.auth.resetPasswordForEmail(email,
      {
        redirectTo: `${window.location.origin}/reset-password?fromEmail=resetPassword`
      }

    )
    if (error) throw error
    return user

  }

  const resetPassword = async (new_password) => {

    console.log(new_password)

    const { user, error } = await supabase.auth.updateUser(
      {
        password: new_password
      })
    if (error) throw error
    return user

  }


  return {
    user,
    login,
    loginWithProvider,
    loginWithFirebase,
    logout,
    isLoggedIn,
    register,
    updated,
    sendPasswordResetEmail,
    resetPassword
  }


}


