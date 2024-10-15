<script lang="ts">
	import { browser } from "$app/environment"
	import { onMount } from "svelte"
	import { html } from "@auroratide/arched-text/README.md"
	import { Readme } from "$lib/web-components/Readme"
	import { setupArchedTextDemos } from "./setup-arched-text-demos"
	import "./style.css"

	if (browser)    
		import("@auroratide/arched-text/lib/define.js")

	onMount(() => {
		setupArchedTextDemos()
	})
</script>

<Readme {html} />
