import {
  Button,
  Icon,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FaClipboardList, FaGlobe, FaMitten } from "react-icons/fa"

export const Footer = () => {
  const { pathname, push } = useRouter()
  const [activeRoute, setActiveRoute] = useState("")

  useEffect(() => {
    if (pathname === "/recipes") {
      setActiveRoute("recipes")
    } else if (pathname === "/food-list") {
      setActiveRoute("food-list")
    } else if (pathname === "/community") {
      setActiveRoute("community")
    } else {
      setActiveRoute(pathname?.split("/")?.[1] || "/404")
    }
  }, [pathname])

  const isRecipeActive = activeRoute === "recipes"
  const isFoodListActive = activeRoute === "food-list"
  const isCommunityActive = activeRoute === "community"

  const activeColor = useColorModeValue("pink.600", "pink.200")
  const inactiveColor = useColorModeValue("gray.500", "white")
  const activeBg = useColorModeValue("gray.100", "gray.900")
  const inactiveBg = useColorModeValue("gray.50", "gray.900")

  return (
    <SimpleGrid
      display={{ base: "grid", lg: "none" }}
      position="fixed"
      bottom="0"
      left="0"
      w="full"
      columns="3"
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <VStack
        as={Button}
        borderRadius="none"
        variant="ghost"
        alignItems="center"
        py="5"
        h="full"
        color={isRecipeActive ? activeColor : inactiveColor}
        background={isRecipeActive ? activeBg : inactiveBg}
        onClick={() => push("/recipes")}
      >
        <Icon as={FaMitten}></Icon>
        <Text fontSize="xs" fontWeight={isRecipeActive ? "bold" : "500"}>
          MES RECETTES
        </Text>
      </VStack>
      <VStack
        as={Button}
        borderRadius="none"
        variant="ghost"
        alignItems="center"
        py="5"
        h="full"
        color={isCommunityActive ? activeColor : inactiveColor}
        background={isCommunityActive ? activeBg : inactiveBg}
        onClick={() => push("/community")}
      >
        <Icon as={FaGlobe}></Icon>
        <Text fontSize="xs" fontWeight={isCommunityActive ? "bold" : "500"}>
          COMMUNAUTÉ
        </Text>
      </VStack>
      <VStack
        as={Button}
        borderRadius="none"
        variant="ghost"
        alignItems="center"
        py="5"
        h="full"
        color={isFoodListActive ? activeColor : inactiveColor}
        background={isFoodListActive ? activeBg : inactiveBg}
        onClick={() => push("/food-list")}
      >
        <Icon as={FaClipboardList}></Icon>
        <Text fontSize="xs" fontWeight={isFoodListActive ? "bold" : "500"}>
          COURSES
        </Text>
      </VStack>
    </SimpleGrid>
  )
}
