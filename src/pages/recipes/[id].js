import { Box } from "@chakra-ui/react"
import { useRouter } from "next/router"

export default function Recipe() {
  const { query } = useRouter()
  console.log(query.id)

  return <Box>Recipe ?</Box>
}
