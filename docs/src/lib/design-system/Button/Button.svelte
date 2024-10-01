<script lang="ts">
	import { Color, Theme, type ThemeName } from "../Color"
	import type { IconName } from "../vector-icon"

	export let href: string | undefined = undefined
	export let theme: ThemeName | undefined = undefined
	export let icon: IconName | undefined = undefined
	export let summary: boolean = false
</script>

{#if summary}
	<summary class="button {Color.text.fg.b} {Color.bg.primary.a} {theme ? Theme(theme) : ""}" class:has-icon={icon != null}>
		{#if icon != null}
			<span class="icon-bg">
				<vector-icon {icon}></vector-icon>
			</span>
		{/if}
		<span><slot></slot></span>
	</summary>
{:else if href != null}
	<a {href} class="button {Color.text.fg.b} {Color.bg.primary.a} {theme ? Theme(theme) : ""}" class:has-icon={icon != null} on:click>
		{#if icon != null}
			<span class="icon-bg">
				<vector-icon {icon}></vector-icon>
			</span>
		{/if}
		<span><slot></slot></span>
	</a>
{:else}
	<button class="button {Color.text.fg.b} {Color.bg.primary.a} {theme ? Theme(theme) : ""}" class:has-icon={icon != null} on:click>
		{#if icon != null}
			<span class="icon-bg">
				<vector-icon {icon}></vector-icon>
			</span>
		{/if}
		<span><slot></slot></span>
	</button>
{/if}

<style>
	.button {
		display: inline-block;
		letter-spacing: 0.05ch;
		border-radius: 0.25em;
		text-decoration: none;
		line-height: 1;
		padding-block: 0.375em;
		padding-inline: 0.875em;
		overflow: hidden;
		position: relative;
		border: none;
	}

	.button.has-icon {
		padding-inline: 1.5em 0.875em;
	}

	.button:hover, .button:focus {
		text-decoration: none;
		filter: brightness(1.25);
	}

	.button:active { filter: brightness(0.875); }

	.icon-bg {
		position: absolute;
		display: block;
		font-size: 2em;
		inset-block-start: calc(50% + 0.0625em);
		inset-inline-start: -0.15em;
		transform: translateY(-50%);
		opacity: 0.25;
	}
</style>