import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as Fathom from 'fathom-client'

export default function LinkConverter({ content }) { 
    const router = useRouter()
    const host_url = process.env.NEXT_PUBLIC_HOST_URL
    const host_ip = process.env.NEXT_PUBLIC_HOST_IP
    
    useEffect(() => {
        let links = document.querySelectorAll("a")
        
        try {
            links.forEach((link) => {
                if (link.href.includes(host_url) || link.href.includes(host_ip)) {
                    link.href = link.href.replace(host_url + "/", "/")
                    link.href = link.href.replace(host_ip + "/", "/")
                    link.addEventListener("click", (e) => {
                        e.preventDefault()
                        router.push(e.target.href)
                    }, false)
                }
            })
        } catch {

        }

        let images = document.querySelectorAll("img")

        try {
            images.forEach((image) => {
                if (image.src.includes("/content/images")) {
                    // Instead of stripping the domain, ensure it's set to nnamdi.net
                    // This ensures Next.js can optimize it properly using the domains config
                    image.src = image.src.replace(/\bhttps?:\/\/[^)''"\/]+/, "https://nnamdi.net")
                }

                image.srcset = ""
            })
        } catch {

        }

        let forms = document.querySelectorAll("form")

        try {
            forms.forEach((form) => {
                form.addEventListener("submit", (e) => {
                    Fathom.trackGoal('8O6T9QOR', 0)
                })
            })
        } catch {

        }
    })

    return (
        <div 
            dangerouslySetInnerHTML={{ __html: content }}
        />
    )
}