import Link from "next/link";

export default function EssayListItem({ post, variant = "default" }) {
  if (variant === "dispatch") {
    return (
      <Link href={`/${post.slug}`} className="block group">
        <article className="grid grid-cols-[84px,1fr,64px] gap-6 items-center py-6 border-b border-neutral-200">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">
            {post.dateFormatted}
          </span>
          <div className="min-w-0">
            <h3 className="text-lg font-serif text-neutral-900 group-hover:text-accent transition-colors">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="mt-1 text-sm text-neutral-500">{post.excerpt}</p>
            )}
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/${post.slug}`} className="block group">
      <article className="py-4 border-b border-neutral-200 last:border-b-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="mt-1 text-sm text-neutral-500">{post.excerpt}</p>
            )}
          </div>
          <span className="flex-shrink-0 text-sm text-neutral-400">
            {post.dateFormatted}
          </span>
        </div>
      </article>
    </Link>
  );
}
