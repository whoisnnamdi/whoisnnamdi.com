const { postFormat } = require("../lib/postFormat");

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
});
