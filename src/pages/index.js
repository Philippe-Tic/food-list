import { useAuthContext } from "@/pages/_app"
import { Spinner } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Home() {
  const { isAuthenticated } = useAuthContext()
  const { push } = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      push("/recipes")
    }
  }, [isAuthenticated, push])

  return (
    <>
      <Head>
        <title>Food List</title>
        <meta name="description" content="Food list" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Spinner />
      </main>
    </>
  )
}
