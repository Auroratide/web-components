export class WcDemoElement extends HTMLElement {
	constructor() {
		super()

		this.hidden = false
	}
}

if (!window.customElements.get("wc-demo")) {
	window.customElements.define("wc-demo", WcDemoElement)
}
