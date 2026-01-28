import Link from 'next/link'

export default function EssayListItem({ post }) {
    return (
        <Link href={`/${post.slug}`} className="block group">
            <article className="py-4 border-b border-neutral-100 last:border-b-0">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary transition-colors truncate">
                            {post.title}
                        </h3>
                        {post.excerpt && (
                            <p className="mt-1 text-sm text-neutral-500 line-clamp-1">
                                {post.excerpt}
                            </p>
                        )}
                    </div>
                    <span className="flex-shrink-0 text-sm text-neutral-400">
                        {post.dateFormatted}
                    </span>
                </div>
            </article>
        </Link>
    )
}
