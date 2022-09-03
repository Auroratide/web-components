import { ToggleSwitchElement } from './toggle-switch'

if (!window.customElements.get(ToggleSwitchElement.defaultElementName)) {
    window.customElements.define(ToggleSwitchElement.defaultElementName, ToggleSwitchElement)
}
