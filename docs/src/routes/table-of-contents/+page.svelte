<script lang="ts">
	import { browser } from "$app/environment"
	import { onMount } from "svelte"
	import { html } from "@auroratide/table-of-contents/README.md"
	import Readme from "$lib/Readme.svelte"
	import { buildTocs } from "./build-tocs"

	if (browser)    
		import("@auroratide/table-of-contents/lib/define.js")

	onMount(() => {
		buildTocs()
	})
</script>

<svelte:head>
	<title>The table-of-contents Element</title>
</svelte:head>

<Readme {html} />
