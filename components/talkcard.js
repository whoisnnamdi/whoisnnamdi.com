import Link from 'next/link'

export default function TalkCard({ item }) {
  const isInternal = !!item.slug

  const content = (
    <>
      {item.feature_image && (
        <div className="relative aspect-video overflow-hidden">
          <img
            src={item.feature_image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-serif text-lg mb-2 group-hover:text-coral transition-colors duration-150">
          {item.title}
        </h3>
        {item.excerpt && (
          <p className="text-text-secondary text-sm mb-3 line-clamp-2">{item.excerpt}</p>
        )}
        {item.dateFormatted && (
          <span className="font-mono text-xs text-cyan">
            {item.dateFormatted}
          </span>
        )}
      </div>
    </>
  )

  const className = "block group rounded-xl border border-border bg-surface overflow-hidden hover:border-coral/30 transition-colors duration-150"

  if (isInternal) {
    return (
      <Link href="[slug]" as={`/${item.slug}/`} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </a>
  )
}
