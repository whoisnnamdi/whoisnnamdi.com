export default function EssaySidebar({ sections = [], post }) {
    const publishedDate = post?.published_at
        ? new Intl.DateTimeFormat('default', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(new Date(post.published_at))
        : null
    const updatedDate = post?.updated_at
        ? new Intl.DateTimeFormat('default', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(new Date(post.updated_at))
        : null
    const category = post?.tags?.[0]?.name || 'Research'
    const rawExcerpt = post?.excerpt || 'Independent analysis on technology, markets, and venture capital.'
    const excerpt = rawExcerpt.length > 140 ? `${rawExcerpt.slice(0, 140)}...` : rawExcerpt

    return (
        <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-8 space-y-6">
                <div className="border border-neutral-300 bg-white px-4 py-5">
                    <div className="space-y-4 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                        <div>
                            <p className="text-neutral-400">Role</p>
                            <p className="mt-1 text-neutral-900">Writer / Analyst</p>
                        </div>
                        {publishedDate && (
                            <div>
                                <p className="text-neutral-400">Date</p>
                                <p className="mt-1 text-neutral-900">{publishedDate}</p>
                            </div>
                        )}
                        <div>
                            <p className="text-neutral-400">Category</p>
                            <p className="mt-1 text-accent">{category}</p>
                        </div>
                    </div>
                </div>

                <div className="border border-neutral-300 bg-white p-6 flex items-center justify-center">
                    <svg
                        viewBox="0 0 80 80"
                        className="w-20 h-20 text-accent"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <circle cx="40" cy="40" r="28" />
                        <line x1="40" y1="12" x2="40" y2="68" />
                        <line x1="12" y1="40" x2="68" y2="40" />
                        <line x1="20" y1="20" x2="60" y2="60" />
                        <line x1="60" y1="20" x2="20" y2="60" />
                        <circle cx="40" cy="40" r="8" />
                    </svg>
                </div>

                <div className="space-y-4">
                    <div className="border border-neutral-300 bg-white px-4 py-4">
                        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent">Key Insight</p>
                        <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                            {excerpt}
                        </p>
                    </div>
                    <div className="border border-neutral-300 bg-white px-4 py-4">
                        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent">Data Source</p>
                        <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                            Original analysis, public market and venture datasets.
                        </p>
                    </div>
                    {updatedDate && (
                        <div className="border border-neutral-300 bg-white px-4 py-4">
                            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent">Last Updated</p>
                            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                                {updatedDate}
                            </p>
                        </div>
                    )}
                </div>

                {sections.length > 0 && (
                    <nav className="space-y-2 border border-neutral-300 bg-white px-4 py-5">
                        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-3">
                            On this page
                        </p>
                        <ul className="space-y-1">
                            {sections.map((section, index) => (
                                <li key={index}>
                                    <a
                                        href={`#${section.id}`}
                                        className="block text-sm text-neutral-500 hover:text-neutral-900 transition-colors py-1"
                                    >
                                        {section.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>
        </aside>
    )
}
