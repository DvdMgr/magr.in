# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with SvelteKit 2, using Svelte 5 with the static adapter. The site is deployed to GitHub Pages with a custom domain (magr.in).

### Key Features

- **Home page** - Professional profile with contact info and open source projects
- **Blog system** - Dynamic post discovery using mdsvex (not currently linked in nav)
- **Captures** (planned) - Multi-sensory trip experiences with photos, sounds, and thoughts
- **Now page** - Current activities and interests

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run check

# Type checking in watch mode
npm run check:watch

# Format code
npm run format

# Lint code (runs both prettier check and eslint)
npm run lint
```

## Architecture

### Routing Structure

SvelteKit file-based routing with the following main routes:

- `/` - Home page
- `/projects` - Projects showcase
- `/blog` - Blog post listing with dynamic post discovery
- `/photography` - Photography page
- `/now` - Current activities page

### Blog System

The blog uses a unique dynamic loading system:

**Key file: `src/routes/blog/+page.ts`**

- Blog posts are `.svx` files (mdsvex) located in subdirectories under `src/routes/blog/`
- Posts are automatically discovered using Vite's `import.meta.glob()` pattern
- Each post should be in its own directory: `src/routes/blog/[slug]/+page.svx`
- Post metadata is defined in YAML frontmatter with required fields: `title`, `date`, and optional `description`
- Posts are sorted by date (newest first) and displayed on the blog listing page
- If no description is provided, the first 200 characters of content are used as an excerpt

**Creating a new blog post:**

1. Create a new directory under `src/routes/blog/` with the desired slug
2. Create a `+page.svx` file in that directory
3. Add YAML frontmatter with at least `title` and `date`
4. The post will automatically appear in the blog listing

### Configuration

- **Adapter**: `@sveltejs/adapter-static` for static site generation
  - Configured with explicit options (pages, assets, strict mode)
  - Base path set to empty string for custom domain
- **Preprocessors**: vitePreprocess and mdsvex
  - mdsvex configured with `.svx` extension
- **File extensions**: `.svelte` and `.svx` (for mdsvex files)
- **TypeScript**: Strict mode enabled with bundler module resolution
- **Prerendering**: Enabled globally via `src/routes/+layout.ts`

### Styling

- **Global styles** in `src/app.css` using CSS custom properties
- **Design system**: Modern typography, consistent spacing, professional color palette
- **CSS variables** for colors, spacing, typography (see `:root` in app.css)
- **Responsive**: Font sizes and spacing scale up on larger screens
- **Component styles**: Svelte's scoped `<style>` blocks where needed
- **Navigation**: Simple nav bar with aria-current for accessibility
- **Base path support**: Uses `{base}` from `$app/paths` for GitHub Pages compatibility

## Project Dependencies

- **Framework**: SvelteKit 2 with Svelte 5
- **Content**: mdsvex for Markdown support
- **Build**: Vite 7
- **Linting**: ESLint 9 with TypeScript ESLint and Svelte plugin
- **Formatting**: Prettier with Svelte plugin
- **Deployment**: GitHub Actions to GitHub Pages

## Code Quality

- **Type checking**: `npm run check` - Must pass with 0 errors
- **Linting**: `npm run lint` - Runs prettier check + eslint
- **Formatting**: `npm run format` - Auto-formats all files
- **Build verification**: Always test production build before deploying

## Deployment

The site deploys automatically to GitHub Pages via GitHub Actions on push to `main`.

- **Custom domain**: magr.in (configured via `static/CNAME`)
- **Base path**: Empty string (for custom domain)
- **Workflow**: `.github/workflows/deploy.yml`
- **See**: `docs/DEPLOYMENT.md` for detailed deployment instructions

## Documentation

- **CLAUDE.md** (this file) - Development guide in root directory
- **docs/** - Additional documentation
  - `DEPLOYMENT.md` - GitHub Pages setup
  - `CAPTURES.md` - Captures feature concept and implementation guide
  - `README.md` - Documentation index

## Important Notes

### Privacy & Security

- **Metadata stripping**: All photos and audio files must have EXIF/metadata stripped before committing
- Use `exiftool -all= file.jpg` to remove metadata
- See `docs/CAPTURES.md` for detailed privacy guidelines

### Svelte 5 Patterns

This project uses Svelte 5 syntax:
- `$props()` instead of `export let`
- `{@render children?.()}` for slot rendering
- `$page` and `$base` from stores/paths for navigation
- Runes: `$state`, `$derived`, `$effect` where needed
