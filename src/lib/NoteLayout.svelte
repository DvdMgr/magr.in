<!--
	The layout of every note (mdsvex `layout` in vite.config.ts): the note's frontmatter arrives as
	props, its rendered markdown as children.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolve } from '$app/paths';
	import { formatDate, isoDate, type NoteMetadata } from '#lib/notes.ts';

	let { title, date, description, children }: NoteMetadata & { children?: Snippet } = $props();
</script>

<svelte:head>
	<title>{title} - Davide Magrin</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
</svelte:head>

<article>
	<header>
		<h1>{title}</h1>
		<p class="date"><time datetime={isoDate(date)}>{formatDate(date)}</time></p>
	</header>

	{@render children?.()}

	<footer>
		<a href={resolve('/notes')}>← All notes</a>
	</footer>
</article>

<style>
	header {
		margin-bottom: var(--space-lg);
	}

	h1 {
		margin-bottom: var(--space-xs);
	}

	.date {
		color: var(--color-text-secondary);
		font-size: var(--font-size-sm);
	}

	footer {
		margin-top: var(--space-xl);
		padding-top: var(--space-md);
		border-top: 1px solid var(--color-border);
	}
</style>
