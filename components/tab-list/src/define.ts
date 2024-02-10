import { TabListElement } from "./tab-list.js"
import { TabItemElement } from "./tab-item.js"
import { TabPanelElement } from "./tab-panel.js"

if (!window.customElements.get(TabListElement.defaultElementName)) {
	window.customElements.define(TabListElement.defaultElementName, TabListElement)
}

if (!window.customElements.get(TabItemElement.defaultElementName)) {
	window.customElements.define(TabItemElement.defaultElementName, TabItemElement)
}

if (!window.customElements.get(TabPanelElement.defaultElementName)) {
	window.customElements.define(TabPanelElement.defaultElementName, TabPanelElement)
}
