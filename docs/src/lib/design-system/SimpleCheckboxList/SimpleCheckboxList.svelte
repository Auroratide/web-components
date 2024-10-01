<script lang="ts">
	import { VisuallyHidden } from "../VisuallyHidden"

	export let id: string | undefined = undefined
	export let label: string
	export let options: string[]
	export let value: string[]

	const asId = (s: string) => s.replaceAll(/[^a-zA-Z0-9\-_]/g, "")
</script>

<fieldset {id}>
	<legend>{label}</legend>
	<div class="row">
		{#each options as option}
			{@const inputId = asId(id ?? label) + "-" + asId(option)}
			<label for="{inputId}" title="{option}" class="reserve-space-for-bold">
				{option}
			</label>
			<input
				id="{inputId}"
				type="checkbox"
				name="{asId(id ?? label)}"
				value="{option}"
				bind:group={value}
				class="{VisuallyHidden()}"
			/>
		{/each}
	</div>
</fieldset>


<style>
	fieldset {
		border: none;
		display: flex;
		padding: 0;
		margin: 0.5em 0;
	} legend {
		font-weight: bold;
		float: inline-start;
	} legend::after {
		content: "•";
		padding-inline: 0.5ch;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		column-gap: 0.75em;
		row-gap: 0.25em;
	}

	.reserve-space-for-bold::before {
		content: attr(title);
		display: block;
		height: 1px;
		font-weight: bold;
		color: transparent;
		overflow: hidden;
		visibility: hidden;
	}

	label {
		text-align: center;
		cursor: pointer;
	} label:has(+ input:checked) {
		font-weight: bold;
		color: var(--t-primary-b);
		filter: brightness(1.15);
	} label:has(+ input:focus-visible) {
		outline: 0.125em solid var(--t-primary-b);
	} label:hover, label:has(+ input:focus) {
		color: var(--t-fg-b);
	}
</style>