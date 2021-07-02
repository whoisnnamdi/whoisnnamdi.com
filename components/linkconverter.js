import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function LinkConverter({ content }) { 
    const router = useRouter()
    const host = "https://whoisnnamdi.com"
    //const host = new RegExp(`^https?://whoisnnamdi.com`)
    
    useEffect(() => {
        let links = document.querySelectorAll("a")
       
        links.forEach((link) => {
            if (link.href.includes(host)) {
                link.href = link.href.replace(host + "/", "/")
                link.addEventListener("click", (e) => {
                    e.preventDefault()
                    router.push(e.target.href)
                }, false)
            }
        })
    })

    return (
        <div 
            dangerouslySetInnerHTML={{ __html: content }}
        />
    )
}