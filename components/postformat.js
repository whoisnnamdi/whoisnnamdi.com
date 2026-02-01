import { formatDate } from "../lib/dates";

export default function postFormat(posts) {
  posts.forEach((post) => {
    post.dateFormatted = formatDate(post.published_at);

    post.excerpt = (post.excerpt || "").replace(/\[(.*?)\]/, "");

    const cutoff = 120;

    post.excerpt =
      post.excerpt.substring(0, Math.min(cutoff, post.excerpt.length)) +
      (post.excerpt.length > cutoff ? "..." : "");
    post.excerpt = post.excerpt.replace(/\[(.*?)[$^.]/, "");
  });

  return posts;
}
