import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function LinkConverter({ content }) { 
    const router = useRouter()
    const host = process.env.NEXT_PUBLIC_HOST_URL
    
    useEffect(() => {
        let links = document.querySelectorAll("a")
        
        try {
            links.forEach((link) => {
                if (link.href.includes(host)) {
                    link.href = link.href.replace(host + "/", "/")
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
                    image.src = image.src.replace(/\bhttps?:\/\/[^)''"\/]+/, "")
                }
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