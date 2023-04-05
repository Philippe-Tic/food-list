import { RecipeForm } from "@/components/Recipe/RecipeForm"
import { useEditRecipe, useRecipe } from "@/hooks/recipes"
import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { FaArrowLeft } from "react-icons/fa"

export default function Edit() {
  const { query, isReady, push, back } = useRouter()
  const { mutate: editRecipe, isLoading: isLoadingEdition } = useEditRecipe()
  const toast = useToast()

  const {
    isLoading: isLoadingRecipe,
    error: errorRecipe,
    data: recipe,
  } = useRecipe(query.id, isReady)

  const methods = useForm({
    defaultValues: {
      name: "",
      food: {},
      recipe: "",
    },
  })

  const resetAsyncForm = useCallback(async () => {
    methods?.reset({
      ...recipe,
      name: recipe?.name || "",
      food: recipe?.food || {},
      recipe: recipe?.recipe || "",
    })
  }, [methods, recipe])

  useEffect(() => {
    resetAsyncForm()
  }, [resetAsyncForm])

  const onSubmit = async (values) => {
    editRecipe(values, {
      onSuccess: () => {
        toast({
          title: "Recette mise à jour",
          description: "",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
        push("/recipes")
      },
      onError: () => {
        toast({
          title: "Une erreur est survenue",
          description: "",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      },
    })
  }

  if (!isReady || isLoadingRecipe || isLoadingEdition) {
    return (
      <Box>
        <Center>
          <Spinner />
        </Center>
      </Box>
    )
  }

  if (errorRecipe) {
    return <Box>Erreur sur la récupération de la recette</Box>
  }

  return (
    <VStack maxW="45rem" spacing="4" w="full" alignItems="flex-start">
      <HStack spacing="4">
        <IconButton onClick={back} icon={<Icon as={FaArrowLeft} />} />
        <Text fontSize="lg" fontWeight="bold">
          Modifier ma recette
        </Text>
      </HStack>
      <FormProvider {...methods}>
        <Box
          as="form"
          id="edit-recipe"
          noValidate
          onSubmit={methods?.handleSubmit(onSubmit)}
          maxW="45rem"
          w="full"
        >
          <RecipeForm />
        </Box>
        <Button
          mt="4"
          form="edit-recipe"
          type="submit"
          isLoading={isLoadingEdition}
        >
          Enregistrer
        </Button>
      </FormProvider>
    </VStack>
  )
}
