<script lang="ts">
	import { browser } from "$app/environment"
	import { html } from "@auroratide/img-zoom/README.md"
	import { Readme } from "$lib/web-components/Readme"
	import fruit from "@auroratide/img-zoom/fruit.png"
	import fruitWebp from "@auroratide/img-zoom/fruit.webp"

	if (browser)    
		import("@auroratide/img-zoom/lib/define.js")
</script>

<div class="img-contained">
	<Readme {html} assets={[ {
		replace: "./fruit.png",
		with: fruit,
	}, {
		replace: "./fruit.webp",
		with: fruitWebp,
	} ]} />
</div>

<style>
	.img-contained :global(img) {
		width: 100%;
		height: auto;
	}
</style>
