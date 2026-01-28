import Image from 'next/image'

export default function DiamondImage({ src, alt, size = 288, className = '' }) {
    return (
        <div
            className={`relative transform rotate-45 overflow-hidden border-4 border-neutral-100 ${className}`}
            style={{ width: size, height: size }}
        >
            <Image
                src={src}
                alt={alt}
                fill
                className="transform -rotate-45 scale-[1.42] object-cover"
                priority
            />
        </div>
    )
}
