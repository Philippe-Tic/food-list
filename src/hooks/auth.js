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

export default function useLogOut() {
  const queryClient = useQueryClient()
  return useMutation(() => logout(), {
    onSuccess: () => {
      queryClient.removeQueries()
    },
  })
}
