import {
  decode,
  parseFromH2Sections,
  parseFromBookmarks,
  parseFromEmbeds,
  parseFromLinks,
} from "../lib/talks-parse";

describe("talks parsing", () => {
  test("decode handles HTML entities", () => {
    expect(decode("Tom &amp; Jerry")).toBe("Tom & Jerry");
    expect(decode("&#39;quote&#39; &quot;x&quot;")).toBe("'quote' \"x\"");
  });

  test("parseFromH2Sections extracts title, excerpt, preferred link and image", () => {
    const html = `
      <h2>My Talk</h2>
      <blockquote>About tooling</blockquote>
      <ul><li><a href="https://youtu.be/abc">Watch</a></li><li><a href="https://example.com/slides">Slides</a></li></ul>
      <img src="/cover.jpg" />
    `;
    const items = parseFromH2Sections(html);
    expect(items).toHaveLength(1);
    expect(items[0].title).toBe("My Talk");
    expect(items[0].excerpt).toBe("About tooling");
    expect(items[0].href).toBe("https://youtu.be/abc");
    expect(items[0].feature_image).toBe("/cover.jpg");
  });

  test("parseFromBookmarks extracts bookmark cards", () => {
    const html = `
      <a class="kg-bookmark-container" href="https://example.com/talk">
        <div class="kg-bookmark-title">Title &amp; More</div>
        <div class="kg-bookmark-description">Desc</div>
        <div class="kg-bookmark-thumbnail"><img src="/thumb.jpg" /></div>
      </a>
    `;
    const items = parseFromBookmarks(html);
    expect(items[0]).toMatchObject({
      href: "https://example.com/talk",
      title: "Title & More",
      excerpt: "Desc",
      feature_image: "/thumb.jpg",
    });
  });

  test("parseFromEmbeds extracts iframe sources", () => {
    const html = `
      <figure class="kg-card kg-embed-card"><iframe src="https://player.example/embed/1"></iframe></figure>
      <figure class="kg-card kg-embed-card"><iframe src="https://player.example/embed/2"></iframe></figure>
    `;
    const items = parseFromEmbeds(html);
    expect(items.map((i) => i.href)).toEqual([
      "https://player.example/embed/1",
      "https://player.example/embed/2",
    ]);
  });

  test("parseFromLinks picks likely talk links", () => {
    const html = `
      <p>See <a href="https://youtube.com/watch?v=1">YT</a> and <a href="https://blog">Blog</a></p>
    `;
    const items = parseFromLinks(html);
    expect(items).toHaveLength(1);
    expect(items[0].href).toContain("youtube");
  });
});
