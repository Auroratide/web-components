import { MajorPointElement } from "./major-point"

if (!window.customElements.get(MajorPointElement.defaultElementName)) {
	window.customElements.define(MajorPointElement.defaultElementName, MajorPointElement)
}
