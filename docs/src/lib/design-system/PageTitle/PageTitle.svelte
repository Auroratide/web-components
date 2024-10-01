<script lang="ts">
	import { Color } from "../Color"
</script>

<h1 class="{Color.text.fg.b} very-large topmost-item-spacing balance">
	<slot></slot>
</h1>

<style>
	.very-large { font-size: 2.5em; }

	.topmost-item-spacing {
		margin-block: 0;
		line-height: 1em;
	}

	.balance { text-wrap: balance; }
</style>
