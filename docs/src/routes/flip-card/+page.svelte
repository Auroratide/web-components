<script lang="ts">
	import { onMount } from "svelte"
	import { browser } from "$app/environment"
	import { html } from "@auroratide/flip-card/README.md"
	import Readme from "$lib/Readme.svelte"
	import type { FlipCardElement } from "@auroratide/flip-card"

	if (browser)    
		import("@auroratide/flip-card/lib/define.js")

	onMount(() => {
		document.querySelector("#btn")?.addEventListener("click", () => {
			document.querySelector<FlipCardElement>("#card")?.flip()
		})
	})
</script>

<svelte:head>
	<title>The flip-card Element</title>
</svelte:head>

<Readme {html} />

<style>
	:global(flip-card) {
		width: 200px;
		height: 300px;
		border-radius: 0.5em;
	}

	:global(flip-card > :first-child) {
		background-color: #f00;
	}

	:global(flip-card > :last-child) {
		background-color: #0f0;
	}

	:global(flip-card::part(edge)) {
		background-color: #00f;
	}
</style>
