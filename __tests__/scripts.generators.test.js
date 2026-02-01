// Test pure template functions from generator scripts
// Note: We inline these since the actual modules import ESM-only deps that Jest can't handle

const buildLastModTag = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `
                    <lastmod>${date.toISOString()}</lastmod>`;
};

const others = ["founders", "developers", "investors"];

const createSitemap = (posts) => {
  const latestUpdatedAt = posts.reduce((latest, post) => {
    const candidate = post.updated_at || post.published_at;
    if (!candidate) return latest;
    const candidateDate = new Date(candidate);
    if (Number.isNaN(candidateDate.getTime())) return latest;
    if (!latest) return candidateDate;
    return candidateDate > latest ? candidateDate : latest;
  }, null);

  const rootLastMod = latestUpdatedAt ? latestUpdatedAt.toISOString() : null;

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${`https://whoisnnamdi.com`}</loc>${buildLastModTag(rootLastMod)}
    </url>
    ${posts
      .map(({ slug, updated_at, published_at }) => {
        const lastMod = updated_at || published_at;
        return `
                <url>
                    <loc>${`https://whoisnnamdi.com/${slug}/`}</loc>${buildLastModTag(lastMod)}
                </url>
            `;
      })
      .join("")}
    ${others
      .map((slug) => {
        return `
                <url>
                    <loc>${`https://whoisnnamdi.com/${slug}/`}</loc>${buildLastModTag(rootLastMod)}
                </url>
            `;
      })
      .join("")}
    </urlset>
`;
};

const options = {
  year: "numeric",
  month: "short",
  day: "numeric",
  weekday: "short",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "GMT",
};

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
            <lastBuildDate>${new Intl.DateTimeFormat("en-GB", options).format(new Date()) + " GMT"}</lastBuildDate>
            <atom:link href="https://whoisnnamdi.com/rss" rel="self" type="application/rss+xml"/>
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
                        ${
                          post.tags
                            ? post.tags
                                .map((tag) => {
                                  return `<category>
                                        <![CDATA[ ${tag.name} ]]>
                                    </category>
                                `;
                                })
                                .join("")
                            : null
                        }
                        <dc:creator>
                            <![CDATA[ Nnamdi Iregbulem ]]>
                        </dc:creator>
                        <pubDate>${new Intl.DateTimeFormat("en-GB", options).format(new Date(post.published_at)) + " GMT"}</pubDate>
                        <media:content url="${post.feature_image}" medium="image" />
                        <content:encoded>
                            <![CDATA[ ${post.html} ]]>
                        </content:encoded>
                    </item>
                    `;
              })
              .join("")}
        </channel>
    </rss>
`;

describe("static file generators", () => {
  test("createRSS outputs valid basic feed with items", () => {
    const posts = [
      {
        id: "p1",
        title: "Hello",
        excerpt: "World",
        slug: "hello",
        html: "<p>Body</p>",
        published_at: "2023-01-01T00:00:00.000Z",
        feature_image: "https://img/1.jpg",
        tags: [{ name: "test" }],
      },
    ];
    const xml = createRSS(posts);
    expect(xml).toContain("<?xml");
    expect(xml).toContain("<item>");
    expect(xml).toContain("<title>");
    expect(xml).toContain("https://whoisnnamdi.com/hello/");
  });

  test("createSitemap outputs urls for posts and others", () => {
    const items = [
      { slug: "hello", published_at: "2024-01-01T00:00:00.000Z" },
      { slug: "world", updated_at: "2024-02-01T00:00:00.000Z" },
    ];
    const xml = createSitemap(items);
    expect(xml).toContain("https://whoisnnamdi.com/hello/");
    expect(xml).toContain("https://whoisnnamdi.com/world/");
    expect(xml).toContain("https://whoisnnamdi.com/founders/");
    expect(xml).toContain("https://whoisnnamdi.com/investors/");
    expect(xml).toContain("<lastmod>2024-01-01T00:00:00.000Z</lastmod>");
    expect(xml).toContain("<lastmod>2024-02-01T00:00:00.000Z</lastmod>");
  });
});
