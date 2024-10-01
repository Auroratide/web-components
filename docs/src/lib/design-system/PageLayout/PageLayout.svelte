<script lang="ts">
	import { Container } from "../Container"
	import { PageFooter } from "../PageFooter"
	import { SiteInfo } from "../SiteInfo"
	import { SkipLink } from "../SkipLink"
	import LogoTitle from "./LogoTitle.svelte"
	import type { NavItem } from "./NavItem"
	import Navigation from "./Navigation.svelte"

	export let headerNav: NavItem[]
	export let footerNav: NavItem[]
	export let inert = false

	const {
		title,
		subtitle,
	} = SiteInfo.get()
</script>

<div {inert}>
	<SkipLink href="#main">Skip to Content</SkipLink>
</div>
<Container noscroll={inert}>
	<div class="lg:two-columns">
		<header aria-label="Site" class="overlap-root row lg:column large-spaces-between print:hide" {inert} aria-hidden="{inert}">
			<LogoTitle {title} {subtitle}>
				<slot name="logo"></slot>
			</LogoTitle>
			<Navigation nav={headerNav}>
				<slot name="header"></slot>
			</Navigation>
		</header>
		<main id="main" class="circle-view-transition">
			<slot></slot>
		</main>
		<PageFooter nav={footerNav} {inert}>
			<slot name="footer"></slot>
		</PageFooter>
	</div>
</Container>

<style>
	header {
		margin-block-end: 1em;
	}

	.row {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: space-between;
	}

	.overlap-root { position: relative; }

	.large-spaces-between { gap: 2em; }

	@media screen and (min-width: 60rem) {
		.lg\:two-columns {
			display: grid;
			grid-template-columns: 20rem minmax(0, 1fr);
		}

		header {
			grid-row: span 2;
		}

		.lg\:column {
			flex-direction: column;
			align-items: stretch;
			justify-content: flex-start;
		}
	}

	@keyframes fade-out {
		to { opacity: 0; }
	} @keyframes circle-transition {
		from { clip-path: circle(0% at 3em 3em); }
		to { clip-path: circle(100vmax at 3em 3em); }
	} .circle-view-transition {
		view-transition-name: main-content;
	} :global(::view-transition-old(main-content)) {
		animation: 0.333s ease-out both fade-out;
	} :global(::view-transition-new(main-content)) {
		background: var(--c-dark-dark); /* TODO: Theme is not available here */
		animation: 0.333s ease-out both circle-transition;
	} :global(::view-transition-group(main-content)) {
		animation: none; /* Prevents wonky scrolling due to animating the relative positions of the snapshots */
	}

	@media print {
		.print\:hide {
			display: none;
		}
	}
</style>