import { formatDate, formatExcerpt } from "../lib/dates";

export default function postFormat(posts) {
  posts.forEach((post) => {
    post.dateFormatted = formatDate(post.published_at);
    post.excerpt = formatExcerpt(post.excerpt);
  });

  return posts;
}
