<script lang="ts">
	import { onMount } from "svelte"
	import { browser } from "$app/environment"
	import { html } from "@auroratide/typewritten-text/README.md"
	import gif from "@auroratide/typewritten-text/demo.gif"
	import Readme from "$lib/Readme.svelte"
	import { setupRun } from "./setup-run"

	if (browser) {
		import("@auroratide/typewritten-text/lib/style.css")
		import("@auroratide/typewritten-text/lib/define.js")
	}

	onMount(() => {
		if (browser) {
			setupRun("main-demo")
			setupRun("markup-demo")
			setupRun("speed-demo")
			setupRun("cursor-demo")
		}
	})
</script>

<svelte:head>
	<title>The typewritten-text Element</title>
</svelte:head>

<Readme {html} assets={[ {
	replace: "./demo.gif",
	with: gif,
} ]} />

<style>
	:global(typewritten-text.typed .cursor.current::after) {
		visibility: hidden;
	}
</style>
