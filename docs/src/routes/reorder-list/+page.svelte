<script lang="ts">
	import { browser } from "$app/environment"
	import { html } from "@auroratide/reorder-list/README.md"
	import { Readme } from "$lib/web-components/Readme"

	if (browser)    
		import("@auroratide/reorder-list/lib/define.js")
</script>

<Readme {html} />
