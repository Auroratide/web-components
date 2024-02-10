import { ExampleComponentElement } from "./index.js"

if (!window.customElements.get(ExampleComponentElement.defaultElementName)) {
	window.customElements.define(ExampleComponentElement.defaultElementName, ExampleComponentElement)
}
