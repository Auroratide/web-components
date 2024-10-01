<script lang="ts">
	import { Theme } from "$lib/design-system/Color"
	import { Button } from "../Button"
	import { TransparentList } from "../TransparentList"
	import type { LinkListLink } from "./LinkListLink"

	export let values: LinkListLink[]
</script>

<ul class="{TransparentList()} row smaller">
	{#each values as link}
		<li class="{Theme(link.color)}">
			<Button href="{link.href}" icon="{link.icon}">{link.title}</Button>
		</li>
	{/each}
</ul>

<style>
	.smaller { font-size: 0.875em; }

	.row {
		display: flex;
		gap: 1em;
		flex-wrap: wrap;
	}
</style>
