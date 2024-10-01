<script lang="ts">
	import { DateDisplay } from "$lib/design-system/DateDisplay"
	import { BulletDivider } from "../BulletDivider"

	export let value: {
		publishedAt: Date,
		category: string,
	}
</script>

<small class="row">
	<DateDisplay value={value.publishedAt} />
	<BulletDivider />
	<span class="capital">{value.category}</span>
</small>

<style>
	.row {
		display: flex;
		gap: 0.75ch;
	}

	.capital { text-transform: capitalize; }
</style>