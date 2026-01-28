export default function EssaySidebar({ sections = [] }) {
    return (
        <aside className="hidden lg:block w-48 flex-shrink-0">
            <div className="sticky top-8">
                {/* Geometric icon with gray background */}
                <div className="mb-8 bg-neutral-100 rounded-lg p-6 flex items-center justify-center">
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

                {/* Section navigation */}
                {sections.length > 0 && (
                    <nav className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
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
