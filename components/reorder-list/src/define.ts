import { ReorderListElement } from "./index.js"
import { ReorderItemElement } from "./index.js"

if (!window.customElements.get(ReorderListElement.defaultElementName)) {
	window.customElements.define(ReorderListElement.defaultElementName, ReorderListElement)
}

if (!window.customElements.get(ReorderItemElement.defaultElementName)) {
	window.customElements.define(ReorderItemElement.defaultElementName, ReorderItemElement)
}
