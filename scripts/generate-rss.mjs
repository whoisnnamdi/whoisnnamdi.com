// Script to generate RSS feed at build time
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { getAllPosts } from '../lib/content.js';

const SITE_URL = 'https://whoisnnamdi.com';

const toAbsoluteUrl = (url) => {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('//')) return `https:${url}`;
    if (url.startsWith('/')) return `${SITE_URL}${url}`;
    return `${SITE_URL}/${url}`;
};

const toAbsoluteHtml = (html) => {
    if (!html) return html;
    return html
        .replaceAll('src="/content/images', `src="${SITE_URL}/content/images`)
        .replaceAll('srcset="/content/images', `srcset="${SITE_URL}/content/images`)
        .replaceAll('href="/content/images', `href="${SITE_URL}/content/images`);
};

export const createRSS = (posts) => `<?xml version="1.0" encoding="UTF-8"?>
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
            <link>${SITE_URL}</link>
            <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
            <atom:link href="${SITE_URL}/rss" rel="self" type="application/rss+xml"/>
            ${posts
                .map((post) => {
                    const featureImage = toAbsoluteUrl(post.feature_image);
                    const htmlContent = toAbsoluteHtml(post.html);
                    return `<item>
                        <title>
                            <![CDATA[${post.title}]]>
                        </title>
                        <description>
                            <![CDATA[${post.excerpt}]]>
                        </description>
                        <link>${`${SITE_URL}/${post.slug}/`}</link>
                        <guid isPermaLink="true">${`${SITE_URL}/${post.slug}/`}</guid>
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
                        <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
                        <media:content url="${featureImage}" medium="image" />
                        <content:encoded>
                            <![CDATA[ ${htmlContent} ]]>
                        </content:encoded>
                    </item>
                    `
                })
                .join("")
            }
        </channel>
    </rss>
`

export default async function generateRSS() {
    try {
        console.log('Generating RSS feed...');

        // Ensure the static directory exists
        const staticDir = path.join(process.cwd(), 'public', 'static');
        fs.mkdirSync(staticDir, { recursive: true });

        // Generate the RSS feed
        const posts = await getAllPosts();
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
const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
    generateRSS();
}
