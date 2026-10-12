<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatDate } from '#lib/notes.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Notes - Davide Magrin</title>
</svelte:head>

<h1>Notes</h1>

<ul>
	{#each data.notes as note (note.route)}
		<li>
			<a href={resolve(note.route)}>
				<h2>{note.title}</h2>
				<p>{note.description}</p>
				<p class="date"><time datetime={note.date}>{formatDate(note.date)}</time></p>
			</a>
		</li>
	{:else}
		<li class="empty">No notes yet.</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		padding: 0;
	}

	li {
		margin-bottom: var(--space-md);
	}

	a {
		display: block;
		padding: var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: 0.25rem;
		color: inherit;
		text-decoration: none;
	}

	a:hover {
		background-color: var(--color-surface-hover);
	}

	.empty {
		color: var(--color-text-secondary);
	}

	h2 {
		margin-top: 0;
		margin-bottom: var(--space-xs);
	}

	p {
		margin: 0;
		color: var(--color-text-secondary);
	}

	.date {
		margin-top: var(--space-xs);
		font-size: var(--font-size-sm);
	}
</style>
