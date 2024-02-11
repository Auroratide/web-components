<script lang="ts">
	import { onMount } from "svelte"
	import { browser } from "$app/environment"
	import { html } from "@auroratide/typewritten-text/README.md"
	import type { TypewrittenText } from "@auroratide/typewritten-text"
	import gif from "@auroratide/typewritten-text/demo.gif"
	import Readme from "$lib/Readme.svelte"

	if (browser) {
		import("@auroratide/typewritten-text/lib/style.css")
		import("@auroratide/typewritten-text/lib/define.js")
	}

	const setupRun = (name: string) => {
		document.querySelector(`#${name} .run`)?.addEventListener("click", () => {
			document.querySelectorAll<TypewrittenText>(`#${name} typewritten-text`).forEach((elem) => {
				elem.start()
			})
		})
	}

	onMount(() => {
		if (browser) {
			setupRun("main-demo")
			setupRun("markup-demo")
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
	:global(typewritten-text[paused] .typewritten-text_character::after) {
		visibility: hidden;
	}
</style>
