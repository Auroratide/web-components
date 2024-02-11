<script lang="ts">
	import { browser } from "$app/environment"
	import { html } from "@auroratide/example-component/README.md"
	import Readme from "$lib/Readme.svelte"

	if (browser)    
		import("@auroratide/example-component/lib/define.js")
</script>

<svelte:head>
	<title>The example-component Element</title>
</svelte:head>

<Readme {html} />
