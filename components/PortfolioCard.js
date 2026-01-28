import Link from 'next/link'
import Image from 'next/legacy/image'

export default function PortfolioCard({ logo }) {
    const rawLabel = (logo.category || logo.section || 'Portfolio').toUpperCase()
    const shortLabel = rawLabel.length > 12 ? rawLabel.split(' ')[0] : rawLabel
    const card = (
        <div className="relative flex flex-col items-center justify-center h-40 px-6 py-6 bg-white border border-neutral-300 transition-all duration-200 hover:shadow-sm hover:border-neutral-400 group">
            <span className="absolute top-3 right-4 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
                [{shortLabel.slice(0, 10)}]
            </span>
            <div className="relative flex items-center justify-center h-16 w-full">
                <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={180}
                    height={60}
                    objectFit="contain"
                    className="max-h-14 w-auto grayscale group-hover:grayscale-0 transition-all duration-200"
                    unoptimized
                />
            </div>
        </div>
    )

    if (logo.href) {
        return (
            <Link
                href={logo.href}
                target="_blank"
                rel="noreferrer"
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
                {card}
            </Link>
        )
    }

    return card
}
