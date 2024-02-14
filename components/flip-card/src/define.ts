import { FlipCardElement } from "./index.js"

if (!window.customElements.get(FlipCardElement.defaultElementName)) {
	window.customElements.define(FlipCardElement.defaultElementName, FlipCardElement)
}
