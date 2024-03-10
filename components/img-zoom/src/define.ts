import { ImgZoomElement } from "./index.js"

if (!window.customElements.get(ImgZoomElement.defaultElementName)) {
	window.customElements.define(ImgZoomElement.defaultElementName, ImgZoomElement)
}
