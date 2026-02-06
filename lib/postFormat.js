import { formatDate, formatExcerpt } from "./dates";

/**
 * Format posts for display.
 * Returns a new array with shallow-cloned post objects (no input mutation).
 * Nested objects/arrays are shared by reference.
 */
export function postFormat(posts) {
  return posts.map((post) => ({
    ...post,
    dateFormatted: formatDate(post.published_at),
    excerpt: formatExcerpt(post.excerpt),
  }));
}

/**
 * Legacy helper for in-place formatting when mutation is required.
 */
export function postFormatInPlace(posts) {
  posts.forEach((post) => {
    post.dateFormatted = formatDate(post.published_at);
    post.excerpt = formatExcerpt(post.excerpt);
  });
  return posts;
}
