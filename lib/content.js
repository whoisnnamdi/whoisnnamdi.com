/**
 * Content layer for reading markdown files with frontmatter
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { renderMarkdown } from "./markdown.js";

const CONTENT_DIR = path.join(process.cwd(), "content");
const POSTS_DIR = path.join(CONTENT_DIR, "posts");
const PAGES_DIR = path.join(CONTENT_DIR, "pages");
const DATA_DIR = path.join(CONTENT_DIR, "data");

/**
 * Read a markdown file and parse frontmatter
 */
function readMarkdownFile(filePath) {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  // Use slug as id if not present (for component keys)
  return { ...data, id: data.id || data.slug, content };
}

/**
 * Read only frontmatter (no content)
 */
function readMarkdownFrontmatter(filePath) {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContents);
  return { ...data, id: data.id || data.slug };
}

/**
 * Get all markdown files from a directory
 */
function getMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith(".md"));
}

/**
 * Sort items by published_at descending
 */
function sortByPublishedDate(items) {
  return items.sort((a, b) => {
    const dateA = new Date(a.published_at || 0);
    const dateB = new Date(b.published_at || 0);
    return dateB - dateA;
  });
}

/**
 * Get all posts, sorted by published_at descending
 */
export async function getAllPosts() {
  const files = getMarkdownFiles(POSTS_DIR);
  const posts = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(POSTS_DIR, file);
      const post = readMarkdownFile(filePath);
      // Pre-render markdown to HTML
      const html = await renderMarkdown(post.content);
      return { ...post, html };
    }),
  );

  return sortByPublishedDate(posts);
}

/**
 * Get all post frontmatter only (no content/html)
 */
export async function getPostSummaries() {
  const files = getMarkdownFiles(POSTS_DIR);
  const posts = files.map((file) => {
    const filePath = path.join(POSTS_DIR, file);
    return readMarkdownFrontmatter(filePath);
  });

  return sortByPublishedDate(posts);
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug) {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const post = readMarkdownFile(filePath);
  const html = await renderMarkdown(post.content);
  return { ...post, html };
}

/**
 * Get all pages (excludes 'newsletter' and 'portfolio' by default)
 */
export async function getAllPages(
  slugsToExclude = ["newsletter", "portfolio"],
) {
  const files = getMarkdownFiles(PAGES_DIR);
  const pages = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(PAGES_DIR, file);
      const page = readMarkdownFile(filePath);
      const html = await renderMarkdown(page.content);
      return { ...page, html };
    }),
  );

  // Filter out excluded slugs
  return pages.filter((page) => !slugsToExclude.includes(page.slug));
}

/**
 * Get a single page by slug
 */
export async function getPageBySlug(slug) {
  const filePath = path.join(PAGES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const page = readMarkdownFile(filePath);
  const html = await renderMarkdown(page.content);
  return { ...page, html };
}

/**
 * Get all content (posts + pages combined)
 */
export async function getAllContent() {
  const posts = await getAllPosts();
  const pages = await getAllPages();
  return posts.concat(pages);
}

/**
 * Get portfolio data from JSON
 */
export function getPortfolioData() {
  const filePath = path.join(DATA_DIR, "portfolio.json");
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

/**
 * Get talks data from JSON
 */
export function getTalksData() {
  const filePath = path.join(DATA_DIR, "talks.json");
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

// Convenience aliases
export const getPosts = getAllPosts;
export const getPost = getPostBySlug;
export const getPages = getAllPages;
export const getPage = getPageBySlug;
