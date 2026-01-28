import Link from 'next/link'
import Image from 'next/legacy/image'

export default function PortfolioCard({ logo }) {
    const card = (
        <div className="flex flex-col items-center justify-center h-40 px-6 py-4 bg-white border border-neutral-200 rounded-lg transition-all duration-200 hover:shadow-md hover:border-neutral-300 group">
            <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 mb-3">
                {logo.category || 'Portfolio'}
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
