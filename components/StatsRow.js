export default function StatsRow({ stats, showBars = false, variant = 'default' }) {
    if (variant === 'dark') {
        return (
            <section className="bg-neutral-900 text-white border-y border-neutral-900">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-6 lg:px-10 py-6 bg-grid-dark">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-left">
                            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-300">
                                {stat.label}
                            </p>
                            <p className={`mt-2 text-lg font-serif ${stat.accent ? 'text-accent' : 'text-white'}`}>
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        )
    }

    if (variant === 'split') {
        return (
        <section className="border border-neutral-300 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`relative px-6 lg:px-8 py-8 border-neutral-300 ${
                                index < stats.length - 1 ? 'md:border-r' : ''
                            }`}
                        >
                            {stat.icon && (
                                <div className="absolute top-6 right-6 text-neutral-400">
                                    {stat.icon}
                                </div>
                            )}
                            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-3">
                                {stat.label}
                            </p>
                            <p className="text-lg font-serif text-neutral-900">
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        )
    }

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
                    {showBars && stat.barValue && (
                        <div className="mt-3 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full ${stat.barColor || 'bg-accent'}`}
                                style={{ width: `${stat.barValue}%` }}
                            />
                        </div>
                    )}
                </div>
            ))}
        </section>
    )
}
