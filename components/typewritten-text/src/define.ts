import { TypewrittenTextElement } from "./index.js"
import { TypewrittenTextMirror } from "./mirror.js"

if (!window.customElements.get(TypewrittenTextMirror.elementName)) {
	console.log("DEFINED I GUESS")
	window.customElements.define(TypewrittenTextMirror.elementName, TypewrittenTextMirror)
}

if (!window.customElements.get(TypewrittenTextElement.defaultElementName)) {
	window.customElements.define(TypewrittenTextElement.defaultElementName, TypewrittenTextElement)
}
