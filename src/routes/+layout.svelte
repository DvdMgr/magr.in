<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	let { children } = $props();
</script>

<nav>
	<a href="{base}/" aria-current={$page.url.pathname === `${base}/` ? 'page' : undefined}>Home</a>
</nav>

<main>
	{@render children?.()}
</main>
