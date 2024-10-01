import { NavigationRippleElement } from "./navigation-ripple.js"

if (!window.customElements.get(NavigationRippleElement.defaultElementName)) {
	window.customElements.define(NavigationRippleElement.defaultElementName, NavigationRippleElement)
}
