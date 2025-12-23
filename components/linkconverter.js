import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as Fathom from 'fathom-client'

export default function LinkConverter({ content }) {
    const router = useRouter()

    useEffect(() => {
        // Convert internal links to use Next.js router
        const links = document.querySelectorAll("a")

        try {
            links.forEach((link) => {
                // Handle internal links (whoisnnamdi.com)
                if (link.href.includes('whoisnnamdi.com')) {
                    const url = new URL(link.href)
                    link.href = url.pathname
                    link.addEventListener("click", (e) => {
                        e.preventDefault()
                        router.push(e.target.href)
                    }, false)
                }
            })
        } catch {
            // Ignore errors
        }

        // Track form submissions
        const forms = document.querySelectorAll("form")

        try {
            forms.forEach((form) => {
                form.addEventListener("submit", () => {
                    Fathom.trackGoal('8O6T9QOR', 0)
                })
            })
        } catch {
            // Ignore errors
        }
    })

    return (
        <div
            dangerouslySetInnerHTML={{ __html: content }}
        />
    )
}