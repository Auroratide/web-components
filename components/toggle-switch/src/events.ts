export const CHANGED = "toggle-switch:change"
export const changeEvent = (checked) => new CustomEvent(CHANGED, {
	detail: { checked },
})

/**
 * @deprecated Use `CHANGED` instead
 */
export const CHANGED_OLD = "toggle-switch:change"

/**
 * 
 * @deprecated Use `changeEvent` instead
 */
export const changeOldEvent = (checked) => new CustomEvent(CHANGED_OLD, {
	detail: { checked },
})
