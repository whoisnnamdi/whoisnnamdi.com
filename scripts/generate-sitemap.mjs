// Script to generate sitemap at build time
import "dotenv/config";
import fs from "fs";
import path from "path";
import { getAllContent } from "../lib/content.js";
import { createSitemap } from "../lib/sitemap.mjs";

export default async function generateSitemap(options = {}) {
  try {
    console.log("Generating sitemap...");

    const publicDir =
      options.publicDir ||
      process.env.SITEMAP_PUBLIC_DIR ||
      path.join(process.cwd(), "public");
    const manifestPath =
      options.manifestPath || process.env.SITEMAP_MANIFEST_PATH;

    // Ensure the public directory exists
    fs.mkdirSync(publicDir, { recursive: true });

    // Get all posts and pages
    const postsPages = await getAllContent();
    const sitemapContent = createSitemap(postsPages);

    // Write sitemap directly to /public
    const filePath = path.join(publicDir, "sitemap.xml");
    fs.writeFileSync(filePath, sitemapContent);

    if (manifestPath) {
      const slugs = postsPages.map((item) => item.slug).filter(Boolean);
      fs.writeFileSync(manifestPath, JSON.stringify(slugs, null, 2));
    }

    console.log(`Sitemap generated at ${filePath}`);
    return true;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    process.exit(1);
  }
}

// Run the function if this script is executed directly
const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  generateSitemap();
}
