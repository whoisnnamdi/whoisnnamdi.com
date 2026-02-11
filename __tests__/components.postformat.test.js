const { postFormat, postFormatInPlace } = require("../lib/postFormat");

describe("postFormat", () => {
  test("formats date and trims excerpt with brackets removed", () => {
    const posts = [
      {
        id: "1",
        published_at: "2024-01-15T12:00:00.000Z",
        excerpt:
          "[note] This is a long excerpt that should be trimmed down to a certain number of characters for display in previews.",
      },
    ];

    const out = postFormat(posts);
    expect(out[0].dateFormatted).toMatch(/\b2024\b/); // year present
    expect(out[0].excerpt).not.toMatch(/\[note\]/);
    expect(out[0].excerpt.length).toBeLessThanOrEqual(123); // 120 + possible '...'
  });

  test("does not mutate input posts", () => {
    const posts = [
      {
        id: "1",
        published_at: "2024-01-15T12:00:00.000Z",
        excerpt: "Original excerpt",
      },
    ];

    const originalPost = posts[0];
    const out = postFormat(posts);

    expect(out).not.toBe(posts);
    expect(out[0]).not.toBe(originalPost);
    expect(posts[0].dateFormatted).toBeUndefined();
    expect(posts[0].excerpt).toBe("Original excerpt");
  });

  test("returns a shallow clone (nested references are shared)", () => {
    const posts = [
      {
        id: "1",
        published_at: "2024-01-15T12:00:00.000Z",
        excerpt: "Original excerpt",
        tags: [{ name: "Founders" }],
        meta: { wordCount: 1200 },
      },
    ];

    const out = postFormat(posts);

    expect(out[0]).not.toBe(posts[0]);
    expect(out[0].tags).toBe(posts[0].tags);
    expect(out[0].meta).toBe(posts[0].meta);
  });
});

describe("postFormatInPlace", () => {
  test("mutates posts in place and returns the same array", () => {
    const posts = [
      {
        id: "1",
        published_at: "2024-01-15T12:00:00.000Z",
        excerpt:
          "[note] This is a long excerpt that should be trimmed down to a certain number of characters for display in previews.",
      },
    ];

    const out = postFormatInPlace(posts);

    expect(out).toBe(posts);
    expect(posts[0].dateFormatted).toMatch(/\b2024\b/);
    expect(posts[0].excerpt).not.toMatch(/\[note\]/);
  });

  test("throws when input is not an array", () => {
    expect(() => postFormatInPlace(null)).toThrow(TypeError);
    expect(() => postFormatInPlace({})).toThrow(
      "postFormatInPlace expects an array of posts"
    );
  });
});
