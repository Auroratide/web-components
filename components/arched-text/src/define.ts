import { ArchedTextElement } from "./index.js"

if (!window.customElements.get(ArchedTextElement.defaultElementName)) {
	window.customElements.define(ArchedTextElement.defaultElementName, ArchedTextElement)
}
