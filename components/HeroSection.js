import Link from "next/link";
import Image from "next/image";

export default function HeroSection({ latestPost }) {
  return (
    <section className="border border-neutral-900 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,0.95fr]">
        {/* Text content */}
        <div className="px-8 py-10 lg:px-12 lg:py-14">
          <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.2em] text-blue-600">
            <span className="w-2 h-2 bg-blue-600" />
            Venture Investor & Writer
          </div>
          <h1 className="mt-6 font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-neutral-900">
            The intersection
            <br />
            of <span className="italic text-accent">bits</span> &
            <br />
            <span className="italic text-accent">bullion</span>.
          </h1>
          <p className="mt-6 max-w-md border-l-2 border-accent pl-4 text-sm md:text-base font-mono text-neutral-600 leading-relaxed">
            Investigating how software eats finance. I write about the theory of
            value in a digital age, backing technical founders building
            technical tools.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5 text-[11px] font-mono uppercase tracking-[0.2em]">
            <Link
              href={latestPost ? `/${latestPost.slug}` : "/essays"}
              className="px-5 py-2 border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Read Latest ↓
            </Link>
            <Link
              href="/about-me"
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              // About me
            </Link>
          </div>
        </div>

        {/* Portrait */}
        <div className="relative min-h-[320px] lg:min-h-[520px] border-t lg:border-t-0 lg:border-l border-neutral-900 bg-neutral-100 overflow-hidden">
          <Image
            src="/images/portrait-bw.png"
            alt="Nnamdi Iregbulem portrait"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-grid-overlay pointer-events-none" />
          <span className="absolute bottom-4 right-4 bg-white/90 border border-neutral-300 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-600">
            Fig. 1 — Portrait
          </span>
        </div>
      </div>
    </section>
  );
}
