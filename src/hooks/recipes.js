import { supabase } from "@/lib/initSupabase"
import { useQuery } from "@tanstack/react-query"

const getRecipes = async () => {
  const { data, error } = await supabase.from("recipes").select()

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error("Error fetching recipes")
  }

  return data
}

export const useRecipes = () => {
  return useQuery(["recipes"], getRecipes)
}
