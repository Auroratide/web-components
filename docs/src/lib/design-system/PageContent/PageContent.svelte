<script lang="ts">
	export let value: string | undefined = undefined
</script>

<div class="page-content">
	<slot>{@html value}</slot>
</div>
