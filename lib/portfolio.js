// Utilities for parsing Portfolio page HTML

const LOGO_IMAGE_REGEX = /<img[^>]*src=["']([^"']+)["'][^>]*>/gi;

export function extractAttribute(tag, attribute) {
  const attrRegex = new RegExp(`${attribute}\\s*=\\s*["']([^"']*)["']`, "i");
  const match = attrRegex.exec(tag);
  return match ? match[1] : undefined;
}

export function extractPortfolioLogos(html) {
  if (!html) {
    return [];
  }

  const logos = [];
  let match;

  while ((match = LOGO_IMAGE_REGEX.exec(html)) !== null) {
    const [tag, src] = match;

    if (!src) {
      continue;
    }

    const alt = extractAttribute(tag, "alt")?.trim();
    const dataSrc = extractAttribute(tag, "data-src")?.trim();
    const resolvedSrc = src.startsWith("data:") && dataSrc ? dataSrc : src;

    if (!resolvedSrc || resolvedSrc.startsWith("data:")) {
      continue;
    }

    let href;
    const beforeImage = html.slice(0, match.index);
    const anchorOpenIndex = beforeImage.lastIndexOf("<a");
    const anchorCloseIndexBeforeImage = beforeImage.lastIndexOf("</a>");

    if (
      anchorOpenIndex !== -1 &&
      (anchorCloseIndexBeforeImage === -1 ||
        anchorCloseIndexBeforeImage < anchorOpenIndex)
    ) {
      const anchorTagEnd = html.indexOf(">", anchorOpenIndex);
      const anchorClosing = html.indexOf("</a>", match.index);

      if (
        anchorTagEnd !== -1 &&
        anchorClosing !== -1 &&
        anchorClosing > match.index
      ) {
        const anchorTag = html.slice(anchorOpenIndex, anchorTagEnd + 1);
        href = extractAttribute(anchorTag, "href")?.trim();
      }
    }

    const displayName = alt || null;

    logos.push({
      alt: alt || "Portfolio company logo",
      displayName: displayName || null,
      href: href && href !== "#" ? href : null,
      src: resolvedSrc,
    });
  }

  const seen = new Set();
  return logos.filter((logo) => {
    const key = `${logo.href || ""}-${logo.src}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}
