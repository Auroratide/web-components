import { TabListElement } from './tab-list.js'

if (!window.customElements.get(TabListElement.defaultElementName)) {
    window.customElements.define(TabListElement.defaultElementName, TabListElement)
}
