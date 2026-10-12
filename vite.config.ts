import { fileURLToPath } from 'node:url';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries and for notes: mdsvex compiles
				// a note with a layout into legacy syntax (`$$props`). Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') || filename.endsWith('.svx')
						? undefined
						: true
			},
			// Static site for GitHub Pages; every route is prerendered (src/routes/+layout.ts).
			adapter: adapter(),
			preprocess: [
				mdsvex({
					extensions: ['.svx'],
					// Every note is wrapped in this component, which receives its frontmatter as props.
					layout: fileURLToPath(new URL('./src/lib/NoteLayout.svelte', import.meta.url))
				})
			],
			extensions: ['.svelte', '.svx']
		})
	]
});
