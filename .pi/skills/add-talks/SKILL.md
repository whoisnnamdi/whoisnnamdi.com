---
name: add-talks
description: Add new talks to the talks archive, including slide deck links, YouTube thumbnails, and image generation for the talks page.
---

# Add Talks to the Talks Page

Use this skill when you need to add new talks to the talks archive (`content/data/talks.json`), especially when the talk link is a Google Drive PDF and you need a thumbnail from the first slide.

## Where Things Live

- Talks data: `content/data/talks.json`
- Talk thumbnails: `public/images/talks/`
- Essay excerpts (for descriptions): `content/posts/*.md` (`excerpt` frontmatter)

## Step-by-step

### 1) Create the talk entry

1. Open `content/data/talks.json` and find the highest `talk-XX` id.
2. Add a new object with:
   - `id`: next `talk-XX`
   - `title`: talk title
   - `excerpt`: short description (prefer essay excerpt when available)
   - `href`: external link (Google Drive, YouTube, etc.)
   - `feature_image`: path to thumbnail (or `""` if none)
3. **Ordering:** the array order drives the UI. Entry 1 = Latest, entry 2 = Featured, entries 3+ = grid. Insert at the top if it should be the latest; insert as the third item if you want to keep the existing latest/featured intact.

### 2) If the talk is a Google Drive PDF (slides)

1. Download the PDF:
   ```bash
   mkdir -p /tmp/talk-pdfs /tmp/talk-images
   curl -L -o /tmp/talk-pdfs/<slug>.pdf "https://drive.google.com/uc?export=download&id=<FILE_ID>"
   ```
2. Render the first page as a PNG thumbnail:
   ```bash
   gs -dNOPAUSE -dBATCH -sDEVICE=pngalpha -r150 \
     -dFirstPage=1 -dLastPage=1 \
     -sOutputFile=/tmp/talk-images/<slug>.png \
     /tmp/talk-pdfs/<slug>.pdf
   ```
3. Copy into the repo and set the feature image:
   ```bash
   cp /tmp/talk-images/<slug>.png public/images/talks/
   ```
   Use `feature_image: "/images/talks/<slug>.png"`.

### 2b) If the talk is a video link (YouTube, etc.)

Prefer local thumbnails so we don’t need to update `next.config.js` with new remote image domains. For YouTube, download the thumbnail and store it locally:

```bash
mkdir -p public/images/talks
curl -L "https://i.ytimg.com/vi/<VIDEO_ID>/hqdefault.jpg" \
  -o public/images/talks/<slug>.jpg
```

Use `feature_image: "/images/talks/<slug>.jpg"`.

### 3) Pull the slide title (optional but preferred)

When the slide has the talk title on page 1, use OCR to grab it:

```bash
tesseract public/images/talks/<slug>.png stdout -l eng | head -n 20
```

Use the first line as the `title`, fixing punctuation as needed.

### 4) Pull the description from the essay (preferred)

If the talk title matches an essay:

1. Find the essay in `content/posts/*.md`.
2. Copy the `excerpt` frontmatter into the talk’s `excerpt` field.

If there is no essay, write a concise one-sentence summary.

### 5) Sanity check

- JSON is valid and formatted consistently.
- New thumbnails are in `public/images/talks/`.
- `feature_image` paths use `/images/talks/...`.
- Run tests only if requested (e.g., `yarn test`).
