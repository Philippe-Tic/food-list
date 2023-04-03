import { RecipeCard } from "@/components/Recipe/RecipeCard"
import { Box, Center, Flex, SimpleGrid, Spinner, Text } from "@chakra-ui/react"

import { useRecipes } from "../hooks/recipes"

export const Recipes = () => {
  const {
    isLoading: isLoadingRecipes,
    error: errorRecipes,
    data: recipes,
  } = useRecipes()

  const isLoading = isLoadingRecipes

  if (isLoading) {
    return (
      <Box pt={32}>
        <Center>
          <Spinner />
        </Center>
      </Box>
    )
  }
  return (
    <Flex flexDir="column">
      <Flex>
        <Text>Mes recettes</Text>
      </Flex>
      {errorRecipes && "Error loading recipes"}
      {!errorRecipes && (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }}>
          {recipes?.map((recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe} />
          })}
        </SimpleGrid>
      )}
    </Flex>
  )
}
