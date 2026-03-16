<script lang="ts">
	import { browser } from "$app/environment"
	import { html } from "@auroratide/textarea-markdown/README.md"
	import { Readme } from "$lib/web-components/Readme"

	if (browser)    
		import("@auroratide/textarea-markdown/lib/define.js")
</script>

<div class="textarea-markdown-page">
	<Readme {html} />
</div>

<style>
	.textarea-markdown-page {
		display: contents;
	}

	.textarea-markdown-page :global(textarea-markdown::part(button)) {
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.textarea-markdown-page :global(textarea-markdown::part(textarea)) {
		border: 0.0625em solid var(--t-fg-a);
		border-block-end: 0.25em solid var(--t-fg-a);
	}
</style>
