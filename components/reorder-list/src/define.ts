import { ReorderListElement } from './index.js'

if (!window.customElements.get(ReorderListElement.defaultElementName)) {
    window.customElements.define(ReorderListElement.defaultElementName, ReorderListElement)
}
