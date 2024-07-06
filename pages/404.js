import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Custom404() {
  const router = useRouter()

  useEffect(() => {
    if (router.asPath.startsWith('/notes/')) {
      if (typeof window !== 'undefined') {
        window.location.href = '/notes/404.html'
      }
    }
  }, [router.asPath])

  return null
}
