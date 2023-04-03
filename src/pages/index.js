import { Box, Center, Spinner } from "@chakra-ui/react"
import Head from "next/head"

import { useRecipes } from "../hooks/recipes"

export default function Home() {
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
    <>
      <Head>
        <title>Food List</title>
        <meta name="description" content="Food list" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        Mes recettes
        {errorRecipes && "Error loading recipes"}
        {!errorRecipes &&
          recipes?.map((recipe) => {
            return <Box key={recipe.id}>{recipe.name}</Box>
          })}
      </main>
    </>
  )
}
