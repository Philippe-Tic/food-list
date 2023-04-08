import { ConfirmMenuItem } from "@/components/ConfirmMenuItem"
import { useDeleteRecipe } from "@/hooks/recipes"
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
  Spinner,
  Text,
  VStack,
  Wrap,
  WrapItem,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { FaArrowRight, FaEllipsisV } from "react-icons/fa"

export const RecipeCard = ({ recipe }) => {
  const { push } = useRouter()
  const { mutate: deleteRecipe, isLoading } = useDeleteRecipe()

  const toast = useToast()

  const handleDelete = async () => {
    deleteRecipe(recipe?.id, {
      onSuccess: () => {
        toast({
          title: "Recette supprimée",
          description: "",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
      },
      onError: () => {
        toast({
          title: "Impossible de supprimer la recette",
          description: "",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      },
    })
  }

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
      <HStack flex="1" alignItems="flex-end" justifyContent="flex-end" w="full">
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
            <ConfirmMenuItem onClick={handleDelete}>
              {isLoading ? <Spinner /> : "Supprimer"}
            </ConfirmMenuItem>
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
