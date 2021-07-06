import Head from 'next/head'
import Navbar from '../components/navbar'
import { getPosts } from './api/ghost_data'
import SectionPage from '../components/sectionpage'
import Footer from '../components/footer'
import Analytics from '../components/analytics'

export async function getStaticProps() {
    const posts = await getPosts()

    posts.map((post) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }

        post.dateFormatted = new Intl.DateTimeFormat('default', options).format(
            new Date(post.published_at)
        )
        
        post.excerpt = post.excerpt.replace(/\[(.*?)\]/, "")

        const cutoff = 166

        post.excerpt = post.excerpt.substring(0, Math.min(cutoff, post.excerpt.length)) + (post.excerpt.length > cutoff ? "..." : "")
        post.excerpt = post.excerpt.replace(/\[(.*?)[$^.]/, "")
    })

    return {
        props: {
            posts
        }
    }
}

export default function Page ({ posts }) {
    const slug = "founders"
    
    return (
        <div className="max-w-4xl sm:mx-auto px-6 mt-8 mb-10 lg:px-0">
            <Head>
            <meta charSet="utf-8" />
                <title>Essays for founders — Nnamdi Iregbulem</title>
                <meta name="description" content="The theories and realities of building a valuable tech startup" />
                <link rel="canonical" href="https://whoisnnamdi.com/founders" />
                <meta name="referrer" content="no-referrer-when-downgrade" />
                <meta property="og:site_name" content="Who is Nnamdi?" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Essays for founders — Nnamdi Iregbulem" />
                <meta property="og:description" content="The theories and realities of building a valuable tech startup" />
                <meta property="og:url" content="https://whoisnnamdi.com/founders" />
                <meta property="og:image" content="https://whoisnnamdi.com/content/images/2019/10/DSC_0562_cropped_2.jpg" />
                <meta property="article:publisher" content="https://www.facebook.com/nnamdi.iregbulem" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Essays for founders — Nnamdi Iregbulem" />
                <meta name="twitter:description" content="The theories and realities of building a valuable tech startup" />
                <meta name="twitter:url" content="https://whoisnnamdi.com/founders" />
                <meta name="twitter:site" content="@whoisnnamdi" />
                <Analytics />
            </Head>
            <Navbar source={slug}/>
            <SectionPage slug={slug} posts={posts}/>
            <Footer />
        </div>
    )
}