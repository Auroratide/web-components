export class MajorPointElement extends HTMLElement {
	static defaultElementName = "major-point"

	static html = `
		<strong><slot></slot></strong>
	`

	static css = `
		:host {
			display: block;
			margin-block: 1em;
		}

		strong { font-weight: inherit; }
	`

	constructor() {
		super()

		this.#createRoot()
	}

	#createRoot = () => {
		const root = this.shadowRoot ?? this.attachShadow({ mode: "open" })

		const style = document.createElement("style")
		style.innerHTML = MajorPointElement.css

		const template = document.createElement("template")
		template.innerHTML = MajorPointElement.html

		root.appendChild(style)
		root.appendChild(template.content)

		return root
	}
}
