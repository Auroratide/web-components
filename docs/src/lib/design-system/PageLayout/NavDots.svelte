<script lang="ts">
	import { Color } from "../Color"
</script>

<div class="dots">
	<div style:--bg="var({Color.var.blue.a})"></div>
	<div style:--bg="var({Color.var.purple.a})"></div>
	<div style:--bg="var({Color.var.yellow.a})"></div>
	<div style:--bg="var({Color.var.green.a})"></div>
	<div style:--bg="var({Color.var.red.a})"></div>
</div>

<style>
	.dots {
		position: absolute;
		inset: 50%;
		transform: translate(-50%, -50%) rotate(0deg);
		inline-size: 2em;
		block-size: 2em;
		z-index: -1;
		transition: transform var(--details-transition-dur) ease-out;
	}

	:global([open]:not([data-closing])) .dots {
		transform: translate(-50%, -50%) rotate(360deg);
	}

	:global(*:hover) > .dots {
		opacity: 1;
	}

	.dots div {
		border-radius: 100%;
		inline-size: 1em;
		aspect-ratio: 1;
		background: var(--bg);
		position: absolute;
		transform: translate(-50%, -50%);
		mix-blend-mode: lighten;
	}

	.dots div {
		top: 50%;
		left: 50%;
		inline-size: 2em;
		opacity: 1;
		transition: all var(--details-transition-dur) ease-out;
	}

	:global([open]:not([data-closing])) .dots div {
		/* opacity: 0.75; */
		inline-size: 1em;
	}

	:global([open]:not([data-closing])) .dots div:nth-child(1) {
		left: 50%;
		top: 0;
	}

	:global([open]:not([data-closing])) .dots div:nth-child(2) {
		left: 97.55%;
		top: 34.55%;
	}

	:global([open]:not([data-closing])) .dots div:nth-child(3) {
		left: 2.45%;
		top: 34.55%;
	}

	:global([open]:not([data-closing])) .dots div:nth-child(4) {
		left: 79.39%;
		top: 90.45%;
	}

	:global([open]:not([data-closing])) .dots div:nth-child(5) {
		left: 20.61%;
		top: 90.45%;
	}
</style>