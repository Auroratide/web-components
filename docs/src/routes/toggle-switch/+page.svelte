<script lang="ts">
	import { browser } from "$app/environment"
	import { html } from "@auroratide/toggle-switch/README.md"
	import { onMount } from "svelte"
	import { CHANGED as toggleSwitchChange } from "@auroratide/toggle-switch/lib/events"
	import Readme from "$lib/Readme.svelte"

	if (browser)    
		import("@auroratide/toggle-switch/lib/define.js")

	onMount(() => {
		const example01 = document.querySelector("#example-01")
		const example01Out = document.querySelector("#example-01-output")
		if (example01 && example01Out) {
			example01?.addEventListener(toggleSwitchChange, (e) => {
				// @ts-expect-error it's a custom event
				if (e.detail.checked) {
					example01Out.textContent = "On"
					example01Out.classList.add("example-active")
				} else {
					example01Out.textContent = "Off"
					example01Out.classList.remove("example-active")
				}
			})
		}
	})
</script>

<svelte:head>
	<title>The toggle-switch Element</title>
</svelte:head>

<Readme {html} />

<style>
	:global(.example-active) {
		font-weight: bold;
		color: var(--c-success);
	}
</style>