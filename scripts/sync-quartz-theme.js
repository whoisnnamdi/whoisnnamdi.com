#!/usr/bin/env node

const fs = require("fs/promises")
const path = require("path")

const targetRoot = process.argv[2]
if (!targetRoot) {
  console.error("Usage: node scripts/sync-quartz-theme.js /path/to/quartz")
  process.exit(1)
}

const overlayRoot = path.resolve(__dirname, "..", "quartz-theme")

const overlayFiles = [
  "quartz.config.ts",
  "quartz.layout.ts",
  "quartz/styles/custom.scss",
  "quartz/styles/variables.scss",
  "quartz/components/NotesNavbar.tsx",
  "quartz/components/index.ts",
  "quartz/components/renderPage.tsx",
  "quartz/components/scripts/navbar.inline.ts",
  "quartz/components/styles/navbar.scss",
]

async function copyFile(relativePath) {
  const source = path.join(overlayRoot, relativePath)
  const destination = path.join(targetRoot, relativePath)
  await fs.mkdir(path.dirname(destination), { recursive: true })
  await fs.copyFile(source, destination)
}

async function ensureOverlayExists() {
  try {
    await fs.access(overlayRoot)
  } catch (error) {
    console.error(`Overlay not found at ${overlayRoot}`)
    process.exit(1)
  }
}

async function ensureTargetLooksLikeQuartz() {
  try {
    await fs.access(path.join(targetRoot, "quartz.config.ts"))
  } catch (error) {
    console.error(`No quartz.config.ts found at ${targetRoot}`)
    process.exit(1)
  }
}

async function syncTheme() {
  await ensureOverlayExists()
  await ensureTargetLooksLikeQuartz()

  for (const file of overlayFiles) {
    await copyFile(file)
  }

  console.log(`Synced Quartz theme overlay to ${targetRoot}`)
}

syncTheme().catch((error) => {
  console.error(error)
  process.exit(1)
})
