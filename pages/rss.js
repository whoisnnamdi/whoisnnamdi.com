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

// This function generates the RSS feed at build time
export async function getStaticProps() {
    try {
        const posts = await getPosts()
        const rss = createRSS(posts)
        
        // Only write the file during build time, not in production server runtime
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
            props: { rss },
            // Optional: Set the revalidation period to rebuild the RSS feed
            revalidate: 86400 // Rebuild once per day (in seconds)
        }
    } catch (error) {
        console.error('Error generating RSS feed:', error)
        return {
            props: { rss: '' }, // Return empty RSS on error
            revalidate: 3600 // Try again more frequently on error
        }
    }
}

// This component returns the RSS feed directly
export default function RSS({ rss }) {
    // This causes Next.js to serve the component with the right content type
    if (typeof window === 'undefined') {
        // We're on the server, let's set the content type with getServerSideProps
    }
    
    // On client-side, return null (this should never be executed as we're handling RSS at build time)
    return null
}

// This ensures the content type is set correctly
export async function getServerSideProps({ res }) {
    // Set content type to XML
    res.setHeader('Content-Type', 'text/xml')
    
    // Try to serve the static file
    try {
        const rssPath = path.join(process.cwd(), 'public', 'rss', 'index.xml')
        const rssContent = fs.readFileSync(rssPath, 'utf8')
        res.write(rssContent)
        res.end()
    } catch (error) {
        // If the static file doesn't exist, generate it on-the-fly
        const posts = await getPosts()
        const rssContent = createRSS(posts)
        res.write(rssContent)
        res.end()
    }
    
    // Return nothing as we've already handled the response
    return {
        props: {},
    }
}