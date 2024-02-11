import { TypewrittenText } from "./index.js"
import { TypewrittenTextMirror } from "./mirror.js"

if (!window.customElements.get(TypewrittenTextMirror.elementName)) {
	window.customElements.define(TypewrittenTextMirror.elementName, TypewrittenTextMirror)
}

if (!window.customElements.get(TypewrittenText.defaultElementName)) {
	window.customElements.define(TypewrittenText.defaultElementName, TypewrittenText)
}
