<script lang="ts">
	import type { IconName } from "../vector-icon"
	import { Color, Theme, type ThemeName } from "$lib/design-system/Color"
	import { PageTitle } from "../PageTitle"
	import { PageMeta } from "../PageMeta"
	import type { OpenGraph } from "../OpenGraph"
	import { SiteInfo } from "../SiteInfo"

	export let title: string
	export let description: string
	export let category: string
	export let tags: string[]
	export let published: Date | undefined
	export let pathname: string
	export let theme: ThemeName
	export let icon: IconName

	const {
		title: sitetitle,
		logo,
		url,
		author,
	} = SiteInfo.get()

	$: opengraph = {
		type: "article",
		title: title,
		description: description,
		url: url + pathname,
		image: logo,
		site_name: sitetitle,
		article: {
			section: category,
			tags: tags,
			published_time: published,
			author: author.url,
		},
	} satisfies OpenGraph
</script>

<PageMeta pagetitle={title} {description} {opengraph} />
<article class="{Theme(theme)}">
	<header class="large-space-after icon-bg-container">
		<div class="icon-bg {Color.text.bg.a} {Color.bg.primary.a}">
			<vector-icon icon="{icon}"></vector-icon>
		</div>
		<PageTitle>{title}</PageTitle>
		<slot name="header"></slot>
	</header>
	<slot name="content"></slot>
</article>

<style>
	.large-space-after {
		min-height: 12.5em;
		margin-block-end: 1em;
	}

	.icon-bg-container {
		position: relative;
		overflow: visible;
	}
	.icon-bg-container > *:not(.icon-bg) { position: relative; }
	.icon-bg {
		position: absolute;
		font-size: 12em;
		inset-block-start: -0.3em;
		inset-inline-end: -0.15em;
		inline-size: 1.75em;
		block-size: 1.75em;
		border-radius: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0.125;
		transform: rotate(5deg);
		pointer-events: none;
		z-index: -1;
	}
</style>