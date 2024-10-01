export function slugify(title: string): string {
	return title
		.replaceAll(/\s+/g, "-")
		.replaceAll(/[^a-zA-Z0-9-]/g, "")
		.toLocaleLowerCase()
}
