import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Custom404() {
  const router = useRouter()

  useEffect(() => {
    if (router.asPath.startsWith('/notes/')) {
      window.location.href = '/notes/404.html'
    }
  }, [router.asPath])

  return <h1>404 - Page Not Found</h1>
}
