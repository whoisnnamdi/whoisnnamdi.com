import { getPosts } from './api/ghost_data'
import fs from 'fs'
import path from 'path'

const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'GMT',
}

const createRSS = (posts) => `<?xml version="1.0" encoding="UTF-8"?>
    <rss 
        xmlns:dc="http://purl.org/dc/elements/1.1/" 
        xmlns:content="http://purl.org/rss/1.0/modules/content/" 
        xmlns:atom="http://www.w3.org/2005/Atom" 
        version="2.0" 
        xmlns:media="http://search.yahoo.com/mrss/"
    >
        <channel>
            <title><![CDATA[ Who is Nnamdi? ]]></title>
            <description>
                <![CDATA[ Thoughts on technology, venture capital, and the economics of both ]]>
            </description>
            <link>https://whoisnnamdi.com</link>
            <lastBuildDate>${new Intl.DateTimeFormat('en-GB', options).format(new Date()) + " GMT"}</lastBuildDate>
            <atom:link href="https://whoisnnamdi.com/rss/" rel="self" type="application/rss+xml"/>
            ${posts
                .map((post) => {
                    return `<item>
                        <title>
                            <![CDATA[${post.title}]]>
                        </title>
                        <description>
                            <![CDATA[${post.excerpt}]]>
                        </description>
                        <link>${`https://whoisnnamdi.com/${post.slug}/`}</link>
                        <guid isPermaLink="false">${post.id}</guid>
                        ${post.tags ?
                            post
                            .tags.map((tag) => {
                                return `<category>
                                        <![CDATA[ ${tag.name} ]]>
                                    </category>
                                `
                            })
                            .join("")
                            :
                            null
                        }
                        <dc:creator>
                            <![CDATA[ Nnamdi Iregbulem ]]>
                        </dc:creator>
                        <pubDate>${new Intl.DateTimeFormat('en-GB', options).format(new Date(post.published_at)) + " GMT"}</pubDate>
                        <media:content url="${post.feature_image}" medium="image" />
                        <content:encoded>
                            <![CDATA[ ${post.html} ]]>
                        </content:encoded>
                    </item>
                    `
                })
                .join("")
            }
        </channel>
    </rss>
`

// We'll use getStaticProps to generate the RSS at build time
export async function getStaticProps() {
    try {
        const posts = await getPosts()
        const rss = createRSS(posts)
        
        // Generate the RSS feed at build time
        if (process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview' || process.env.VERCEL_ENV === 'production') {
            try {
                // Write the RSS feed to the public directory so it's statically served
                const publicDir = path.join(process.cwd(), 'public')
                const rssDir = path.join(publicDir, 'rss')
                
                // Create the directory if it doesn't exist
                if (!fs.existsSync(rssDir)) {
                    fs.mkdirSync(rssDir, { recursive: true })
                }
                
                // Write the RSS feed to a file
                fs.writeFileSync(path.join(rssDir, 'index.xml'), rss)
                console.log('RSS feed generated successfully')
            } catch (err) {
                // Don't fail build if we can't write the file
                console.error('Error writing RSS feed to file:', err)
            }
        }
        
        return {
            // Return the RSS content as props
            props: { 
                rssContent: rss 
            },
            // Rebuild once per day
            revalidate: 86400
        }
    } catch (error) {
        console.error('Error generating RSS feed:', error)
        return {
            props: { rssContent: '' },
            revalidate: 3600 // Try again more frequently on error
        }
    }
}

// Component that sets headers and returns XML content
export default function RSS({ rssContent }) {
    // If we're on the client side, don't render anything
    if (typeof window !== 'undefined') {
        return null
    }
    
    // Return a div that will never be rendered
    // The actual content is delivered by getInitialProps
    return null
}

// Use getInitialProps for header setting
RSS.getInitialProps = async ({ res }) => {
    if (res) {
        // Set XML content type header
        res.setHeader('Content-Type', 'text/xml')
        
        try {
            // Try to read the static file first
            const rssPath = path.join(process.cwd(), 'public', 'rss', 'index.xml')
            if (fs.existsSync(rssPath)) {
                const staticContent = fs.readFileSync(rssPath, 'utf8')
                res.write(staticContent)
                res.end()
                return {}
            }
        } catch (error) {
            console.error('Error reading static RSS file:', error)
        }
        
        // If we don't have the props yet, generate content
        if (!res.writableEnded) {
            try {
                const posts = await getPosts()
                const content = createRSS(posts)
                res.write(content)
                res.end()
            } catch (error) {
                console.error('Error generating RSS content:', error)
                res.statusCode = 500
                res.end('Error generating RSS feed')
            }
        }
    }
    
    return {}
}