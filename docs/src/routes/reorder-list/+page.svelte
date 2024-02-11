<script lang="ts">
	import { browser } from "$app/environment"
	import { html } from "@auroratide/reorder-list/README.md"
	import Readme from "$lib/Readme.svelte"

	if (browser)    
		import("@auroratide/reorder-list/lib/define.js")
</script>

<svelte:head>
	<title>The reorder-list Element</title>
</svelte:head>

<Readme {html} />
