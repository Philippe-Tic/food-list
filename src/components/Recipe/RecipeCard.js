import { Flex, Text } from "@chakra-ui/react"

export const RecipeCard = ({ recipe }) => {
  return (
    <Flex>
      {recipe.name}
      {recipe?.aliments?.map((aliment) => {
        console.log(Object.entries(aliment))
        return (
          <Text key={aliment}>
            {Object.entries(aliment)[0][0] +
              ": " +
              Object.entries(aliment)[0][1]}
            {/* nul */}
          </Text>
        )
      })}
    </Flex>
  )
}
