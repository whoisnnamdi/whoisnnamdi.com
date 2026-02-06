// Script to generate sitemap at build time
import "dotenv/config";
import fs from "fs";
import path from "path";
import { getAllContent } from "../lib/content.js";
import { createSitemap } from "../lib/sitemap.js";

export default async function generateSitemap() {
  try {
    console.log("Generating sitemap...");

    // Ensure the public directory exists
    const publicDir = path.join(process.cwd(), "public");

    // Get all posts and pages
    const postsPages = await getAllContent();
    const sitemapContent = createSitemap(postsPages);

    // Write sitemap directly to /public
    const filePath = path.join(publicDir, "sitemap.xml");
    fs.writeFileSync(filePath, sitemapContent);

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
