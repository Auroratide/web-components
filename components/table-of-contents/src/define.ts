import { TableOfContentsElement } from "./index.js"

if (!window.customElements.get(TableOfContentsElement.defaultElementName)) {
	window.customElements.define(TableOfContentsElement.defaultElementName, TableOfContentsElement)
}
