import Link from 'next/link'

const metrics = [
    { title: 'Seed Valuations Aren\'t Valuations', value: 85, color: 'bg-accent' },
    { title: '8x Benchmarking to Broken', value: 72, color: 'bg-neutral-800' },
    { title: 'The Venture Activity Index – Q4 2023', value: 65, color: 'bg-neutral-800' },
    { title: 'The Series A Bust', value: 58, color: 'bg-accent' },
]

export default function EssayMetrics({ posts = [] }) {
    // Use provided posts or fallback to default metrics
    const displayMetrics = posts.length > 0
        ? posts.slice(0, 4).map((post, i) => ({
            title: post.title,
            slug: post.slug,
            value: 85 - (i * 10),
            color: i % 2 === 0 ? 'bg-accent' : 'bg-neutral-800'
        }))
        : metrics

    return (
        <section className="py-8">
            <div className="space-y-4">
                {displayMetrics.map((item, index) => (
                    <Link
                        key={index}
                        href={item.slug ? `/${item.slug}` : '#'}
                        className="block group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium text-neutral-700 truncate group-hover:text-neutral-900 transition-colors">
                                    {item.title}
                                </h3>
                            </div>
                            <div className="w-32 h-2 bg-neutral-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${item.color} rounded-full transition-all duration-300`}
                                    style={{ width: `${item.value}%` }}
                                />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
