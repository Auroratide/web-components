import type { TableOfContentsElement } from "@auroratide/table-of-contents"

export const buildTocs = () => {
	document.querySelectorAll<TableOfContentsElement>("table-of-contents").forEach((it) => {
		it.build?.()
	})
}
