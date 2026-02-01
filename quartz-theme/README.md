# Quartz Theme Overlay

This folder contains the Quartz theme + layout overrides used for the notes section on whoisnnamdi.com.

## What this is
This is an **overlay** that can be copied onto any clean Quartz installation to apply the same styling, layout, and navbar behavior used on the main site.

## How to use
1. Ensure you have a Quartz repo locally (the folder should contain `quartz.config.ts`).
2. Run the sync script from this repo:

```bash
node scripts/sync-quartz-theme.js /path/to/quartz
```

3. Build Quartz as normal:

```bash
cd /path/to/quartz
npx quartz build
```

4. Sync the generated output into this repo if needed:

```bash
rsync -a --delete /path/to/quartz/public/ public/notes/
```

## Files included
The overlay currently copies these files into Quartz:

- `quartz.config.ts`
- `quartz.layout.ts`
- `quartz/styles/custom.scss`
- `quartz/styles/variables.scss`
- `quartz/components/NotesNavbar.tsx`
- `quartz/components/index.ts`
- `quartz/components/renderPage.tsx`
- `quartz/components/scripts/navbar.inline.ts`
- `quartz/components/styles/navbar.scss`

## Notes
- The overlay **overwrites** files in the Quartz repo.
- If you modify the theme in Quartz directly, copy the updated files back into this folder to keep the overlay current.
