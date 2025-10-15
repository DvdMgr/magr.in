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
</nav>

<main>
	{@render children?.()}
</main>
