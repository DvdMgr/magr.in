/** Frontmatter of a note (`src/routes/notes/<slug>/+page.svx`). */
export interface NoteMetadata {
	title: string;
	/** A YAML date (`2025-09-26`), which mdsvex parses into a Date at midnight UTC, or a string. */
	date: Date | string;
	description?: string;
}

/** The note's date as `YYYY-MM-DD`, for sorting and for `<time datetime>`. */
export function isoDate(date: Date | string): string {
	return new Date(date).toISOString().slice(0, 10);
}

const dateFormat = new Intl.DateTimeFormat('en-GB', {
	day: 'numeric',
	month: 'long',
	year: 'numeric',
	// Frontmatter dates are calendar days at midnight UTC: formatting them in the visitor's
	// timezone would show the previous day west of UTC.
	timeZone: 'UTC'
});

/** A note's date for display, e.g. "26 September 2025", the same in every timezone. */
export function formatDate(date: Date | string): string {
	return dateFormat.format(new Date(date));
}

/**
 * The first prose paragraph of a note's source, as plain text of at most `max` characters
 * (cut at a word, with an ellipsis only when cut). Used when a note has no description.
 */
export function excerpt(source: string, max = 200): string {
	const body = source.replace(/^---[\s\S]*?---/, '').replace(/<(script|style)[\s\S]*?<\/\1>/g, '');
	const paragraph =
		body
			.split(/\n\s*\n/)
			.map((p) => p.trim())
			.find((p) => p && !/^(#|<|```|\||>|!\[|import\s)/.test(p)) ?? '';
	const text = paragraph
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/`([^`]*)`/g, '$1')
		.replace(/(\*\*|\*)(\S(?:.*?\S)?)\1/g, '$2')
		.replace(/(?<!\w)(__|_)(\S(?:.*?\S)?)\1(?!\w)/g, '$2')
		.replace(/\s+/g, ' ')
		.trim();
	if (text.length <= max) return text;
	const cut = text.slice(0, max);
	const space = cut.lastIndexOf(' ');
	return (space > 0 ? cut.slice(0, space) : cut).replace(/[\s,;:.]+$/, '') + '…';
}
