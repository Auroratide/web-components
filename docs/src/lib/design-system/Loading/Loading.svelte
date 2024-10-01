<script lang="ts">
	import { IconName } from "../vector-icon/IconName"

	export let text: string | undefined = undefined
	export let large: boolean = false
</script>

<div class="loading" class:large>
	<vector-icon class="icon" icon={IconName.HourglassHalf} />
	{#if text != null}
		<h2 class="text">{text}</h2>
	{/if}
</div>

<style>
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(359deg); }
	}

	@keyframes fade {
		0% { opacity: 0.25; }
		50% { opacity: 0.5; }
		100% { opacity: 0.25; }
	}

	.loading {
		text-align: center;
		padding: var(--sp-st-ge) 0;
		animation: fade 2048ms;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
	}

	.icon {
		font-size: 3em;
		margin-bottom: var(--sp-st-o);
		animation: spin 1280ms;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
	}

	.text {
		font-style: italic;
	}

	.loading.large {
		font-size: 2em;
	}
</style>
