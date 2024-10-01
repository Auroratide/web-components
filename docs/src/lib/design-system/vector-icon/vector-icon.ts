import { isValidIcon, type IconName } from "./IconName.js"
import { library } from "./library.js"

export class VectorIconElement extends HTMLElement {
	static defaultElementName = "vector-icon"

	static html = `
		<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<title></title>
			<path fill="currentColor" />
		</svg>
	`

	static css = `
		:host, svg {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			height: 1em;
			line-height: 1;
			overflow: visible;
		}
	`

	constructor() {
		super()

		this.#createRoot()
	}

	static get observedAttributes() {
		return ["icon", "label"]
	}

	get icon(): IconName | null { return this.getAttribute("icon") as IconName }
	set icon(value: IconName) { this.setAttribute("icon", value) }

	get label(): string | null { return this.getAttribute("label") }
	set label(value: string) { this.setAttribute("label", value) }

	attributeChangedCallback(attribute: string, oldValue: string, newValue: string) {
		this.#attributeCallbacks[attribute]?.(newValue, oldValue)
	}

	#attributeCallbacks: Record<string, (newValue: string | undefined | null, oldValue: string | undefined | null) => void> = {
		"icon": (newValue: string | undefined | null) => {
			if (isValidIcon(newValue)) {
				const iconData = library[newValue]
				const offset = ("offset" in iconData ? iconData.offset : undefined) ?? [0, 0]
				const viewBox = `${offset[0]} ${offset[1]} ${iconData.icon[0]} ${iconData.icon[1]}`
				const path = iconData.icon[4] as string

				this.#svg()?.setAttribute("viewBox", viewBox)
				this.#path()?.setAttribute("d", path)
			}
		},
		"label": (newValue: string | undefined | null) => {
			this.#svg()?.setAttribute("aria-hidden", (newValue != null && newValue.length > 0).toString())
			const title = this.#title()
			if (title) {
				title.textContent = newValue ?? ""
			}
		},
	}

	#svg = () => this.shadowRoot?.querySelector("svg")
	#title = () => this.shadowRoot?.querySelector("title")
	#path = () => this.shadowRoot?.querySelector("path")

	#createRoot = () => {
		const root = this.shadowRoot ?? this.attachShadow({ mode: "open" })

		const style = document.createElement("style")
		style.innerHTML = VectorIconElement.css

		const template = document.createElement("template")
		template.innerHTML = VectorIconElement.html

		root.appendChild(style)
		root.appendChild(template.content)

		return root
	}
}
