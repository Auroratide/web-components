import { ExampleComponentElement } from './example-component.js'

if (!window.customElements.get(ExampleComponentElement.defaultElementName)) {
    window.customElements.define(ExampleComponentElement.defaultElementName, ExampleComponentElement)
}
