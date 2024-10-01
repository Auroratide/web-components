<script lang="ts">
	import type { NavItem } from "./NavItem"
	import { Color, PrimaryColors } from "../Color"
	import NavDots from "./NavDots.svelte"
	import DetailsLabel from "./DetailsLabel.svelte"
	import { animatedDetails } from "./animated-details"

	export let nav: NavItem[]
</script>

<div class="lg:hide">
	<details class="full-height" style:--details-transition-dur="0.2s" use:animatedDetails>
		<summary class="full-height no-marker dots-overlap-container {Color.text.fg.b} bold-and-large">
			<DetailsLabel closed="Menu" opened="Close" />
			<NavDots />
		</summary>
		<div class="overlap-bottom animate-wipe">
			<nav aria-label="Site">
				<ul class="no-list column space-start">
					{#each nav as it, i}
						<li>
							<a
								href="{it.href}"
								data-first-letter="{it.name[0]}"
								class="bg-circle wider-text {Color.text.fg.b}"
								style:--bg-circle-color="var({Color.var[PrimaryColors[i % PrimaryColors.length]].a})"
								aria-label="{it.name}"
							>
								{it.name}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
			<section class="extra-content">
				<slot></slot>
			</section>
		</div>
	</details>
</div>

<div class="lg:show">
	<nav aria-label="Site">
		<ul class="no-list column space-start">
			{#each nav as it, i}
				<li>
					<a
						href="{it.href}"
						data-first-letter="{it.name[0]}"
						class="bg-circle wider-text {Color.text.fg.b}"
						style:--bg-circle-color="var({Color.var[PrimaryColors[i % PrimaryColors.length]].a})"
						aria-label="{it.name}"
					>
						{it.name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
	<section class="extra-content slide-view-transition">
		<slot></slot>
	</section>
</div>

<style>
	.full-height {
		height: 100%;
		display: flex;
		align-items: center;
	}

	.overlap-bottom {
		position: absolute;
		inset-inline: 0;
		inset-block-start: 100%;
		background: var(--t-bg-a);
		z-index: var(--z-nav);
	}

	nav {
		margin-block-end: 2em;
	}

	.dots-overlap-container { position: relative; }
	.bold-and-large {
		font-weight: bold;
		font-size: 1.125em;
	}

	.no-marker { list-style: none; }

	.no-list {
		list-style: none;
		padding: 0;
	}

	.column {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.space-start { padding-inline-start: 0.75em; }

	a { text-decoration: none; }
	a:hover, a:focus { text-decoration: underline; }

	.wider-text { letter-spacing: 0.05em; }

	.bg-circle {
		display: block;
		position: relative;
		padding-inline-start: 1.25em;
	}

	.bg-circle::first-letter { font-size: 0; }

	.bg-circle::before, .bg-circle::after {
		display: flex;
		align-items: center;
		justify-content: center;
		inline-size: 1.5em;
		block-size: 1.5em;position: absolute;
		border-radius: 100%;
		inset-inline: 0;
		inset-block: 50%;
		transform: translateY(-50%);
		z-index: -1;
		font-size: 1.125em;
	} .bg-circle::before {
		content: "";
		background-color: var(--bg-circle-color);
		transition: transform 0.075s ease-out;
	} .bg-circle::after {
		content: attr(data-first-letter);
		font-weight: bold;
		text-shadow: 0 0.125em 0 oklch(0% 0 0 / 0.25);
	} .bg-circle:hover, .bg-circle:focus {
		filter: brightness(1.15);
	} .bg-circle:hover::before, .bg-circle:focus::before {
		transform: translateY(-50%) scale(1.1);
	} .bg-circle:active::before {
		transform: translateY(-50%) scale(0.875);
		transition: transform 0.025s ease-out;
		filter: brightness(0.9);
	}

	.lg\:show { display: none; }

	@media screen and (min-width: 60rem) {
		.lg\:show { display: block; }
		.lg\:hide { display: none; }
	}

	details .animate-wipe { animation-fill-mode: forwards; }
	details[open] .animate-wipe { animation: circle-wipe-in var(--details-transition-dur) ease-out; }
	details:global([data-closing]) .animate-wipe { animation: circle-wipe-out var(--details-transition-dur) ease-out; }

	@keyframes circle-wipe-in {
		from { clip-path: circle(0% at calc(100% - 1em) 0%); }
		to { clip-path: circle(100%); }
	}

	@keyframes circle-wipe-out {
		from { clip-path: circle(100%); }
		to { clip-path: circle(0% at calc(100% - 1em) 0%); }
	}

	.extra-content {
		position: relative;
		font-size: 0.875em;
		padding-inline: 1em;
	} .extra-content :global(p) {
		line-height: 1.5em;
		margin-block: 1.5em;
	}

	@keyframes slide-transition {
		to {
			opacity: 0;
			transform: translateX(-2em);
		}
	} .slide-view-transition {
		view-transition-name: navigation-content;
	} :global(::view-transition-group(navigation-content)) {
		animation: none; /* Prevents wonky scrolling due to animating the relative positions of the snapshots */
		animation-fill-mode: both;
		animation-duration: 0.333s;
		animation-timing-function: ease-in-out;
	} :global(::view-transition-old(navigation-content)) {
		animation-name: slide-transition;
	} :global(::view-transition-new(navigation-content)) {
		animation-name: slide-transition;
		animation-direction: reverse;
	}
</style>
