<script>
	import { browser } from "$app/environment"
	import { html } from "../../../README.md"
	import { setupCycleDemo } from "./typewritten-text/setup-cycle-demo"
	import { setupFlipCardDemos } from "./flip-card/setup-flip-card-demos"
	import { onMount } from "svelte"
	import { buildTocs } from "./table-of-contents/build-tocs"

	if (browser) {
		import("@auroratide/flip-card/lib/define.js")
		import("@auroratide/reorder-list/lib/define.js")
		import("@auroratide/tab-list/lib/define.js")
		import("@auroratide/table-of-contents/lib/define.js")
		import("@auroratide/toggle-switch/lib/define.js")
		import("@auroratide/typewritten-text/lib/style.css")
		import("@auroratide/typewritten-text/lib/define.js")
	}

	onMount(() => {
		if (browser) {
			setupFlipCardDemos()
			setupCycleDemo()
			buildTocs()
		}
	})
</script>

<svelte:head>
	<title>Web Components by Auroratide</title>
</svelte:head>

<article>
	{@html html}
</article>
