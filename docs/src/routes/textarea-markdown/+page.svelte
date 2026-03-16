<script lang="ts">
	import { browser } from "$app/environment"
	import { html } from "@auroratide/textarea-markdown/README.md"
	import { Readme } from "$lib/web-components/Readme"

	if (browser)    
		import("@auroratide/textarea-markdown/lib/define.js")
</script>

<Readme {html} />
