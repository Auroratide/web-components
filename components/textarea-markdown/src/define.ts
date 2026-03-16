import { TextareaMarkdownElement } from "./index.js"

if (!window.customElements.get(TextareaMarkdownElement.defaultElementName)) {
	window.customElements.define(TextareaMarkdownElement.defaultElementName, TextareaMarkdownElement)
}
