<script lang="ts">
	import type { PageData } from './$types';
	import { base } from '$app/paths';

	let { data }: { data: PageData } = $props();
</script>

<h1>Blog</h1>

<ul>
	{#each data.posts as post (post.slug)}
		<li>
			<a href="{base}/blog/{post.slug}">
				<h2>{post.title}</h2>
				<p>{post.description}</p>
				<p>Published on: {new Date(post.date).toLocaleDateString()}</p>
			</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		padding: 0;
	}

	li {
		margin-bottom: 1.5rem;
	}

	a {
		display: block;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
		color: inherit;
		text-decoration: none;
	}

	a:hover {
		background-color: #f5f5f5;
	}

	h2 {
		margin-top: 0;
		margin-bottom: 0.5rem;
	}

	p {
		margin: 0;
		color: #666;
	}
</style>
