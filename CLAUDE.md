# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Project overview

Davide Magrin's personal website, **https://magr.in**: SvelteKit 3 with Svelte 5 (runes),
prerendered by `@sveltejs/adapter-static` and deployed to GitHub Pages.

**A push to `main` publishes the site** (`.github/workflows/deploy.yml`). Work on a branch; never
push without Davide's explicit go-ahead.

Pages:

- `/` - home: profile, research, open source, contact (the only page in the nav for now)
- `/notes` - Notes: technical writing in Markdown, discovered automatically
- `/projects`, `/now` - projects and current activities
- `/captures` - planned: trip experiences with photos, sounds and thoughts (`docs/CAPTURES.md`)

## Commands

```bash
npm run dev          # development server
npm run check        # svelte-check: must report 0 errors and 0 warnings
npm run lint         # prettier --check, then eslint
npm run format       # prettier --write
npm run build        # static site in build/
npm run preview      # serve build/ locally
```

Node 22.17 or newer (SvelteKit 3's minimum; CI uses Node 24). `.npmrc` sets `engine-strict`.

## Architecture

### Configuration

SvelteKit 3 reads its configuration from the `sveltekit()` plugin in **`vite.config.ts`**
(`svelte.config.js` is no longer supported): the adapter, the mdsvex preprocessor, the `.svx`
extension and the runes setting. TypeScript extends `$app/tsconfig`.

### Notes

- A note is `src/routes/notes/<slug>/+page.svx` (mdsvex: Markdown plus Svelte components) with
  YAML frontmatter: `title` and `date` required, `description` optional.
- `src/routes/notes/+page.server.ts` builds the list at build time with `import.meta.glob`
  (frontmatter only; the sources stay out of the browser bundle), newest first. Without a
  `description`, `excerpt()` takes the start of the first prose paragraph.
- Every note is wrapped in `src/lib/NoteLayout.svelte` (mdsvex `layout` option), which receives
  the frontmatter as props and renders the `<title>`, the meta description, the heading, the date
  and the link back. A note's body therefore starts after its title: no `# Title` line.
- Dates: always through `formatDate()` / `isoDate()` in `src/lib/notes.ts`, which format in UTC
  (a frontmatter date is a calendar day at midnight UTC; formatting it in the visitor's timezone
  shows the previous day west of UTC).
- `.svx` files compile in legacy mode (mdsvex emits `$$props` for layouts); everything else is
  forced into runes mode (`compilerOptions.runes` in `vite.config.ts`).

### Svelte 5 and SvelteKit 3 patterns

- Props with `$props()`, typed with the generated `PageProps` / `LayoutProps`; `{@render children()}`.
- Current page from `$app/state` (`page.route.id`, `page.url`), never `$app/stores` (removed).
- Internal links with `resolve()` from `$app/paths`: route IDs start with `/`
  (`resolve('/notes')`), plain paths do not. `base` and `assets` were removed. eslint's
  `svelte/no-navigation-without-resolve` enforces this.
- Shared code lives in `src/lib/` and is imported as `#lib/...` with its extension
  (`#lib/notes.ts`), through `imports` in `package.json` (SvelteKit 3 dropped `$lib`).
- Every route is prerendered (`export const prerender = true` in `src/routes/+layout.ts`).

### Styling

- Global styles in `src/app.css`: colour, typography and spacing tokens on `:root`, redefined for
  dark mode under `prefers-color-scheme: dark`. Components use the tokens, never literal colours.
- Component styles in scoped `<style>` blocks.
- The favicon (`src/lib/assets/favicon.svg`, imported by the root layout) follows the colour
  scheme too.

## Code quality

Before handing back any change: `npm run check` (0 errors, 0 warnings), `npm run lint`, and
`npm run build`; look at the changed pages with `npm run preview`, in light and dark mode.

## Privacy

Photos and audio must have their metadata stripped before they are committed
(`exiftool -all= file.jpg`); see `docs/CAPTURES.md`.

## Documentation

- `README.md` - what the site is, how to develop, how to write a note
- `docs/DEPLOYMENT.md` - GitHub Pages, the custom domain, the workflow
- `docs/CAPTURES.md` - the Captures concept
