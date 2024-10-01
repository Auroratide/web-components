<script lang="ts">
	export let noscroll = false
</script>

<div class="container" class:noscroll>
	<slot></slot>
</div>

<style>
	.container {
		max-width: 90rem;
		margin: auto;
		padding: 0.75em 0.5em;
		display: flex;
		flex-direction: column;
		gap: 2em;
	}

	.noscroll {
		max-block-size: 100dvh;
		overflow: hidden;
	}

	@media print {
		.container {
			padding: 0;
		}
	}
</style>