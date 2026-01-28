import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client'
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
})

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

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
        <main className={`${playfair.variable} ${inter.variable} font-sans`}>
            <Component {...pageProps} />
        </main>
    )
}