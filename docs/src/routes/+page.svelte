<script>
	import { browser } from "$app/environment"
	import { html } from "../../../README.md"
	import { setupCycleDemo } from "./typewritten-text/setup-cycle-demo"
	import { onMount } from "svelte"

	if (browser) {
		import("@auroratide/reorder-list/lib/define")
		import("@auroratide/tab-list/lib/define")
		import("@auroratide/toggle-switch/lib/define")
		import("@auroratide/typewritten-text/lib/style.css")
		import("@auroratide/typewritten-text/lib/define.js")
	}

	onMount(() => {
		if (browser) {
			setupCycleDemo()
		}
	})
</script>

<svelte:head>
	<title>Web Components by Auroratide</title>
</svelte:head>

<article>
	{@html html}
</article>
