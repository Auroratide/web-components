<script lang="ts">
	import { TransparentList } from "../TransparentList"
	import type { GalleryItem } from "./GalleryItem"

	export let values: GalleryItem[]
</script>

<ul class="flexible-grid {TransparentList()}">
	{#each values as img (img.src)}
		<li class="align-to-grid">
			<figure class="align-to-grid">
				<img-zoom class="center-item">
					<img src="{img.src}" alt="{img.alt}" loading="lazy" width="{img.width}" height="{img.height}" class="rounded" />
				</img-zoom>
				<figcaption class="center-text">{img.caption}</figcaption>
			</figure>
		</li>
	{/each}
</ul>

<style>
	.flexible-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(calc(max(50%, 15em) - 1em), 1fr));
		column-gap: 1em;
		row-gap: 2em;
	}

	.align-to-grid {
		display: grid;
		grid-template-rows: subgrid;
		grid-row: span 2;
	}

	.center-item { place-self: center; }
	.center-text { text-align: center; }

	.rounded { border-radius: 0.25em; }

	figure { margin: 0; }
	figcaption {
		line-height: 1.25;
		margin-block-start: -1.5em;
	}
</style>