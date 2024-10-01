<script lang="ts">
	import { Color } from "../Color"
	import { base } from "$app/paths"

	export let title: string
	export let subtitle: string
</script>

<section class="grid">
	<div style:grid-area="logo" class="svg-full-height" aria-hidden="true">
		<a href="{base}/" tabindex="-1">
			<slot></slot>
		</a>
	</div>
	<p style:grid-area="title" class="larger"><a href="{base}/" class="{Color.text.fg.b}">{title}</a></p>
	<p style:grid-area="subtitle" class="smaller {Color.text.fg.a}">{subtitle}</p>
</section>

<style>
	.grid {
		display: grid;
		place-items: center start;
		grid-template-columns: auto 1fr;
		column-gap: 1em;
		grid-template-areas:
			"logo title"
			"logo subtitle";
	}

	.svg-full-height :global(svg) {
		inline-size: auto;
		block-size: 3em;
	}

	a { text-decoration: none; }
	a:hover, a:focus { text-decoration: underline; }

	.larger { font-size: 1.125em; }
	.smaller { font-size: 0.875em; }

	p { margin: 0; }
</style>