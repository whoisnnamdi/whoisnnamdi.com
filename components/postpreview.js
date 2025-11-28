import Link from 'next/link'
import Image from "next/legacy/image"

export default function PostPreview ({ post, featured = false }) {
    if (featured) {
        // Featured card with image
        return (
            <Link
                href="[slug]"
                as={`/${post.slug}/`}
                className="group block rounded-xl overflow-hidden border border-border bg-surface hover:border-coral/30 transition-colors duration-150"
            >
                <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-2/5 h-48 md:h-56">
                        <Image
                            src={post.feature_image}
                            alt={post.title}
                            layout="fill"
                            objectFit="cover"
                            sizes="(max-width: 768px) 100vw, 40vw"
                        />
                    </div>
                    <div className="flex flex-col justify-center p-6 md:p-8 md:w-3/5">
                        <h3 className="font-serif text-xl md:text-2xl mb-3 group-hover:text-coral transition-colors duration-150">
                            {post.title}
                        </h3>
                        <p
                            className="text-text-secondary text-base mb-4 line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: post.excerpt }}
                        />
                        <p className="font-mono text-sm text-cyan">
                            {post.dateFormatted}
                        </p>
                    </div>
                </div>
            </Link>
        )
    }

    // Compact list item
    return (
        <Link
            href="[slug]"
            as={`/${post.slug}/`}
            className="group block py-4 border-b border-border last:border-b-0 hover:border-coral/30 transition-colors duration-150"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg md:text-xl mb-1 group-hover:text-coral transition-colors duration-150 truncate">
                        {post.title}
                    </h3>
                    <p
                        className="text-text-secondary text-sm md:text-base line-clamp-1 hidden sm:block"
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                </div>
                <p className="font-mono text-sm text-cyan flex-shrink-0">
                    {post.dateFormatted}
                </p>
            </div>
        </Link>
    )
}
