import type { ReorderItemElement } from "./reorder-item.js"

export const CHANGED = "change"
export const COMMIT = "commit"

export type ReorderListChangeEventDetail = {
	item: ReorderItemElement,
	oldIndex: number,
	newIndex: number,
}

export const changeEvent = (item: ReorderItemElement, oldIndex: number, newIndex: number): CustomEvent<ReorderListChangeEventDetail> =>
	new CustomEvent(CHANGED, {
		detail: {
			item,
			oldIndex,
			newIndex,
		},
	})

export const commitEvent = (item: ReorderItemElement, oldIndex: number, newIndex: number): CustomEvent<ReorderListChangeEventDetail> =>
	new CustomEvent(COMMIT, {
		detail: {
			item,
			oldIndex,
			newIndex,
		},
	})
