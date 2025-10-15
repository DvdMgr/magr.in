import type { PageLoad } from './$types';

interface PostMetadata {
	title: string;
	date: string;
	description?: string;
}

interface PostModule {
	metadata: PostMetadata;
}

export const load: PageLoad = async () => {
	const modules = import.meta.glob<PostModule>('./**/+page.svx');
	const raw_modules = import.meta.glob<string>('./**/+page.svx', {
		query: '?raw',
		import: 'default'
	});

	const posts = await Promise.all(
		Object.entries(modules).map(async ([path, resolver]) => {
			const resolved = await resolver();
			const metadata = resolved.metadata;

			// Validate required fields
			if (!metadata?.title || !metadata?.date) {
				console.warn(`Post at ${path} is missing required metadata (title or date)`);
				return null;
			}

			const raw_content = (await raw_modules[path]()) as string;
			const slug = path.match(/.\/(.*?)\/\+page.svx/)?.[1];

			if (!slug) {
				console.warn(`Could not extract slug from path: ${path}`);
				return null;
			}

			const description =
				metadata.description ??
				raw_content
					.replace(/---(.|\n)*?---/, '')
					.trim()
					.substring(0, 200) + '...';

			return {
				slug,
				title: metadata.title,
				date: metadata.date,
				description
			};
		})
	);

	// Filter out null entries from invalid posts
	const validPosts = posts.filter((post): post is NonNullable<typeof post> => post !== null);

	const sortedPosts = validPosts.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);

	return {
		posts: sortedPosts
	};
};
