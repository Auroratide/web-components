<script lang="ts">
	import { Color } from "../Color"
	import type { NavItem } from "../PageLayout"
	import { SiteInfo } from "../SiteInfo"
	import { TransparentList } from "../TransparentList"

	export let nav: NavItem[]
	export let centered = false
	export let inert = false

	const { author } = SiteInfo.get()

	const year = new Date().getFullYear()
</script>

<footer aria-label="Site" class="print:hide" class:centered {inert} aria-hidden="{inert}">
	<slot></slot>
	<div class="column lg:row-reverse">
		<ul class="row {TransparentList()} small-text no-space">
			{#each nav as item}
				<li><a href="{item.href}" class="{Color.text.fg.a}">{item.name}</a></li>
			{/each}
		</ul>
		<small>&copy; {year} {author.name}</small>
	</div>
</footer>

<style>
	footer { padding-block: 1.5em; }

	.centered { text-align: center; }

	.column {
		display: flex;
		flex-direction: column;
		gap: 1.5em;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		column-gap: 1em;
		row-gap: 0.5em;
	} .centered .row {
		justify-content: center;
	}

	.small-text { font-size: 0.875em; }
	a {
		text-decoration: none;
	} a:hover, a:focus {
		color: var(--t-fg-b);
		text-decoration: underline;
	}

	.no-space { margin: 0; }

	@media screen and (min-width: 60rem) {
		.lg\:row-reverse {
			flex-direction: row-reverse;
			align-items: center;
			justify-content: flex-end;
		} .centered .lg\:row-reverse {
			justify-content: center;
		}
	}

	@media print {
		.print\:hide { display: none; }
	}
</style>