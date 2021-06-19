import Head from 'next/head'
import Link from 'next/link'
import { getPosts, getPost } from '../api/ghost_data'
import Navbar from '../components/navbar'

export async function getStaticPaths() {
    const posts = await getPosts()
    const paths = posts.map((post) => ({
        params: { slug: post.slug }
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const post = await getPost(params.slug)

    return { props: { post: post } }
}

export default function PostPage ({ post }) {
    let _title = post.title

    return (
        <div className="max-w-4xl px-6 sm:mx-auto lg:px-0 mt-10 mb-10">
            <Head>
                <title>{_title}</title>
            </Head>
            <Navbar />
            <h1>
                {_title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
    )
}