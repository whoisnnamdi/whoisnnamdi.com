import Head from 'next/head'
import Image from "next/image"
import { getPosts, getPost, getPages, getPage } from './api/ghost_data'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import LinkConverter from '../components/linkconverter'
import Analytics from '../components/analytics'
import { MathJax, MathJaxContext } from "better-react-mathjax"

export async function getStaticPaths() {
    const posts = await getPosts()
    const pages = await getPages()
    const paths = posts.concat(pages).map((post) => ({
        params: { slug: post.slug }
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const posts = await getPosts()

    if (posts.map((post) => (post.slug)).includes(params.slug)) {
        var getter = getPost
    } else {
        var getter = getPage
    }

    const post = await getter(params.slug)
    //const post = await getPost(params.slug)

    return { props: { post: post } }
}

export default function PostPage ({ post }) {
    return (
        <div className="max-w-4xl sm:mx-auto px-6 mt-8 mb-10 lg:px-0">
            <Head>
                <meta charSet="utf-8" />
                <title>{post.title}</title>
                <meta name="description" content={post.meta_description}/>
                <link rel="canonical" content={post.canonical_url} />
                <meta property="og:site_name" content="Who is Nnamdi?" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.og_description} />
                <meta property="og:url" content={"https://whoisnnamdi.com/" + post.slug + "/"} />
                <meta property="og:image" content={post.feature_image} />
                <meta property="article:published_time" content={post.published_at} />
                <meta property="article:modified_time" content={post.updated_at} />
                <meta property="article:publisher" content="https://www.facebook.com/nnamdi.iregbulem" />
                <meta property="article:author" content="https://www.facebook.com/nnamdi.iregbulem" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.twitter_title} />
                <meta name="twitter:description" content={post.twitter_description} />
                <meta name="twitter:url" content={"https://whoisnnamdi.com/" + post.slug + "/"} />
                <meta name="twitter:image" content={post.twitter_image} />
                <meta name="twitter:label1" content="Written by" />
                <meta name="twitter:data1" content="Nnamdi Iregbulem" />
                <meta name="twitter:site" content="@whoisnnamdi" />
                <meta name="twitter:creator" content="@whoisnnamdi" />
                <meta property="og:image:width" content="1172" />
                <meta property="og:image:height" content="584" />
            </Head>
            <Analytics />
            <Navbar source={post.title}/>
            <MathJaxContext hideUntilTypeset="first">
                <MathJax>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-gray-900">
                        {post.title}
                    </h1>
                    <div className="prose md:prose-md lg:prose-lg max-w-4xl sm:mx-auto">
                        {post.feature_image ?
                            <div className="imageContainer">
                                <Image
                                    src={post.feature_image}
                                    alt={post.title}
                                    width="0"
                                    height="0"
                                    sizes="100vw"
                                    // layout="fill"
                                    className="imageImage rounded-lg"
                                    priority
                                />
                            </div> :
                            null
                        }
                        <LinkConverter content={post.html} />
                    </div>
                </MathJax>
            </MathJaxContext>
            <Footer />
        </div>
    )
}