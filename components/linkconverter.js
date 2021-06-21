import { useRouter } from 'next/router'

export default function LinkConverter({ content }) { 
    const router = useRouter()
    //const host = new RegExp(`^https?://whoisnnamdi.com`)
    
    return (
        <div 
            dangerouslySetInnerHTML={{ __html: content }}
            onClick={(e) => {
                if (e.target.tagName === "A") {
                    e.preventDefault()
                    router.push(e.target.href)
                }
            }}
        />
    )
}