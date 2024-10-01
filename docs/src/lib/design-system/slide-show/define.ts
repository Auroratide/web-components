import { SlideShowElement } from "./slide-show.js"

if (!window.customElements.get(SlideShowElement.defaultElementName)) {
	window.customElements.define(SlideShowElement.defaultElementName, SlideShowElement)
}
