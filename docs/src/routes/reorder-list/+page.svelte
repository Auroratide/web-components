<script>
	import { browser } from "$app/environment"
	import { html } from "@auroratide/reorder-list/README.md"

	if (browser)    
		import("@auroratide/reorder-list/lib/define.js")
</script>

<svelte:head>
	<title>The reorder-list Element</title>
</svelte:head>

<article>
	{@html html}
</article>
