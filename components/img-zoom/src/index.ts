export class ImgZoomElement extends HTMLElement {
	static defaultElementName = "img-zoom"

	static html = `
		<button id="zoom-in">
			<slot></slot>
		</button>
		<dialog part="dialog" id="modal">
			<div id="content"></div>
			<button id="zoom-out" autofocus>
				<span class="visually-hidden">close zoom</span>
			</button>
		</dialog>
	`

	static css = `
		:host {
			display: inline-block;
		}

		button { all: unset; }
		#zoom-in { cursor: zoom-in; }
		#zoom-out { cursor: zoom-out; }
		#zoom-in:disabled { cursor: auto; }

		::slotted(*) {
			display: inline-block;
			inline-size: 100%;
			block-size: auto;
		}

		dialog {
			background: none;
			border: none;
			padding: 0;
			overflow: hidden;
		}

		dialog::backdrop {
			background: oklch(0% 0 0 / 0.5);
		}

		#zoom-out {
			position: absolute;
			inset: 0;
		}

		#content {
			inline-size: 95dvi;
			block-size: 95dvb;
		}

		#content > * {
			display: block;
			inline-size: 100%;
			block-size: 100%;
			object-fit: contain;
		}

		.visually-hidden {
			clip: rect(1px, 1px, 1px, 1px);
			clip-path: inset(50%);
			height: 1px;
			width: 1px;
			margin: -1px;
			overflow: hidden;
			padding: 0;
			position: absolute;
		}
	`

	static get observedAttributes() {
		return ["disabled"]
	}

	constructor() {
		super()

		this.#createRoot()
	}

	get disabled() { return this.hasAttribute("disabled") }
	set disabled(value: boolean) { this.toggleAttribute("disabled", value) }

	zoomIn = () => {
		this.#modal().showModal()
	}

	zoomOut = () => {
		this.#modal().close()
	}

	#zoomInBtn = () => this.shadowRoot!.querySelector("#zoom-in") as HTMLButtonElement
	#zoomOutBtn = () => this.shadowRoot!.querySelector("#zoom-out") as HTMLButtonElement
	#modal = () => this.shadowRoot!.querySelector("#modal") as HTMLDialogElement
	#content = () => this.shadowRoot!.querySelector("#content") as HTMLDivElement
	#slot = () => this.shadowRoot!.querySelector("slot") as HTMLSlotElement

	connectedCallback() {
		this.#zoomInBtn().addEventListener("click", this.zoomIn)
		this.#zoomOutBtn().addEventListener("click", this.zoomOut)
		this.#slot().addEventListener("slotchange", this.#cloneIntoContent)
	}

	disconnectedCallback() {
		this.#zoomInBtn().removeEventListener("click", this.zoomIn)
		this.#zoomOutBtn().removeEventListener("click", this.zoomOut)
		this.#slot().removeEventListener("slotchange", this.#cloneIntoContent)
	}

	attributeChangedCallback(attribute: string, oldValue: string, newValue: string) {
		this.#attributeCallbacks[attribute]?.(newValue, oldValue)
	}

	#attributeCallbacks = {
		"disabled": (newValue: string | undefined | null) => {
			this.#zoomInBtn().disabled = newValue != null
		},
	}

	#cloneIntoContent = () => {
		const slotted = this.#slot().assignedElements()[0]
		const cloned = slotted.cloneNode(true) as HTMLElement

		if ("alt" in cloned) {
			cloned.alt += " (zoomed)"
		}
		cloned.setAttribute("part", "content")

		this.#content().replaceChildren(slotted.cloneNode(true))
	}

	#createRoot = () => {
		const root = this.shadowRoot ?? this.attachShadow({ mode: "open" })

		const style = document.createElement("style")
		style.innerHTML = ImgZoomElement.css

		const template = document.createElement("template")
		template.innerHTML = ImgZoomElement.html

		root.appendChild(style)
		root.appendChild(template.content)

		return root
	}
}
