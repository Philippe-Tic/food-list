import {
  Badge,
  Divider,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  Wrap,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { FaArrowRight, FaEllipsisV } from "react-icons/fa"

export const RecipeCard = ({ recipe }) => {
  const { push } = useRouter()
  return (
    <VStack
      alignItems="flex-start"
      w="full"
      h="full"
      minH="10rem"
      background={useColorModeValue("gray.200", "gray.900")}
      borderRadius="xl"
      boxShadow="lg"
      p={6}
      flexDir="column"
      spacing="auto"
    >
      <Text fontSize="lg" fontWeight="bold">
        {recipe.name}
      </Text>
      <Divider />
      <Wrap>
        {recipe?.food?.map((element) => {
          return (
            <WrapItem key={element.name}>
              <Badge>{element.name}</Badge>
            </WrapItem>
          )
        })}
      </Wrap>
      <HStack justifyContent="flex-end" w="full">
        <Menu>
          <MenuButton as={IconButton} icon={<Icon as={FaEllipsisV} />} />
          <MenuList>
            <MenuItem
              onClick={() => {
                push(`/recipes/${recipe.id}/edit`)
              }}
            >
              Modifier
            </MenuItem>
            <MenuItem>Supprimer</MenuItem>
          </MenuList>
        </Menu>
        <IconButton
          onClick={() => {
            push(`/recipes/${recipe.id}`)
          }}
          icon={<Icon as={FaArrowRight} />}
        />
      </HStack>
    </VStack>
  )
}
