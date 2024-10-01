import { PointCompilationElement } from "./point-compilation.js"

if (!window.customElements.get(PointCompilationElement.defaultElementName)) {
	window.customElements.define(PointCompilationElement.defaultElementName, PointCompilationElement)
}
