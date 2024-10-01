<script lang="ts">
	import type { OpenGraph } from "./OpenGraph"

	export let value: OpenGraph
</script>

<svelte:head>
	<meta property="og:title" content={value.title} />
	<meta property="og:image" content={value.image.url} />
	<meta property="og:image:alt" content={value.image.alt} />
	<meta property="og:url" content={value.url} />
	<meta property="og:type" content={value.type} />

	{#if value.site_name}
		<meta property="og:site_name" content={value.site_name} />
	{/if}

	{#if value.description}
		<meta property="og:description" content={value.description} />
	{/if}

	{#if value.type === "article"}
		{#if value.article.published_time}
			<meta property="article:published_time" content={value.article.published_time.toISOString()} />
		{/if}
		<meta property="article:author" content={value.article.author} />
		<meta property="article:section" content={value.article.section} />
		{#each value.article.tags as tag}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}
</svelte:head>