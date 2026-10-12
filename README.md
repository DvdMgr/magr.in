# magr.in

Davide Magrin's personal website, live at **https://magr.in**: a short profile, projects, and
**Notes**, technical writing in Markdown.

Built with SvelteKit 3 and Svelte 5, prerendered to static files and deployed to GitHub Pages on
every push to `main` (see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)).

## Develop

Requires Node 22.17 or newer (CI uses Node 24).

```sh
npm install
npm run dev      # development server
npm run check    # type check
npm run lint     # prettier and eslint
npm run build    # static site in build/
npm run preview  # serve build/ locally
```

## Write a note

Create `src/routes/notes/<slug>/+page.svx` (Markdown with Svelte components, via
[mdsvex](https://mdsvex.pngwn.io)):

```markdown
---
title: A title
date: 2026-10-12
description: One sentence for the notes list and search engines.
---

The first paragraph...
```

The notes list finds it automatically; `src/lib/NoteLayout.svelte` adds the title, the date and
the link back. Without a `description`, the list shows the start of the first paragraph.

## Layout

```
src/
  app.css, app.html       global styles (colour tokens, light and dark) and page shell
  lib/                    shared code, imported as #lib/... (package.json "imports")
    NoteLayout.svelte     the layout of every note
    notes.ts              note metadata, dates, excerpts
  routes/                 one folder per page; notes/ holds the notes
static/                   files copied as they are (CNAME, robots.txt)
docs/                     deployment guide, the Captures concept
```
