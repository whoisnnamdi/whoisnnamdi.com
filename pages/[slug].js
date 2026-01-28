import Head from 'next/head'
import Image from "next/image"
import { getPosts, getPost, getPages, getPage } from '../lib/content'
import NavbarRedesign from '../components/NavbarRedesign'
import FooterRedesign from '../components/FooterRedesign'
import EssaySidebar from '../components/EssaySidebar'
import SubscribeCTA from '../components/SubscribeCTA'
import LinkConverter from '../components/linkconverter'
import Analytics from '../components/analytics'

export async function getStaticPaths() {
    const posts = await getPosts()
    const pages = (await getPages()).filter((p) => p.slug !== 'talks')
    const paths = posts.concat(pages).map((post) => ({
        params: { slug: post.slug }
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const posts = await getPosts()

    const isPost = posts.some((post) => post.slug === params.slug)
    const post = await (isPost ? getPost : getPage)(params.slug)

    // Extract headings for sidebar navigation
    const headingRegex = /<h2[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h2>/gi
    const sections = []
    let match
    while ((match = headingRegex.exec(post.html)) !== null) {
        sections.push({
            id: match[1],
            title: match[2].replace(/<[^>]*>/g, '').trim()
        })
    }

    return { props: { post, sections, isPost } }
}

export default function PostPage({ post, sections, isPost }) {
    return (
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
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
            <NavbarRedesign source={post.title} />

            <div className="flex gap-12 py-12">
                {/* Sidebar - only show for posts, not pages */}
                {isPost && <EssaySidebar sections={sections} />}

                {/* Main content */}
                <main className="flex-1 min-w-0">
                    <header className="mb-10">
                        <h1 className={`font-serif text-4xl md:text-5xl font-bold leading-tight text-neutral-900 ${post.slug === 'talks' ? 'mb-4' : 'mb-6'}`}>
                            {post.title}
                        </h1>
                        {isPost && post.published_at && (
                            <p className="text-neutral-500">
                                {new Intl.DateTimeFormat('default', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }).format(new Date(post.published_at))}
                            </p>
                        )}
                    </header>

                    {post.feature_image && (
                        <div className="mb-10 imageContainer">
                            <Image
                                src={post.feature_image}
                                alt={post.title}
                                width="0"
                                height="0"
                                sizes="100vw"
                                className="imageImage rounded-lg"
                                priority
                            />
                        </div>
                    )}

                    <article className={`prose prose-lg max-w-none prose-essay ${post.slug === 'talks' ? 'talks-prose' : ''}`}>
                        <LinkConverter content={post.html} />
                    </article>

                    {/* Subscribe CTA - only show for posts */}
                    {isPost && (
                        <div className="mt-16">
                            <SubscribeCTA source={`Essay: ${post.title}`} />
                        </div>
                    )}
                </main>
            </div>

            <FooterRedesign />
        </div>
    )
}
