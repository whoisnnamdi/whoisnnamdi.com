import Head from 'next/head'
import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client'
import { Playfair_Display, Inter, IBM_Plex_Mono } from 'next/font/google'

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

const plexMono = IBM_Plex_Mono({
    subsets: ['latin'],
    weight: ['400', '500'],
    variable: '--font-plex-mono',
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
        <main className={`${playfair.variable} ${inter.variable} ${plexMono.variable} font-sans`}>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
                />
            </Head>
            <Component {...pageProps} />
        </main>
    )
}
