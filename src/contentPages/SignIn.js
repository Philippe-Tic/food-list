import { FormInput } from "@/components/Form/FormInput"
import { FormPassword } from "@/components/Form/FormPassword"
import { useSignIn } from "@/hooks/auth"
import { useAuthContext } from "@/pages/_app"
import {
  Box,
  Button,
  Center,
  Flex,
  Spinner,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"

export const SignIn = () => {
  const { isAuthenticated, updateToken, setCurrentUser } = useAuthContext()
  const { push } = useRouter()
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  const toast = useToast()
  const { mutate: signIn, isLoading: isLoadingSignIn } = useSignIn()

  useEffect(() => {
    if (isAuthenticated) {
      push("/")
    }
  }, [isAuthenticated, push])

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async ({ email, password }) => {
    signIn(
      { email, password },
      {
        onSuccess: ({ session, user }) => {
          updateToken(session.access_token)
          setCurrentUser(user)
          toast({
            title: "Vous êtes connecté",
            status: "success",
            duration: 5000,
            isClosable: true,
          })
          push("/")
        },
        onError: () => {
          toast({
            title: "Erreur de connexion",
            description: "Identifiants invalides",
            status: "error",
            duration: 5000,
            isClosable: true,
          })
        },
      }
    )
  }

  const bgColor = useColorModeValue("gray.50", "gray.700")

  if (isAuthenticated) {
    return (
      <Box>
        <Center>
          <Spinner />
        </Center>
      </Box>
    )
  }

  return (
    <Flex
      w="full"
      flex="1"
      alignItems="center"
      justifyContent="center"
      h="full"
    >
      <Box
        borderRadius="xl"
        background={bgColor}
        boxShadow="lg"
        p={8}
        w="full"
        maxW="30rem"
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <VStack spacing="4" alignItems="flex-start">
              <FormInput
                name="email"
                label="Email"
                rules={{
                  required: "L'email est requis",
                  pattern: {
                    value: emailPattern,
                    message: "Email invalide",
                  },
                }}
              />
              <FormPassword
                name="password"
                label="Password"
                rules={{
                  required: "Le mot de passe est requis",
                }}
              />
              <Button variant="link" as={Link} href="/signup">
                Pas de compte ?
              </Button>
              <Button
                isLoading={isLoadingSignIn}
                colorScheme="pink"
                type="submit"
              >
                Connexion
              </Button>
            </VStack>
          </form>
        </FormProvider>
      </Box>
    </Flex>
  )
}
