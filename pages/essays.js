import Head from 'next/head'
import Navbar from '../components/navbar'
import { getPosts } from './api/ghost_data'
import SectionPage from '../components/sectionpage'
import Footer from '../components/footer'
import Analytics from '../components/analytics'
import postFormat from '../components/postformat'
import PostPreview from '../components/postpreview'

export async function getStaticProps() {
    const posts = postFormat(await getPosts())

    return {
        props: {
            posts
        }
    }
}

export default function Page ({ posts }) {
    const slug = "essays"
    const pageTitle = "Essays — Nnamdi Iregbulem"
    const pageDesc = "All essays by Nnamdi Iregbulem"
    const pageURL = "https://whoisnnamdi.com/essays"
    
    return (
        <div className="max-w-4xl sm:mx-auto px-6 mt-8 mb-10 lg:px-0">
            <Head>
            <meta charSet="utf-8" />
                <title>{pageTitle}</title>
                <meta name="description" content={pageDesc} />
                <link rel="canonical" href={pageURL} />
                <meta name="referrer" content="no-referrer-when-downgrade" />
                <meta property="og:site_name" content="Who is Nnamdi?" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDesc} />
                <meta property="og:url" content={pageURL} />
                <meta property="og:image" content="https://whoisnnamdi.com/content/images/2019/10/DSC_0562_cropped_2.jpg" />
                <meta property="article:publisher" content="https://www.facebook.com/nnamdi.iregbulem" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDesc} />
                <meta name="twitter:url" content={pageURL} />
                <meta name="twitter:site" content="@whoisnnamdi" />
            </Head>
            <Analytics />
            <Navbar source={slug}/>
            <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
                    All Essays
                </h1>
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <PostPreview post={post}/>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    )
}