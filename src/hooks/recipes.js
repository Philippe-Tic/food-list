import { supabase } from "@/lib/initSupabase"
import { useQuery } from "@tanstack/react-query"

const getAllRecipes = async () => {
  const { data, error } = await supabase.from("recipes").select()

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error("Error fetching recipes")
  }

  return data
}

export const useAllRecipes = () => {
  return useQuery(["recipes"], getAllRecipes)
}

const getMyRecipes = async (email) => {
  const { data, error } = await supabase
    .from("recipes")
    .select("id, name, email, food")
    .eq("email", email)

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error("Error fetching your recipes")
  }

  return data
}

export const useMyRecipes = (email) => {
  return useQuery(["recipes", email], () => getMyRecipes(email))
}
