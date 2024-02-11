<script lang="ts">
	export let html: string
	export let assets: {
		replace: string,
		with: string,
	}[] = []

	$: toRender = assets.reduce((html, asset) => {
		return html.replace(new RegExp(asset.replace, 'g'), asset.with)
	}, html)
</script>

<article>
	{@html toRender}
</article>
