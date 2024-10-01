import { IconDividerElement } from "./icon-divider"

if (!window.customElements.get(IconDividerElement.defaultElementName)) {
	window.customElements.define(IconDividerElement.defaultElementName, IconDividerElement)
}
