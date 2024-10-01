<script lang="ts">
	import { Button } from "../Button"

	export let href: string

	const blur = (e: Event) => (e.target as HTMLElement).blur()
</script>

<div class="skip-link">
	<Button {href} on:click={blur}>
		<slot>Skip to Content</slot>
	</Button>
</div>

<style>
	.skip-link {
		clip-path: inset(50%);
		height: 1px;
		width: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
		font-size: 1.125em;
	}

	.skip-link:focus-within {
		clip-path: none;
		width: auto;
		height: auto;
		margin: 0;
		overflow: visible;
		position: fixed;
		inset: 0;
		z-index: var(--z-dialog);
		background-color: oklch(0% 0 0 / 0.5);
		padding: 1em;
	}
</style>
