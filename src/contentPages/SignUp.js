/* eslint-disable react-hooks/rules-of-hooks */
import { FormGroup } from "@/components/FormGroup"
import { useSignUp } from "@/hooks/auth"
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { FiEye, FiEyeOff } from "react-icons/fi"

export const SignUp = () => {
  const [isPassword, setIsPassword] = useState(true)
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  const { mutate: signUp, isLoading: isLoadingSignUp } = useSignUp()
  const { push } = useRouter()
  const toast = useToast()

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
      {" "}
      <Box
        borderRadius="xl"
        background={useColorModeValue("gray.50", "gray.700")}
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
      </Box>
    </Flex>
  )
}
