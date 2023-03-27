import { FormGroup } from "@/components/FormGroup"
import { supabase } from "@/lib/initSupabase"
import {
  Box,
  Button,
  Center,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
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
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        toast({
          title: "Erreur de connexion",
          description: "Identifiants invalides",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      }
      if (data?.session) {
        toast({
          title: "Vous êtes connecté",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
        push("/")
      }
    } catch (error) {
      console.error("error", error)
    }
  }
  return (
    <Center>
      <Box
        borderRadius="xl"
        background="gray.50"
        boxShadow="lg"
        p={8}
        mt="32"
        w="50%"
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
                render={({ field }) => <Input background="white" {...field} />}
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
                    <Input
                      background="white"
                      type={isPassword ? "password" : "text"}
                      {...field}
                    />
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
              Pas de compte ? Inscrivez-vous
            </Button>
            <Button colorScheme="pink" type="submit">
              Connexion
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  )
}
