import { Footer } from "@/components/Layout/Footer"
import { Main } from "@/components/Layout/Main"
import { Topbar } from "@/components/Layout/Topbar"
import { theme } from "@/theme/theme"
import { ChakraProvider, Flex } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Flex minH="100vh" direction="column" flex="1">
          <Topbar />
          <Main>
            <Component {...pageProps} />
          </Main>
          <Footer />
        </Flex>
      </QueryClientProvider>
    </ChakraProvider>
  )
}
