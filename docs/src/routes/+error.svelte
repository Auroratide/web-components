<script lang="ts">
	import { page } from "$app/stores"
	import { Routes } from "$lib/web-components/routes"
	import { Button } from "$lib/design-system/Button"
	import { ErrorPage } from "$lib/design-system/pages"

	let title: string = ""
	let message: string = ""

	if ($page.status === 404) {
		title = "Seems like there's nothing here."
		message = "The page you're looking for is not available. Click the button below to go back to the home page."
	} else {
		title = "Something went horribly wrong."
		message = "I recommend you try refreshing the page. If that doesn't fix it, then I probably mucked something up!"
	}
</script>

<ErrorPage title="Uh oh!" subtitle={title}>
	<svelte:fragment slot="content">
		<p>{message}</p>
		<p><Button href="{Routes.Home.href()}">Return Home</Button></p>
	</svelte:fragment>
</ErrorPage>