import { formatDate, formatExcerpt } from "./dates";

export function postFormat(posts) {
  return posts.map((post) => ({
    ...post,
    dateFormatted: formatDate(post.published_at),
    excerpt: formatExcerpt(post.excerpt),
  }));
}
