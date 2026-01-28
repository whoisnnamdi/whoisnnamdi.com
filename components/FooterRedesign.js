import Link from 'next/link'

export default function FooterRedesign() {
    const currentYear = new Date().getFullYear()

    const columns = [
        {
            title: 'Content',
            links: [
                { href: '/essays', label: 'Essays' },
                { href: '/notes', label: 'Notes' },
                { href: '/talks', label: 'Talks' },
            ],
        },
        {
            title: 'Connect',
            links: [
                { href: 'https://x.com/whoisnnamdi', label: 'Twitter / X', external: true },
                { href: 'https://www.linkedin.com/in/nnamdiiregbulem/', label: 'LinkedIn', external: true },
                { href: 'https://github.com/whoisnnamdi/', label: 'GitHub', external: true },
            ],
        },
        {
            title: 'Info',
            links: [
                { href: '/about-me', label: 'About' },
                { href: '/portfolio', label: 'Portfolio' },
            ],
        },
    ]

    return (
        <footer className="mt-20 border-t border-neutral-200 pt-12 pb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* Logo and tagline */}
                <div className="col-span-2 md:col-span-1">
                    <Link href="/" className="font-serif text-xl font-bold text-neutral-900">
                        N.
                    </Link>
                    <p className="mt-2 text-sm text-neutral-500">
                        &copy; {currentYear} Nnamdi.<br />
                        San Francisco, CA.
                    </p>
                </div>

                {/* Link columns */}
                {columns.map((column) => (
                    <div key={column.title}>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                            {column.title}
                        </h4>
                        <ul className="space-y-2">
                            {column.links.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                        className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Decorative orange diamond */}
                <div className="hidden md:flex items-start justify-end">
                    <div className="w-8 h-8 bg-accent transform rotate-45" />
                </div>
            </div>
        </footer>
    )
}
