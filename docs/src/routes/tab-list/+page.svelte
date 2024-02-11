<script lang="ts">
	import { browser } from "$app/environment"
	import { html } from "@auroratide/tab-list/README.md"
	import Readme from "$lib/Readme.svelte"

	if (browser)
		import("@auroratide/tab-list/lib/define.js")
</script>

<svelte:head>
	<title>The tab-list Element</title>
</svelte:head>

<Readme {html} />
