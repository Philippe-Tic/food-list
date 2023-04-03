import { Footer } from "@/components/Layout/Footer"
import { Main } from "@/components/Layout/Main"
import { Topbar } from "@/components/Layout/Topbar"
import { theme } from "@/theme/theme"
import { ChakraProvider, Flex } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createContext, useCallback, useContext, useState } from "react"

const isBrowserLoaded = typeof window !== "undefined"
const queryClient = new QueryClient()

const AuthContext = createContext(null)
export const useAuthContext = () => useContext(AuthContext)
const updateToken = (newToken) => {
  if (!isBrowserLoaded) {
    return () => undefined
  }

  if (!newToken) {
    localStorage.removeItem("authToken")
  } else {
    localStorage.setItem("authToken", newToken)
  }
}

export default function App({ Component, pageProps }) {
  const [authToken, setAuthToken] = useState(
    isBrowserLoaded && localStorage.getItem("authToken")
  )

  const [currentUser, setCurrentUser] = useState(
    isBrowserLoaded && localStorage.getItem("authToken")
  )

  const handleUpdateToken = useCallback(
    (newToken) => {
      setAuthToken(newToken)
      updateToken(newToken)
    },
    [setAuthToken]
  )
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider
          value={{
            isAuthenticated: !!authToken,
            updateToken: handleUpdateToken,
            currentUser,
            setCurrentUser,
          }}
        >
          <Flex minH="100vh" direction="column" flex="1">
            <Topbar />
            <Main>
              <Component {...pageProps} />
            </Main>
            <Footer />
          </Flex>
        </AuthContext.Provider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}
