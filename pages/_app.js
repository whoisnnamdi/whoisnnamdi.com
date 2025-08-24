import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client'
import Head from 'next/head'
import { BotIdClient } from 'botid/client'

const protectedRoutes = [
    {
        path: '/api/subscribe',
        method: 'POST',
    },
];

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
        <>
            <Head>
                <BotIdClient protect={protectedRoutes} />
            </Head>
            <Component {...pageProps} />
        </>
    );
}