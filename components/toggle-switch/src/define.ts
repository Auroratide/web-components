import { ToggleSwitchElement } from "./toggle-switch.js"

if (!window.customElements.get(ToggleSwitchElement.defaultElementName)) {
	window.customElements.define(ToggleSwitchElement.defaultElementName, ToggleSwitchElement)
}
