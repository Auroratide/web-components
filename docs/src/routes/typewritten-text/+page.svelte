<script>
	import { onMount } from "svelte"
	import { browser } from "$app/environment"
	import { html } from "@auroratide/typewritten-text/README.md"

	if (browser){
		import("@auroratide/typewritten-text/lib/style.css")
		import("@auroratide/typewritten-text/lib/define.js")
	}

	// @ts-ignore
	const setupRun = (name) => {
		document.querySelector(`#${name} .run`)?.addEventListener("click", () => {
			document.querySelectorAll(`#${name} typewritten-text`).forEach((elem) => {
				// @ts-ignore
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

<article>
	{@html html}
</article>

<style>
	:global(typewritten-text[paused] .typewritten-text_character::after) {
		visibility: hidden;
	}
</style>
