---
name: vercel-blob-upload
description: Upload images/files to Vercel Blob storage for whoisnnamdi.com and replace content links with the blob URLs.
---

# Vercel Blob Uploads (Project-Specific)

Use this skill when you need to replace remote image/file URLs with Vercel Blob URLs for this repo.

## Prereqs

- Dependency already exists: `@vercel/blob` in `package.json`.
- You need a Vercel Blob read/write token for this project.

Set the token in your shell (do **not** commit it):

```bash
export BLOB_READ_WRITE_TOKEN="<token>"
```

## Upload a remote URL (download + upload)

Run from the repo root:

```bash
node --input-type=module <<'NODE'
import { put } from '@vercel/blob';

const url = 'https://example.com/image.png';
const filename = 'portfolio/example-image.png';

const res = await fetch(url);
if (!res.ok) throw new Error(`Failed to download: ${res.status} ${res.statusText}`);

const contentType = res.headers.get('content-type') ?? 'application/octet-stream';
const buffer = Buffer.from(await res.arrayBuffer());

const blob = await put(filename, buffer, {
  access: 'public',
  contentType,
});

console.log(blob.url);
NODE
```

## Upload a local file

```bash
node --input-type=module <<'NODE'
import { put } from '@vercel/blob';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const filePath = '/tmp/logo.png';
const filename = `portfolio/${path.basename(filePath)}`;

const buffer = await readFile(filePath);

const blob = await put(filename, buffer, {
  access: 'public',
  contentType: 'image/png',
});

console.log(blob.url);
NODE
```

## Multiple files (pattern)

```bash
node --input-type=module <<'NODE'
import { put } from '@vercel/blob';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const files = ['/tmp/logo-1.png', '/tmp/logo-2.png'];

for (const filePath of files) {
  const buffer = await readFile(filePath);
  const filename = `portfolio/${path.basename(filePath)}`;
  const blob = await put(filename, buffer, {
    access: 'public',
    contentType: 'image/png',
  });
  console.log(`${filePath} -> ${blob.url}`);
}
NODE
```

## After upload

- Replace the old URLs in content sources (often `content/data/portfolio.json` and `content/pages/portfolio.md`).
- Keep blob filenames organized by area (`portfolio/`, `talks/`, etc.).
- Do **not** store tokens in repo files or scripts.

## Notes from prior sessions

- Uploads were done via inline Node scripts using `@vercel/blob`’s `put`.
- `BLOB_READ_WRITE_TOKEN` is required in the environment.
