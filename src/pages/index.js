import { useCurrentUser, useLogOut } from "@/hooks/auth"
import { Box, Button, Center, Spinner, useToast } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/navigation"

import { useRecipes } from "../hooks/recipes"

export default function Home() {
  const toast = useToast()
  const { push } = useRouter()
  const { mutate: logOut, isLoading: isLoadingLogout } = useLogOut()

  const handleLogout = () => {
    logOut()
    toast({
      title: "Déconnexion",
      description: "",
      status: "success",
      duration: 9000,
      isClosable: true,
    })
    push("/signin")
  }

  const {
    isLoading: isLoadingCurrentUser,
    error: errorCurrentUser,
    data: user,
  } = useCurrentUser()

  console.log({ user })

  const {
    isLoading: isLoadingRecipes,
    error: errorRecipes,
    data: recipes,
  } = useRecipes()

  const isLoading = isLoadingRecipes || isLoadingCurrentUser || isLoadingLogout

  if (isLoading || errorCurrentUser) {
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
        <Button isLoading={isLoading} onClick={handleLogout}>
          Déco
        </Button>
        {errorRecipes && "Error loading recipes"}
        {!errorRecipes &&
          recipes?.map((recipe) => {
            return <Box key={recipe.id}>{recipe.name}</Box>
          })}
      </main>
    </>
  )
}
