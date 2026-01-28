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
        <section className="bg-neutral-900 rounded-xl py-12 px-8 md:px-12 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                Join the Syndicate
            </h2>
            <p className="text-neutral-400 text-lg mb-8 max-w-md mx-auto">
                Subscribe to receive essays at the crossroads of technology, economics, and venture capital.
            </p>
            <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
                <input
                    id="email-input-cta"
                    name="email"
                    placeholder="your@email.com"
                    ref={input}
                    type="email"
                    required
                    className="flex-1 px-4 py-3 text-neutral-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                    type="submit"
                    className="px-6 py-3 text-white font-semibold bg-accent rounded-lg hover:bg-red-700 transition-colors"
                >
                    Subscribe
                </button>
            </form>
        </section>
    )
}
