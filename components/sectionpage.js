import Image from 'next/image'
import Link from 'next/link'
import PostPreview from './postpreview'

export default function SectionPage ({ posts, slug }) {
    return (
        <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
                Essays for {slug}
            </h1>
            <ul>
                {posts.filter((post) => {
                        return post.tags.filter((tag) => {
                            return tag.slug === slug
                        }).length > 0
                    }).map((post) => (
                    <li key={post.id}>
                        <PostPreview post={post}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}