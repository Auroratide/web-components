export class NavigationRippleElement extends HTMLElement {
	static defaultElementName = "navigation-ripple"

	static triggerAt({ x, y }: { x: number, y: number }): NavigationRippleElement {
		const el = document.createElement(this.defaultElementName) as NavigationRippleElement
		el.style.setProperty("--ripple-x", `${x}px`)
		el.style.setProperty("--ripple-y", `${y}px`)

		document.body.appendChild(el)
		return el
	}

	static html = `
		<div id="ripple" aria-hidden="true"></div>
	`

	static css = `
		:host {
			display: block;
			pointer-events: none;
			overflow: visible;
		}

		@keyframes ripple {
			to {
				transform: scale(4);
				opacity: 0;
			}
		}

		#ripple {
			position: absolute;
			top: calc(var(--ripple-y) - 0.5em);
			left: calc(var(--ripple-x) - 0.5em);
			inline-size: 1em;
			block-size: 1em;
			background: var(--t-primary-a);
			border-radius: 100%;
			transform: scale(0);
			opacity: 1;
			animation: ripple 0.25s ease-out;
		}
	`

	constructor() {
		super()

		this.#createRoot()
	}

	connectedCallback() {
		this.#setAccessibility()
		this.#removeAfterComplete()
	}

	#setAccessibility = () => {
		if (!this.hasAttribute("role")) {
			this.setAttribute("role", "presentation")
		}
	}

	#removeAfterComplete = () => {
		this.#rippleEl()?.addEventListener("animationend", () => {
			this.remove()
		}, { once: true })
	}

	#rippleEl = () => this.shadowRoot?.querySelector("#ripple")

	#createRoot = () => {
		const root = this.shadowRoot ?? this.attachShadow({ mode: "open" })

		const style = document.createElement("style")
		style.innerHTML = NavigationRippleElement.css

		const template = document.createElement("template")
		template.innerHTML = NavigationRippleElement.html

		root.appendChild(style)
		root.appendChild(template.content)

		return root
	}
}
