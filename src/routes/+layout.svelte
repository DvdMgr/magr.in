<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<a href="{base}/" aria-current={$page.url.pathname === `${base}/` ? 'page' : undefined}>Home</a>
	<a
		href="{base}/projects"
		aria-current={$page.url.pathname === `${base}/projects` ? 'page' : undefined}>Projects</a
	>
	<a
		href="{base}/blog"
		aria-current={$page.url.pathname.startsWith(`${base}/blog`) ? 'page' : undefined}>Blog</a
	>
	<a
		href="{base}/photography"
		aria-current={$page.url.pathname === `${base}/photography` ? 'page' : undefined}>Photography</a
	>
	<a href="{base}/now" aria-current={$page.url.pathname === `${base}/now` ? 'page' : undefined}
		>Now</a
	>
</nav>

<main>
	{@render children?.()}
</main>
