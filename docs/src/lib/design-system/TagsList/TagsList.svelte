<script lang="ts">
	import { TransparentList } from "../TransparentList"

	export let values: string[]
</script>

<ul class="{TransparentList()} row small bullet-after flex-1">
	{#each values as tag}
		<li>{tag}</li>
	{/each}
</ul>

<style>
	.row {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.25em 0.5em;
		margin: 0;
		align-self: center;
	}

	.flex-1 { flex: 1; }

	.small {
		font-size: max(1rem, 0.75em);
		opacity: 0.875;
	}

	.bullet-after li::after {
		content: "•";
		display: inline-block;
		margin-inline-start: 0.5em;
	} .bullet-after li:last-child::after {
		display: none;
	}
</style>