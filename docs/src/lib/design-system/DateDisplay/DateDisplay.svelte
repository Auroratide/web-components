<script lang="ts">
	export let value: Date

	const formatter = Intl.DateTimeFormat([], {
		year: "numeric",
		month: "short",
		day: "2-digit",
	})
	$: formattedDay = formatter.format(value)
</script>

<time datetime="{value.toISOString()}">{formattedDay}</time>
