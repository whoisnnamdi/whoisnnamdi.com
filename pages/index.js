import Head from 'next/head'
import Image from "next/legacy/image"
import Link from 'next/link'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import React, { useRef } from 'react'
import { getPosts } from '../lib/content'
import PostPreview from '../components/postpreview'
import Analytics from '../components/analytics'
import portrait from '../public/images/portrait-color-compressed.png'
import { useSubscribe } from '../components/subscribe'

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

export default function Home ({ posts, featuredPosts }) {
    const input = useRef(null)
    const subscribe = useSubscribe()
    
    const handleSubscribe = async (e) => {
        e.preventDefault()
        await subscribe(input.current.value, 'Hero', input)
    }

    return (
        <div className="max-w-4xl px-6 mx-auto lg:px-0 mt-8 mb-10">
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
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:space-x-4 justify-between mb-4 sm:mb-8">
                    <div className="flex flex-col justify-between mb-4 sm:mb-0 sm:w-2/3 md:w-2/3 lg:w-2/3">
                        <div className="">
                            <h1 className="font-bold text-4xl sm:text-5xl text-gray-900 mb-4 md:mb-5 lg:mb-7">Hi, I'm Nnamdi</h1>
                            <h2 className="leading-relaxed sm:leading-normal font-bold text-2xl sm:text-base md:text-xl lg:text-2xl text-gray-600 mb-4 md:mb-5 lg:mb-7">I'm a <span className="px-2 rounded-md bg-indigo-200">coder</span>, <span className="px-2 rounded-md bg-green-200">economist</span>, and <span className="px-2 rounded-md bg-yellow-200">venture investor</span>.</h2>
                            <p className="text-xl sm:text-base md:text-base lg:text-xl font-normal mb-4 md:mb-5 lg:mb-7">I invest in <span className="font-mono font-bold">technical tools</span> for <span className="font-mono font-bold">technical people.</span></p>
                            <p className="text-xl sm:text-base md:text-base lg:text-xl font-normal mb-4 md:mb-5 lg:mb-7"><span className="font-bold underline">I love writing.</span> My most popular essays combine theory, data, real-world relevance.</p>
                            <p className="text-xl sm:text-base md:text-base lg:text-xl font-normal mb-4 md:mb-5 lg:mb-7"><span className="font-bold">✨Subscribe below</span>, and find my writing just below that.</p>
                        </div>
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-between">
                            <input 
                                id="email-input"
                                name="email"
                                placeholder="Type your email..."
                                ref={input}
                                type="email"
                                required
                                className="text-gray-500 flex-1 transition duration-500 hover:bg-gray-200 bg-gray-100 sm:w-80 rounded-md px-4 py-2 focus:ring-blue-500 focus:outline-none" />
                            <button type="submit" className="md:w-1/4 transition duration-500 ease-in-out sm:w-40 rounded-md py-2 px-2 text-white font-semibold bg-blue-500 shadow-md hover:bg-blue-400 focus:outline-none">
                                Subscribe
                            </button>
                        </form>                   
                    </div>
                    <Image
                        src={portrait}
                        width={346}
                        height={400}
                        alt="Nnamdi Iregbulem"
                        className="sm:w-1/3 md:w-1/3 lg:w-1/3 rounded-md"
                        priority
                    />
                </div>
                <div className="flex flex-col sm:flex-row justify-between space-y-10 sm:space-x-10 sm:space-y-0">
                    <Link
                        href="/founders"
                        className="flex-1 transition duration-500 ease-in-out transform sm:hover:scale-105 font-normal text-md text-center py-10 px-6 rounded-xl border border-black border-opacity-10">

                        <p className="text-5xl mb-5">🚀</p>
                        <h2 className="font-bold text-2xl sm:text-2xl mb-2 text-gray-900">Founders</h2>
                        <p className="text-xl md:text-lg lg:text-xl">The theories and realities of building a valuable tech startup</p>

                    </Link>
                    <Link
                        href="/developers"
                        className="flex-1 transition duration-500 ease-in-out transform hover:scale-105 font-normal text-md text-center py-10 px-6 rounded-xl border border-black border-opacity-10">

                        <p className="text-5xl mb-5">👨‍💻👩‍💻</p>
                        <h2 className="font-bold text-2xl sm:text-2xl mb-2 text-gray-900">Developers</h2>
                        <p className="text-xl md:text-lg lg:text-xl">Software development, tooling, and the careers of software engineers</p>

                    </Link>
                    <Link
                        href="/investors"
                        className="flex-1 transition duration-500 ease-in-out transform hover:scale-105 font-normal text-md text-center py-10 px-6 rounded-xl border border-black border-opacity-10">

                        <p className="text-5xl mb-5">💸</p>
                        <h2 className="font-bold text-2xl sm:text-2xl mb-2 text-gray-900">Investors</h2>
                        <p className="text-xl md:text-lg lg:text-xl">Analysis, charts, and equations for nerdy investors (like myself)</p>

                    </Link>
                </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center mt-8">
                Featured Essay
            </h2>
            <ul>
                {featuredPosts.slice(0, 1).map((post) => (
                    <li key={post.id}>
                        <PostPreview post={post}/>
                    </li>
                ))}
            </ul>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center mt-8">
                Latest Essays
            </h2>
            <ul>
                {posts.slice(0, 5).map((post) => (
                    <li key={post.id}>
                        <PostPreview post={post}/>
                    </li>
                ))}
            </ul>
            <Footer />
        </div>
    );
}
