<script lang="ts">
	import "./style.css"
	import { onMount } from "svelte"
	import { browser } from "$app/environment"
	import { html } from "@auroratide/flip-card/README.md"
	import Readme from "$lib/Readme.svelte"
	import { setupFlipCardDemos } from "./setup-flip-card-demos"

	if (browser)    
		import("@auroratide/flip-card/lib/define.js")

	onMount(() => {
		setupFlipCardDemos()
	})
</script>

<svelte:head>
	<title>The flip-card Element</title>
</svelte:head>

<Readme {html} />
