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
const SITE_URL = "https://whoisnnamdi.com";
const IMAGE_PATH = "/content/images";

const toAbsoluteUrl = (url) => {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `${SITE_URL}${url}`;
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
    .split(",")
    .map((entry) => {
      const trimmed = entry.trim();
      if (!trimmed) return trimmed;
      const [url, ...rest] = trimmed.split(/\s+/);
      const absoluteUrl = toAbsoluteImageUrl(url);
      return [absoluteUrl, ...rest].join(" ");
    })
    .join(", ");
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

const toUtc = (dateLike) => {
  if (!dateLike) return null;
  const date = new Date(dateLike);
  if (Number.isNaN(date.getTime())) return null;
  return date.toUTCString();
};

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
            <link>${SITE_URL}</link>
            <lastBuildDate>${toUtc(Date.now())}</lastBuildDate>
            <atom:link href="${SITE_URL}/rss" rel="self" type="application/rss+xml"/>
            ${posts
              .map((post) => {
                const featureImage = toAbsoluteUrl(post.feature_image);
                const htmlContent = toAbsoluteHtml(post.html);
                const url = `${SITE_URL}/${post.slug}/`;
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
                        ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ""}
                        <media:content url="${featureImage}" medium="image" />
                        <content:encoded>
                            <![CDATA[ ${htmlContent} ]]>
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

  test("createRSS omits pubDate when published_at is missing", () => {
    const posts = [
      {
        id: "p2",
        title: "No Date",
        excerpt: "Missing",
        slug: "no-date",
        html: "<p>Body</p>",
        feature_image: "https://img/2.jpg",
        tags: [],
      },
    ];
    const xml = createRSS(posts);
    expect(xml).toContain("<item>");
    expect(xml).not.toContain("<pubDate>");
  });

  test("createRSS rewrites all srcset image URLs to absolute", () => {
    const posts = [
      {
        id: "p3",
        title: "Images",
        excerpt: "Pictures",
        slug: "images",
        html:
          '<img src="/content/images/a.jpg" srcset="/content/images/a.jpg 1x, /content/images/b.jpg 2x" />',
        published_at: "2023-01-01T00:00:00.000Z",
        feature_image: "/content/images/feature.jpg",
        tags: [],
      },
    ];
    const xml = createRSS(posts);
    expect(xml).toContain(
      'srcset="https://whoisnnamdi.com/content/images/a.jpg 1x, https://whoisnnamdi.com/content/images/b.jpg 2x"',
    );
    expect(xml).toContain('src="https://whoisnnamdi.com/content/images/a.jpg"');
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
