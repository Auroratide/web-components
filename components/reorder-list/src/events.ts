import type { ReorderItemElement } from "./reorder-item.js"

export const CHANGED = "reorder-list:change"

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
