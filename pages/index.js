import Head from 'next/head'
import Link from 'next/link'
import NavbarRedesign from '../components/NavbarRedesign'
import FooterRedesign from '../components/FooterRedesign'
import HeroSection from '../components/HeroSection'
import FeaturedEssayCard from '../components/FeaturedEssayCard'
import EssayListItem from '../components/EssayListItem'
import StatsRow from '../components/StatsRow'
import SubscribeCTA from '../components/SubscribeCTA'
import Analytics from '../components/analytics'
import { getPosts } from '../lib/content'

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

        post.excerpt = (post.excerpt || '').replace(/\[(.*?)\]/, "")

        const cutoff = 166

        post.excerpt = post.excerpt.substring(0, Math.min(cutoff, post.excerpt.length)) + (post.excerpt.length > cutoff ? "..." : "")
        post.excerpt = post.excerpt.replace(/\[(.*?)[$^.]/, "")
    })

    const featuredPosts = posts.filter((post) => {
        return ["dark-matter", "never-enough-developers", "developer-productivity-trends", "software-fat-tailed"].includes(post.slug)
    })

    return {
        props: {
            posts,
            featuredPosts
        }
    }
}

export default function Home({ posts, featuredPosts }) {
    const stats = [
        { label: 'Focus', value: 'Technology & Economics' },
        { label: 'Role', value: 'Partner at Lightspeed' },
        { label: 'Location', value: 'San Francisco, CA' },
    ]

    return (
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <Head>
                <meta charSet="utf-8" />
                <title>Who Is Nnamdi?</title>
                <meta name="description" content="Thoughts on technology, venture capital, and the economics of both" />
                <link rel="canonical" href="https://whoisnnamdi.com/" />
                <meta name="referrer" content="no-referrer-when-downgrade" />
                <meta property="og:site_name" content="Who is Nnamdi?" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Who is Nnamdi?" />
                <meta property="og:description" content="Thoughts on technology, venture capital, and the economics of both" />
                <meta property="og:url" content="https://whoisnnamdi.com/" />
                <meta property="og:image" content="https://whoisnnamdi.com/content/images/2019/10/DSC_0562_cropped_2.jpg" />
                <meta property="article:publisher" content="https://www.facebook.com/nnamdi.iregbulem" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Who is Nnamdi?" />
                <meta name="twitter:description" content="Thoughts on technology, venture capital, and the economics of both" />
                <meta name="twitter:url" content="https://whoisnnamdi.com/" />
                <meta name="twitter:site" content="@whoisnnamdi" />
            </Head>
            <Analytics />
            <NavbarRedesign source="Home" />

            {/* Hero Section */}
            <HeroSection />

            {/* Featured Essay */}
            {featuredPosts.length > 0 && (
                <section className="mb-16">
                    <FeaturedEssayCard post={featuredPosts[0]} />
                </section>
            )}

            {/* Latest Dispatches */}
            <section className="mb-16">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-2xl font-bold text-neutral-900">
                        Latest Dispatches
                    </h2>
                    <Link
                        href="/essays"
                        className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
                    >
                        View all &rarr;
                    </Link>
                </div>
                <div className="border-t border-neutral-200">
                    {posts.slice(0, 5).map((post) => (
                        <EssayListItem key={post.id} post={post} />
                    ))}
                </div>
            </section>

            {/* Stats Row */}
            <StatsRow stats={stats} />

            {/* Subscribe CTA */}
            <section className="my-16">
                <SubscribeCTA source="Homepage CTA" />
            </section>

            <FooterRedesign />
        </div>
    )
}
