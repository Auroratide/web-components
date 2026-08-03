<script>
	import { browser } from "$app/environment"
	import { html } from "../../../README.md"
	import { setupCycleDemo } from "./typewritten-text/setup-cycle-demo"
	import { setupFlipCardDemos } from "./flip-card/setup-flip-card-demos"
	import { onMount } from "svelte"
	import { buildTocs } from "./table-of-contents/build-tocs"
	import fruit from "@auroratide/img-zoom/fruit.png"
	import { Readme } from "$lib/web-components/Readme"
	import { setupArchedTextDemos } from "./arched-text/setup-arched-text-demos"
	import "./arched-text/style.css"

	if (browser) {
		import("@auroratide/arched-text/lib/define.js")
		import("@auroratide/flip-card/lib/define.js")
		import("@auroratide/img-zoom/lib/define.js")
		import("@auroratide/reorder-list/lib/define.js")
		import("@auroratide/tab-list/lib/define.js")
		import("@auroratide/table-of-contents/lib/define.js")
		import("@auroratide/textarea-markdown/lib/define.js")
		import("@auroratide/toggle-switch/lib/define.js")
		import("@auroratide/typewritten-text/lib/style.css")
		import("@auroratide/typewritten-text/lib/define.js")
	}

	onMount(() => {
		if (browser) {
			setupArchedTextDemos()
			setupFlipCardDemos()
			setupCycleDemo()
			buildTocs()
		}
	})
</script>

<div class="img-contained page">
	<Readme {html} assets={[ {
		replace: "./components/img-zoom/fruit.png",
		with: fruit,
	} ]} />
</div>

<style>
	.img-contained :global(img) {
		width: 100%;
		height: auto;
	}

	.page :global(textarea-markdown::part(button)) {
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.page :global(textarea-markdown::part(textarea)) {
		border: 0.0625em solid var(--t-fg-a);
		border-block-end: 0.25em solid var(--t-fg-a);
	}
</style>
