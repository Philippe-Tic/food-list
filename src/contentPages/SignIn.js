import { FormGroup } from "@/components/FormGroup"
import { useSignIn } from "@/hooks/auth"
import {
  Box,
  Button,
  Center,
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
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { FiEye, FiEyeOff } from "react-icons/fi"

export const SignIn = () => {
  const { push } = useRouter()
  const [isPassword, setIsPassword] = useState(true)
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  const toast = useToast()
  const { mutate: signIn, isLoading: isLoadingSignIn } = useSignIn()

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
        onSuccess: () => {
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

  return (
    <Center>
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
    </Center>
  )
}
