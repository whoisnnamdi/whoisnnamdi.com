import DiamondImage from './DiamondImage'
import portrait from '../public/images/portrait-color-compressed.png'

export default function HeroSection() {
    return (
        <section className="py-16 md:py-24">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
                {/* Text content */}
                <div className="flex-1 max-w-xl">
                    <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-neutral-900">
                        The intersection<br />
                        of <span className="italic text-accent">bits</span> &<br />
                        <span className="italic text-accent">bullion</span>.
                    </h1>
                </div>

                {/* Diamond portrait */}
                <div className="flex-shrink-0">
                    <DiamondImage
                        src={portrait}
                        alt="Nnamdi Iregbulem"
                        size={240}
                        className="md:w-72 md:h-72"
                    />
                </div>
            </div>
        </section>
    )
}
