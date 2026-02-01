// Utilities for parsing Talks page content from Ghost HTML

export function decode(s) {
  if (!s) return s;
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#([0-9]{1,4});/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) =>
      String.fromCharCode(parseInt(n, 16)),
    );
}

export function parseFromH2Sections(html) {
  const items = [];

  const h2Re = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  const matches = [];
  let m;
  while ((m = h2Re.exec(html)) !== null) {
    matches.push({
      titleHtml: m[0],
      title: decode(m[1].replace(/<[^>]*>/g, "").trim()),
      start: m.index,
      end: m.index + m[0].length,
    });
  }

  for (let i = 0; i < matches.length; i++) {
    const sectStart = matches[i].end;
    const sectEnd = i + 1 < matches.length ? matches[i + 1].start : html.length;
    const section = html.slice(sectStart, sectEnd);

    const bq = /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/i.exec(section);
    const excerpt = bq ? decode(bq[1].replace(/<[^>]*>/g, "").trim()) : "";

    let feature_image = null;
    const imgGhost =
      /<figure[^>]*kg-image-card[^>]*>[\s\S]*?<img[^>]*src=\"([^\"]+)\"/i.exec(
        section,
      );
    const imgPlain = feature_image
      ? null
      : /<img[^>]*src=\"([^\"]+)\"[^>]*>/i.exec(section);
    if (imgGhost) feature_image = imgGhost[1];
    else if (imgPlain) feature_image = imgPlain[1];

    let anchors = [
      ...section.matchAll(
        /<li[^>]*>[\s\S]*?<a[^>]*href=\"([^\"]+)\"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<\/li>/gi,
      ),
    ].map((a) => ({
      href: a[1],
      text: decode(a[2].replace(/<[^>]*>/g, "").trim()),
    }));
    if (anchors.length === 0) {
      anchors = [
        ...section.matchAll(/<a[^>]*href=\"([^\"]+)\"[^>]*>([\s\S]*?)<\/a>/gi),
      ].map((a) => ({
        href: a[1],
        text: decode(a[2].replace(/<[^>]*>/g, "").trim()),
      }));
    }
    const priority = [
      /youtu(\.be|be\.com)/i,
      /vimeo/i,
      /spotify|apple\.com\/podcasts|overcast|pocketcasts|castbox|google\.com\/podcasts|rss|soundcloud|simplecast|transistor|libsyn|buzzsprout|anchor\.fm/i,
      /slides/i,
    ];
    let href = null;
    for (const re of priority) {
      const found = anchors.find((a) => re.test(a.href) || re.test(a.text));
      if (found) {
        href = found.href;
        break;
      }
    }
    if (!href && anchors.length > 0) href = anchors[0].href;

    if (matches[i].title && (href || feature_image || excerpt)) {
      items.push({
        id: `h2-${i}-${href || matches[i].title}`,
        href,
        title: matches[i].title,
        excerpt,
        feature_image,
      });
    }
  }
  return items;
}

export function parseFromBookmarks(html) {
  const items = [];
  const containers = [
    ...html.matchAll(
      /<a[^>]*class=\"[^\"]*kg-bookmark-container[^\"]*\"[^>]*href=\"([^\"]+)\"[^>]*>([\s\S]*?)<\/a>/gi,
    ),
  ];
  for (const m of containers) {
    const href = m[1];
    const inner = m[2];
    const titleMatch =
      /<div[^>]*class=\"[^\"]*kg-bookmark-title[^\"]*\"[^>]*>([\s\S]*?)<\/div>/i.exec(
        inner,
      );
    const descMatch =
      /<div[^>]*class=\"[^\"]*kg-bookmark-description[^\"]*\"[^>]*>([\s\S]*?)<\/div>/i.exec(
        inner,
      );
    const imgMatch =
      /<div[^>]*class=\"[^\"]*kg-bookmark-thumbnail[^\"]*\"[^>]*>[\s\S]*?<img[^>]*src=\"([^\"]+)\"[^>]*>/i.exec(
        inner,
      );
    const title = titleMatch
      ? decode(titleMatch[1].replace(/<[^>]*>/g, "").trim())
      : "";
    const excerpt = descMatch
      ? decode(descMatch[1].replace(/<[^>]*>/g, "").trim())
      : "";
    const feature_image = imgMatch ? imgMatch[1] : null;
    items.push({ id: href, href, title, excerpt, feature_image });
  }
  return items;
}

export function parseFromEmbeds(html) {
  const items = [];
  const re =
    /<figure[^>]*class=\"kg-card\s+kg-embed-card[^\"]*\"[\s\S]*?<iframe[^>]*src=\"([^\"]+)\"[^>]*>\s*<\/iframe>[\s\S]*?<\/figure>/gi;
  let m;
  let idx = 0;
  while ((m = re.exec(html)) !== null) {
    const href = m[1];
    items.push({
      id: `embed-${idx++}`,
      href,
      title: "Talk",
      excerpt: "",
      feature_image: null,
    });
  }
  return items;
}

export function parseFromLinks(html) {
  const items = [];
  const re = /<a[^>]*href=\"([^\"]+)\"[^>]*>([\s\S]*?)<\/a>/gi;
  const hint =
    /(youtube|youtu\.be|spotify|soundcloud|podcast|apple\.com\/podcasts|vimeo|substack|transistor|libsyn|buzzsprout|anchor\.fm)/i;
  let m;
  while ((m = re.exec(html)) !== null) {
    const href = m[1];
    const title = decode(m[2].replace(/<[^>]*>/g, "").trim());
    if (hint.test(href) && title) items.push({ id: href, href, title });
  }
  return items;
}
