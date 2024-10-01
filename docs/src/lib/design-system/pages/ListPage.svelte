<script lang="ts" generics="T extends { id: string, category?: string }">
	import { SkipLink } from "../SkipLink"

	import { SimpleCheckboxList } from "../SimpleCheckboxList"
	import type { OpenGraph } from "../OpenGraph"
	import { PageMeta } from "../PageMeta"
	import { PageTitle } from "../PageTitle"
	import { SiteInfo } from "../SiteInfo"
	import { TransparentList } from "../TransparentList"

	export let title: string
	export let description: string
	export let pathname: string
	export let categories: string[] | undefined = undefined
	// eslint-disable-next-line no-undef
	export let items: T[]
	export let columns: number = 1

	let activeCategories: string[] = []

	const {
		title: sitetitle,
		logo,
		url,
	} = SiteInfo.get()

	$: opengraph = {
		type: "website",
		title: title,
		description: description,
		url: url + pathname,
		image: logo,
		site_name: sitetitle,
	} satisfies OpenGraph
</script>

<PageMeta pagetitle={title} {description} {opengraph} />
<header class="medium-space-after">
	<PageTitle>{title}</PageTitle>
	{#if categories}
		<SkipLink href="#content-list">Skip Category Selection</SkipLink>
		<div class="smaller">
			<SimpleCheckboxList label="Categories" options={categories} bind:value={activeCategories} />
		</div>
	{/if}
</header>
<ul id="content-list" class="{TransparentList()} flexible-grid" style:--item-width="max({100 / columns}%, {45 / columns}em)">
	{#each items as item (item.id)}
		{#if activeCategories.length === 0 || activeCategories.includes(item.category ?? "")}
			<li class="align-to-grid">
				<slot name="item" {item}></slot>
			</li>
		{/if}
	{/each}
</ul>

<slot name="content"></slot>

<style>
	.medium-space-after {
		min-height: 5em;
		margin-block-end: 1em;
	}

	.flexible-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(var(--item-width) - 1em)), 1fr));
		column-gap: 1em;
		row-gap: 0;
	}

	.align-to-grid {
		display: grid;
		grid-template-rows: subgrid;
		grid-row: span 2;
	}

	.smaller { font-size: 0.875em; }
</style>
