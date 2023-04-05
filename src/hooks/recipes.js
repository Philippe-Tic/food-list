import { supabase } from "@/lib/initSupabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

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

const getRecipe = async (id) => {
  const { data, error } = await supabase
    .from("recipes")
    .select()
    .eq("id", id)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error("Error fetching your recipe" + id)
  }

  return data
}

export const useRecipe = (id, isReady) => {
  return useQuery(["recipes", id], () => getRecipe(id), {
    enabled: isReady,
  })
}

const editRecipe = async (formData) => {
  console.log({ formData })
  const { error } = await supabase
    .from("recipes")
    .update(formData)
    .eq("id", formData.id)

  if (error) {
    throw new Error(error.message)
  }
}

export const useEditRecipe = () => {
  const queryClient = useQueryClient()
  return useMutation((formData) => editRecipe(formData), {
    onSuccess: () => {
      queryClient.removeQueries()
    },
  })
}
