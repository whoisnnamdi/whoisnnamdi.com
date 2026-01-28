import { useRef } from 'react'
import { useSubscribe } from './subscribe'

export default function SubscribeCTA({ source = 'CTA' }) {
    const input = useRef(null)
    const subscribe = useSubscribe()

    const handleSubscribe = async (e) => {
        e.preventDefault()
        await subscribe(input.current.value, source, input)
    }

    return (
        <section className="bg-blueprint border-y border-neutral-900 py-14 px-6 md:px-12 text-center text-white">
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">
                Join the Syndicate
            </h2>
            <p className="text-sm md:text-base font-mono uppercase tracking-[0.2em] text-white/80 mb-2">
                Weekly analysis on tech markets and venture capital.
            </p>
            <p className="text-base md:text-lg text-white/90 mb-8 max-w-md mx-auto">
                No noise, just signal. Read by 5,000+ investors and founders.
            </p>
            <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
                <input
                    id="email-input-cta"
                    name="email"
                    placeholder="Enter your email"
                    ref={input}
                    type="email"
                    required
                    className="flex-1 px-4 py-3 text-neutral-900 bg-white border border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
                <button
                    type="submit"
                    className="px-6 py-3 text-white font-mono uppercase tracking-[0.2em] bg-neutral-900 border border-neutral-900 hover:bg-neutral-800 transition-colors"
                >
                    Subscribe
                </button>
            </form>
        </section>
    )
}
