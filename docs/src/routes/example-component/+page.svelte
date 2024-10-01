<script lang="ts">
	import { browser } from "$app/environment"
	import { html } from "@auroratide/example-component/README.md"
	import { Readme } from "$lib/web-components/Readme"

	if (browser)    
		import("@auroratide/example-component/lib/define.js")
</script>

<Readme {html} />
