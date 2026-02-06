const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

let SITE_URL;
let EXTRA_ROUTES;
let createSitemap;
let allowedSlugs;
let contentItems;

const EXCLUDED_PAGES = new Set(["newsletter", "portfolio"]);

const readContentItems = (dir) => {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return readContentItems(fullPath);
    if (!entry.isFile() || !entry.name.endsWith(".md")) return [];
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    const slug = data.slug || path.basename(entry.name, ".md");
    return [
      {
        slug,
        published_at: data.published_at,
        updated_at: data.updated_at,
      },
    ];
  });
};

const extractSitemapUrls = (xml) => {
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  return matches.map((match) => match[1]);
};

const toSlug = (url) => {
  if (!url.startsWith(SITE_URL)) return null;
  const trimmed = url.replace(/\/+$/, "");
  if (trimmed === SITE_URL) return null;
  return trimmed.slice(SITE_URL.length).replace(/^\/+/, "");
};

describe("sitemap validation", () => {
  beforeAll(async () => {
    const sitemapModule = await import("../lib/sitemap.js");
    SITE_URL = sitemapModule.SITE_URL;
    EXTRA_ROUTES = sitemapModule.EXTRA_ROUTES;
    createSitemap = sitemapModule.createSitemap;

    const publicDir = path.join(process.cwd(), "public");
    fs.mkdirSync(publicDir, { recursive: true });

    const contentDir = path.join(process.cwd(), "content");
    const postsDir = path.join(contentDir, "posts");
    const pagesDir = path.join(contentDir, "pages");

    const postItems = readContentItems(postsDir);
    const pageItems = readContentItems(pagesDir).filter(
      (item) => !EXCLUDED_PAGES.has(item.slug),
    );

    contentItems = [...postItems, ...pageItems];
    const contentSlugs = contentItems.map((item) => item.slug).filter(Boolean);
    allowedSlugs = new Set([...contentSlugs, ...EXTRA_ROUTES]);

    const xml = createSitemap(contentItems);
    fs.writeFileSync(path.join(publicDir, "sitemap.xml"), xml);
  });

  test("sitemap entries map to known content or configured routes", () => {
    const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
    const xml = fs.readFileSync(sitemapPath, "utf8");

    const locs = extractSitemapUrls(xml);
    const sitemapSlugs = locs.map(toSlug).filter(Boolean);
    const unknownSlugs = sitemapSlugs.filter((slug) => !allowedSlugs.has(slug));
    const missingSlugs = [...allowedSlugs].filter(
      (slug) => !sitemapSlugs.includes(slug),
    );

    expect(locs).toContain(SITE_URL);
    expect(unknownSlugs).toEqual([]);
    expect(missingSlugs).toEqual([]);
  });
});
