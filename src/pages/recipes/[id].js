import { FormGroup } from "@/components/FormGroup"
import { useRecipe } from "@/hooks/recipes"
import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Spinner,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

export default function Recipe() {
  const { query, isReady, back } = useRouter()

  const {
    isLoading: isLoadingRecipe,
    error: errorRecipe,
    data: recipe,
  } = useRecipe(query.id, isReady)

  if (isLoadingRecipe) {
    return (
      <Box>
        <Center>
          <Spinner />
        </Center>
      </Box>
    )
  }

  console.log({ recipe })

  return (
    <VStack maxW="45rem" spacing="12" w="full" alignItems="flex-start">
      <HStack spacing="4">
        <IconButton onClick={back} icon={<Icon as={FaArrowLeft} />} />
        <Text fontSize="lg" fontWeight="bold">
          {recipe?.name}
        </Text>
      </HStack>
      <List spacing={3}>
        {recipe?.food?.map((elt) => {
          return (
            <ListItem key={elt?.name}>
              <ListIcon as={FaArrowRight} color="pink.500" />
              {elt?.name}: {elt?.quantity}
              {elt?.unity}
            </ListItem>
          )
        })}
      </List>
      <FormGroup label="Recette">
        <Textarea
          minH="10rem"
          isReadOnly
          defaultValue={recipe?.recipe}
        ></Textarea>
      </FormGroup>
    </VStack>
  )
}
