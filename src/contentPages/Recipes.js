import { RecipeCard } from "@/components/Recipe/RecipeCard"
import { useAuthContext } from "@/pages/_app"
import {
  Box,
  Button,
  Center,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useRouter } from "next/router"

import { useMyRecipes } from "../hooks/recipes"

export const Recipes = () => {
  const { currentUser } = useAuthContext()
  const { push } = useRouter()

  const {
    isLoading: isLoadingRecipes,
    error: errorRecipes,
    data: recipes,
  } = useMyRecipes(JSON.parse(currentUser)?.email)

  if (isLoadingRecipes) {
    return (
      <Box pt={32}>
        <Center>
          <Spinner />
        </Center>
      </Box>
    )
  }
  return (
    <VStack spacing="6" alignItems="flex-start" w="full" flexDir="column">
      <Flex w="full" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">
          Mes recettes
        </Text>
        <Button
          onClick={() => {
            push("/recipes/create")
          }}
          colorScheme="pink"
        >
          Ajouter
        </Button>
      </Flex>
      {errorRecipes && "Error loading recipes"}
      {!errorRecipes && (
        <SimpleGrid
          w="full"
          spacing={8}
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        >
          {recipes?.map((recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe} />
          })}
        </SimpleGrid>
      )}
    </VStack>
  )
}
