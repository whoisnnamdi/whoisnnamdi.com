#!/usr/bin/env node

const fs = require("fs/promises")
const path = require("path")
const os = require("os")

const defaultSourceRoot = path.join(os.homedir(), "obsidian", "v0221")
const defaultDestRoot = path.join(os.homedir(), "Programming", "quartz", "content")

const sourceRoot = process.argv[2] ? path.resolve(process.argv[2]) : defaultSourceRoot
const destRoot = process.argv[3] ? path.resolve(process.argv[3]) : defaultDestRoot

async function fileContainsOnlineTag(filePath) {
  const content = await fs.readFile(filePath, "utf8")
  return content.includes("#online")
}

async function ensureUniqueDestPath(baseName, sourceContent) {
  const parsed = path.parse(baseName)
  let counter = 0
  while (true) {
    const suffix = counter === 0 ? "" : `-${counter}`
    const candidateName = `${parsed.name}${suffix}${parsed.ext}`
    const destPath = path.join(destRoot, candidateName)
    try {
      const existing = await fs.readFile(destPath, "utf8")
      if (existing === sourceContent) {
        return { destPath, skipped: true }
      }
      counter += 1
    } catch (error) {
      if (error && error.code === "ENOENT") {
        return { destPath, skipped: false }
      }
      throw error
    }
  }
}

async function copyFileFlattened(filePath) {
  const sourceContent = await fs.readFile(filePath, "utf8")
  const baseName = path.basename(filePath)
  const { destPath, skipped } = await ensureUniqueDestPath(baseName, sourceContent)
  await fs.mkdir(destRoot, { recursive: true })
  if (!skipped) {
    await fs.writeFile(destPath, sourceContent)
  }
  return { destPath, skipped }
}

async function walkDir(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await walkDir(fullPath, files)
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath)
    }
  }
  return files
}

async function ensureIndexPage() {
  const indexPath = path.join(destRoot, "index.md")
  const template = `---\ntitle: "Nnamdi's Notes"\n---\n\n# Home\n\nThese are my personal notes on various topics that don’t meet the bar for a proper essay. Most are not even in essay form — they are scratchings and inklings of ideas or notes to myself about things I’ve been researching or learning about.\n\nPeople often ask for my sources of inspiration or about my “writing process”. These notes give some sense of how I end up with these ideas.\n`

  try {
    await fs.access(indexPath)
    return false
  } catch (error) {
    if (error && error.code !== "ENOENT") {
      throw error
    }
  }

  await fs.mkdir(destRoot, { recursive: true })
  await fs.writeFile(indexPath, template)
  return true
}

async function main() {
  const markdownFiles = await walkDir(sourceRoot)
  let matchedCount = 0
  let copiedCount = 0
  let skippedCount = 0

  for (const filePath of markdownFiles) {
    if (await fileContainsOnlineTag(filePath)) {
      matchedCount += 1
      const result = await copyFileFlattened(filePath)
      if (result.skipped) {
        skippedCount += 1
      } else {
        copiedCount += 1
      }
    }
  }

  const indexCreated = await ensureIndexPage()

  console.log(`Matched ${matchedCount} markdown files containing #online.`)
  console.log(`Copied ${copiedCount} files into ${destRoot} (flattened).`)
  console.log(`Skipped ${skippedCount} files with identical content already present.`)
  console.log(indexCreated ? "Created index.md homepage." : "index.md homepage already exists.")
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
