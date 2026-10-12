<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={favicon} />
</svelte:head>

<nav>
	<a href={resolve('/')} aria-current={page.route.id === '/' ? 'page' : undefined}>Home</a>
</nav>

<main>
	{@render children()}
</main>
