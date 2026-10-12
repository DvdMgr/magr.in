import { excerpt, isoDate, type NoteMetadata } from '#lib/notes.ts';
import type { RouteId } from '$app/types';
import type { PageServerLoad } from './$types';

// Read at build time only: the list reaches the browser as the page's prerendered data, never
// as the notes' sources.
const metadata = import.meta.glob<NoteMetadata>('./*/+page.svx', {
	eager: true,
	import: 'metadata'
});
const sources = import.meta.glob<string>('./*/+page.svx', {
	eager: true,
	query: '?raw',
	import: 'default'
});

export const load: PageServerLoad = () => {
	const notes = Object.entries(metadata).flatMap(([path, meta]) => {
		const slug = path.match(/^\.\/([^/]+)\/\+page\.svx$/)?.[1];
		if (!slug || !meta?.title || !meta?.date) {
			console.warn(`${path}: a note needs a title and a date in its frontmatter`);
			return [];
		}
		return [
			{
				// A route ID (each note is its own route), so the page can link it with resolve().
				route: `/notes/${slug}` as RouteId,
				title: meta.title,
				date: isoDate(meta.date),
				description: meta.description ?? excerpt(sources[path])
			}
		];
	});
	notes.sort((a, b) => b.date.localeCompare(a.date));
	return { notes };
};
