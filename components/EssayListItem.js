import Image from "next/image";
import Link from "next/link";

const FALLBACK_BARS = [22, 36, 28, 52, 34];

export default function EssayListItem({ post, variant = "default" }) {
  if (variant === "dispatch") {
    return (
      <Link href={`/${post.slug}`} className="block group">
        <article className="grid grid-cols-1 lg:grid-cols-[1fr,180px] gap-6 items-center py-6 border-b border-neutral-200">
          <div className="min-w-0">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">
              {post.dateFormatted}
            </span>
            <h3 className="mt-2 text-lg font-serif text-neutral-900 group-hover:text-accent transition-colors">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="mt-1 text-sm text-neutral-500 line-clamp-2">
                {post.excerpt}
              </p>
            )}
          </div>
          <div className="hidden lg:block w-full">
            <div className="border border-neutral-300 bg-white">
              {post.feature_image ? (
                <div className="relative h-24 w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={post.feature_image}
                    alt={post.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition"
                    sizes="180px"
                  />
                </div>
              ) : (
                <div className="h-24 flex items-end gap-1 p-3 bg-neutral-100">
                  {FALLBACK_BARS.map((height, index) => (
                    <div
                      key={index}
                      className={`w-full ${
                        index === 3 ? "bg-accent" : "bg-neutral-800"
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "archive") {
    const tags = (post.tags || []).slice(0, 2).map((tag) => tag.name);
    const tagLabel = tags.length ? tags.join(" / ") : "Essay";

    return (
      <Link href={`/${post.slug}`} className="block group">
        <article className="grid grid-cols-1 lg:grid-cols-[1fr,180px] gap-6 items-center py-6 border-b border-neutral-200 last:border-b-0">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">
              <span>{post.dateFormatted}</span>
              <span className="w-1 h-1 bg-neutral-400" />
              <span className="text-neutral-400">{tagLabel}</span>
            </div>
            <h3 className="mt-3 font-serif text-2xl text-neutral-900 group-hover:text-accent transition-colors">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            )}
            <div className="mt-4 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400">
              Read essay →
            </div>
          </div>
          <div className="w-full">
            <div className="border border-neutral-300 bg-white">
              {post.feature_image ? (
                <div className="relative h-24 w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={post.feature_image}
                    alt={post.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition"
                    sizes="(min-width: 1024px) 180px, 100vw"
                  />
                </div>
              ) : (
                <div className="h-24 flex items-end gap-1 p-3 bg-neutral-100">
                  {FALLBACK_BARS.map((height, index) => (
                    <div
                      key={index}
                      className={`w-full ${
                        index === 3 ? "bg-accent" : "bg-neutral-800"
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              )}
            </div>
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
