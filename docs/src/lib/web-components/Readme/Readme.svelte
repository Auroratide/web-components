<script lang="ts">
	import { StaticPage } from "$lib/design-system/pages"
	import { PageContent } from "$lib/design-system/PageContent"
	import { page } from "$app/stores"

	export let html: string
	export let assets: {
		replace: string,
		with: string,
	}[] = []

	$: title = html.match(/<h1.*?>(.*?)<\/h1>/i)?.[1] ?? ""
	$: description = html.match(/<p>(.*?)<\/p>/i)?.[1]?.replace(/<.*?>/g, "") ?? ""

	$: toRender = assets
		.reduce((html, asset) => {
			return html.replace(new RegExp(asset.replace, "g"), asset.with)
		}, html)
		.replace(/<h1.*>(.*?)<\/h1>/ig, "")
</script>

<StaticPage {title} {description} pathname={$page.url.pathname}>
	<div id="page-content" slot="content">
		<PageContent value={toRender} />
	</div>
</StaticPage>