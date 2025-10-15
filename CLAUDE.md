# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with SvelteKit 2, using Svelte 5 with the static adapter. The site includes a blog system powered by mdsvex (Markdown for Svelte components).

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
- **Preprocessors**: vitePreprocess and mdsvex
- **File extensions**: `.svelte` and `.svx` (for mdsvex files)
- **TypeScript**: Strict mode enabled with bundler module resolution

### Styling

- Global styles are in `src/app.css`
- Component-specific styles use Svelte's scoped `<style>` blocks
- The layout includes a simple navigation bar defined in `src/routes/+layout.svelte`

## Project Dependencies

- **Framework**: SvelteKit 2 with Svelte 5
- **Content**: mdsvex for Markdown support
- **Build**: Vite 7
- **Linting**: ESLint 9 with TypeScript ESLint and Svelte plugin
- **Formatting**: Prettier with Svelte plugin
