---
name: add-essays
description: Add new essays to whoisnnamdi.com from Obsidian or raw markdown, including frontmatter normalization and image handling.
---

# Add Essays to whoisnnamdi.com

Use this skill when you need to add a new essay in `content/posts/`, especially when importing from Obsidian notes.

## Where Things Live

- Essays: `content/posts/<slug>.md`
- Local image assets (legacy-supported): `public/content/images/YYYY/MM/...`
- Obsidian source notes (common): `/Users/nnamdi/obsidian/v0221/*.md`
- Obsidian attachments (common): `/Users/nnamdi/obsidian/v0221/attach/*`
- Optional image hosting skill: `.pi/skills/vercel-blob-upload/SKILL.md`

## Step-by-step

### 1) Create the essay file

1. Pick a slug (kebab-case), then create:
   - `content/posts/<slug>.md`
2. If importing from Obsidian:
   - Remove Obsidian-only frontmatter/tags.
   - Keep essay body content.
   - If present, remove the trailing notes section starting at `## Notes` (or the final `---` + notes block).

### 2) Normalize frontmatter to site format

Use this structure (all fields expected by existing content conventions):

```yaml
---
slug: "<slug>"
title: "<Title>"
excerpt: "<One-sentence summary>"
published_at: "<ISO timestamp>"
updated_at: "<ISO timestamp>"
feature_image: "<image URL>"
tags:
  - slug: "developers"
    name: "Developers"
  - slug: "investors"
    name: "Investors"
meta_description: ""
canonical_url: "https://whoisnnamdi.com/<slug>/"
og_title: "<Title>"
og_description: ""
og_image: "<image URL>"
twitter_title: "<Title>"
twitter_description: ""
twitter_image: "<image URL>"
---
```

Tag defaults are usually from: `Founders`, `Developers`, `Investors`.

**Date format:** Always use full ISO 8601 with the `Z` (UTC) suffix, e.g., `"2026-02-11T00:00:00.000Z"`. Bare dates like `"2026-02-11"` or timestamps without `Z` will be parsed in local time, causing off-by-one day display in timezones west of UTC. See the "Date Display" section in `AGENTS.md` for details.

### 3) Convert image embeds and move/upload assets

Obsidian embeds usually look like:
- `![[Pasted image 20260129174926.png]]`

Convert to markdown image links and ensure the referenced image is available.

#### Option A: Local assets in `public/content/images` (supported)

1. Copy files from Obsidian attachments into dated folders:
   ```bash
   mkdir -p public/content/images/2026/01
   cp "/Users/nnamdi/obsidian/v0221/attach/Pasted image 20260129174926.png" \
      "public/content/images/2026/01/Pasted-image-20260129174926.png"
   ```
2. Replace embeds in markdown:
   - From `![[Pasted image 20260129174926.png]]`
   - To `![](/content/images/2026/01/Pasted-image-20260129174926.png)`

#### Option B: Upload to Vercel Blob (preferred for new essays)

1. Use the `vercel-blob-upload` skill.
2. Upload images under a stable prefix like:
   - `blog/<slug>/<filename>`
3. Replace body image links and frontmatter image fields with blob URLs.

### 3b) Optimize images (optional, recommended for large PNGs)

For screenshot/chart-heavy essays, optimize PNGs before upload:

```bash
pixo --preset balanced --png-optimize-alpha --png-reduce-color --png-strip-metadata <image.png>
```

Notes:
- `--preset balanced` is the sweet spot. Avoid `--preset max` (timeouts on large files).
- JPEG conversion often *increases* file size for chart/screenshot content — stick with PNG.
- Process images one at a time, not in a monolithic script.

### 4) Final content checks

- No Obsidian embeds remain:
  - `rg -n "!\[\[" content/posts/<slug>.md`
- Frontmatter slug matches filename.
- `canonical_url` matches slug and ends with `/`.
- `feature_image`, `og_image`, and `twitter_image` all point to valid URLs.
- The post renders in local dev (`yarn dev`) and appears on `/essays` sorted by `published_at`.

## Notes from prior session (`tokens-arent-fungible`)

- New essay file was created from Obsidian note and `## Notes` content was trimmed.
- Obsidian image embeds were converted and assets copied from `attach/`.
- Tags were corrected to `Developers` + `Investors`.
- Header/social image fields were aligned to one chosen image URL.
