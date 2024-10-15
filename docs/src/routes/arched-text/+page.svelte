<script lang="ts">
	import { browser } from "$app/environment"
	import { html } from "@auroratide/arched-text/README.md"
	import { Readme } from "$lib/web-components/Readme"

	if (browser)    
		import("@auroratide/arched-text/lib/define.js")
</script>

<Readme {html} />
