export const CHANGED = 'tab-list:change'

/**
 * @typedef {{
 *   from: import('./tab-item').TabItemElement,
 *   to: import('./tab-item').TabItemElement,
 * }} TabListChangeEventDetail
 */

/**
 * @param {import('./tab-item').TabItemElement} from
 * @param {import('./tab-item').TabItemElement} to
 * @returns {CustomEvent<TabListChangeEventDetail>}
 */
export const changeEvent = (from, to) => new CustomEvent(CHANGED, {
    detail: { from, to }
})
