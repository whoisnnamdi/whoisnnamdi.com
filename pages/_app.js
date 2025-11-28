import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'
import * as Fathom from 'fathom-client'

export default function App({ Component, pageProps }) {
    const router = useRouter()

    useEffect(() => {
        Fathom.load(process.env.NEXT_PUBLIC_FATHOM_KEY, {
            includedDomains: ['whoisnnamdi.com', 'www.whoisnnamdi.com'],
            url: process.env.NEXT_PUBLIC_FATHOM_URL,
        })

        function onRouteChangeComplete() {
            Fathom.trackPageview()
        }

        router.events.on('routeChangeComplete', onRouteChangeComplete)

        return () => {
            router.events.off('routeChangeComplete', onRouteChangeComplete)
        }
    }, [])

    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}
