import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  IconButton,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { FaMoon, FaSun } from "react-icons/fa"
import { FiMenu } from "react-icons/fi"

export const Topbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const { colorMode, toggleColorMode } = useColorMode()
  const { push } = useRouter()

  return (
    <Box as="nav" bg={useColorModeValue("gray.100", "gray.900")} boxShadow="sm">
      <Box px={{ base: 2, sm: 4, md: 8 }} py={{ base: "4", lg: "5" }}>
        <HStack spacing="10" justify="space-between">
          <Button
            size="lg"
            onClick={() => {
              push("/")
            }}
          >
            FoodList
          </Button>
          {isDesktop ? (
            <Flex justify="space-between" flex="1">
              <ButtonGroup variant="link" spacing="8">
                <Button>Mes recettes</Button>
                <Button>Communauté</Button>
                <Button>Liste de course</Button>
              </ButtonGroup>
              <HStack spacing="3">
                <Button
                  variant="ghost"
                  onClick={() => {
                    push("/signin")
                  }}
                >
                  Sign in
                </Button>
                <Button
                  colorScheme="pink"
                  onClick={() => {
                    push("/signup")
                  }}
                >
                  Sign up
                </Button>
                <IconButton
                  onClick={toggleColorMode}
                  icon={<Icon as={colorMode === "dark" ? FaMoon : FaSun} />}
                />
              </HStack>
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
              />
            </HStack>
          )}
        </HStack>
      </Box>
    </Box>
  )
}
