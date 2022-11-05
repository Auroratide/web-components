export const CHANGED = 'toggle-switch:change'
export const changeEvent = (checked) => new CustomEvent(CHANGED, {
    detail: { checked }
})
