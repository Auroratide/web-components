<script lang="ts">
	import { BulletDivider } from "../BulletDivider"
	import { Theme } from "../Color"
	import { TransparentList } from "../TransparentList"
	import type { SocialLink } from "./SocialLink"

	export let title: string
	export let values: SocialLink[]
</script>

<section class="top-aligned-row">
	<strong class="lg:show">{title}</strong>
	<span class="lg:show"><BulletDivider /></span>
	<ul class="{TransparentList()} center-aligned-row no-space" style:flex="1">
		{#each values as link (link.name)}
			<li class="{Theme(link.color)} center-aligned-row"><a href="{link.href}" class="icon-link">
				<vector-icon icon="{link.icon}" class="circle-bg"></vector-icon>
				<span>{link.name}</span>
			</a></li>
		{/each}
	</ul>
</section>

<style>
	section { margin-block: 1em; }

	.top-aligned-row {
		display: flex;
		align-items: flex-start;
		gap: 0.5em;
	} .center-aligned-row {
		display: flex;
		align-items: center;
		align-content: center;
		flex-wrap: wrap;
		gap: 1em;
	}

	.icon-link {
		display: flex;
		align-items: center;
		text-decoration: none;
		letter-spacing: 0.05ch;
		gap: 0.5ch;
		color: var(--t-fg-b);
	} .icon-link span {
		font-size: 0.75em;
		opacity: 0.75;
	} .icon-link:hover span, .icon-link:focus span {
		opacity: 1;
		text-decoration: underline;
	}

	ul {
		margin: 0;
	} ul li {
		height: 1em;
	}

	.circle-bg {
		background: var(--t-primary-a);
		display: inline-block;
		inline-size: 1.5em;
		block-size: 1.5em;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 100%;
	}

	.lg\:show { 
		display: none;
	} @media screen and (min-width: 60rem) {
		.lg\:show { display: block; }
	}
</style>
