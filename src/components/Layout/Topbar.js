import { useLogOut } from "@/hooks/auth"
import { useAuthContext } from "@/pages/_app"
import {
  Box,
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  IconButton,
  VStack,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useRef } from "react"
import { FaMoon, FaSun } from "react-icons/fa"
import { FiMenu } from "react-icons/fi"

export const Topbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const { colorMode, toggleColorMode } = useColorMode()
  const { push } = useRouter()
  const { isAuthenticated } = useAuthContext()
  const { updateToken } = useAuthContext()
  const toast = useToast()
  const { mutate: logOut, isLoading: isLoadingLogout } = useLogOut()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const handleLogout = () => {
    logOut(
      {},
      {
        onSuccess: () => {
          updateToken(null)
          toast({
            title: "Déconnexion",
            description: "",
            status: "success",
            duration: 9000,
            isClosable: true,
          })
          push("/signin")
        },
      }
    )
  }
  return (
    <Box
      position="fixed"
      w="full"
      as="nav"
      bg={useColorModeValue("gray.100", "gray.900")}
      boxShadow="sm"
    >
      <Box px={{ base: 2, sm: 4, md: 8 }} py={{ base: "4", lg: "5" }}>
        <HStack spacing="10" justify="space-between">
          <Button
            colorScheme="pink"
            size="lg"
            onClick={() => {
              push("/recipes")
            }}
          >
            FoodList
          </Button>
          {isDesktop ? (
            <Flex justify="space-between" flex="1">
              <ButtonGroup variant="link" spacing="8">
                <Button
                  onClick={() => {
                    push("/recipes")
                  }}
                >
                  Mes recettes
                </Button>
                <Button
                  onClick={() => {
                    push("/community")
                  }}
                >
                  Communauté
                </Button>
                <Button
                  onClick={() => {
                    push("/food-list")
                  }}
                >
                  Liste de course
                </Button>
              </ButtonGroup>
              {isAuthenticated ? (
                <HStack spacing="3">
                  <Button isLoading={isLoadingLogout} onClick={handleLogout}>
                    Déconnexion
                  </Button>

                  <IconButton
                    onClick={toggleColorMode}
                    icon={<Icon as={colorMode === "dark" ? FaMoon : FaSun} />}
                  />
                </HStack>
              ) : (
                <HStack spacing="3">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      push("/signin")
                    }}
                  >
                    Connexion
                  </Button>
                  <Button
                    colorScheme="pink"
                    onClick={() => {
                      push("/signup")
                    }}
                  >
                    Inscription
                  </Button>
                  <IconButton
                    onClick={toggleColorMode}
                    icon={<Icon as={colorMode === "dark" ? FaMoon : FaSun} />}
                  />
                </HStack>
              )}
            </Flex>
          ) : (
            <HStack>
              <IconButton
                variant="ghost"
                onClick={toggleColorMode}
                icon={<Icon as={colorMode === "dark" ? FaMoon : FaSun} />}
              />
              <IconButton
                icon={<FiMenu fontSize="1.25rem" />}
                aria-label="Open Menu"
                ref={btnRef}
                onClick={onOpen}
              />
              <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>FoodList</DrawerHeader>
                  <DrawerBody as={VStack}>
                    {isAuthenticated ? (
                      <Button
                        isLoading={isLoadingLogout}
                        onClick={() => {
                          handleLogout()
                          onClose()
                        }}
                        w="full"
                      >
                        Déconnexion
                      </Button>
                    ) : (
                      <>
                        <Button
                          w="full"
                          onClick={() => {
                            onClose()
                            push("/signin")
                          }}
                        >
                          Connexion
                        </Button>
                        <Button
                          w="full"
                          colorScheme="pink"
                          onClick={() => {
                            onClose()
                            push("/signup")
                          }}
                        >
                          Inscription
                        </Button>
                      </>
                    )}
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </HStack>
          )}
        </HStack>
      </Box>
    </Box>
  )
}
