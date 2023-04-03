import { FormGroup } from "@/components/FormGroup"
import { useSignIn } from "@/hooks/auth"
import { useAuthContext } from "@/pages/_app"
import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { FiEye, FiEyeOff } from "react-icons/fi"

export const SignIn = () => {
  const { isAuthenticated, updateToken, setCurrentUser } = useAuthContext()
  const { push } = useRouter()
  const [isPassword, setIsPassword] = useState(true)
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  const toast = useToast()
  const { mutate: signIn, isLoading: isLoadingSignIn } = useSignIn()

  useEffect(() => {
    if (isAuthenticated) {
      push("/")
    }
  }, [isAuthenticated, push])

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="4" alignItems="flex-start">
            <FormGroup
              errorMessage={errors?.email?.message}
              showError={errors?.email}
              label="Email"
            >
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "L'email est requis",
                  pattern: {
                    value: emailPattern,
                    message: "Email invalide",
                  },
                }}
                render={({ field }) => <Input {...field} />}
              />
            </FormGroup>
            <FormGroup
              errorMessage={errors?.password?.message}
              showError={errors?.password}
              label="Mot de passe"
            >
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Le mot de passe est requis",
                }}
                render={({ field }) => (
                  <InputGroup>
                    <Input type={isPassword ? "password" : "text"} {...field} />
                    <InputRightElement>
                      <IconButton
                        size="sm"
                        onClick={() => {
                          setIsPassword(!isPassword)
                        }}
                        icon={<Icon as={isPassword ? FiEyeOff : FiEye} />}
                      />
                    </InputRightElement>
                  </InputGroup>
                )}
              />
            </FormGroup>
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
      </Box>
    </Flex>
  )
}
