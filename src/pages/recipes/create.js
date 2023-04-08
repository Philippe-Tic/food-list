import { RecipeForm } from "@/components/Recipe/RecipeForm"
import { useCreateRecipe } from "@/hooks/recipes"
import { useAuthContext } from "@/pages/_app"
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
import { FormProvider, useForm } from "react-hook-form"
import { FaArrowLeft } from "react-icons/fa"

export default function Edit() {
  const { push, back } = useRouter()
  const { currentUser } = useAuthContext()

  const { mutate: createRecipe, isLoading: isLoadingCreation } =
    useCreateRecipe()
  const toast = useToast()

  const methods = useForm({
    defaultValues: {
      name: "",
      food: [],
      recipe: "",
    },
  })

  const onSubmit = async (formData) => {
    console.log({ formData })
    createRecipe(
      { formData, currentUser },
      {
        onSuccess: () => {
          toast({
            title: "Recette créée",
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
      }
    )
  }

  if (isLoadingCreation) {
    return (
      <Box>
        <Center>
          <Spinner />
        </Center>
      </Box>
    )
  }

  return (
    <VStack maxW="45rem" spacing="4" w="full" alignItems="flex-start">
      <HStack spacing="4">
        <IconButton onClick={back} icon={<Icon as={FaArrowLeft} />} />
        <Text fontSize="lg" fontWeight="bold">
          Créer ma recette
        </Text>
      </HStack>
      <FormProvider {...methods}>
        <Box
          as="form"
          id="create-recipe"
          noValidate
          onSubmit={methods?.handleSubmit(onSubmit)}
          maxW="45rem"
          w="full"
        >
          <RecipeForm />
        </Box>
        <Button
          mt="4"
          form="create-recipe"
          type="submit"
          isLoading={isLoadingCreation}
        >
          Créer
        </Button>
      </FormProvider>
    </VStack>
  )
}
