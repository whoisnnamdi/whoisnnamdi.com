import Link from 'next/link'
import Image from 'next/image'

function formatTitle(title) {
    // Check if title contains " of " to split for styling
    const ofIndex = title.lastIndexOf(' of ')
    if (ofIndex > 0 && ofIndex < title.length - 4) {
        const firstPart = title.substring(0, ofIndex + 4)
        const secondPart = title.substring(ofIndex + 4)
        return { firstPart, secondPart }
    }
    return { firstPart: title, secondPart: null }
}

export default function FeaturedEssayCard({ post }) {
    const { firstPart, secondPart } = formatTitle(post.title)

    return (
        <Link href={`/${post.slug}`} className="block group">
            <article className="bg-neutral-900 rounded-xl overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* Text content */}
                    <div className="flex-1 p-8 md:p-10">
                        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white bg-accent rounded-full mb-4">
                            Essay
                        </span>
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-neutral-200 transition-colors leading-tight">
                            {firstPart}
                            {secondPart && (
                                <span className="block italic text-neutral-300">{secondPart}</span>
                            )}
                        </h2>
                        {post.excerpt && (
                            <p className="text-neutral-400 text-base leading-relaxed mb-4">
                                {post.excerpt}
                            </p>
                        )}
                        <span className="text-sm text-neutral-500">
                            {post.dateFormatted}
                        </span>
                    </div>

                    {/* Feature image */}
                    {post.feature_image && (
                        <div className="relative w-full md:w-80 h-48 md:h-auto">
                            <Image
                                src={post.feature_image}
                                alt={post.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>
            </article>
        </Link>
    )
}
