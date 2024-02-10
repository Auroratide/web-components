import type { TabItemElement } from "./tab-item"

export const CHANGED = "tab-list:change"

export type TabListChangeEventDetail = {
    from: TabItemElement,
    to: TabItemElement,
}

export const changeEvent = (from: TabItemElement, to: TabItemElement): CustomEvent<TabListChangeEventDetail> =>
	new CustomEvent(CHANGED, {
		detail: { from, to },
	})
