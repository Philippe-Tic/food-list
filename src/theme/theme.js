// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"

import tailwindColors from "./tailwindColors"

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    gray: tailwindColors.blueGray,
  },
})
