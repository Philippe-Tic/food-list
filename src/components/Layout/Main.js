import { Flex } from "@chakra-ui/react"

export const Main = ({ children, ...props }) => {
  return (
    <Flex
      px={{ base: 2, sm: 4, md: 8 }}
      as="main"
      role="main"
      direction="column"
      flex="1"
      py="24"
      {...props}
    >
      {children}
    </Flex>
  )
}
