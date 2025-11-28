import Head from 'next/head'
import Image from "next/legacy/image"
import Link from 'next/link'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import React, { useRef } from 'react'
import { getPosts, getAll } from './api/ghost_data'
import PostPreview from '../components/postpreview'
import Analytics from '../components/analytics'
import portrait from '../public/images/portrait-color-compressed.png'
import fs from 'fs-extra'
import axios from 'axios'
import path from 'path'
import { useSubscribe } from '../components/subscribe'

export async function getStaticProps() {
    const posts = await getPosts()
    const postsPages = await getAll()

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

    const downloadImage = async (image) => {
        try {
            const filePath = path.join("public", image.replace(/\bhttps?:\/\/[^)''"\/]+/, ""))
            await fs.ensureDir(path.dirname(filePath))

            fs.open(filePath, "wx", async (err, fd) => {
                if (err) {
                    if (err.code === "EEXIST") {
                        return
                    }

                    console.log(err, filePath)
                } else {
                    const res = await axios({ url: image, responseType: "stream" })
                    res.data.pipe(fs.createWriteStream(filePath))
                }
            })
        } catch {
            console.log("Image download failed: ", image)
        }

    }

    postsPages.forEach(post => {
        try {
            post.html.match(/\bhttps?:[^)''"]+\/content\/images[^)''"]+\.(?:jpg|jpeg|gif|png|svg)/g).forEach(image => {
                if (!image.includes("600w") && !image.includes("1000w") && !image.includes("1600w")) {
                    downloadImage(image)
                }
            })
        } catch {

        }
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

export default function Home ({ posts, featuredPosts }) {
    const input = useRef(null)
    const subscribe = useSubscribe()

    const handleSubscribe = async (e) => {
        e.preventDefault()
        await subscribe(input.current.value, 'Hero', input)
    }

    return (
        <div className="max-w-3xl px-6 mx-auto lg:px-0">
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
            <Navbar source="Home"/>

            {/* Hero Section */}
            <section className="mb-16 md:mb-20">
                <div className="flex flex-col-reverse md:flex-row md:items-start md:justify-between gap-8 md:gap-12">
                    <div className="flex-1">
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                            Nnamdi Iregbulem
                        </h1>
                        <p className="text-lg md:text-xl text-text-secondary mb-6 leading-relaxed">
                            <span className="text-coral">Coder</span>
                            <span className="mx-2 text-text-tertiary">·</span>
                            <span className="text-cyan">Economist</span>
                            <span className="mx-2 text-text-tertiary">·</span>
                            <span className="text-text-primary">Investor</span>
                        </p>
                        <p className="text-base md:text-lg text-text-secondary mb-8 leading-relaxed max-w-lg">
                            I invest in technical tools for technical people. My essays combine theory, data, and real-world relevance.
                        </p>

                        {/* Subscribe Form */}
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
                            <input
                                id="email-input"
                                name="email"
                                placeholder="your@email.com"
                                ref={input}
                                type="email"
                                required
                                className="flex-1 rounded-lg px-4 py-3 text-base bg-surface border border-border focus:border-coral focus:outline-none transition-colors"
                            />
                            <button
                                type="submit"
                                className="rounded-lg py-3 px-6 text-base font-medium text-white bg-coral hover:opacity-90 transition-opacity"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex-shrink-0">
                        <Image
                            src={portrait}
                            width={192}
                            height={222}
                            alt="Nnamdi Iregbulem"
                            className="rounded-xl"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* Featured Essay */}
            <section className="mb-16">
                <h2 className="font-serif text-2xl md:text-3xl mb-6">
                    <span className="border-b-2 border-coral pb-1">Featured</span>
                </h2>
                <ul>
                    {featuredPosts.slice(0, 1).map((post) => (
                        <li key={post.id}>
                            <PostPreview post={post} featured />
                        </li>
                    ))}
                </ul>
            </section>

            {/* Latest Essays */}
            <section className="mb-16">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-2xl md:text-3xl">
                        <span className="border-b-2 border-coral pb-1">Latest</span>
                    </h2>
                    <Link
                        href="/essays"
                        className="text-sm text-text-secondary hover:text-coral transition-colors"
                    >
                        View all →
                    </Link>
                </div>
                <ul className="space-y-4">
                    {posts.slice(0, 5).map((post) => (
                        <li key={post.id}>
                            <PostPreview post={post} />
                        </li>
                    ))}
                </ul>
            </section>

            <Footer />
        </div>
    );
}
