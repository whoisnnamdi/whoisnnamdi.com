const fs = require("fs");
const path = require("path");
const os = require("os");
const { execFileSync } = require("child_process");

let SITE_URL;
let EXTRA_ROUTES;
let allowedSlugs;
let sitemapXml;
let tempDir;

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
    const sitemapModule = await import("../lib/sitemap.mjs");
    SITE_URL = sitemapModule.SITE_URL;
    EXTRA_ROUTES = sitemapModule.EXTRA_ROUTES;

    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "sitemap-"));
    const manifestPath = path.join(tempDir, "sitemap-content.json");

    execFileSync(process.execPath, ["scripts/generate-sitemap.mjs"], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        SITEMAP_PUBLIC_DIR: tempDir,
        SITEMAP_MANIFEST_PATH: manifestPath,
      },
      stdio: "pipe",
    });

    sitemapXml = fs.readFileSync(path.join(tempDir, "sitemap.xml"), "utf8");
    const contentSlugs = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    allowedSlugs = new Set([...contentSlugs, ...EXTRA_ROUTES]);
  });

  afterAll(() => {
    if (tempDir) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test("sitemap entries map to known content or configured routes", () => {
    const locs = extractSitemapUrls(sitemapXml);
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
