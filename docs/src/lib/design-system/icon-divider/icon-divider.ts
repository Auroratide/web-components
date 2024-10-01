import { isValidIcon, VectorIconElement, IconName } from "../vector-icon"

export class IconDividerElement extends HTMLElement {
	static defaultElementName = "icon-divider"

	static html = `
		<div role="separator">
			<vector-icon></vector-icon>
			<vector-icon></vector-icon>
			<vector-icon></vector-icon>
		</div>
	`

	static css = `
		:host { display: block; }

		div {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 1.5em;
		}

		vector-icon:nth-child(2) {
			font-size: 2em;
		}		
	`

	constructor() {
		super()

		this.#createRoot()
	}

	static get observedAttributes() {
		return ["icon"]
	}

	get icon(): IconName | null { return this.getAttribute("icon") as IconName }
	set icon(value: IconName) { this.setAttribute("icon", value) }

	attributeChangedCallback(attribute: string, oldValue: string, newValue: string) {
		this.#attributeCallbacks[attribute]?.(newValue, oldValue)
	}

	#attributeCallbacks: Record<string, (newValue: string | undefined | null, oldValue: string | undefined | null) => void> = {
		"icon": (newValue: string | undefined | null) => {
			if (isValidIcon(newValue)) {
				this.#vectorIcons()?.forEach((elem) => {
					elem.setAttribute("icon", newValue)
				})
			}
		},
	}

	#vectorIcons = (): NodeListOf<VectorIconElement> | undefined =>
		this.shadowRoot?.querySelectorAll("vector-icon")

	#createRoot = () => {
		const root = this.shadowRoot ?? this.attachShadow({ mode: "open" })

		const style = document.createElement("style")
		style.innerHTML = IconDividerElement.css

		const template = document.createElement("template")
		template.innerHTML = IconDividerElement.html

		root.appendChild(style)
		root.appendChild(template.content)

		return root
	}
}
