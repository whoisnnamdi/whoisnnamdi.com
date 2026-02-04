// Script to generate RSS feed at build time
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { getAllPosts } from '../lib/content.js';

const SITE_URL = 'https://whoisnnamdi.com';
const IMAGE_PATH = '/content/images';

const toAbsoluteUrl = (url) => {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('//')) return `https:${url}`;
    if (url.startsWith('/')) return `${SITE_URL}${url}`;
    return `${SITE_URL}/${url}`;
};

const toAbsoluteImageUrl = (url) => {
    if (!url) return url;
    if (!url.startsWith(IMAGE_PATH)) return url;
    return `${SITE_URL}${url}`;
};

const rewriteSrcset = (value) => {
    if (!value) return value;
    return value
        .split(',')
        .map((entry) => {
            const trimmed = entry.trim();
            if (!trimmed) return trimmed;
            const [url, ...rest] = trimmed.split(/\s+/);
            const absoluteUrl = toAbsoluteImageUrl(url);
            return [absoluteUrl, ...rest].join(' ');
        })
        .join(', ');
};

const toAbsoluteHtml = (html) => {
    if (!html) return html;
    let output = html.replace(/srcset="([^"]*)"/g, (match, value) => {
        return `srcset="${rewriteSrcset(value)}"`;
    });
    output = output.replace(/(src|href)="([^"]*)"/g, (match, attr, value) => {
        const absolute = toAbsoluteImageUrl(value);
        if (absolute === value) return match;
        return `${attr}="${absolute}"`;
    });
    return output;
};

const postUrl = (slug) => `${SITE_URL}/${slug}/`;
const toUtc = (dateLike) => {
    if (!dateLike) return null;
    const date = new Date(dateLike);
    if (Number.isNaN(date.getTime())) return null;
    return date.toUTCString();
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
            <lastBuildDate>${toUtc(Date.now())}</lastBuildDate>
            <atom:link href="${SITE_URL}/rss" rel="self" type="application/rss+xml"/>
            ${posts
                .map((post) => {
                    const featureImage = toAbsoluteUrl(post.feature_image);
                    const htmlContent = toAbsoluteHtml(post.html);
                    const url = postUrl(post.slug);
                    const pubDate = toUtc(post.published_at);
                    return `<item>
                        <title>
                            <![CDATA[${post.title}]]>
                        </title>
                        <description>
                            <![CDATA[${post.excerpt}]]>
                        </description>
                        <link>${url}</link>
                        <guid isPermaLink="true">${url}</guid>
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
                        ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ''}
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
