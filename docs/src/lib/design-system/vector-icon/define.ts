import { VectorIconElement } from "./vector-icon"

if (!window.customElements.get(VectorIconElement.defaultElementName)) {
	window.customElements.define(VectorIconElement.defaultElementName, VectorIconElement)
}
