export class PointCompilationElement extends HTMLElement {
	static defaultElementName = "point-compilation"

	static html = `
		<figure>
			<figcaption>
				<slot name="title"></slot>
			</figcaption>
			<section>
				<aside class="image">
					<slot name="image"></slot>
				</aside>
				<div class="items">
					<slot name="items"></slot>
				</div>
			</section>
		</figure>
	`

	static css = `
		:host { display: block; }
		figure { margin: 0; }
	`

	constructor() {
		super()

		this.#createRoot()
	}

	static get observedAttributes() {
		return ["highlight", "using"]
	}

	get highlight(): HighlightValue | null { return this.getAttribute("highlight") as HighlightValue }
	set icon(value: HighlightValue | null) {
		if (value != null) {
			this.setAttribute("icon", value)
		} else {
			this.removeAttribute("highlight")
		}
	}

	get using(): string | null { return this.getAttribute("using") }
	set using(value: string) { this.setAttribute("using", value) }

	connectedCallback() {
		this.#triggerElemsUsingMe()
		this.#seekReference()
	}

	attributeChangedCallback(attribute: string, oldValue: string, newValue: string) {
		this.#attributeCallbacks[attribute]?.(newValue, oldValue)
	}

	#attributeCallbacks: Record<string, (newValue: string | undefined | null, oldValue: string | undefined | null) => void> = {
		"highlight": () => {
			this.#renderHighlight()
		},
		"using": () => {
			this.#seekReference()
		},
	}

	#triggerElemsUsingMe = () => {
		if (this.id) {
			const elems = document.querySelectorAll<PointCompilationElement>(`${this.nodeName.toLowerCase()}[using="${this.id}"]`)
			elems.forEach((elem) => elem.#seekReference?.())
		}
	}

	#seekReference = () => {
		this.#reference?.removeEventListener("slotchange", this.#cloneReference)

		this.#reference = this.using ? document.querySelector<PointCompilationElement>(`#${this.using}`) : undefined
		if (this.#reference) {
			this.#cloneReference()
			this.#reference.addEventListener("slotchange", this.#cloneReference)
		}
	}

	#parseHighlight = (): [number, number] | undefined => {
		if (!this.highlight) return undefined
		const [min, max] = this.highlight.split("-")

		return [parseInt(min), max != null ? parseInt(max) : parseInt(min)]
	}

	#renderHighlight = () => {
		const points = this.#points()
		const highlight = this.#parseHighlight()
		if (points && highlight != null && !isNaN(highlight[0]) && !isNaN(highlight[1])) {
			points.forEach((point, i) => {
				if (highlight[0] <= i && i <= highlight[1]) {
					point.dataset.highlighted = ""
				} else {
					delete point.dataset.highlighted
				}
			})
		}
	}

	#points = (): HTMLElement[] =>
		Array.from(this.querySelector("[slot=\"items\"]")?.children ?? []) as HTMLElement[]

	#reference: PointCompilationElement | undefined | null
	#cloneReference = () => {
		const clones = this.#reference?.cloneNode(true).childNodes ?? []
		this.replaceChildren(...clones)

		this.#renderHighlight()
	}

	#createRoot = () => {
		const root = this.shadowRoot ?? this.attachShadow({ mode: "open" })

		const style = document.createElement("style")
		style.innerHTML = PointCompilationElement.css

		const template = document.createElement("template")
		template.innerHTML = PointCompilationElement.html

		root.appendChild(style)
		root.appendChild(template.content)

		return root
	}
}

export type HighlightValue = `${number}` | `${number}-${number}`
