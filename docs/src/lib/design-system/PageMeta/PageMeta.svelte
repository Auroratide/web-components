<script lang="ts">
	import { SiteInfo } from "../SiteInfo"
	import { OpenGraphMeta, type OpenGraph } from "../OpenGraph"

	export let pagetitle: string = ""
	export let description: string = ""
	export let opengraph: OpenGraph | undefined = undefined
	
	const {
		title: sitetitle,
	} = SiteInfo.get()

	$: title = (pagetitle ? `${pagetitle} | ` : "") + sitetitle
</script>

<svelte:head>
	<title>{title}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
</svelte:head>

{#if opengraph}
	<OpenGraphMeta value={opengraph} />
{/if}
