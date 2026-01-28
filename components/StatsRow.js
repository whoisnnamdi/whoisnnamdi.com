export default function StatsRow({ stats }) {
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-y border-neutral-200">
            {stats.map((stat, index) => (
                <div key={index} className="text-center md:text-left">
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                        {stat.label}
                    </p>
                    <p className="text-lg font-semibold text-neutral-900">
                        {stat.value}
                    </p>
                </div>
            ))}
        </section>
    )
}
