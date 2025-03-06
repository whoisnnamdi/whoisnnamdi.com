// Script to generate RSS feed at build time
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { getPosts } = require('./ghost-api');

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
            <atom:link href="https://whoisnnamdi.com/static/rss.xml" rel="self" type="application/rss+xml"/>
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

async function generateRSS() {
    try {
        console.log('Generating RSS feed...');
        
        // Ensure the static directory exists
        const staticDir = path.join(process.cwd(), 'public', 'static');
        fs.mkdirSync(staticDir, { recursive: true });
        
        // Generate the RSS feed
        const posts = await getPosts();
        const rssContent = createRSS(posts);
        
        // Write the file
        const filePath = path.join(staticDir, 'rss.xml');
        fs.writeFileSync(filePath, rssContent);
        
        console.log(`RSS feed generated at ${filePath}`);
        return true;
    } catch (error) {
        console.error('Error generating RSS feed:', error);
        process.exit(1);
    }
}

// Run the function if this script is executed directly
if (require.main === module) {
    generateRSS();
}

module.exports = generateRSS;