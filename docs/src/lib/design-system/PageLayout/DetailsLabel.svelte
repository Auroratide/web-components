<script lang="ts">
	export let closed: string
	export let opened: string
</script>

<span class="overlapping-words">
	<span class="open:hide">{closed}</span>
	<span class="open:show">{opened}</span>
</span>

<style>
	.overlapping-words {
		display: grid;

		& > span {
			grid-area: 1 / 1 / 1 / 1;	
		}
	}

	:global(details) .open\:show,
	:global(details[open]:not([data-closing])) .open\:hide {
		visibility: hidden;
		opacity: 0;
		animation: rotate-out var(--details-transition-dur) ease-out;
		transition:
			opacity var(--details-transition-dur) ease-out,
			visibility var(--details-transition-dur) step-end;
	}

	:global(details[open]:not([data-closing])) .open\:show,
	:global(details) .open\:hide {
		visibility: visible;
		opacity: 1;
		animation: rotate-in var(--details-transition-dur) ease-out;
		transition:
			opacity var(--details-transition-dur) ease-out,
			visibility var(--details-transition-dur) step-start;
	}

	@keyframes rotate-in {
		from { transform: rotate(-90deg); }
		to { transform: rotate(0deg); }
	} @keyframes rotate-out {
		from { transform: rotate(0deg); }
		to { transform: rotate(90deg); }
	}
</style>