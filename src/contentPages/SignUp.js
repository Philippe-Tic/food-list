/* eslint-disable react-hooks/rules-of-hooks */
import { FormInput } from "@/components/Form/FormInput"
import { FormPassword } from "@/components/Form/FormPassword"
import { useSignUp } from "@/hooks/auth"
import {
  Box,
  Button,
  Flex,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { FormProvider, useForm } from "react-hook-form"

export const SignUp = () => {
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  const { mutate: signUp, isLoading: isLoadingSignUp } = useSignUp()
  const { push } = useRouter()
  const toast = useToast()

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async ({ email, password }) => {
    signUp(
      { email, password },
      {
        onSuccess: () => {
          toast({
            title: "Vous êtes inscrit",
            description: "Un mail de confirmation vous a été envoyé",
            status: "success",
            duration: 5000,
            isClosable: true,
          })
          push("/signin")
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
        background={useColorModeValue("gray.50", "gray.700")}
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
              <Flex w="full">
                <Button variant="link" as={Link} href="/signin">
                  Déjà un compte ?
                </Button>
              </Flex>
              <Button
                isLoading={isLoadingSignUp}
                colorScheme="pink"
                type="submit"
              >
                Inscription
              </Button>
            </VStack>
          </form>
        </FormProvider>
      </Box>
    </Flex>
  )
}
