import { TypewrittenTextElement } from "./index.js"

if (!window.customElements.get(TypewrittenTextElement.defaultElementName)) {
	window.customElements.define(TypewrittenTextElement.defaultElementName, TypewrittenTextElement)
}
