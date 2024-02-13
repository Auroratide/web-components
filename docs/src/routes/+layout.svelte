<script>
	import "./style.css"
	import { browser } from "$app/environment"
	import Header from "./Header.svelte"
	import Nav from "./Nav.svelte"

	if (browser)
		import("$lib/wc-demo")
</script>

<div class="full-screen horizontal-on-large">
	<Header>
		<Nav />
	</Header>
	<main id="main" class="container">
		<slot></slot>
	</main>
</div>
