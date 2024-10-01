<script lang="ts">
	import { Color } from "../Color"
	import { PageContent } from "../PageContent"
	import { PageMeta } from "../PageMeta"
	import { PageTitle } from "../PageTitle"
	import { IconName } from "../vector-icon/IconName"

	export let title: string
	export let subtitle: string
</script>

<PageMeta />
<header class="medium-space-after">
	<div class="icon-bg {Color.text.bg.a} {Color.bg.red.a}">
		<vector-icon icon="{IconName.ExclamationTriangle}"></vector-icon>
	</div>
	<PageTitle>{title}</PageTitle>
</header>
<PageContent>
	<section class="markdown-alert markdown-alert-caution theme-red">
		<p class="markdown-alert-title"><span>{subtitle}</span></p>
		<slot name="content"></slot>
	</section>
</PageContent>

<style>
	.medium-space-after {
		min-height: 5em;
		margin-block-end: 1em;
	}

	.centered { text-align: center; }

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

	.markdown-alert-title {
		font-size: 1.125em;
		color: var(--t-fg-b);
		opacity: 1;
	}
</style>
