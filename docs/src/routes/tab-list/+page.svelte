<script lang="ts">
	import { browser } from "$app/environment"
	import { html } from "@auroratide/tab-list/README.md"
	import { Readme } from "$lib/web-components/Readme"

	if (browser)
		import("@auroratide/tab-list/lib/define.js")
</script>

<Readme {html} />
