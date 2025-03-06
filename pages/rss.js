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
    const posts = await getPosts()
    const rss = createRSS(posts)
    
    // Write the RSS feed to the public directory so it's statically served
    const publicDir = path.join(process.cwd(), 'public')
    const rssDir = path.join(publicDir, 'rss')
    
    // Create the directory if it doesn't exist
    if (!fs.existsSync(rssDir)) {
        fs.mkdirSync(rssDir, { recursive: true })
    }
    
    // Write the RSS feed to a file
    fs.writeFileSync(path.join(rssDir, 'index.xml'), rss)
    
    return {
        props: {},
        // Optional: Set the revalidation period to rebuild the RSS feed
        // Remove or set to false if you want to rebuild only on new deployments
        revalidate: 86400 // Rebuild once per day (in seconds)
    }
}

// This component never renders - it only exists for Next.js routing
export default function RSS() {
    return null
}