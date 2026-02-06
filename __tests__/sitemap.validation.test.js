const fs = require("fs");
const path = require("path");

const SITE_URL = "https://whoisnnamdi.com";
const EXTRA_ROUTES = new Set(["founders", "developers", "investors"]);
const EXCLUDED_PAGES = new Set(["newsletter", "portfolio"]);

const readSlugs = (dir) => {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.basename(file, ".md"));
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
  test("sitemap entries map to known content or configured routes", () => {
    const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
    const xml = fs.readFileSync(sitemapPath, "utf8");

    const contentDir = path.join(process.cwd(), "content");
    const postsDir = path.join(contentDir, "posts");
    const pagesDir = path.join(contentDir, "pages");

    const postSlugs = readSlugs(postsDir);
    const pageSlugs = readSlugs(pagesDir).filter(
      (slug) => !EXCLUDED_PAGES.has(slug),
    );

    const allowedSlugs = new Set([
      ...postSlugs,
      ...pageSlugs,
      ...EXTRA_ROUTES,
    ]);

    const locs = extractSitemapUrls(xml);
    const unknownSlugs = locs
      .map(toSlug)
      .filter(Boolean)
      .filter((slug) => !allowedSlugs.has(slug));

    expect(unknownSlugs).toEqual([]);
  });
});
