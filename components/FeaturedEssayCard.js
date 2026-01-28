import Link from 'next/link'

function formatTitle(title) {
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
    const category = post.tags?.[0]?.name || 'Essays'
    const quote = (post.excerpt || '').replace(/\.$/, '')
    const date = post.dateFormatted || post.published_at

    return (
        <section className="grid grid-cols-1 lg:grid-cols-[1.6fr,1fr] border border-neutral-900 bg-white">
            <Link href={`/${post.slug}`} className="group block">
                <article className="relative h-full bg-neutral-900 text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12)_0,transparent_40%)]" />
                    <div className="relative z-10 px-8 py-10 lg:px-10 lg:py-12 h-full flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-4 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-300">
                                <span className="px-2 py-1 border border-neutral-500">Deep Dive</span>
                                <span className="text-neutral-400">{date}</span>
                            </div>
                            <h2 className="mt-6 font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
                                {firstPart}
                                {secondPart && (
                                    <span className="block italic text-neutral-300">{secondPart}</span>
                                )}
                            </h2>
                        </div>
                        <span className="mt-8 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-300">
                            Read full essay →
                        </span>
                    </div>
                </article>
            </Link>

            <aside className="border-t lg:border-t-0 lg:border-l border-neutral-300 px-8 py-10 lg:px-10 lg:py-12">
                <p className="font-serif text-xl italic text-neutral-800 leading-relaxed">
                    “{quote || 'Most of the value in software is invisible to traditional accounting.'}”
                </p>
                <div className="mt-6 space-y-3 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                        <span>Reading Time</span>
                        <span className="text-neutral-900">12 min</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                        <span>Category</span>
                        <span className="text-neutral-900">{category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Data Points</span>
                        <span className="text-neutral-900">4 charts</span>
                    </div>
                </div>
                <div className="mt-6 border border-neutral-200 p-4">
                    <div className="flex items-end gap-2 h-16">
                        {[20, 38, 30, 52, 68].map((height, index) => (
                            <div
                                key={index}
                                className={`w-full ${index === 3 ? 'bg-accent' : 'bg-neutral-800'}`}
                                style={{ height: `${height}%` }}
                            />
                        ))}
                    </div>
                    <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
                        Figure 1.2: Valuation multiples
                    </p>
                </div>
            </aside>
        </section>
    )
}
