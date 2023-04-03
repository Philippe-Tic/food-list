import { supabase } from "@/lib/initSupabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error("Error fetching current user")
  }

  return data
}

export const useCurrentUser = () => {
  return useQuery(["currentUser"], getCurrentUser)
}

const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }
}

export const useLogOut = () => {
  const queryClient = useQueryClient()
  return useMutation(() => logout(), {
    onSuccess: () => {
      queryClient.removeQueries()
    },
  })
}

const signUp = async ({ email, password }) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }
}

export const useSignUp = () => {
  const queryClient = useQueryClient()
  return useMutation((formData) => signUp(formData), {
    onSuccess: () => {
      queryClient.removeQueries()
    },
  })
}

const signIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }
  return data
}

export const useSignIn = () => {
  const queryClient = useQueryClient()
  return useMutation((formData) => signIn(formData), {
    onSuccess: () => {
      queryClient.removeQueries()
    },
  })
}
