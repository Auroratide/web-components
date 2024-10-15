export class ArchedTextElement extends HTMLElement {
	static defaultElementName = "arched-text"
	static DEFAULT_ARCH_AMOUNT = 0.33333

	private static html = `
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {archWidth} {archHeight}" role="presentation">
			<defs>
				<path id="path" />
			</defs>
			<title></title>
			<text fill="currentColor">
				<textPath xlink:href="#path" text-anchor="middle" startOffset="50%"></textPath>
			</text>
		</svg>
	`

	private static css = `
		:host, svg {
			display: inline-block;
		}

		svg {
			overflow: visible;
		} text {
			font-size: 1rem;
		}
	`

	static get observedAttributes() {
		return ["amount"]
	}

	#observer = new MutationObserver(() =>  this.#rerender())

	constructor() {
		super()

		this.#createRoot()
	}

	/**
	 * Amount of arching, from 0 to 1.
	 */
	get amount(): number { return parseFloat(this.getAttribute("amount") ?? `${ArchedTextElement.DEFAULT_ARCH_AMOUNT}`) }
	set amount(value: number) { this.setAttribute("amount", value.toString()) }

	connectedCallback() {
		this.#rerender()

		this.#observer.observe(this, { subtree: true, childList: true })
	}

	disconnectedCallback() {
		this.#observer.disconnect()
	}

	attributeChangedCallback() {
		this.#rerender()
	}

	#rerender = () => {
		const svgEl = this.shadowRoot!.querySelector("svg")!
		const pathEl = this.shadowRoot!.querySelector("path")!
		const titleEl = this.shadowRoot!.querySelector("title")!
		const textEl = this.shadowRoot!.querySelector("textPath")!

		const text = this.textContent
		const textScaleConstant = 7 // I'm not sure how to derive this number

		const length = textScaleConstant * text.length
		const height = this.amount * length / 2

		// this is technically an approximation
		// instead of using some complicated formula for the length of a quadratic arch
		// an isosceles triangle is good enough
		const width = Math.sqrt(length * length - 4 * height * height)

		svgEl.setAttribute("viewBox", `0 0 ${width} ${height + 1}`)
		pathEl.setAttribute("d", `M 0 ${height + 1} Q ${width / 2} ${-height} ${width} ${height + 1}`)
		titleEl.innerHTML = text
		textEl.setAttribute("textLength", length.toString())
		textEl.innerHTML = text
		svgEl.style.inlineSize = `${width / 16}em`
	}

	#createRoot = () => {
		const root = this.shadowRoot ?? this.attachShadow({ mode: "open" })

		const style = document.createElement("style")
		style.innerHTML = ArchedTextElement.css

		const template = document.createElement("template")
		template.innerHTML = ArchedTextElement.html

		root.appendChild(style)
		root.appendChild(template.content)

		return root
	}
}
