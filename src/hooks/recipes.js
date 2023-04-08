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

const getMyRecipes = async (id) => {
  const { data, error } = await supabase
    .from("recipes")
    .select("id, name, user_id, food")
    .eq("user_id", id)

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error("Error fetching your recipes")
  }

  return data
}

export const useMyRecipes = (id) => {
  return useQuery(["recipes", id], () => getMyRecipes(id))
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

const createRecipe = async ({ formData, currentUser }) => {
  const id = JSON.parse(currentUser)?.id
  const { error } = await supabase
    .from("recipes")
    .insert({ ...formData, user_id: id })

  if (error) {
    throw new Error(error.message)
  }
}

export const useCreateRecipe = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({ formData, currentUser }) => createRecipe({ formData, currentUser }),
    {
      onSuccess: () => {
        queryClient.removeQueries()
      },
    }
  )
}

const deleteRecipe = async (id) => {
  const { error } = await supabase.from("recipes").delete().eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient()
  return useMutation((id) => deleteRecipe(id), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] })
    },
  })
}
